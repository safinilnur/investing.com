_investStocks.ctx.register("InvestingStockList")
    .asCtor(InvestingStockList);

function InvestingStockList(){
    this.getStocks = getStocks;
    this.getByName = getByName;
    this.getByShortName = getByShortName;
    this.stockExistsByName = stockExistsByName;

    let _stocks = [];

    function getStocks(){
        return _stocks;
    }

    function stockExistsByName(name){
        return !!this.getByShortName(name);
    }

    function getByShortName(name) {
        return _stocks.find(s=> s.shortName == name);
    }

    function getByName(name) {
        return _stocks.find(s=> s.name == name);
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
    }

    function addStock(shortName, name){
        _stocks.push({name, shortName});
    }
    ctor();
}