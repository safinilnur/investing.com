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

        add("NVIDIA", "nvidia-corp", true);
        add("Netflix", "netflix,-inc.", true);
        add("boeing", "boeing-co", true);
        add("Alibaba", "alibaba", true);
        add("AMD", "adv-micro-device", true);
        add("Micron", "micron-tech", true);
        add("Applied materials", "applied-matls-inc", true);
        add("DXC Technology", "comp-science", false);
        add("Transcontinental", "transcontinental-realty-investors", false);
        add("Nutrisystems", "nutrisystems", false);
        add("Extreme-networks", "extreme-networks", false);
        add("Tesla", "tesla-motors", true);
        add("paypal", "paypal-holdings-inc", true);
        add("google", "google-inc", true);
        add("apple", "apple-computer-inc", true);
        add("autodesk", "autodesk-inc", true);
        add("microsoft", "microsoft-corp", true);
        add("adobe", "adobe-sys-inc", true);
        add("facebook", "facebook-inc", true);
        add("visa", "visa-inc", true);
        add("activision", "activision-inc", true);
        add("salesforce", "salesforce-com", true);
        add("amazon", "amazon-com-inc", true);

        add("jp-morgan", "jp-morgan-chase", true);
        add("momo", "momo-inc", true);
        add("transocea", "transocea-ltd", true);
        add("celgene", "celgene-corp", true);
    }

    function add(name, url, isInFinam) {
        if (isInFinam){
            var id= url.replace(/[.,]/g, "");
            _stocks.push({name, url: urlBase + url, id: id});
        }
    }

    ctor();
}