_investStocks.ctx.register("FinamFavouriteStocks")
    .asCtor(FinamFavouriteStocks);

function FinamFavouriteStocks(){
    this.getAll = getAll;
    this.portfolioVolume = 4020; // amount of dollars to split between recommended stocks

    let _stocks;
    let urlBase;

    function getAll(){
        return _stocks;
    }

    function ctor(){
        urlBase = "https://ru.investing.com/equities/";
        _stocks = [];

        add("NVIDIA", "nvidia-corp");
        add("Netflix", "netflix,-inc.");
        add("boeing", "boeing-co");
        add("Alibaba", "alibaba");
        add("AMD", "adv-micro-device");
        add("Micron", "micron-tech");
        add("Applied materials", "applied-matls-inc");
        add("DXC Technology", "comp-science");
        add("Transcontinental", "transcontinental-realty-investors");
        add("Nutrisystems", "nutrisystems");
        add("Extreme-networks", "extreme-networks");
    }

    function add(name, url) {
        _stocks.push({name, url: urlBase + url});
    }

    ctor();
}