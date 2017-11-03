_investStocks.ctx.register("FavouriteStocksAnalyzer")
    .asCtor(FavouriteStocksAnalyzer)
    .dependencies("FinamFavouriteStocks, FinamStockRecommendationTypes, CssStockRecommendations");

function FavouriteStocksAnalyzer(FinamFavouriteStocks, FinamStockRecommendationTypes, CssStockRecommendations){
    this.run = run;
    this.loadData = loadData;
    this.showStatistics = showStatistics;

    const storageKey = "favouriteStocksAnalitycs";

    function run(){
        clearPreviousData();
        setInitialData();
        loadData();
    }

    function loadData(){
        if (hasNotLoadedItems("main")){
            var itemToLoad = getNotLoadedItem("main");

            if (location.href != itemToLoad.url){
                location.href = itemToLoad.url;
            } else {
                attachMainStockInfo(itemToLoad);
                if (hasNotLoadedItems("main")){
                    var itemToLoad = getNotLoadedItem("main");
                    if (location.href != itemToLoad.url){
                        location.href = itemToLoad.url;
                    }
                } else {
                    loadHistoricalData();
                }
            }
        }  else { loadHistoricalData(); }
    }

    function loadHistoricalData(){
        if (hasNotLoadedItems("historical")){
            var itemToLoad = getNotLoadedItem("historical");

            if (location.href != itemToLoad.url+"-historical-data"){
                location.href = itemToLoad.url+"-historical-data";
            } else {
                attachHistoricalStockInfo(itemToLoad);// todo
                if (hasNotLoadedItems("historical")){
                    var itemToLoad = getNotLoadedItem("historical");
                    if (location.href != itemToLoad.url+"-historical-data"){
                        location.href = itemToLoad.url+"-historical-data";
                    }
                } else {
                    setInitialDistribution();
                    showStatistics();
                    //clearPreviousData(); // comment for debug
                }
            }
        }  else { showStatistics(); } // uncomment for debug
    }

    function attachHistoricalStockInfo(item){
        var rows = $('.historicalTbl tbody tr');
        if (rows.length<15)
            throw "Rows count should be more than 15 for historical data. Something went wrong..."

        item.historicalData = {};

        for (var i=0; i<rows.length; i++){
            var row = rows[i];
            item.historicalData[i] = {
                maxPrice: parseFloat($($(row).find('td')[3]).html().replace(',','.'))
            };
        }

        item.historicalData.maxLastTenDaysPrice = item.historicalData[0].maxPrice;
        for (var i=1; i<10; i++){
            if (item.historicalData.maxLastTenDaysPrice < item.historicalData[i].maxPrice)
                item.historicalData.maxLastTenDaysPrice = item.historicalData[i].maxPrice;
        }

        debugger;
        item.historicalData.percentTenDaysFall = item.historicalData.maxLastTenDaysPrice > item.stockPrice
            ? Math.round((item.historicalData.maxLastTenDaysPrice - item.stockPrice)/item.stockPrice*100 * 100)/100
            : 0;

        item.historicalDataCollected = true;
        saveItemInStorage(item);
    }
    
    function setInitialDistribution(){
        let items = getStorageData();

        if (!items || !items.length){
            return;
        }

        items = items.sort(sortStocksByPriority);

        for (var i=0; i<5; i++)
            items[i].inPortfolio = true;
        
        saveData(items);
    }

    function showStatistics(){
        let items = getStorageData();

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
                "<td>"+i.historicalData.percentTenDaysFall+"</td>"+
                "<td>"+(i.countToBuy||"")+"</td>"+
                "<td><input type='checkbox' id='"+i.id+"'/></td>"+
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
            "</tr>" +

            itemsHtml+

            "<tr><td colspan='7'>Расчет по портфелю: "+FinamFavouriteStocks.portfolioVolume+"$</td></td></tr>"+
            "<tr><td colspan='7'>Остаток средств: "+parseInt(getAvailabeDollarsAmount(items))+"$</td></td></tr>"+
            "</table></div>";
        $('body').html(resultHtml);

        CssStockRecommendations.appendStyle();
        initializeCheckBoxes(items);
    }

    function initializeCheckBoxes(items){
        items.forEach(i=>{
            if (i.countToBuy){
                $('#'+i.id).attr('checked','checked');
            }
            $('#'+i.id).unbind('click');
            $('#'+i.id).bind('click', (el)=>{
                var items = getStorageData();
                var id = $(el.currentTarget).attr('id')
                var stock = items.find(e=> e.id == id);
                stock.inPortfolio = $(el.currentTarget).is(':checked');
                saveItemInStorage(stock);
                showStatistics();
            });
        });
    }

    function sortStocksByPriority(a, b){ // todo move to extra module
        if (a.technicalSummary < b.technicalSummary) // sort by technicalSummary
            return 1;
        else if (a.technicalSummary > b.technicalSummary)
            return -1;
        else{
            if (a.yearRate < b.yearRate) // then by yearRate
                return 1;
            else if (a.yearRate > b.yearRate)
                return -1;
            else
                return 0;
        }
    }

    function splitMoneyByChoosenStocks(items){
        var curVolume = FinamFavouriteStocks.portfolioVolume;
        var positionsCount = items.filter(item => item.inPortfolio).length;
        var perStock = curVolume/positionsCount;

        var sum = 0;
        for (var i=0; i<items.length; i++){
            let item = items[i];

            if (!item.inPortfolio)
                continue;

            item.countToBuy = parseInt(perStock / item.stockPrice);
            sum += item.countToBuy * item.stockPrice;
        }

        let portfolioChanged = true;
        while(portfolioChanged){
            portfolioChanged = false;

            for (var i=0; i<items.length; i++){
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

    function attachMainStockInfo(item){
        let minimalEstimation = getMinimalEstimation();
        let stockPrice = getStockPrice();
        let yearRate = getYearRate();

        item.technicalSummary =minimalEstimation;
        item.stockPrice = stockPrice;
        item.mainDataCollected = true;
        item.yearRate = yearRate;
        saveItemInStorage(item);
    }

    function getYearRate(){
        if ($('#leftColumn > div.clear.overviewDataTable > div:nth-child(13) > span.float_lang_base_1').html() == "Изменение за год")
        {
            var rateWithPercent = $('#leftColumn > div.clear.overviewDataTable > div:nth-child(13) > span.float_lang_base_2.bold').html();
            var rate =  parseFloat(rateWithPercent.slice(0, -1).replace(",","."));

            return rate;
        }
    }

    function getStockPrice(){ // todo move
        let stockPrice = parseFloat($('#last_last').html().replace(".","").replace(",","."));

        return stockPrice;
    }

    function getMinimalEstimation(){ // todo move to separate module
        let hourTechnioalSummary = $('.technicalSummaryTbl > tbody > tr:nth-child(3) > td:nth-child(4)').html();
        let dayTechnioalSummary = $('.technicalSummaryTbl > tbody > tr:nth-child(3) > td:nth-child(5)').html();
        let minimalEstimation = FinamStockRecommendationTypes.getMinimalEstimation([hourTechnioalSummary, dayTechnioalSummary]);

        return minimalEstimation;
    }

    function hasNotLoadedItems(type){
        return getNotLoadedItem(type) != null;
    }

    function getNotLoadedItem(type){
        var propName = type+"DataCollected";
        return getStorageData().find(s=> !s[propName]);
    }

    function setInitialData(){
        var dataToCollect = FinamFavouriteStocks.getAll().map(s=> {
            s.mainDataCollected = false;
            return s;
        });

        saveData(dataToCollect);
    }

    function saveItemInStorage(itemToSave){
        var items = getStorageData();

        items.forEach(function(item, i) {
            if (item.name == itemToSave.name) {
                items[i] = itemToSave;
            }
        });

        saveData(items);
    }

    function getStorageData(){
        return JSON.parse(localStorage.getItem(storageKey)) || [];
    }

    function saveData(data){
        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    function clearPreviousData(){
        localStorage.removeItem(storageKey);
    }

}