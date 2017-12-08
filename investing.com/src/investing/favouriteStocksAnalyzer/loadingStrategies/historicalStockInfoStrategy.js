_investStocks.ctx.register("FinamHistoricalStockInfoLoadingStrategy")
    .asCtor(FinamHistoricalStockInfoLoadingStrategy)
    .dependencies("FinamStockRecommendationTypes, FavouriteStocksAnalyzerStorageHelper");

function FinamHistoricalStockInfoLoadingStrategy(FinamStockRecommendationTypes, FavouriteStocksAnalyzerStorageHelper) {
    this.getStrategy = getStrategy;

    let allStocksStatistics = {};

    function getStrategy(){
        return  {
            name: "historical",
            getUrl: url => url + "-historical-data",
            loadData: attachHistoricalStockInfo,
            getRate: getRate,
            combineAllStocksStatistics: combineAllStocksStatistics,
        };
    }

    function getRate(stock) {
        let rate = (stock.historicalData.percentTenDaysFall - allStocksStatistics.minPercentTenDaysFall)/allStocksStatistics.rangePercentTenDaysFall;
        return rate + 1;
    }

    function combineAllStocksStatistics() {
        let stocks = FavouriteStocksAnalyzerStorageHelper.getStorageData();

        allStocksStatistics = {
            minPercentTenDaysFall: getMinMaxValue(stocks, "min","percentTenDaysFall"),
            maxPercentTenDaysFall: getMinMaxValue(stocks, "max","percentTenDaysFall"),
        };
        allStocksStatistics.rangePercentTenDaysFall = allStocksStatistics.maxPercentTenDaysFall - allStocksStatistics.minPercentTenDaysFall;
    }

    function getMinMaxValue(stocks, minOrMax, property){
        let values = stocks.map(stock => stock.historicalData[property]);
        return minOrMax == "min"
            ? Math.min(...values)
            : Math.max(...values);
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
        item.historicalTimeUpdated = new Date().getTime();
        FavouriteStocksAnalyzerStorageHelper.saveItemInStorage(item);
    }
}