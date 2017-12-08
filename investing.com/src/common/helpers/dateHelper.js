_investStocks.ctx.register("DateHelper")
    .asCtor(DateHelper);

function DateHelper() {
    this.getDate = getDate;

    let ruLocale = "ru-Ru";

    function getDate(value, convertionType){
        switch (convertionType) {
            case 1:
                let date = new Date(value);
                return date.toLocaleDateString(ruLocale) + ' ' + date.getHours() + ":" + date.getMinutes();
        }
    }
}