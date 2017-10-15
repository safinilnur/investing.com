function registerInfrastructure(){
	if (!window._investStocks)
        window._investStocks = {};

	require('./ctx');

    var ctx = _investStocks.ctx;

    //import './investing/consts/stockExchange';
    /***include('./investing/consts/stockExchange')***/

	require('./investing/consts/stockExchange');
    require('./brokers/finam/stockList');
    require('./brokers/tinkoff/stockList');
    require('./investing/consts/InvestingStockList');
    require('./brokers/brokersFactory');
    require('./brokers/brokersList');
    require('./investing/pageLoader/loadYearStatistics');

    _investStocks.ctx.get('LoadYearStatistics').load();
}

registerInfrastructure();