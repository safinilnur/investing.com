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
        if (hasNotLoadedItems()){
            var itemToLoad = getNotLoadedItem();

            if (location.href != itemToLoad.url){
                location.href = itemToLoad.url;
            } else {
                attachStockInfo(itemToLoad);
                if (hasNotLoadedItems()){
                    var itemToLoad = getNotLoadedItem();
                    if (location.href != itemToLoad.url){
                        location.href = itemToLoad.url;
                    }
                } else {
                    showStatistics();
                    //clearPreviousData(); // comment for debug
                }
            }
        }  else { showStatistics(); } // uncomment for debug
    }

    function showStatistics(){
        let items = getStorageData();

        if (!items.length){
            return;
        }

        debugger;
        items = items.sort(sortStocksByPriority);

        splitPorfolioByFiveStocks(items);

        let itemsHtml = items.map(i =>
            "<tr>" +
                "<td><a href='"+i.url+"'>" + i.name + "</a></td>" +
                "<td>" + FinamStockRecommendationTypes.convertRecommendationToString(i.technicalSummary) + "</td>" +
                "<td>"+i.stockPrice+"</td>"+
                "<td>"+i.yearRate+"</td>"+
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
                "<th>Позиция</th>" +
                "<th>Участие</th>" +
            "</tr>" +

            itemsHtml+

            "<tr><td colspan='6'>Расчет по портфелю: "+FinamFavouriteStocks.portfolioVolume+"$</td></td></tr>"+
            "<tr><td colspan='6'>Остаток средств: "+parseInt(getAvailabeDollarsAmount(items))+"$</td></td></tr>"+
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
            $('#'+i.id).click((el)=>{
                var items = getStorageData();
                var id = $(e).id();
                var stock = items.find(e=> e.id == id);
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

    function splitPorfolioByFiveStocks(items){
        var curVolume = FinamFavouriteStocks.portfolioVolume;
        var perStock = curVolume/5;

        var sum = 0;
        for (var i=0; i<5; i++){
            let item = items[i];
            item.countToBuy = parseInt(perStock / item.stockPrice);
            sum += item.countToBuy * item.stockPrice;
        }

        let portfolioChanged = true;
        while(portfolioChanged){
            portfolioChanged = false;

            for (var i=0; i<5; i++){
                let item = items[i];
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

    function attachStockInfo(item){
        let minimalEstimation = getMinimalEstimation();
        let stockPrice = getStockPrice();
        let yearRate = getYearRate();

        item.technicalSummary =minimalEstimation;
        item.stockPrice = stockPrice;
        item.dataCollected = true;
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
        let stockPrice = parseFloat($('#last_last').html().replace(",","."));

        return stockPrice;
    }

    function getMinimalEstimation(){ // todo move to separate module
        let hourTechnioalSummary = $('.technicalSummaryTbl > tbody > tr:nth-child(3) > td:nth-child(4)').html();
        let dayTechnioalSummary = $('.technicalSummaryTbl > tbody > tr:nth-child(3) > td:nth-child(5)').html();
        let minimalEstimation = FinamStockRecommendationTypes.getMinimalEstimation([hourTechnioalSummary, dayTechnioalSummary]);

        return minimalEstimation;
    }

    function hasNotLoadedItems(){
        return getNotLoadedItem() != null;
    }

    function getNotLoadedItem(){
        return getStorageData().find(s=> !s.dataCollected);
    }

    function setInitialData(){
        var dataToCollect = FinamFavouriteStocks.getAll().map(s=> {
            s.dataCollected = false;
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