_investStocks.ctx.register("CssStockRecommendations")
.asCtor(CssStockRecommendations);

function CssStockRecommendations() {
    this.appendStyle = appendStyle;

    function appendStyle() {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = getCssContent();
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    function getCssContent(){
        return `
        .stock-recommedations tr {       font-size: 16px;   font-family: cursive;        }
        .stock-recommedations td,.stock-recommedations th {
                padding:5px 0 0 15px}

            .stock-recommedations table {position: relative;text-align: left;margin: auto;}

            .stock-recommedations  tr,.stock-recommedations th, .stock-recommedations td {
                border: 1px solid;
            }

            .stock-recommedations th {
                font-weight: 800;
            }        
        `;
    }

}

