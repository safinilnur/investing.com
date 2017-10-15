_investStocks.ctx.register("BrokersList")
    .asCtor(BrokersList);

function BrokersList(){
    return [
        {
            name: "Finam",
            stockList: "FinamStockList"
        },
        {
            name: "Tinkoff",
            stockList: "TinkoffStockList"
        }
    ];
}