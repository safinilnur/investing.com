_investStocks.ctx.register("InvestingAvailablefunctions")
    .asCtor(InvestingAvailablefunctions);

function InvestingAvailablefunctions() {
    this.getAll = getAll;

    function getAll(){
        console.log( `
1) Sort your favourite list of stocks by technical recommendations. Run:
_investStocks.ctx.get('FavouriteStocksAnalyzer').run(true);

2) Get filtered USA stocks (filter by day, mont, year gain). 
Go to page Page: https://ru.investing.com/equities/united-states and run:
_investStocks.ctx.get('LoadYearStatistics').load();  

3) Get all stocks from spb exchange 
Go to page Page: http://www.spbexchange.ru/ru/stocks/inostrannye/Instruments.aspx and run:
_investStocks.ctx.get('GetSpbStockList').getAllStocks(); 

4) get all usa stock list
Go to page https://ru.investing.com/equities/united-states and run 
_investStocks.ctx.get('InvestingStockListRetreiver').getAllUsaStocks(); 

5) get cahnges on favourite stock list
run
_investStocks.ctx.get('FinamFavouriteStocks').getChangesForStockList();

6) to get new favourite stock list
build statistics for all your favourite stocks
run
_investStocks.ctx.get('FavouriteStocksFiltering').createRefreshedFavouriteStockList();
        `);
    }

}