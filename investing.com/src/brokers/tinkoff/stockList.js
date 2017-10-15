_investStocks.ctx.register("TinkoffStockList")
    .asCtor(TinkoffStockList);

function TinkoffStockList(){
    this.getStocks = getStocks;
    this.getByName = getByName;
    this.getByShortName = getByShortName;

    let _stocks = [];

    function getStocks(){
        return _stocks;
    }

    function getByName(name) {
        return _stocks.find(s=> s.name == name);
    }

    function getByShortName(name) {
        return _stocks.find(s=> s.shortName == name);
    }

    function ctor() {
        addStock("BA", "Boeing");
    }

    function addStock(shortName, name){
        _stocks.push({name, shortName});
    }
    ctor();
}