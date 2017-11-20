_investStocks.ctx.register("FavouriteStocksAnalyzer")
    .asCtor(FavouriteStocksAnalyzer)
    .dependencies("FinamFavouriteStocks, FinamStockRecommendationTypes, CssStockRecommendations," +
        "FinamMainStockInfoLoadingStrategy, FinamHistoricalStockInfoLoadingStrategy, FavouriteStocksAnalyzerStorageHelper," +
        "FinancialSummaryStockInfoLoadingStrategy, DigitsHelper");

function FavouriteStocksAnalyzer(FinamFavouriteStocks, FinamStockRecommendationTypes, CssStockRecommendations,
                                 FinamMainStockInfoLoadingStrategy, FinamHistoricalStockInfoLoadingStrategy, FavouriteStocksAnalyzerStorageHelper,
                                 FinancialSummaryStockInfoLoadingStrategy, DigitsHelper){
    this.run = run;
    this.loadData = loadData;
    this.showStatistics = showStatistics;
    this.setInitialDistribution = setInitialDistribution;

    const loadingDataStrategies = [
        FinamMainStockInfoLoadingStrategy.getStrategy(),
        FinamHistoricalStockInfoLoadingStrategy.getStrategy(),
        FinancialSummaryStockInfoLoadingStrategy.getStrategy(),
    ];

    function run(collectProfitableStock){
        FavouriteStocksAnalyzerStorageHelper.clearPreviousData();
        setInitialData(collectProfitableStock);
        loadData();
    }

    function getNextStrategy(){
        for (let strategy of loadingDataStrategies) {
            if (hasNotLoadedItems(strategy.name))
                return strategy;
        }
    }

    function loadData() {
        let strategy = getNextStrategy();
        if (!strategy) {
            showStatistics();
            return;
        }

        let itemToLoad = getNotLoadedItem(strategy.name);


        if (location.href != strategy.getUrl(itemToLoad.url)) {
            let nextUrlToContinue = FavouriteStocksAnalyzerStorageHelper.getNextUrl();

            if(nextUrlToContinue && location.href != nextUrlToContinue){
                console.log('to load statistics - continue from page '+ FavouriteStocksAnalyzerStorageHelper.getNextUrl());
                return;
            }

            FavouriteStocksAnalyzerStorageHelper.setNextUrl(itemToLoad.url);
            location.href = strategy.getUrl(itemToLoad.url);
        } else {
            strategy.loadData(itemToLoad);

            let nextStrategy = getNextStrategy();

            if (nextStrategy) {
                itemToLoad = getNotLoadedItem(nextStrategy.name);
                location.href = nextStrategy.getUrl(itemToLoad.url);
            } else {
                setInitialDistribution();
                showStatistics();
            }
        }
    }

    function setInitialDistribution(){
        let items = FavouriteStocksAnalyzerStorageHelper.getStorageData();

        if (!items || !items.length){
            return;
        }

        prepareOverallStrategyStatistics();

        items = items.sort(sortStocksByPriority);

        for (let i=0; i<5; i++)
            items[i].inPortfolio = true;

        FavouriteStocksAnalyzerStorageHelper.saveData(items);
    }

    function prepareOverallStrategyStatistics(){
        loadingDataStrategies.forEach(strategy =>
            strategy.combineAllStocksStatistics &&
            strategy.combineAllStocksStatistics());
    }

    function showStatistics(){
        prepareOverallStrategyStatistics();

        let items = FavouriteStocksAnalyzerStorageHelper.getStorageData();

        if (!items.length){
            return;
        }

        splitMoneyByChoosenStocks(items);

        let itemsHtml = items.map(i =>
            "<tr>" +
                "<td><a href='"+i.url+"'>" + i.name + "</a></td>" +
                "<td>" + FinamStockRecommendationTypes.convertRecommendationToString(i.technicalSummary) + "</td>" +
                "<td>"+i.stockPrice+"</td>"+
                "<td>"+i.yearRate+"</td>"+
                "<td>-"+i.historicalData.percentTenDaysFall+"%</td>"+
                "<td>"+(i.countToBuy||"")+"</td>"+
                "<td><input type='checkbox' id='"+i.id+"'/></td>"+
                "<td>"+getStockStrategyRate(i,loadingDataStrategies[0])+"</td>"+
                "<td>"+getStockStrategyRate(i,loadingDataStrategies[1])+"</td>"+
                "<td>"+getStockStrategyRate(i,loadingDataStrategies[2])+"</td>"+
                "<td>"+getStockGainPriorityRate(i)+"</td>"+
            "</tr>"
        );
        let resultHtml = "<div class='stock-recommedations'><table>" +
            "<tr>" +
                "<th>Название</th>" +
                "<th>Тех. рекомендация</th>" +
                "<th>Цена</th>" +
                "<th>Годовой рост</th>" +
                "<th>10дн падение</th>" +
                "<th>Позиция</th>" +
            "<th>Участие</th>" +
            "<th>kYearRisk</th>" +
            "<th>k10Fall</th>" +
            "<th>kFinStat</th>" +
            "<th>kTotal</th>" +
            "</tr>" +

            itemsHtml.join('')+

            "<tr><td colspan='11'>Расчет по портфелю: "+FinamFavouriteStocks.portfolioVolume+"$</td></td></tr>"+
            "<tr><td colspan='11'>Остаток средств: "+parseInt(getAvailabeDollarsAmount(items))+"$</td></td></tr>"+
            "<tr><td colspan='11'>" +
                "<button id='close-favourite-stocks-report'>Очистить</button>" +
            "<button id='do-initial-sort'>Исходная сортировка</button>" +
            "</td></tr>"+
            "</table></div>";
        $('body').html(resultHtml);

        CssStockRecommendations.appendStyle();
        initializeCheckBoxes(items);
        initializeButtonsEvents();
    }

    function initializeButtonsEvents(){
        $('#close-favourite-stocks-report').unbind('click');
        $('#close-favourite-stocks-report').bind('click', ()=>{
            FavouriteStocksAnalyzerStorageHelper.clearPreviousData();
        });


        $('#do-initial-sort').unbind('click');
        $('#do-initial-sort').bind('click', ()=>{
            setInitialDistribution();
        })
    }

    function initializeCheckBoxes(items){
        items.forEach(i=>{
            if (i.countToBuy){
                $('#'+i.id).attr('checked','checked');
            }
            $('#'+i.id).unbind('click');
            $('#'+i.id).bind('click', (el)=>{
                let items = FavouriteStocksAnalyzerStorageHelper.getStorageData();
                let id = $(el.currentTarget).attr('id');
                let stock = items.find(e=> e.id == id);
                stock.inPortfolio = $(el.currentTarget).is(':checked');
                FavouriteStocksAnalyzerStorageHelper.saveItemInStorage(stock);
                showStatistics();
            });
        });
    }

    function sortStocksByPriority(a, b){ // todo move to extra module
        return getStockGainPriorityRate(a) < getStockGainPriorityRate(b)
            ? 1
            : -1;
    }

    function getStockStrategyRate(stock, strategy){
        debugger;
        var rate = strategy.getRate(stock);

        return DigitsHelper.round2(rate);
    }

    function getStockGainPriorityRate(stock){
        var rate =  loadingDataStrategies.reduce(function(totalRate, currentStrategy) {
            return totalRate * currentStrategy.getRate(stock);
        }, 1);

        return DigitsHelper.round2(rate);
    }

    function splitMoneyByChoosenStocks(items){
        let curVolume = FinamFavouriteStocks.portfolioVolume;
        let positionsCount = items.filter(item => item.inPortfolio).length;
        let perStock = curVolume/positionsCount;

        let sum = 0;
        for (let i=0; i<items.length; i++){
            let item = items[i];

            if (!item.inPortfolio)
                continue;

            item.countToBuy = parseInt(perStock / item.stockPrice);
            sum += item.countToBuy * item.stockPrice;
        }

        let portfolioChanged = true;
        while(portfolioChanged){
            portfolioChanged = false;

            for (let i=0; i<items.length; i++){
                let item = items[i];

                if (!item.inPortfolio)
                    continue;

                if (item.stockPrice < getAvailabeDollarsAmount(items)){
                    item.countToBuy++;
                    portfolioChanged = true;
                }
            }
        }
    }

    function getAvailabeDollarsAmount(items){
        let total = items.reduce(function(sum, item) {
            return sum + (item.countToBuy || 0) * (item.stockPrice || 0);
        }, 0);

        return FinamFavouriteStocks.portfolioVolume - total;
    }
    
    function hasNotLoadedItems(type){
        return getNotLoadedItem(type) != null;
    }

    function getNotLoadedItem(type){
        let propName = type+"DataCollected";
        return FavouriteStocksAnalyzerStorageHelper.getStorageData().find(s=> !s[propName]);
    }

    function setInitialData(collectProfitableStock){
        let dataToCollect = FinamFavouriteStocks.getAll(collectProfitableStock).map(s=> {
            s.mainDataCollected = false;
            return s;
        });

        FavouriteStocksAnalyzerStorageHelper.saveData(dataToCollect);
    }

}