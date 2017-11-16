_investStocks.ctx.register("FavouriteStocksAnalyzerStorageHelper")
    .asCtor(FavouriteStocksAnalyzerStorageHelper)
    .dependencies("InvestingConsts");

function FavouriteStocksAnalyzerStorageHelper(InvestingConsts) {
    this.saveItemInStorage = saveItemInStorage;
    this.getStorageData = getStorageData;
    this.saveData = saveData;
    this.clearPreviousData = clearPreviousData;

    let storageKey = InvestingConsts.favouriteStocksStatisticsLocalStorageKey;

    function saveItemInStorage(itemToSave) {
        let items = getStorageData();

        items.forEach(function (item, i) {
            if (item.name == itemToSave.name) {
                items[i] = itemToSave;
            }
        });

        saveData(items);
    }

    function getStorageData(){
        return JSON.parse(localStorage.getItem(storageKey)) || [];
    }

    function saveData(data){
        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    function clearPreviousData(){
        localStorage.removeItem(storageKey);
    }
}