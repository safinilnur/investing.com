let InvestingConsts = {
    favouriteStocksStatisticsLocalStorageKey: "favouriteStocksAnalitycs",
    stockBaseUrl: "https://ru.investing.com/equities/",
}

_investStocks.ctx.register("InvestingConsts")
    .asInstance(InvestingConsts);

