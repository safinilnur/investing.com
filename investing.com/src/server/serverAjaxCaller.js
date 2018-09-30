_investStocks.ctx.register("ServerAjaxCaller")
    .asProto()
    .asCtor(serverAjaxCaller).dependencies();

function serverAjaxCaller() {
    this.updateSbpStocksMainList = updateSbpStocksMainList;

    let baseUrl = 'http://localhost:12345/';

    function updateSbpStocksMainList(data){
        sendData('saveSpbStocks', {spbStocks: data});
    }

    function sendData(url, data){
        $.post(baseUrl + url, data)
            .then(()=>{console.log('successfully sent POST request '+ url)});
    }
}