_investStocks.ctx.register("FavouriteStocksAnalyzerStorageHelper")
    .asCtor(FavouriteStocksAnalyzerStorageHelper)
    .dependencies("InvestingConsts");

function FavouriteStocksAnalyzerStorageHelper(InvestingConsts) {
    this.saveItemInStorage = saveItemInStorage;
    this.getStorageData = getStorageData;
    this.saveData = saveData;
    this.clearPreviousData = clearPreviousData;
    this.setNextUrl = setNextUrl;
    this.getNextUrl = getNextUrl;
    this.getPageRefreshCount = getPageRefreshCount;
    this.increasePageRefreshCount = increasePageRefreshCount;
    this.clearNextUrl = clearNextUrl;
    this.getLastSentTopStocks = getLastSentTopStocks;
    this.setLastSentTopStocks = setLastSentTopStocks;
    this.getLastSentTopStocksMetadata = getLastSentTopStocksMetadata;
    this.setLastSentTopStocksMetadata = setLastSentTopStocksMetadata;

    let storageKey = InvestingConsts.favouriteStocksStatisticsLocalStorageKey;
    let storageKeyNextUrlToFetchData = "favouriteStocksNextUrl";
    let storageKeyPageRefreshCount = "favouriteStocksPageRefreshCount";
    let storageKeyTopStocksLastUpdate = "favouriteStocks_top_10_latest";
    let storageKeyTopStocksMetadata = "favouriteStocks_top_10_metadata";

    function saveItemInStorage(itemToSave) {
        let items = getStorageData();

        items.forEach(function (item, i) {
            if (item.name == itemToSave.name) {
                items[i] = itemToSave;
            }
        });

        saveData(items);
    }

    function getPageRefreshCount(){
        let storageValue = localStorage.getItem(storageKeyPageRefreshCount) || 0;

        return parseInt(storageValue);
    }

    function getLastSentTopStocks(){
        let storageValue = localStorage.getItem(storageKeyTopStocksLastUpdate) || "";

        return storageValue;
    }

    function getLastSentTopStocksMetadata(){
        let storageValue = localStorage.getItem(storageKeyTopStocksMetadata) || "{}";
        let result = JSON.parse(storageValue);

        result.lastUpdateSentTime = result.lastUpdateSentTime || 0;

        return result;
    }

    function setLastSentTopStocksMetadata(value){
        localStorage.setItem(storageKeyTopStocksMetadata, JSON.stringify(value));
    }

    function setLastSentTopStocks(value){
        localStorage.setItem(storageKeyTopStocksLastUpdate, value);
    }

    function increasePageRefreshCount(){
        let nextVal = 1 + getPageRefreshCount();

        localStorage.setItem(storageKeyPageRefreshCount, nextVal);
    }

    function setNextUrl(url){
        localStorage.setItem(storageKeyNextUrlToFetchData, url);
    }

    function getNextUrl(){
        return localStorage.getItem(storageKeyNextUrlToFetchData);
    }

    function clearNextUrl(){
        localStorage.removeItem(storageKeyNextUrlToFetchData);
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