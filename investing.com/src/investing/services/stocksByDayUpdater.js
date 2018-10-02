_investStocks.ctx.register("StocksByDayUpdater")
    .asProto()
    .asCtor(StocksByDayUpdater).dependencies("LocalStorageHelper, InvestingConsts, DigitsHelper, ServerAjaxCaller");

function StocksByDayUpdater(LocalStorageHelper, InvestingConsts, DigitsHelper, ServerAjaxCaller) {
    this.update = update;

    var statistics = null;

    function update() {
        statistics = LocalStorageHelper.get(InvestingConsts.favouriteStocksStatisticsLocalStorageKey);

        if (statistics.filter(e => !e.investingStockId).length) {
            console.log('Stocks without id: ', statistics.filter(e => !e.investingStockId));
            throw new Error('Not all stocks contain investingStockId property!');
        }

        if (statistics.filter(e => !e.shortName).length) {
            console.log('Stocks without shortName: ', statistics.filter(e => !e.shortName));
            throw new Error('Not all stocks contain shortName property!');
        }

        getMainPromiseForSavingStockData(0);
    }

    function getMainPromiseForSavingStockData(index) {
        if (index === statistics.length) {
            return Promise.resolve();
        }

        return getStockInfo(statistics[index])
            .then(saveStockInfoToServer)
            .then(() => getMainPromiseForSavingStockData(index + 1));
    }

    function getStockInfo(stock) {
        return Promise.resolve().then(function () {
            const jQueryRequest = $.post('https://ru.investing.com/instruments/HistoricalDataAjax', {
                "curr_id": stock.investingStockId,
                "st_date": '01/01/2010',
                "end_date": '01/01/2030',
                "interval_sec": 'Daily',
                "action": 'historical_data'
            });

            return Promise.resolve().then(() => jQueryRequest)
                .then((htmlData) => parseStockHtml(stock, htmlData));
        });
    }

    function parseStockHtml(stock, htmlData) {
        const resultDataArray = [];
        const trs = $(htmlData).find('.historicalTbl tbody tr');

        for (let i = 0; i < trs.length; i++) {
            const tr = $(trs[i]);

            const dataToParse = {
                shortName: stock.shortName,
                date: tr.find('td:eq(0)').text(),
                priceClosed: getPrice(tr.find('td:eq(1)')),
                priceOpened: getPrice(tr.find('td:eq(2)')),
                priceMax: getPrice(tr.find('td:eq(3)')),
                priceMin: getPrice(tr.find('td:eq(4)')),
                volume: getVolume(tr.find('td:eq(5)').text())
            };

            resultDataArray.push(dataToParse);
        }

        console.log(`got stock info for index=${statistics.indexOf(stock)} NAME=${stock.shortName}`);
        return Promise.resolve(resultDataArray);
    }

    function getPrice(td){
        var priceString = td.text();
        priceString = priceString.replace('.','').replace(',','.');

        return DigitsHelper.toFloat(priceString);
    }

    function getVolume(textValue) {
        if (textValue.includes('M')) {
            return DigitsHelper.toFloat(textValue.replace('M', '')) * 1000000;
        } else if (textValue.includes('K')) {
            return DigitsHelper.toFloat(textValue.replace('K', '')) * 1000;
        } else if (textValue === '-') {
            return 0;
        } else {
            throw new Error(`Couldn't parse volume: ${textValue}`);
        }
    }

    function saveStockInfoToServer(stockData) {
        debugger;
        splitArrayToChunks(stockData,100).map(chunk=>{
            return ServerAjaxCaller.sendHistoricalDataByDay({stocks: chunk});
        });

    }

    function splitArrayToChunks(array, chunkSize){
        return [].concat.apply([],
            array.map(function(elem,i) {
                return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
            })
        );
    }
}