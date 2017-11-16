_investStocks.ctx.register("FinamMainStockInfoLoadingStrategy")
    .asCtor(FinamMainStockInfoLoadingStrategy)
    .dependencies("FinamStockRecommendationTypes, FavouriteStocksAnalyzerStorageHelper");

function FinamMainStockInfoLoadingStrategy(FinamStockRecommendationTypes, FavouriteStocksAnalyzerStorageHelper) {
    this.getStrategy = getStrategy;

    function getStrategy(){
        return {
            name: "main",
            getUrl: url => url,
            loadData: attachMainStockInfo
        };
    }

    function attachMainStockInfo(item){
        item.technicalSummary =getMinimalEstimation();
        item.stockPrice = getStockPrice();
        item.yearRate = getYearRate();

        item.mainDataCollected = true;
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

    function getYearRate(){
        if ($('#leftColumn').find('> div.clear.overviewDataTable > div:nth-child(13) > span.float_lang_base_1').html() == "Изменение за год")
        {
            let rateWithPercent = $('#leftColumn').find('> div.clear.overviewDataTable > div:nth-child(13) > span.float_lang_base_2.bold').html();

            return parseFloat(rateWithPercent.slice(0, -1).replace(/[ ]/g, '').replace(",", "."));
        }
    }
}