_investStocks.ctx.register("HtmlDecoder")
    .asCtor(HtmlDecoder);

function HtmlDecoder(){
    let _this = this;
    _this.decode = decode;

    function decode(encodedStr){
        let parser = new DOMParser;
        let dom = parser.parseFromString(
            '<!doctype html><body>' + encodedStr,
            'text/html');
        let decodedString = dom.body.textContent;
        return decodedString;
    }
}

