_investStocks.ctx.register("LocalStorageHelper")
    .asCtor(LocalStorageHelper);

function LocalStorageHelper() {
    this.get = get;
    this.set = set;
    this.remove = remove;

    function set(key, value){
        var storageValue = value && JSON.stringify(value);

        localStorage.setItem(key, storageValue);
    }

    function get(key) {
        var data = localStorage.getItem(key);

        return data && JSON.parse(data);
    }

    function remove(key) {
        localStorage.removeItem(key);
    }

}