_investStocks.ctx.register("DigitsHelper")
    .asCtor(DigitsHelper);

function DigitsHelper() {
    this.toFloat = toFloat;
    this.round2 = round2;

    function toFloat(str) {
        str = str.replace(/[ %]/g,'').replace(',','.');
        if (str == "-")
            str = "0";
        return parseFloat(str);
    }

    function round2(d){
        return Math.round(d * 100) / 100
    }

}