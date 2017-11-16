_investStocks.ctx.register("FinamHistoricalStockInfoLoadingStrategy")
    .asCtor(FinamHistoricalStockInfoLoadingStrategy)
    .dependencies("FinamStockRecommendationTypes, FavouriteStocksAnalyzerStorageHelper");

function FinamHistoricalStockInfoLoadingStrategy(FinamStockRecommendationTypes, FavouriteStocksAnalyzerStorageHelper) {
    this.getStrategy = getStrategy;

    function getStrategy(){
        return  {
            name: "historical",
            getUrl: url => url + "-historical-data",
            loadData: attachHistoricalStockInfo,
            getRate: getRate,
        };
    }

    function getRate(stock) {
        return stock.historicalData.percentTenDaysFall + 1;
    }

    function attachHistoricalStockInfo(item){
        let rows = $('.historicalTbl tbody tr');
        if (rows.length<15)
            throw "Rows count should be more than 15 for historical data. Something went wrong...";

        item.historicalData = {};

        for (let i=0; i<rows.length; i++){
            let row = rows[i];
            item.historicalData[i] = {
                maxPrice: parseFloat($($(row).find('td')[3]).html().replace('.','').replace(',','.'))
            };
        }

        item.historicalData.maxLastTenDaysPrice = item.historicalData[0].maxPrice;
        for (let i=1; i<10; i++){
            if (item.historicalData.maxLastTenDaysPrice < item.historicalData[i].maxPrice)
                item.historicalData.maxLastTenDaysPrice = item.historicalData[i].maxPrice;
        }

        item.historicalData.percentTenDaysFall = item.historicalData.maxLastTenDaysPrice > item.stockPrice
            ? Math.round((item.historicalData.maxLastTenDaysPrice - item.stockPrice)/item.stockPrice*100 * 100)/100
            : 0;

        item.historicalDataCollected = true;
        FavouriteStocksAnalyzerStorageHelper.saveItemInStorage(item);
    }
}