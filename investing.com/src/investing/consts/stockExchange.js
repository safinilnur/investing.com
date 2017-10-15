_investStocks.ctx.register("InvestingStockExchanges")
    .asCtor(InvestingStockExchanges)

function InvestingStockExchanges(){
    this.stockList = {
        NYSE_AMEX_COMPOSITE: "NYSE Composite",
        NASDAQ_COMPOSITE: "NASDAQ Composite"
    };
}

