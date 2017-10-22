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
        debugger;
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
                    clearPreviousData(); // comment for debug
                }
            }
        } // else { showStatistics(); } // uncomment for debug
    }

    function showStatistics(){
        let items = getStorageData();

        items = items.sort((a, b) => (b.technicalSummary - a.technicalSummary));

        debugger;
        splitPorfolioByFiveStocks(items);

        let itemsHtml = items.map(i => {
            return "<tr>" +
                "<td>" + i.name + "</td>" +
                "<td>" + FinamStockRecommendationTypes.convertRecommendationToString(i.technicalSummary) + "</td>" +
                "<td>"+i.stockPrice+"</td>"+
                "<td>"+(i.countToBuy||"")+"</td>"+
                "</tr>"
        });
        let resultHtml = "<div class='stock-recommedations'><table>" +
            "<tr><th>Название</th><th>Тех. рекомендация</th><th>Цена</th><th>Позиция</th></tr>" +
            itemsHtml+
            "<tr><td colspan='4'>Расчет по портфелю: "+FinamFavouriteStocks.portfolioVolume+"$</td></td></tr>"+
            "<tr><td colspan='4'>Остаток средств: "+parseInt(getAvailabeDollarsAmount(items))+"$</td></td></tr>"+
            "</table></div>";
        $('body').html(resultHtml);

        CssStockRecommendations.appendStyle();
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
        let hourTechnioalSummary = $('.technicalSummaryTbl > tbody > tr:nth-child(3) > td:nth-child(4)').html();
        let dayTechnioalSummary = $('.technicalSummaryTbl > tbody > tr:nth-child(3) > td:nth-child(5)').html();
        let minimalEstimation = FinamStockRecommendationTypes.getMinimalEstimation([hourTechnioalSummary, dayTechnioalSummary]);

        let stockPrice = parseFloat($('#last_last').html().replace(",","."));

        item.technicalSummary =minimalEstimation;
        item.stockPrice = stockPrice;
        item.dataCollected = true;
        saveItemInStorage(item);
    }

    function hasNotLoadedItems(){
        return getNotLoadedItem() != null;
    }

    function getNotLoadedItem(){
        return getStorageData().find(s=> !s.dataCollected);
    }

    function setInitialData(){
        var dataToCollect = FinamFavouriteStocks.getAll().map(s=> ({
            name: s.name,
            url: s.url,
            dataCollected: false
        }));

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