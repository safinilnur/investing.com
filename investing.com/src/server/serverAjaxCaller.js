_investStocks.ctx.register("ServerAjaxCaller")
    .asProto()
    .asCtor(serverAjaxCaller).dependencies();

function serverAjaxCaller() {
    this.updateSbpStocksMainList = updateSbpStocksMainList;
    this.sendHistoricalDataByDay = sendHistoricalDataByDay;
    this.saveInvestingStocksList = saveInvestingStocksList;
    this.getInvestingStocksList = getInvestingStocksList;

    let baseUrl = 'https://localhost:13001/api/';

    function updateSbpStocksMainList(data){
        post('spbStocks/create', data);
    }

    function sendHistoricalDataByDay(data){
        post('createStocksData', data);
    }

    function saveInvestingStocksList(data){
        post('investingStocks/createInvestingStocks', data);
    }

    function getInvestingStocksList(){
        return get('investingStocks/get');
    }

    function post(url, data){
        debugger;
        return $.ajax({
            url:baseUrl + url,
            type:"POST",
            data:JSON.stringify(data),
            contentType:"application/json; charset=utf-8",
            dataType:"json"
        });
    }

    function get(url, params){
        return $.ajax({
            url:baseUrl + url,
            type:"GET",
            contentType:"application/json; charset=utf-8",
        });
    }
}