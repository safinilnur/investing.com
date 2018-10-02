_investStocks.ctx.register("TinkoffStockList")
    .asCtor(TinkoffStockList);

function TinkoffStockList() {
    this.collectStocks = collectStocks;


    function collectStocks() {
        // https://www.tinkoff.ru/invest/stocks/?country=Foreign

        clickBtn(allStocksLoadedCallback);


    }

    function clickBtn(allStocksLoadedCallback) {
        var btnSelector = 'body > div.application > div > div > div.PlatformLayout__layoutPage_WoIKN > div.PortalContainer__container_lyBzt > div.UILayoutPage__page_19-Kp > div:nth-child(2) > div.PlatformLayout__layoutPageComponent_3W4dc > div > div.ui-trading-stocks.ui-trading-stocks_row > div:nth-child(2) > div:nth-child(2) > a > span.ui-button__text';
        if ($(btnSelector).length){
            $(btnSelector).trigger('click');
            setTimeout(clickBtn, 1000);
        }
        else{
            allStocksLoadedCallback();
        }
    }

    function allStocksLoadedCallback(){
        window.stockTickers = {};

        var stockHrefs = $('[href*="/invest/stocks/"]');
        for (var i=0; i< stockHrefs.length; i++){
            var ticker = $(stockHrefs[i]).attr('href');
            if (ticker.startsWith('/invest/stocks/' ) && ticker.endsWith('/'))
            {
                ticker = ticker.replace('/invest/stocks/', '').replace('/','');

                stockTickers[ticker] = true;
            }
        }

        var tickersArray = Object.keys(stockTickers);

        // To be continued ...
    }
}