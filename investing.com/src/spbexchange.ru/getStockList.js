_investStocks.ctx.register("GetSpbStockList")
    .asCtor(GetSpbStockList);

function GetSpbStockList() {
    let _this = this;

    this.getAllStocks = getAllStocks;

    function getAllStocks(){
        var data = [];
        var urls = [];

        for (var i=1; i<10; i++){
            var url = 'ctl00$BXContent$iii$pager$ctl00$ctl0'+i;
            urls.push(url);
        }
        for (var i=10; i<21; i++){
            var url = 'ctl00$BXContent$iii$pager$ctl00$ctl'+i;
            urls.push(url);
        }
        for (var i=2; i<10; i++){
            var url = 'ctl00$BXContent$iii$pager$ctl00$ctl0'+i;
            urls.push(url);
        }
        for (var i=10; i<17; i++){
            var url = 'ctl00$BXContent$iii$pager$ctl00$ctl'+i;
            urls.push(url);
        }

        appendStocksData(data);
        debugger;
        collectByUrls(urls, data, urlsCollectedCallback);
    }

    function urlsCollectedCallback(data){
        data = data.filter(e=> e.name);

        console.log(data);

        var scriptStockCreator = "";
        data.forEach((stock)=>{
            scriptStockCreator += "addStock(\""+stock.shortName+"\", \""+stock.name+"\");\n";
        })
        console.log(scriptStockCreator);
    }

    function collectByUrls(urls, data, callback){

        if (!urls.length){
            callback(data);

            return;
        }

        let url = urls.shift();
        __doPostBack(url, '');

        setTimeout(()=>{
            appendStocksData(data);
            collectByUrls(urls, data, callback);
        }, 400);
    }

    function appendStocksData(data) {
        var rows = $('.izmen_info tbody tr');

        for (var i=0; i<rows.length; i++){
            var e = rows[i];
            var obj = {
                shortName: $($($(e).find('td')[1]).find('a')).html(),
                name: $($(e).find('td')[2]).html(),
            };
            data.push(obj);
        }
    }
}