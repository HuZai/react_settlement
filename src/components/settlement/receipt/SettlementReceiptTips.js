/**
 * 发票须知
 */
import React from 'react';
class SettlementReceiptTips extends React.Component {
  closeClick(){
    document.getElementById("receipt-pops").innerHTML = "";
  }
  disClick(event){
    event.stopPropagation();
    event.preventDefault();
  }
  render(){
    return <div className="mixin-pops selected" onClick={this.closeClick}>
      <div className="mixin-pops-item receipt-pops selected" onClick={this.disClick}>
        <div className="receipt-tips">
          <div>1、订单状态变为已完成，并且无退货情况下，会为您补寄发票。</div>
          <div>2、开票金额不包括优惠券、服务费、促销返利、库币支付的部分。</div>
        </div>
        <div className="mixin-border pops-confirm-btn" onClick={this.closeClick}>确定</div>
      </div>
    </div>;
  }
}
SettlementReceiptTips.defaultProps = {};
SettlementReceiptTips.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementReceiptTips;
