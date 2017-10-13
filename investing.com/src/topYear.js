// https://ru.investing.com/equities/united-states

function init(){
	window.initParams = {
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

function isPerformanceLoaded(){ // вкладка статистика 
	return $('#marketsPerformance>tbody>tr') 
		&& $('#marketsPerformance>tbody>tr').length;
}

function isRateLoaded(){ // вкладка котировки 
	return $('#cross_rate_markets_stocks_1>tbody>tr') 
		&& $('#cross_rate_markets_stocks_1>tbody>tr').length;
}

function lowEquity(row){
	debugger;
	var dayEq = getColumnValue(row, 2);
	var weekEq = getColumnValue(row,3);
	var monthEq = getColumnValue(row, 4);
	var yearEq = getColumnValue(row, 6);
	var threeYearEq = getColumnValue(row, 7);
	
	return (initParams.minRateThreeYear && threeYearEq < initParams.minRateThreeYear) 
		|| (initParams.minRateYear && yearEq < initParams.minRateYear )
		|| (initParams.minRateDay && dayEq < initParams.minRateDay )
		|| (initParams.minRateWeek && weekEq < initParams.minRateWeek )
		|| (initParams.minRateMonth && monthEq < initParams.minRateMonth);
		//|| (initParams.maxRateYear && yearEq > maxRateYear);
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
	debugger;
	$('#stocksFilter').val(initParams.market);
	doStocksFilter('select',$('#stocksFilter'));
	setTimeout(waitUntilLoaded, 100, isRateLoaded, callback);
}

var stockMarket = {
	NYSE_AMEX_COMPOSITE: "NYSE Composite",
	NASDAQ_COMPOSITE: "NASDAQ Composite"
};

init();
run();