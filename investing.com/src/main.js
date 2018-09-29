function registerInfrastructure(){
	if (!window._investStocks)
        window._investStocks = {};

	require('./ctx');

    require('./common/helpers/digitsHelper');
    require('./investing/consts/stockExchange');
    require('./brokers/finam/stockList');
    require('./brokers/tinkoff/stockList');
    require('./investing/consts/InvestingStockList');
    require('./brokers/brokersFactory');
    require('./brokers/brokersList');
    require('./investing/pageLoader/loadYearStatistics');
    require('./helpers/htmlDecoder');
    require('./investing/userData/favouriteStoks');
    require('./common/helpers/dateHelper');
    require('./common/helpers/jsHelper');
    require('./investing/favouriteStocksAnalyzer/storageHelper');
    require('./investing/favouriteStocksAnalyzer/loadingStrategies/mainStockInfoStrategy');
    require('./investing/favouriteStocksAnalyzer/loadingStrategies/historicalStockInfoStrategy');
    require('./investing/favouriteStocksAnalyzer/loadingStrategies/financialSummaryStockInfoStrategy');
    require('./investing/favouriteStocksAnalyzer/favouriteStockReportHtmlHelper');
    require('./investing/favouriteStocksAnalyzer/favouriteStocksAnalyzer');

    require('./investing/consts/stockRecommendations');
    require('../styles/CssStockRecommendations');
    require('./investing/services/InvestingAvailablefunctions');
    require('./spbexchange.ru/getStockList');
    require('./spbexchange.ru/SpbStockList');
    require('./investing/services/InvestingStockListRetreiver');
    require('./common/helpers/localStorageHelper');
    require('./investing/userData/allUsaStocks');
    require('./investing/favouriteStocksAnalyzer/favouriteStockFiltering');
    require('./investing/consts/InvestingConsts');

    _investStocks.ctx.get('FavouriteStocksAnalyzer').loadData();
    _investStocks.ctx.get('InvestingAvailablefunctions').getAll();
    _investStocks.ctx.get('InvestingStockListRetreiver').runGetAllUsaStocksTask();

}

registerInfrastructure();