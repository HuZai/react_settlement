// 商品详情列表
import React from 'react';
import Header from 'components/settlement/header/Header';
class SettlementProList extends React.Component{
  constructor(props) {
    super(props);
    // this.state = this.props.data;
    this.state = this.props.location.state.cart.cartItems;
  }
  backClick(){
    this.context.router.goBack();
  }
  render(){
    let state = this.state,proItemAry = [],presentItemAry = [];
    let commonCartItems = state.commonCartItems || [],
      presentCartItems = state.presentCartItems || [];
    for(let i = 0; i < commonCartItems.length; i++){
      proItemAry.push(
        <div className={(i == 0?"":" clell_border ")+"pro-detail-item"}>
          <div className="pro-info-first">
            <div className="info-icon"><img src={commonCartItems[i].image}/></div>
            <div className="info-box">
              <div>
                <div className="info-title">{commonCartItems[i].name}</div>
                <div className="info-mixin">数量:x{commonCartItems[i].quantity}&nbsp;{commonCartItems[i].spec}</div>
              </div>
              <div className="info-wrap">
                {commonCartItems[i].isSpecificForUserDiscount?<div className="info-special">特殊商品<span className="secoo_icon_Artboard-3"></span></div>:""}
                <div className="info-amount">{commonCartItems[i].nowPrice}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    for(let j = 0; j < presentCartItems.length; j++){
      presentItemAry.push(
        <div className="pro-info-second">
          <div className="info-gift">[赠品] {presentCartItems[j].name}</div>
          <div className="info-count">x{presentCartItems[j].quantity}</div>
        </div>
      );
    }
    return <div className="page-view selected">
      <Header data={{title:'结算中心'}}/>
      <div className="pro-detail-list mt20 page-content">
        {proItemAry}
        {presentItemAry.length?<div className="pro-gift-list clell_border">{presentItemAry}</div>:""}
      </div>
    </div>;
  }
}
SettlementProList.defaultProps = {};
SettlementProList.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementProList;
