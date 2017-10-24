_investStocks.ctx.register("InvestingAvailablefunctions")
    .asCtor(InvestingAvailablefunctions);

function InvestingAvailablefunctions() {
    this.getAll = getAll;

    function getAll(){
        console.log( `
1) Sort your favourite list of stocks by technical recommendations. Run:
_investStocks.ctx.get('FavouriteStocksAnalyzer').run();

2) Get filtered USA stocks (filter by day, mont, year gain). 
Go to page Page: https://ru.investing.com/equities/united-states and run:
_investStocks.ctx.get('LoadYearStatistics').load();     
        `);
    }

}