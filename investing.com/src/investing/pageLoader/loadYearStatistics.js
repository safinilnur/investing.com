_investStocks.ctx.register("LoadYearStatistics")
    .asCtor(LoadYearStatistics)

function LoadYearStatistics(){
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
        var rows = $('#marketsPerformance>tbody>tr');
        for (var i=0; i< rows.length; i++){
            if (lowEquity(rows[i]))
                $(rows[i]).remove();
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
        var dayEq = getColumnValue(row, 2);
        var weekEq = getColumnValue(row,3);
        var monthEq = getColumnValue(row, 4);
        var yearEq = getColumnValue(row, 6);
        var threeYearEq = getColumnValue(row, 7);

        return (_searchParams.minRateThreeYear && threeYearEq < _searchParams.minRateThreeYear)
            || (_searchParams.minRateYear && yearEq < _searchParams.minRateYear )
            || (_searchParams.minRateDay && dayEq < _searchParams.minRateDay )
            || (_searchParams.minRateWeek && weekEq < _searchParams.minRateWeek )
            || (_searchParams.minRateMonth && monthEq < _searchParams.minRateMonth);
        //|| (_searchParams.maxRateYear && yearEq > maxRateYear);
    }

    function getColumnValue(row, colIndex){
        var strValPercent = $($(row).find('td')[colIndex]).html();
        var strVal = strValPercent.substring(0, strValPercent.length-1);
        var intVal = parseInt(strVal);
        return intVal;
    }


    function waitUntilLoaded(condition, callback) {
        var bool = condition();
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

    var stockMarket = _investStocks.ctx.get('InvestingStockExchanges').stockList;
}