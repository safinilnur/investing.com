_investStocks.ctx.register("FavouriteStockReportHtmlHelper")
    .asCtor(FavouriteStockReportHtmlHelper)
    .dependencies("DateHelper");

function FavouriteStockReportHtmlHelper(DateHelper){
    this.getDateBeforeReportHtml = getDateBeforeReportHtml;

    function getDateBeforeReportHtml(stock){
        let daysBeforeReport = DateHelper.getDaysCountBeforeDate(stock.reportDate);
        let tdClass = "";

        if (daysBeforeReport<10){
            tdClass = " class=\'report-is-close\'";
        }
        return `<td ${tdClass}>${DateHelper.getDaysCountBeforeDate(stock.reportDate)}</td>`;
    }
}