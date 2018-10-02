_investStocks.ctx.register("StocksMainInfoUpdater")
    .asProto()
    .asCtor(StocksMainInfoUpdater).dependencies("ServerAjaxCaller,LocalStorageHelper, InvestingConsts, DigitsHelper");

function StocksMainInfoUpdater(ServerAjaxCaller,LocalStorageHelper, InvestingConsts, DigitsHelper) {
    this.update = update;

    var resultArray = [];
    var setting = null;

    var settings = {
        london:{
            page:'https://ru.investing.com/stock-screener/?sp=country::4|sector::a|industry::a|equityType::a|exchange::3%3Ename_trans;1',
            exchangeId: 3,
        },
        nyse:{
            page:'https://ru.investing.com/stock-screener/?sp=country::5|sector::a|industry::a|equityType::a|exchange::1%3EviewData.symbol;1',
            exchangeId: 2,

        },
        nasdaq:{
            page:'https://ru.investing.com/stock-screener/?sp=country::5|sector::a|industry::a|equityType::a|exchange::2%3Ename_trans;1',
            exchangeId: 1,

        }
    };

    function update(type) {
        debugger;
      setting = settings[type];

      if (!settings)
          throw new Error('Неправильно выбрана биржа');

      if (location.href !== setting.page)
          throw new Error('Для сбора данных перейдите на страницу '+setting.page);

        goToNextPageAndCollectData();
    }

    function goToNextPageAndCollectData(){
        collectInfoFromPage();

        var nextPageButton = $('.blueRightSideArrowPaginationIcon');

        if (nextPageButton.length){
            nextPageButton.trigger('click');
            waitWhileDataIsLoading(goToNextPageAndCollectData);
        }else{
            collectInfoFromPage();

            allInfoCollected();
        }
    }

    function waitWhileDataIsLoading(callback){
        setTimeout(()=>{
            if ($('#resultsTable.searchBlur').length){
                waitWhileDataIsLoading(callback)
            }else{
                callback();
            }
        },3000);


    }

    function allInfoCollected(){
        ServerAjaxCaller.saveInvestingStocksList({stocks: resultArray});
    }

    function collectInfoFromPage(){
        var intermediateArray = [];
        var rows = $('#resultsTable tbody tr');
        for (var i=0; i< rows.length; i++){
            var row = $(rows[i]);

            var stock = {
                urlId: row.find('.symbol a').attr('href').replace('/equities/',''),
                name: row.find('.symbol a').text(),
                shortName: row.find('[data-column-name="viewData.symbol"]').text(),
                exchangeId: setting.exchangeId,
            };

            if (!resultArray.find(e=> e.shortName == stock.shortName)){
                resultArray.push(stock);
                intermediateArray.push(stock);
            }

            ServerAjaxCaller.saveInvestingStocksList({stocks: intermediateArray});
        }
    }

}