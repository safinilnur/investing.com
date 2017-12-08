_investStocks.ctx.register("FavouriteStocksAnalyzer")
    .asCtor(FavouriteStocksAnalyzer)
    .dependencies("FinamFavouriteStocks, FinamStockRecommendationTypes, CssStockRecommendations," +
        "FinamMainStockInfoLoadingStrategy, FinamHistoricalStockInfoLoadingStrategy, FavouriteStocksAnalyzerStorageHelper," +
        "FinancialSummaryStockInfoLoadingStrategy, DigitsHelper, DateHelper, jsHelper");

function FavouriteStocksAnalyzer(FinamFavouriteStocks, FinamStockRecommendationTypes, CssStockRecommendations,
                                 FinamMainStockInfoLoadingStrategy, FinamHistoricalStockInfoLoadingStrategy, FavouriteStocksAnalyzerStorageHelper,
                                 FinancialSummaryStockInfoLoadingStrategy, DigitsHelper, DateHelper, jsHelper){
    this.run = run;
    this.loadData = loadData;
    this.showStatistics = showStatistics;
    this.setInitialDistribution = setInitialDistribution;

    const loadingDataStrategies = [
        FinamMainStockInfoLoadingStrategy.getStrategy(),
        FinamHistoricalStockInfoLoadingStrategy.getStrategy(),
        FinancialSummaryStockInfoLoadingStrategy.getStrategy(),
    ];

    function run(collectProfitableStock){ // todo - dont use this param
        // FavouriteStocksAnalyzerStorageHelper.clearPreviousData(); todo update list
        //setInitialData(collectProfitableStock);
        FavouriteStocksAnalyzerStorageHelper.clearNextUrl();
        loadData();
    }

    function getNextStrategy(){
        let stockWithMinUpdatedStrategyTime = new Date().getTime();
        let nextStrategy;

        for (let strategy of loadingDataStrategies) {
            let time = getMinStockUpdatedTime(strategy);

            if(time < stockWithMinUpdatedStrategyTime){
                stockWithMinUpdatedStrategyTime = time;
                nextStrategy = strategy;
            }
        }

        return {strategy: nextStrategy, time: stockWithMinUpdatedStrategyTime};
    }

    function getStockLastUpdatedTime(stock){
        let times = loadingDataStrategies.map(strategy => getStockStrategyTime(strategy, stock));

        return Math.min(...times);
    }

    function getStockStrategyTime(strategy, stock){
        return stock[strategy.name + "TimeUpdated"] || 0;
    }

    function getMinStockUpdatedTime(strategy){
        let items = FavouriteStocksAnalyzerStorageHelper.getStorageData();
        let updatedTimes = items.map(e=> e[strategy.name + "TimeUpdated"] || 0);

        return Math.min(...updatedTimes);
    }

    function loadData() {

        if (location.href.includes('getStatistics')){
            showStatistics();
            return;
        }

        setupTopStocksToBeUpdated(10, 50);
        let wasUpdateSent = sendUpdatesIfTopStocksChanged(4);

        debugger;
        if (!wasUpdateSent){
            doStrategy();
        }else{
            // need to wait while another tab will be opened
            setTimeout(doStrategy, 3000);
        }
    }

    function doStrategy(){
        let strategyAndTime = getNextStrategy();
        let strategy = strategyAndTime.strategy;
        let time = strategyAndTime.time;

        if (!strategy) {
            showStatistics();
            return;
        }

        let itemToLoad = getNotLoadedItem(strategy.name, time);


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

            strategyAndTime = getNextStrategy();
            strategy = strategyAndTime.strategy;
            time = strategyAndTime.time;

            if (strategy) {
                itemToLoad = getNotLoadedItem(strategy.name, time);
                location.href = strategy.getUrl(itemToLoad.url);
            } else {
                setInitialDistribution();
                showStatistics();
            }
        }
    }

    function sendUpdatesIfTopStocksChanged(topStocksCount){
        setInitialDistribution();

        let stocks =FavouriteStocksAnalyzerStorageHelper.getStorageData();
        let topStocks = stocks.slice(0, topStocksCount);

        let topStocksHash = topStocks.map(s=> s.name).join();

        if (FavouriteStocksAnalyzerStorageHelper.getLastSentTopStocks() == topStocksHash){
            return false;
        }

        FavouriteStocksAnalyzerStorageHelper.setLastSentTopStocks(topStocksHash);

        let stocksDto = topStocks.map(s => ({
            name: s.name,
            url: s.url,
            maxPrice: s.historicalData.maxLastTenDaysPrice,
            percentTenDaysFall:s.historicalData.percentTenDaysFall,
            price: s.stockPrice,
            yearRate: s.yearRate,
        }));
        let stocksDtoJson = JSON.stringify(stocksDto);

        sendToVkontakte(stocksDtoJson);

        return true;
    }

    function sendToVkontakte(stocksDtoJson) {
        jsHelper.openInNewWindow("GET", "https://vk.com/club157318779",
            [
               // {Value: "p", Text: "@usa_stocks"},
                {Value: "stocks", Text: stocksDtoJson}
            ]);
    }

    function setupTopStocksToBeUpdated(topStocksCount, limitBeforeUpdatingTopStocks){
        // for example each time when we updated already x=50 stocks - update 10 top stocks and continue updating others
        FavouriteStocksAnalyzerStorageHelper.increasePageRefreshCount();
        let refreshCount = FavouriteStocksAnalyzerStorageHelper.getPageRefreshCount();
        if (refreshCount % ((loadingDataStrategies.length)*(topStocksCount + limitBeforeUpdatingTopStocks)) == 0){
            setTopStocksToBeUpdated(topStocksCount);
            FavouriteStocksAnalyzerStorageHelper.clearNextUrl();
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
                "<td>"+DateHelper.getDate(getStockLastUpdatedTime(i), 1)+"</td>"+
            "</tr>"
        );
        let resultHtml = "<div class='stock-recommedations'><table>" +

            "<tr><td colspan='11'>Расчет по портфелю: "+FinamFavouriteStocks.portfolioVolume+"$</td></td></tr>"+
            "<tr><td colspan='11'>Остаток средств: "+parseInt(getAvailabeDollarsAmount(items))+"$</td></td></tr>"+
            "<tr><td colspan='11'>" +
            "<button id='close-favourite-stocks-report'>Очистить</button>" +
            "<button id='do-initial-sort'>Исходная сортировка</button>" +
            "<button id='update-first-ten'>Обновить топ-10</button>" +
            "</td></tr>"+

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
            "<th>updTime</th>" +
            "</tr>" +

            itemsHtml.join('')+

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
        });


        $('#update-first-ten').unbind('click');
        $('#update-first-ten').bind('click', ()=>{
            setTopStocksToBeUpdated(10);
        });
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

    function setTopStocksToBeUpdated(topStocksCount){
        let items = FavouriteStocksAnalyzerStorageHelper.getStorageData();
        let topTenStocks = items.slice(0, topStocksCount);

        topTenStocks.forEach(stock =>{
            loadingDataStrategies.forEach(strategy =>{
                dropStockStrategyTime(strategy, stock)
            })
        });

        FavouriteStocksAnalyzerStorageHelper.saveData(items);
    }

    function dropStockStrategyTime(strategy, stock){
        stock[strategy.name + "TimeUpdated"] = 0;
    }

    function sortStocksByPriority(a, b){ // todo move to extra module
        return getStockGainPriorityRate(a) < getStockGainPriorityRate(b)
            ? 1
            : -1;
    }

    function getStockStrategyRate(stock, strategy){
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

    function getNotLoadedItem(type, updatedTime){
        let propName = type+"TimeUpdated";

        return FavouriteStocksAnalyzerStorageHelper.getStorageData()
            .find(s=> (s[propName] || 0) == updatedTime);
    }

    function setInitialData(collectProfitableStock){
        let dataToCollect = FinamFavouriteStocks.getAll(collectProfitableStock).map(s=> {
            s.mainDataCollected = false;
            return s;
        });

        FavouriteStocksAnalyzerStorageHelper.saveData(dataToCollect);
    }

}