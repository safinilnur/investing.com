_investStocks.ctx.register("InvestingStockListRetreiver")
    .asCtor(InvestingStockListRetreiver)
    .dependencies("LocalStorageHelper, ServerAjaxCaller");

function InvestingStockListRetreiver(LocalStorageHelper, ServerAjaxCaller) {
    this.getAllUsaStocks = getAllUsaStocks;
    this.runGetAllUsaStocksTask = runGetAllUsaStocksTask;

    function getAllUsaStocks() {
        if (location.href != "https://ru.investing.com/equities/united-states"){
            throw "use page https://ru.investing.com/equities/united-states to run this script";
        }

        var data = collectStockUrlsataFromPage();

         if (data.length < 1000)
             console.error('Not all usa stocks were chosen');

        ServerAjaxCaller.getInvestingStocksList().then(stocks=>{
            debugger;
            data = data.filter(e=> stocks.find(s=> s.urlId === e.urlId));

            LocalStorageHelper.set("StockBaseInfoToCollect", data);

            runGetAllUsaStocksTask();
        });
    }

    function runGetAllUsaStocksTask() {
        let stocks = LocalStorageHelper.get("StockBaseInfoToCollect");

        let stockToCollect = stocks && stocks.find(e=> !e.dataCollected);

        if (stockToCollect){
            if (location.href.includes(stockToCollect.url)){
                debugger;

                stockToCollect.shortName = getShortName();
                stockToCollect.dataCollected = true;
                stockToCollect.investingStockId = getStockId();

                LocalStorageHelper.set("StockBaseInfoToCollect", stocks);

                runGetAllUsaStocksTask();
            }
            else{
                location.href = "https://ru.investing.com/equities/" + stockToCollect.url;
            }
        } else{
            if (stocks && stocks.length){
                console.log(stocks);
                debugger;

                ServerAjaxCaller.saveInvestingStocksList(prepareStocksForSendingToServer(stocks));

                var jsCode = jsStocksCreator(stocks);
                console.log(jsCode);

                LocalStorageHelper.remove("StockBaseInfoToCollect");
            }
        }
    }

    function prepareStocksForSendingToServer(stocks){
        stocks =  stocks.map(s=>({
            shortName: s.shortName,
            investingStockId: s.investingStockId,
            urlId: s.url,
        }));

        return {stocks: stocks};
    }

    function jsStocksCreator(stocks) {
        var str = "";

        stocks.forEach(s=>{
            s.name=s.name.replace('&amp;','&').replace("'","\'");

            str += "add('"+s.name+"', '"+ s.url +"', '"+s.shortName+"');\n";
        })

        return str;
    }

    function getShortName(){
        return $('[itemprop="tickerSymbol"]').attr('content');
    }
    function getStockId(){
        return parseInt($('[data-pair-id!=""]:[data-pair-id]').attr('data-pair-id'));
    }

    function collectStockUrlsataFromPage(){
        var rows = $('#marketInnerContent table tbody tr');

        var data = [];

        for (var i=0; i< rows.length; i++){
            data.push({
                name: $($(rows[i]).find('td:eq(1) a')).html(),
                url: $($(rows[i]).find('td:eq(1) a')).attr('href').replace('/equities/',''),
            });
        }

        return data;
    }
}