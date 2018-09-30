_investStocks.ctx.register("GetSpbStockList")
    .asCtor(GetSpbStockList);

function GetSpbStockList() {
    let _this = this;

    this.getAllStocks = getAllStocks;

    function getAllStocks(successCallback){
        var data = [];
        var urls = [];

        // pages 01-09
        for (var i=1; i<10; i++){
            var url = 'ctl00$BXContent$iii$pager$ctl00$ctl0'+i;
            urls.push(url);
        }

        // pages 10-20
        for (var i=10; i<21; i++){
            var url = 'ctl00$BXContent$iii$pager$ctl00$ctl'+i;
            urls.push(url);
        }

        // pages 22-29
        for (var i=2; i<10; i++){
            var url = 'ctl00$BXContent$iii$pager$ctl00$ctl0'+i;
            urls.push(url);
        }
        // pages 30-38
        for (var i=10; i<19; i++){
            var url = 'ctl00$BXContent$iii$pager$ctl00$ctl'+i;
            urls.push(url);
        }

        appendStocksData(data);

        var callback = (data)=>{
            urlsCollectedCallback(data, successCallback);
        };

        collectByUrls(urls, data, callback);
    }

    function urlsCollectedCallback(data, successCallback){
        debugger;
        data = data.filter(e=> e.name && e.shortName);

        successCallback(data);

        displayDataInConsole(data);
    }

    function displayDataInConsole(data){
        console.log(data);

        var scriptStockCreator = "";
        data.forEach((stock)=>{
            scriptStockCreator += `addStock(\`${stock.shortName}\`, \`${stock.name}\`);
`;
        });
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