// 配送方式主体内容
import React from 'react';
import DeliveryConfirm from 'components/settlement/delivery/SettlementDeliveryConfirm';
import DeliveryProList from 'components/settlement/delivery/SettlementDeliveryProList';
import DeliveryHeader from 'components/settlement/delivery/SettlementDeliveryHeader';
import webCommon from 'actions/common';
class SettlementDeliveryMain extends React.Component{
  constructor(props) {
    super(props);
    // this.state = this.props.data;
    this.state = this.props.location.state.deliverType;
  }
  deliverySelect(deliverTypeTempls,deliverType,event){
    let target = event.target;
    if(target.value == "") return;
    for(let i = 0; i < deliverTypeTempls.length; i++){
      if(deliverTypeTempls[i].deliverType != deliverType){
        deliverTypeTempls[i].isChoose = false;
      }else{
        deliverTypeTempls[i].isChoose = true;

        // select
        let pickUpList = deliverTypeTempls[i].pickUpList;
        if(pickUpList){
          for(let j = 0; j < pickUpList.length; j++){
            if(pickUpList[j].vendorWarehouseId == target.value){
              pickUpList[j].isChoose = true;
            }else{
              pickUpList[j].isChoose = false;
            }
          }
        }
      }
    }
    this.setState(this.state);
  }
  render(){
    let state = this.state, chooseDeliverTypes = state.chooseDeliverTypes,
      deliverySection = [];
    for(let i = 0; i < chooseDeliverTypes.length; i++){
      let cartItems = chooseDeliverTypes[i].cartItems,
        proList = [],deliverySub = [],detailsAry = [],remind = "";
      proList.push(
        <DeliveryProList cartItems={cartItems}/>
      );
      let deliverTypeTempls = chooseDeliverTypes[i].deliverTypeTempls;
      for(let j = 0; j < deliverTypeTempls.length; j++){
        let deliveryIsChoose = deliverTypeTempls[j].isChoose,
          subClass = deliveryIsChoose?"selected":"";
        if(deliverTypeTempls[j].deliverType == 0){
          let picUpAry = [],
            pickUpList = deliverTypeTempls[j].pickUpList;
          if(!deliveryIsChoose){
            picUpAry.push(<option selected="selected" value="">请选择</option>);
          }
          for(var k = 0; k < pickUpList.length; k++){
            picUpAry.push(
              <option selected={pickUpList[k].isChoose && deliveryIsChoose?"selected":false} value={pickUpList[k].vendorWarehouseId}>{pickUpList[k].name}</option>
            );
            if(deliveryIsChoose) {
              if (pickUpList[k].isChoose) {
                let details = pickUpList[k].details;
                for (let c = 0; c < details.length; c++) {
                  detailsAry.push(
                    <li>
                      <div>{details[c].name}</div>
                      <span>{details[c].value}</span></li>
                  );
                }
                remind = deliverTypeTempls[j].remind;
              }
            }
          }
          deliverySub.push(
            <li className={subClass}>
              <span>{deliverTypeTempls[j].name}</span>
              <select onChange={this.deliverySelect.bind(this,deliverTypeTempls,deliverTypeTempls[j].deliverType)}>{picUpAry}</select>
            </li>
          );

        }else{
          deliverySub.push(
            <li className={subClass} onClick={this.deliverySelect.bind(this,deliverTypeTempls,deliverTypeTempls[j].deliverType)}>
              <span>{deliverTypeTempls[j].name}</span>
            </li>
          );
        }
      }
      deliverySection.push(
        <div className="mt20 song-item">
          {proList}
          <div className="select-section mixin-border">
            <div className="bold select-title">可选配送方式</div>
            <div className="select-ls">
              <ul>
                {deliverySub}
              </ul>
            </div>
            {detailsAry.length?<div className="select-detail mixin-border">
              <ul>{detailsAry}</ul>
            </div>:""}
          </div>
          {remind?<div className="cell mixin-border tips red"><div>{remind}</div></div>:""}
        </div>
      );
    }
    return <div className="page-view selected">
      <header className="header"><DeliveryHeader/></header>
      <div className="page-content">
        {deliverySection}
      </div>
      <DeliveryConfirm data={state} />
    </div>;

  }
}
SettlementDeliveryMain.defaultProps = {};
SettlementDeliveryMain.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementDeliveryMain;
