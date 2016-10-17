// 配送方式 确认的按钮
import React from 'react';
import webCommon from 'actions/common';
class SettlementDeliveryConfirm extends React.Component{
  constructor(props) {
    super(props);
    this.state = this.props.data;
  }
  confirmClick(){
    var state = this.state,_t=this;
    let paramAry = [],chooseDeliverTypes = state.chooseDeliverTypes;
    for(let i = 0; i < chooseDeliverTypes.length; i++){
      paramAry[i] = {
        deliverTypeId:chooseDeliverTypes[i].deliverTypeId
      };
      let deliverTypeTempls = chooseDeliverTypes[i].deliverTypeTempls;
      for(let j = 0; j < deliverTypeTempls.length; j++){
        if(deliverTypeTempls[j].isChoose){
          paramAry[i].deliverType = deliverTypeTempls[j].deliverType;
          if(deliverTypeTempls[j].deliverType == 0){
            let pickUpList = deliverTypeTempls[j].pickUpList;
            for(let k = 0; k < pickUpList.length; k++){
              if(pickUpList[k].isChoose){
                paramAry[i].vendorWarehouseId = pickUpList[k].vendorWarehouseId;
              }
            }
          }
        }
      }
    }
    console.log({deliverTypeParam:paramAry});
    console.log(webCommon.setSettlemntParam({deliverTypeParam:paramAry}));
    _t.context.router.push(
      {pathname: '/index.html',
        query: { cart: webCommon.setSettlemntParam({deliverTypeParam:paramAry})},
        //state: {shippingInfo:{zitiForm:false},customsInfo:{showCardForm:false}}
      }
    )
  }
  render(){
    return <div className="page-btn-wrap" onClick={()=>this.confirmClick()}>
      <a href="javascript:;" className="secoo_btn secoo_btn_default">确定</a>
    </div>;
  }
}
SettlementDeliveryConfirm.defaultProps = {};
SettlementDeliveryConfirm.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementDeliveryConfirm;

