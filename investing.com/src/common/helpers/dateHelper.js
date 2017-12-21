_investStocks.ctx.register("DateHelper")
    .asCtor(DateHelper);

function DateHelper() {
    this.getDate = getDate;
    this.getDaysCountBeforeDate = getDaysCountBeforeDate;

    let ruLocale = "ru-Ru";
    const DAY_MS = 1000*60*60*24;

    function getDate(value, convertionType){
        switch (convertionType) {
            case 1:
                let date = new Date(value);
                return date.toLocaleDateString(ruLocale) + ' ' + date.getHours() + ":" + date.getMinutes();
            case 2: // dd/mm/yyyy => Date
                if (!value){
                    return;
                }
                let parts =value.split('.');
                // year, month (starts from 0), day
                return new Date(parts[2],parts[1]-1,parts[0]);
        }
    }

    function getDaysCountBeforeDate(date){
        let futureDate = getDate(date, 2);

        return futureDate && Math.round((futureDate - new Date())/ DAY_MS) || 365;
    }
}