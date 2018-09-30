_investStocks.ctx.register("InvestingStocksMainInfoUpdater")
    .asProto()
    .asCtor(InvestingStocksMainInfoUpdater).dependencies("LocalStorageHelper, InvestingConsts, DigitsHelper");

function InvestingStocksMainInfoUpdater(LocalStorageHelper, InvestingConsts, DigitsHelper) {
    this.update = update;

    var statistics = null;

    function update() {
        statistics = LocalStorageHelper.get(InvestingConsts.favouriteStocksStatisticsLocalStorageKey);

        var data = statistics.map(stock =>{
            return {
                shortName: stock.shortName,
                urlId: stock.id,
                investingStockId: stock.investingStockId,
                name: stock.name,
                reportDate: stock.reportDate,
            }
        });

       debugger;

        return Promise.resolve();
        //return $.post('http://localhost/investing/save', {stocks: data});
    }


}