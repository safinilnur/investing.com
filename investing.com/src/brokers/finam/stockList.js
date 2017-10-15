_investStocks.ctx.register("FinamStockList")
    .asCtor(FinamStockList);

function FinamStockList(){
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