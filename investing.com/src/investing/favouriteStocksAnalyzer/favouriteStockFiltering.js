_investStocks.ctx.register("FavouriteStocksFiltering")
    .asCtor(FavouriteStocksFiltering)
    .dependencies("FinamFavouriteStocks, FavouriteStocksAnalyzer, LocalStorageHelper, InvestingConsts");

function FavouriteStocksFiltering(FinamFavouriteStocks, FavouriteStocksAnalyzer, LocalStorageHelper, InvestingConsts) {
    this.createRefreshedFavouriteStockList = createRefreshedFavouriteStockList;

    function createRefreshedFavouriteStockList(){
        var statistics = LocalStorageHelper.get(InvestingConsts.favouriteStocksStatisticsLocalStorageKey);
        var currentFavouriteStocks = FinamFavouriteStocks.getAll();

        if (!statistics || !statistics.length){
            throw "You should run favouriteStocksAnalyzer to collect stocks statistics before fixing favourite stock list";
            return;
        }

        if (statistics.length != currentFavouriteStocks.length){
            throw 'current favourite stock list is not equal to collected statistics';
            return;
        }

        var newFavouriteStocksScript = "";

        statistics.forEach(stockWithStatistics => {
            var currentStock = FinamFavouriteStocks.getByUrl(stockWithStatistics.url);

            if (!currentStock){
                throw 'could not find related stock by url '+stockWithStatistics.url;
                return;
            }

            var stockIsGood = isGoodStock(stockWithStatistics);

            var url = currentStock.url.replace(InvestingConsts.stockBaseUrl, '');
            newFavouriteStocksScript += 'add("'+currentStock.name+'", "'+url+'", '+stockIsGood+');\n';
        })

        console.log(newFavouriteStocksScript);
    }

    function isGoodStock(stockWithStatistics){
        return stockWithStatistics.yearRate > 20;
    }

}