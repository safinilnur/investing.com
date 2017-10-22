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
        addStock("MTW", "Manitowoc");
        addStock("KBH", "KB Home");
        addStock("DXC", "DXC Technology");
        addStock("COL", "Rockwell Collins");
        addStock("TER", "Teradyne");
        addStock("OSK", "Oshkosh");
        addStock("TCI", "Transcontinental");
        addStock("AGM", "Federal Agricultural Mortg.");
        addStock("MTD", "Mettler-Toledo");
        addStock("MLP", "Maui Land&Pineapple");
        addStock("GDOT", "Green Dot");

        addStock("AMAT", "Applied Materials");
        addStock("BA", "Boeing");
        addStock("BA", "Boeing");
        addStock("BA", "Boeing");
        addStock("BA", "Boeing");
        addStock("BA", "Boeing");

    }

    function addStock(shortName, name){
        _stocks.push({name, shortName});
    }
    ctor();
}