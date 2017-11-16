_investStocks.ctx.register("FinancialSummaryStockInfoLoadingStrategy")
    .asCtor(FinancialSummaryStockInfoLoadingStrategy)
    .dependencies("FavouriteStocksAnalyzerStorageHelper, DigitsHelper");

function FinancialSummaryStockInfoLoadingStrategy(FavouriteStocksAnalyzerStorageHelper, DigitsHelper) {
    this.getStrategy = getStrategy;

    let allStocksStatistics = {};

    function getStrategy(){
        return {
            name: "financialSummary",
            getUrl: url => url+"-financial-summary",
            loadData: attachFinancialSummaryStockInfo,
            getRate: getRate,
            combineAllStocksStatistics: combineAllStocksStatistics,
        };
    }

    function getRate(stock) {
        let weights = [
            {property: "GrossProfit", weight: 1},
            {property: "OperatingMargin", weight: 1.5},
            {property: "ProfitabilityRatios", weight: 1},
            {property: "ReturnOnInvestment", weight: 1.3},
            ];

        let result = 0;

        weights.forEach(weight=>{
            result += getMappedCoefficientFrom1To2(stock, weight.property) * weight.weight;
        });

        let weightsValues = weights.map(w=>w.weight);
        let sumWeights = weightsValues.reduce((a, b) => a + b, 0);
        result = result / sumWeights;

        return result;
    }

    function attachFinancialSummaryStockInfo(item){

        item.financialSummary = {
            GrossProfit: getGrossProfit(),
            OperatingMargin: getOperatingMargin(),
            ProfitabilityRatios: getProfitabilityRatios(),
            ReturnOnInvestment: getReturnOnInvestment(),
        };

        item.financialSummaryDataCollected = true;
        FavouriteStocksAnalyzerStorageHelper.saveItemInStorage(item);
    }

    function getMappedCoefficientFrom1To2(stock, property){
        let range = allStocksStatistics["max"+property]-allStocksStatistics["min"+property];
        let valueInRange = stock.financialSummary[property] - allStocksStatistics["min"+property];
        let rate = valueInRange / range;
        return rate + 1;
    }

    function combineAllStocksStatistics() {
        let stocks = FavouriteStocksAnalyzerStorageHelper.getStorageData();

        allStocksStatistics = {
            minGrossProfit: getMinMaxValue(stocks, "min","GrossProfit"),
            maxGrossProfit: getMinMaxValue(stocks, "max","GrossProfit"),
            minOperatingMargin: getMinMaxValue(stocks, "min","OperatingMargin"),
            maxOperatingMargin: getMinMaxValue(stocks, "max","OperatingMargin"),
            minProfitabilityRatios: getMinMaxValue(stocks, "min","ProfitabilityRatios"),
            maxProfitabilityRatios: getMinMaxValue(stocks, "max","ProfitabilityRatios"),
            minReturnOnInvestment: getMinMaxValue(stocks, "min","ReturnOnInvestment"),
            maxReturnOnInvestment: getMinMaxValue(stocks, "max","ReturnOnInvestment"),
        }
    }

    function getMinMaxValue(stocks, minOrMax, property){
        let values = stocks.map(stock => stock.financialSummary[property]);
        return minOrMax == "min"
            ? Math.min(...values)
            : Math.max(...values);
    }

    function getGrossProfit(){
        let strVal = $('#rsdiv').find('> div:nth-child(1) > div.info.float_lang_base_2 > div:nth-child(1) > span.float_lang_base_2.text_align_lang_base_2.dirLtr.bold').html();
        return DigitsHelper.toFloat(strVal);
    }

    function getOperatingMargin(){
        let strVal = $('#rsdiv').find('> div:nth-child(1) > div.info.float_lang_base_2 > div:nth-child(2) > span.float_lang_base_2.text_align_lang_base_2.dirLtr.bold').html();
        return DigitsHelper.toFloat(strVal);
    }

    function getProfitabilityRatios(){
        let strVal = $('#rsdiv').find('> div:nth-child(1) > div.info.float_lang_base_2 > div:nth-child(3) > span.float_lang_base_2.text_align_lang_base_2.dirLtr.bold').html();
        return DigitsHelper.toFloat(strVal);
    }

    function getReturnOnInvestment(){
        let strVal = $('#rsdiv').find('> div:nth-child(1) > div.info.float_lang_base_2 > div:nth-child(4) > span.float_lang_base_2.text_align_lang_base_2.dirLtr.bold').html();
        return DigitsHelper.toFloat(strVal);
    }
}