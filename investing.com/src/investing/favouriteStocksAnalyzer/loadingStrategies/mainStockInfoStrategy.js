_investStocks.ctx.register("FinamMainStockInfoLoadingStrategy")
    .asCtor(FinamMainStockInfoLoadingStrategy)
    .dependencies("FinamStockRecommendationTypes, FavouriteStocksAnalyzerStorageHelper");

function FinamMainStockInfoLoadingStrategy(FinamStockRecommendationTypes, FavouriteStocksAnalyzerStorageHelper) {
    this.getStrategy = getStrategy;

    let allStocksStatistics = {};

    function getStrategy(){
        return {
            name: "main",
            getUrl: url => url,
            loadData: attachMainStockInfo,
            getRate: getRate,
            combineAllStocksStatistics: combineAllStocksStatistics,
        };
    }

    function getRate(stock) {
        let rate = (stock.yearRate - allStocksStatistics.minYearRate)/allStocksStatistics.rangeYearRate;
        return rate + 1;
    }

    function combineAllStocksStatistics() {
        let stocks = FavouriteStocksAnalyzerStorageHelper.getStorageData();

        allStocksStatistics = {
            minYearRate: getMinMaxValue(stocks, "min","yearRate"),
            maxYearRate: getMinMaxValue(stocks, "max","yearRate"),
        };
        allStocksStatistics.rangeYearRate = allStocksStatistics.maxYearRate - allStocksStatistics.minYearRate;
    }

    function getMinMaxValue(stocks, minOrMax, property){
        let values = stocks.map(stock => stock[property]);
        return minOrMax == "min"
            ? Math.min(...values)
            : Math.max(...values);
    }

    function attachMainStockInfo(item){
        item.technicalSummary =getMinimalEstimation();
        item.stockPrice = getStockPrice();
        item.yearRate = getYearRate();
        item.reportDate = getReportDate();

        item.mainDataCollected = true;
        item.mainTimeUpdated = new Date().getTime();
        FavouriteStocksAnalyzerStorageHelper.saveItemInStorage(item);
    }

    function getMinimalEstimation(){ // todo move to separate module
        let hourTechnioalSummary = $('.technicalSummaryTbl > tbody > tr:nth-child(3) > td:nth-child(4)').html();
        let dayTechnioalSummary = $('.technicalSummaryTbl > tbody > tr:nth-child(3) > td:nth-child(5)').html();

        return FinamStockRecommendationTypes.getMinimalEstimation([hourTechnioalSummary, dayTechnioalSummary]);
    }

    function getStockPrice(){
        return parseFloat($('#last_last').html().replace(".", "").replace(",", "."));
    }

    function getReportDate(){
        return $('#leftColumn > div.clear.overviewDataTable > div:nth-child(15) > span.float_lang_base_2.bold > a').html();
    }

    function getYearRate(){
        if ($('#leftColumn').find('> div.clear.overviewDataTable > div:nth-child(13) > span.float_lang_base_1').html() == "Изменение за год")
        {
            let rateWithPercent = $('#leftColumn').find('> div.clear.overviewDataTable > div:nth-child(13) > span.float_lang_base_2.bold').html();

            return parseFloat(rateWithPercent.slice(0, -1).replace(/[ ]/g, '').replace(",", "."));
        }
    }
}