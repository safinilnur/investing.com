_investStocks.ctx.register("spbStocksMainInfoUpdater")
    .asProto()
    .asCtor(spbStocksMainInfoUpdater).dependencies("GetSpbStockList, ServerAjaxCaller");

function spbStocksMainInfoUpdater(GetSpbStockList, ServerAjaxCaller) {
    this.update = update;

    function update(){
        GetSpbStockList.getAllStocks(sendDataToServer);
    };

    function sendDataToServer(data){
        debugger;
        ServerAjaxCaller.updateSbpStocksMainList(data);
    }
}