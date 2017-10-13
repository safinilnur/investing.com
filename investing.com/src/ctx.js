if (!window._investStocks.ctx) {
	require('di')(window._investStocks);
}

module.exports = _investStocks.ctx;