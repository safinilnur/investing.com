_investStocks.ctx.register("FinamStockRecommendationTypes")
    .asCtor(FinamStockRecommendationTypes);

function FinamStockRecommendationTypes() {
    let _this = this;

    this.recommendationTypes = getRecommendationTypes();
    this.getMinimalEstimation = getMinimalEstimation;
    this.convertRecommendationToString = convertRecommendationToString;

    function getMinimalEstimation(types){
        debugger;
        if (!types || !types.length){
            return -2;
        }

        var minimalRecommendation = types.map(type=> _this.recommendationTypes.find(e=> e.type == type))
            .sort((a,b)=> (a.id - b.id))[0].id;
        return minimalRecommendation;
    }

    function convertRecommendationToString(id){
        return _this.recommendationTypes.find(e=> e.id == id)["type"];
    }

    function getRecommendationTypes(){
        return [
            {id: -2, type: "Активно продавать"},
            {id: -1, type: "Продавать"},
            {id: 0, type: "Нейтрально"},
            {id: 1, type: "Покупать"},
            {id: 2, type: "Активно покупать"},
        ];
    }
}