function registerInfrastructure(){
	if (!window._investStocks)
        window._investStocks = {};

	require('./ctx');

    var ctx = _investStocks.ctx;

	require('./investing/consts/stockExchange');
    require('./brokers/finam/stockList');
    require('./brokers/tinkoff/stockList');
    require('./investing/consts/InvestingStockList');
    require('./brokers/brokersFactory');
    require('./brokers/brokersList');
    require('./investing/pageLoader/loadYearStatistics');
    require('./helpers/htmlDecoder');
    require('./investing/userData/favouriteStoks');
    require('./investing/favouriteStocksAnalyzer/favouriteStocksAnalyzer');
    require('./investing/consts/stockRecommendations');
    require('../styles/CssStockRecommendations');
    require('./investing/services/InvestingAvailablefunctions');
    require('./spbexchange.ru/getStockList');
    require('./spbexchange.ru/SpbStockList');
    require('./investing/services/InvestingStockListRetreiver');
    require('./common/helpers/localStorageHelper');

    //_investStocks.ctx.get('FavouriteStocksAnalyzer').loadData();
    //_investStocks.ctx.get('InvestingAvailablefunctions').getAll();
    _investStocks.ctx.get('InvestingStockListRetreiver').runGetAllUsaStocksTask();

}

registerInfrastructure();