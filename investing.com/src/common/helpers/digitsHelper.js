_investStocks.ctx.register("DigitsHelper")
    .asCtor(DigitsHelper);

function DigitsHelper() {
    this.toFloat = toFloat;

    function toFloat(str) {
        str = str.replace(/[ %]/g,'').replace(',','.');
        if (str == "-")
            str = "0";
        return parseFloat(str);
    }

}