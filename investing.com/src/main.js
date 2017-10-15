function registerInfrastructure(){
	if (!window._investStocks)
        window._investStocks = {};

	require('./ctx');

    var ctx = _investStocks.ctx;

    //import './investing/consts/stockExchange';
    /***include('./investing/consts/stockExchange')***/

	require('./investing/consts/stockExchange');
	require('./investing/pageLoader/loadYearStatistics');
}

registerInfrastructure();