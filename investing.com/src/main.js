function registerInfrastructure(){
	if (!window._investStocks)
        window._investStocks = {};

	require('./ctx');
	debugger;
    var ctx = _investStocks.ctx;

    //import './investing/consts/stockExchange';
    /***include('./investing/consts/stockExchange')***/

	require('./investing/consts/stockExchange');
	debugger;
	var s = ctx.get('InvestingStockExchanges');
}

registerInfrastructure();