_investStocks.ctx.register("BrokersFactory")
    .asCtor(BrokersFactory).dependencies("BrokersList");

function BrokersFactory(BrokersList){
    this.getBrokerLogic = getBrokerLogic;
    this.getBrokersLogic = getBrokersLogic;

    function getBrokerLogic(brokerName){
        var broker = BrokersList.find(b => b.name == brokerName);
        return{
            brokerName: brokerName,
            stockList: _investStocks.ctx.get(broker.stockList),
        }
    }

    function getBrokersLogic(){
        return BrokersList.map(b=> getBrokerLogic(b.name));
    }

}