_investStocks.ctx.register("FinamFavouriteStocks")
    .asCtor(FinamFavouriteStocks)
    .dependencies('SpbStockList, AllUsaStocks');

function FinamFavouriteStocks(SpbStockList, AllUsaStocks) {
    this.getAll = getAll;
    this.portfolioVolume = 4020; // amount of dollars to split between recommended stocks
    this.getChangesForStockList = getChangesForStockList;
    this.getByUrl = getByUrl;

    let _stocks;
    let urlBase;

    function getAll(isPositiveStock) {
        return isPositiveStock == undefined
            ? _stocks
            : _stocks.filter(e => e.isPositiveStock == isPositiveStock)
    }

    function getByUrl(url){
        var fullUrl = urlBase + url;
        return _stocks.find(e=> e.url == url || e.url == fullUrl);
    }

    function ctor() {
        urlBase = "https://ru.investing.com/equities/";
        _stocks = [];

        add("Dentsply", "dentsply-intl-inc-new", false);
        add("Aetna", "aetna-inc", true);
        add("activision", "activision-inc", true);
        add("Expeditors Washington", "expeditors-intl-wash-inc", false);
        add("Broadcom", "avago-technologies", true);
        add("Micron", "micron-tech", true);
        add("Newfield Exploration", "newfield-exploration-co.", false);
        add("Stryker", "stryker", true);
        add("KLA-Tencor", "kla-tencor-corp", true);
        add("Seagate Technology", "seagate-technology", false);
        add("National Oilwell Varco", "ntl-oilwell-varc", false);
        add("Murphy Oil", "murphy-oil-corp", false);
        add("Motorola", "motorola-inc", false);
        add("Anadarko Petroleum", "anadarko-petro", false);
        add("autodesk", "autodesk-inc", true);
        add("Southwestern Energy", "southwestern-energy-company", false);
        add("Pioneer Natural Resources", "pioneer-natural-resources", false);
        add("Halliburton", "halliburton-co", false);
        add("FMC", "fmc-corp", true);
        add("Mosaic", "mosaic-company", false);
        add("The Travelers", "the-travelers-co", true);
        add("Stanley Black Decker", "stanley-works", true);
        add("Robert Half", "robert-half-intl", true);
        add("Prudential Financial", "prudential-fin", true);
        add("transocea", "transocea-ltd", false);
        add("Garmin Ltd", "garmin-ltd", true);
        add("Estee Lauder", "estee-lauder", true);
        add("ConocoPhillips", "conoco-phillips", true);
        add("Oracle", "oracle-corp", true);
        add("Avery Dennison", "avery-dennison", true);
        add("Mastercard", "mastercard-cl-a", true);
        add("Allstate", "allstate-corporation", true);
        add("First Solar", "first-solar-inc", true);
        add("Air Products", "air-prods---chem", false);
        add("Raytheon", "raytheon-co", true);
        add("EQT", "eqt-corporation", false);
        add("Waste Management", "waste-managemnt", true);
        add("Dollar Tree", "dollar-tree-inc", true);
        add("Baxter", "baxter-intl", true);
        add("Helmerich&Payne", "helmerich---payne", false);
        add("WW Grainger", "w-w-grainger-inc", false);
        add("Monster Beverage 1990", "monster-beverage", true);
        add("Constellation Brands", "constellation-a", true);
        add("Analog Devices", "analog-devices", true);
        add("Roper Technologies", "roper-industries", true);
        add("Northrop Grumman", "northrop-grumman", true);
        add("Schlumberger", "schlumberger-ltd", false);
        add("CH Robinson", "c-h-robinson-worldwide-inc", false);
        add("Intuit", "intuit", true);
        add("Progressive", "the-progressive", true);
        add("paypal", "paypal-holdings-inc", true);
        add("boeing", "boeing-co", true);
        add("Texas Instruments", "texas-instru", true);
        add("Sealed Air", "sealed-air", false);
        add("Equinix", "equinix,-inc.", true);
        add("CBRE", "cbre", true);
        add("Yum! Brands", "yum!-brands-inc", true);
        add("Eversource Energy", "northeast-utilities", false);
        add("Hologic", "hologic-inc", false);
        add("Freeport-McMoran", "freeport-mcm", true);
        add("Honeywell", "honeywell-intl", true);
        add("Dover", "dover-corp", true);
        add("Boston Properties", "boston-ppty", false);
        add("DR Horton", "d.r.-horton-inc", true);
        add("ProLogis", "prologis", true);
        add("Red Hat", "red-hat-inc", true);
        add("google", "google-inc", true);
        add("Lennar", "lennar", true);
        add("NetApp", "network-appliance-inc", true);
        add("Corning", "corning-inc", true);
        add("Align", "align-technology", true);
        add("Sempra Energy", "sempra-energy", false);
        add("Marathon Petroleum", "marathon-petroleum-corp.", true);
        add("Amphenol", "amphenol-corp", true);
        add("visa", "visa-inc", true);
        add("salesforce", "salesforce-com", true);
        add("Starbucks", "starbucks-corp", false);
        add("PulteGroup", "pulte-homes-inc", true);
        add("AvalonBay", "avalonbay-comm", false);
        add("Consolidated Edison", "cocnsol-edison", false);
        add("Danaher", "danaher-corp", false);
        add("Hormel Foods", "hormel-foods-corp", false);
        add("Qualcomm", "qualcomm-inc", false);
        add("Kroger", "kroger-co", false);
        add("VeriSign", "verisign-inc", true);
        add("Textron", "textron-inc", true);
        add("CMS Energy", "cms-energy-corp", false);
        add("Wal-Mart Stores", "wal-mart-stores", true);
        add("Apartment Invest", "apt-inv-manage", false);
        add("Varian", "varian-medical", false);
        add("Weyerhaeuser", "weyerhaeuser", true);
        add("Tyson Foods", "tyson-foods", false);
        add("amazon", "amazon-com-inc", true);
        add("Praxair", "praxair-inc", true);
        add("Host Hotels Resorts", "host-hotels---res", true);
        add("Lam Research Corp", "lam-research-corp", true);
        add("Intuitive Surgical", "intuitive-surgical-inc", true);
        add("Costco", "costco-whsl-corp-new", false);
        add("Lockheed Martin", "lockheed-martin", true);
        add("apple", "apple-computer-inc", true);
        add("Xcel Energy", "xcel-energy", true);
        add("Accenture", "accenture-ltd", false);
        add("Fastenal", "fastenal-co", false);
        add("adobe", "adobe-sys-inc", true);
        add("Teradata", "teradata", true);
        add("F5 Networks", "f5-networks-inc", false);
        add("Eastman Chemical", "eastman-chem", true);
        add("Cabot Oil&Gas", "cabot-oil---gas", true);
        add("S&P Global", "mcgraw-hill", true);
        add("Baker Hughes A", "baker-hughes", false);
        add("O'Reilly", "oreilly-automotive", false);
        add("Hess", "hess-corp", false);
        add("TechnipFMC", "fmc-technologies-inc", false);
        add("VF", "vf-corp", true);
        add("Best Buy", "best-buy", true);
        add("Moodys", "moodys-corp", true);
        add("Fox Inc", "fox-inc", false);
        add("Kimco", "kimco-realty", false);
        add("DXC Technology", "comp-science", true);
        add("Walt Disney", "disney", false);
        add("Anthem Inc", "wellpoint-inc", true);
        add("facebook", "facebook-inc", true);
        add("Union Pacific", "union-pacific", true);
        add("J&J", "johnson-johnson", false);
        add("American Tower", "amer-tower-corp", true);
        add("Welltower Inc", "health-care-reit", false);
        add("Wynn Resorts", "wynn-resorts-ltd", true);
        add("NextEra Energy", "nextera-energy-inc", true);
        add("China Biologic", "china-biologic-products", false);
        add("Valero Energy", "valero-energy", true);
        add("Fiserv", "fiserv-inc", true);
        add("Citrix Systems", "citrix-sys-inc", false);
        add("ConAgra Foods", "conagra-foods", false);
        add("Kraft Heinz", "kraft-foods-inc", false);
        add("Public Service Enterprise", "publ-svc-enter", false);
        add("Clorox", "clorox-co", false);
        add("Iron Mountain", "iron-mountain-inc", true);
        add("Harris", "harris-corporation", true);
        add("Colgate-Palmolive", "colgate-palmo", false);
        add("Edison", "edison-intl", false);
        add("Public Storage", "public-stg-mld", false);
        add("PepsiCo", "pepsico", false);
        add("Ventas", "ventas-inc", false);
        add("Sohucom", "sohu-com-inc", true);
        add("Mylan", "mylan-inc", false);
        add("Chesapeake Energy", "chesapeake-ener", false);
        add("ADP", "auto-data-process", true);
        add("Electronic Arts", "electronic-arts-inc", true);
        add("Western Union", "western-union", false);
        add("Apache", "apache-corp", false);
        add("Eaton", "eaton", true);
        add("CF Industries", "cf-industries", true);
        add("Darden Restaurants", "dardem-rest", true);
        add("Range Resources", "range-resources-corp", false);
        add("Thermo Fisher Scientific", "thermo-fisher-sc", true);
        add("CBS", "cbs-corp-cl-b", false);
        add("Devon Energy", "devon-energy", false);
        add("Laboratory of America", "laboratory-corp-of-amer", true);
        add("Nike", "nike", false);
        add("Comcast", "comcast-corp-new", false);
        add("Goldman Sachs", "goldman-sachs-group", true);
        add("Cognizant", "cognizant-technology-solutio", true);
        add("News Corp A", "news-corp.", false);
        add("Parker-Hannifin", "parkerhannifin", true);
        add("Total System Services", "total-sys-svcs", true);
        add("News Corp", "news-corporation", false);
        add("AutoZone", "autozone-inc", false);
        add("HCP", "hcp-inc", false);
        add("ANSYS", "ansys", true);
        add("Chevron", "chevron", false);
        add("Fluor", "fluor-corp", false);
        add("HP Inc", "hewlett-pack", true);
        add("FLIR Systems", "flir-systems", true);
        add("Home Depot", "home-depot", true);
        add("Campbell Soup", "campbell-soup", false);
        add("Altria", "altria-group", false);
        add("PerkinElmer", "perkinelmer", true);
        add("Principal", "principal-fin", true);
        add("NRG", "nrg-energy-inc", true);
        add("L3 Tech", "l3-comms-hldgs", true);
        add("Walgreens Boots Alliance", "walgreen-co", false);
        add("Xilinx", "xilinx-inc", true);
        add("Aflac", "aflac-inc", true);
        add("Kellogg", "kellogg-co.", false);
        add("NVIDIA", "nvidia-corp", true);
        add("Cintas", "cintas-corp", true);
        add("Becton Dickinson", "becton-dickinsn", true);
        add("Akamai", "akamai-technologies-inc", false);
        add("Marsh&McLennan", "marsh---mclennan", true);
        add("Altaba", "yahoo-inc", true);
        add("Intel", "intel-corp", true);
        add("Unum", "unum-group", true);
        add("Wyndham", "wyndham-world", true);
        add("Vornado", "vornado-realty", false);
        add("Coca-Cola", "coca-cola-co", false);
        add("Torchmark", "torchmark-corp", true);
        add("Leucadia National", "leucadia-natl", true);
        add("Eli Lilly", "eli-lilly-and-co", false);
        add("Exxon Mobil", "exxon-mobil", false);
        add("Kimberly-Clark", "kimberly-clark", false);
        add("Caterpillar", "caterpillar", true);
        add("Bristol-Myers Squibb", "bristol-myer-squiib", false);
        add("Cisco", "cisco-sys-inc", false);
        add("Loews", "loews-corporation", false);
        add("Abbott Labs", "abbott-laboratories", true);
        add("CR Bard", "c-r-bard", false);
        add("Jacobs Engineering", "jacobs-engineer", true);
        add("McDonald’s", "mcdonalds", true);
        add("Applied materials", "applied-matls-inc", true);
        add("General Mills", "general-mills", false);
        add("CenterPoint Energy", "centerpoint", true);
        add("Hershey", "hershey-co", false);
        add("Aon", "aon-corp", true);
        add("Viacom B", "viacom-cl-b", false);
        add("AutoNation", "autonation-inc", true);
        add("Marathon Oil", "marathon-oil", false);
        add("H&R Block", "h---r-block-inc", false);
        add("Western Digital", "western-digital", true);
        add("Vulcan Materials", "vulcan-matrls", false);
        add("Chubb", "chubb-corp", true);
        add("EOG Resources", "eog-resources", false);
        add("Cigna", "cigna-corp", true);
        add("Noble Energy", "noble-energy", false);
        add("Alibaba", "alibaba", true);
        add("Newmont Mining", "newmont-mining", false);
        add("L Brands", "limited-brands", false);
        add("Biogen Inc", "biogen-idec-inc", false);
        add("microsoft", "microsoft-corp", true);
        add("Occidental", "occidental-petro", false);
        add("Deere&Company", "deere---co", true);
        add("UnitedHealth", "united-health-group", true);
        add("Andeavor", "tesoro", true);
        add("Illinois Tool Works", "illinois-tool-wk-r", true);
        add("WEC Energy", "wisconsin-energy-corp", false);
        add("Ameren", "ameren-corp", true);
        add("Exelon", "exelon-corp", true);
        add("Frontier Communications", "frontier-communications-corp", false);
        add("Under Armour A", "under-armour", false);
        add("Newell Brands", "newell-rubber", false);
        add("Pitney Bowes", "pitney-bowes-inc", false);
        add("Expedia", "expedia", false);
        add("Macy’s Inc", "macys", false);
        add("Henry Schein", "henry-schein", false);
        add("Patterson", "patterson-companies-inc", false);
        add("Mattel", "mattel-inc", false);
        add("CenturyLink", "centurylink", false);
        add("Priceline.com", "priceline.com-inc", false);
        add("Avon Products", "avon-products", false);
        add("The Goodyear Tire&Rubber", "goodyear-tire", false);
        add("DaVita", "davita-inc", false);
        add("McKesson", "mckesson-corp", false);
        add("Flowserve", "flowserve-corp", false);
        add("Alexion", "alexion-pharmaceuticals,-inc.", false);
        add("Zimmer Biomet", "zimmer-hldgs", false);
        add("Discovery", "discovery-holding-co", false);
        add("Cardinal Health", "cardinal-health", false);
        add("Leggett&Platt", "leggett---platt", false);
        add("Ralph Lauren", "polo-ralph-laur", false);
        add("Symantec", "symantec-corp", false);
        add("Time Warner", "time-warner", false);
        add("Nordstrom", "nordstrom-inc", false);
        add("Xerox", "xerox-corp", false);
        add("Scana", "scana-corp", false);
        add("CVS Health Corp", "cvs-corp", false);
        add("Merck&Co", "merck---co", false);
        add("Baidu", "baidu.com", true);
        add("Archer-Daniels-Midland", "archer-daniels-mid", false);
        add("Bed Bath&Beyond", "bed-bath---beyond-inc", false);
        add("Hasbro", "hasbro-inc", false);
        add("Cleveland-Cliffs", "cleveland-cliffs", false);
        add("momo", "momo-inc", false);
        add("Humana", "humana-inc", true);
        add("Omnicom", "omnicom-gp-inc", false);
        add("Cerner", "cerner-corporatio", true);
        add("IPG", "interpublic-grp", false);
        add("Verizon", "verizon-communications", false);
        add("Gilead", "gilead-sciences-inc", false);
        add("Tesla", "tesla-motors", true);
        add("Southwest Airlines", "sth-west-airlines", true);
        add("Rockwell Automation", "rockwell-automat", true);
        add("General Motors", "gen-motors", true);
        add("Emerson", "emerson-elec", true);
        add("Alcoa", "alcoa", true);
        add("Harley-Davidson", "harley-davidson", false);
        add("Ingersoll-Rand", "ingersoll-rand", true);
        add("Stericycle", "stericycle-inc", false);
        add("Allergan", "actavis", false);
        add("General Electric", "general-electric", false);
        add("United Parcel Service", "united-parcel", false);
        add("Gap", "gap.inc", false);
        add("Target", "target", false);
        add("AMD", "adv-micro-device", true);
        add("Tapestry", "coach", false);
        add("Delta Air Lines", "delta-air-lines-new", false);
        add("Charter Communications", "charter-communications", true);
        add("Zions", "zions-bancorp", true);
        add("Scripps Networks", "scripps-networks-interactive");
        add("Cummins", "cummins-inc", true);
        add("AIG", "american-intl-group", false);
        add("Ball", "ball-corp", false);
        add("Sysco", "sysco-corp", false);
        add("TJX", "tjx-co-inc", false);
        add("International Paper", "intl-paper-co", true);
        add("XL Group", "xl-capital-ltd", false);
        add("Invesco", "invesco-ltd", true);
        add("Comerica", "comerica-inc", true);
        add("Fidelity National Info", "fidelity-natl-in", false);
        add("MetLife", "metlife-inc", false);
        add("Ryder System", "ryder-system-inc", false);
        add("Tata Motors ADR", "tata-motors", false);
        add("Lowe’s", "lowes-companies", false);
        add("Huntington Bancshares", "huntgtn-bkshr", true);
        add("Cincinnati Financial", "cincinnati-fin", false);
        add("Simon Property", "simon-prop-grp", false);
        add("Franklin Resources", "franklin-res", true);
        add("jp-morgan", "jp-morgan-chase", true);
        add("Capital One Financial", "capital-one", true);
        add("M&T Bank", "m-t-bank-corp", true);
        add("Tiffany&Co", "tiffany---co", true);
        add("ONEOK", "oneok", false);
        add("The AES", "aes-corp", false);
        add("JB Hunt", "j.b.-hunt-transpo", true);
        add("Bank of America", "bank-of-america", true);
        add("State Street", "state-street", true);
        add("Wells Fargo&Co", "wells-fargo", true);
        add("FedEx", "fedex-corp", true);
        add("Morgan Stanley", "morgan-stanley", true);
        add("Philip Morris", "philip-morris-intl", false);
        add("CarMax", "carmax-inc", true);
        add("Medtronic", "medtronic", false);
        add("ICE", "intercontintlex", true);
        add("Urban Outfitters", "urban-outfitters", false);
        add("US Bancorp", "us-bancorp", false);
        add("Molson Coors Brewing", "molson-coors", false);
        add("Assurant", "assurant", true);
        add("BB&T", "bb-t-corp", true);
        add("Genuine Parts", "genuine-parts-co", false);
        add("IFF", "intl-flav---frag", false);
        add("Pacific Gas&Electric", "pacific-gas-electric", false);
        add("Boston Scientific", "boston-scien-cp", true);
        add("Dun&Bradstreet", "dun---bradstreet", false);
        add("United Continental", "united-continenta", false);
        add("Norfolk Southern", "norfolk-southern", true);
        add("KeyCorp", "keycorp-new", true);
        add("PNC Financial", "pnc-fin-serv", true);
        add("ICICI Bank ADR", "icici-bank", false);
        add("DuPont", "du-pont", true);
        add("McCormick&Co", "mccormick---co", false);
        add("Monsanto", "monsanto", false);
        add("T Rowe", "t-rowe-price-gp", true);
        add("Johnson Controls", "johnson-controls", false);
        add("Dr Reddys Labs", "dr.-reddys-laboratories", false);
        add("Nucor", "nucor", false);
        add("3M", "3m-co", true);
        add("Regions Financial", "regions-fin", true);
        add("Citigroup", "citigroup", true);
        add("Vertex Pharma", "vertex-pharm", true);
        add("Marriott Int", "marriott-intl", true);
        add("Fifth Third", "fifth-third-bk", true);
        add("Equifax", "equifax-inc", false);
        add("Northern Trust", "northern-trust", true);
        add("Microchip", "microchip-technology-inc", true);
        add("Ford Motor", "ford-motor-co", false);
        add("Netflix", "netflix,-inc.", true);
        add("Chipotle Mexican Grill", "chipotle-mexican-grill-inc", false);
        add("PPL", "ppl-corp", false);
        add("Republic Services", "republic-services-inc", true);
        add("AT&T", "at-t", false);
        add("Owens-Illinois", "owens-illinois-inc", true);
        add("Southern", "southern-co", false);
        add("PPG Industries", "ppg-industries", true);
        add("Masco", "masco-corp", true);
        add("Whirlpool", "whirl-pool-corp", false);
        add("The Charles Schwab", "charles-schwab", true);
        add("Quest Diagnostics", "quest-diag", false);
        add("PACCAR", "paccar-inc", true);
        add("eBay", "ebay-inc", true);
        add("Williams", "williams-cos", false);
        add("Discover", "discover-financl", false);
        add("General Dynamics", "general-dynam", true);
        add("Ecolab", "ecolab-inc", false);
        add("Bank of NY Mellon", "bk-of-ny", false);
        add("JM Smucker", "jm-smucker-co", false);
        add("Pfizer", "pfizer", false);
        add("CME Group", "cme-group-inc.", true);
        add("Snap-On", "snapon-inc", false);
        add("E-TRADE", "etrade-fincl-cp", true);
        add("IBM", "ibm", false);
        add("Dr Pepper Snapple", "dr-pepper-snapple", false);
        add("Amgen", "amgen-inc", true);
        add("Ameriprise Financial", "ameriprise-fincl", true);
        add("CA", "ca-inc", false);
        add("Hartford", "hartford-finl", true);
        add("American Express", "american-express", true);
        add("Juniper", "juniper-networks-inc", false);
        add("Waters", "waters-corp", true);
        add("Illumina Inc", "illumina,-inc.", true);
        add("BlackRock", "blackrock,-inc.-c", true);
        add("celgene", "celgene-corp", false);
        add("Rockwell Collins", "rockwe-coll", true);
        add("Ross Stores", "ross-stores-inc", false);
        add("United Technologies", "united-tech", false);
        add("Nasdaq Inc", "nasdaq-omx-group", false);
        add("Agilent Technologies", "agilent-tech", true);
        add("Sherwin-Williams", "sherwinwilliams", true);
        add("Procter&Gamble", "procter-gamble", false);
        add("Edwards Lifesciences", "edward-lifescience", false);
    }

    function add(name, url, isPositiveStock) {
        var id = url.replace(/[.,!]/g, "");
        _stocks.push({
            name,
            url: urlBase + url,
            id: id,
            isPositiveStock
        });
    }

    function getByUrl(url) {
        return _stocks.find(s => s.url == url);
    }

    function getChangesForStockList() {
        let usaStocks = AllUsaStocks.getAll();
        let usaSpbStocks = [];

        usaStocks.forEach(usaStock => {
            if (SpbStockList.stockExistsByName(usaStock.shortName)) {
                usaSpbStocks.push(usaStock);
            }
        });

        showStockChanges(usaSpbStocks);
    }



    function showStockChanges(newStockList) {
        showStocksToRemove(newStockList);
        showStocksToAdd(newStockList);
    }

    function showStocksToRemove(newStockList) {
        console.log('\n\n Stocks to remove from File. Needt to investigate the reason \n\n');

        getAll().forEach(favouriteStock => {
            if (!newStockList.find(s => s.url == favouriteStock.url)) {
                console.log("To remove: " + favouriteStock.url)
            }
        })
    }

    function showStocksToAdd(newStockList) {
        console.log('\n\n Stocks to add \n\n');

        let stocksToAddScript = "";

        newStockList.forEach(newStock => {
            if (!getByUrl(newStock.url)) {
                var shortUrl = newStock.url.replace(urlBase, "");
                stocksToAddScript += "add(\"" + newStock.name + "\", \"" + shortUrl + "\");\n"
            }
        })

        console.log(stocksToAddScript);
    }

    ctor();
}