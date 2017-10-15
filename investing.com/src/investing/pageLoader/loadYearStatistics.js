_investStocks.ctx.register("LoadYearStatistics")
    .asProto()
    .asCtor(LoadYearStatistics).dependencies('BrokersFactory, FinamStockList');

function LoadYearStatistics(brokersFactory, finamStockList){
    this.load = load;

    let _searchParams;

    // Page: https://ru.investing.com/equities/united-states
    // How to use: _investStocks.ctx.get('LoadYearStatistics').load()
    
    function load(searchParams){
        _searchParams = searchParams || getDefaultSearchParams();

        run();
    }
    
    function getDefaultSearchParams(){
        return {
            market: stockMarket.NYSE_AMEX_COMPOSITE,
            minRateDay: 0,
            minRateYear: 60,
            maxRateYear: 600,
            minRateMonth:0,
            minRateThreeYear: 70,
            minRateWeek: 0
        };
    }

    function run(){
        openNASDAQ(openPerformance);
        waitUntilLoaded(isPerformanceLoaded, afterPerformanceLoaded);
    }

    function afterPerformanceLoaded(){
        let rows = $('#marketsPerformance>tbody>tr');

        for (let i=0; i< rows.length; i++){
            if (lowEquity(rows[i])){
                $(rows[i]).remove();
            }

            if (!notBrokerStocks(rows[i])){
                addBrokerInfo(rows[i]);
            }
        }
    }

    function notBrokerStocks(row){
        let brokersWithThisStock = getStockByBroker(getStockName(row));

        return !brokersWithThisStock.length;
    }

    function getStockName(row){
        return $($(row).find('td')[1]).find('a').html();
    }



    function getStockByBroker(name){
        let finamStock = finamStockList.getByName(name);
        let shortName = finamStock && finamStock.shortName;

        return brokersFactory.getBrokersLogic()
            .map(broker => ({
                brokerName: broker.brokerName,
                stock: broker.stockList.getByShortName(shortName)
            }))
            .filter(broker => broker.stock);
    }

    function addBrokerInfo(row){
        let brokersWithThisStock = getStockByBroker(getStockName(row));

        if (brokersWithThisStock.length){
            let brokersTitle = brokersWithThisStock.map(broker=>broker.brokerName).join(" ,");
            debugger;
            $($(row).find('td')[1]).append("<span> ("+brokersTitle+")</span>");
        }
    }

    function isPerformanceLoaded(){ // ??????? ?????????? 
        return $('#marketsPerformance>tbody>tr')
            && $('#marketsPerformance>tbody>tr').length;
    }

    function isRateLoaded(){ // ??????? ????????? 
        return $('#cross_rate_markets_stocks_1>tbody>tr')
            && $('#cross_rate_markets_stocks_1>tbody>tr').length;
    }

    function lowEquity(row){
        let dayEq = getColumnValue(row, 2);
        let weekEq = getColumnValue(row,3);
        let monthEq = getColumnValue(row, 4);
        let yearEq = getColumnValue(row, 6);
        let threeYearEq = getColumnValue(row, 7);

        return (_searchParams.minRateThreeYear && threeYearEq < _searchParams.minRateThreeYear)
            || (_searchParams.minRateYear && yearEq < _searchParams.minRateYear )
            || (_searchParams.minRateDay && dayEq < _searchParams.minRateDay )
            || (_searchParams.minRateWeek && weekEq < _searchParams.minRateWeek )
            || (_searchParams.minRateMonth && monthEq < _searchParams.minRateMonth);
        //|| (_searchParams.maxRateYear && yearEq > maxRateYear);
    }

    function getColumnValue(row, colIndex){
        let strValPercent = $($(row).find('td')[colIndex]).html();
        let strVal = strValPercent.substring(0, strValPercent.length-1);
        let intVal = parseInt(strVal);
        return intVal;
    }
    



    function waitUntilLoaded(condition, callback) {
        let bool = condition();
        if (!bool) {
            setTimeout(waitUntilLoaded, 100, condition, callback); // setTimeout(func, timeMS, params...)
        } else {
            callback();
        }
    }

    function openPerformance(){
        $('#filter_performance').click();
    }

    function openNASDAQ(callback){
        $('#stocksFilter').val(_searchParams.market);
        doStocksFilter('select',$('#stocksFilter'));
        setTimeout(waitUntilLoaded, 100, isRateLoaded, callback);
    }

    let stockMarket = _investStocks.ctx.get('InvestingStockExchanges').stockList;
}