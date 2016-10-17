import React from 'react';
import {render} from 'react-dom';
import ReceiptTips from 'components/settlement/receipt/SettlementReceiptTips';
class SettlementReceiptHeader extends React.Component {
  rightClick() {
    // 发票须知
    render(
      <ReceiptTips/>,
      document.getElementById("receipt-pops"));
  }
  backClick() {
    this.context.router.goBack();
  }
  render() {
    return <div className="innerHeader">
      <div className="back" onClick={()=>this.backClick()}>
        <div><span className="secoo_icon_back"></span></div>
      </div>
      <div className="content">
        <div>发票</div>
      </div>
      <div className="more"></div>
      <div className="moreText" onClick={this.rightClick}>发票须知</div>
    </div>
  }
}
SettlementReceiptHeader.defaultProps = {};
SettlementReceiptHeader.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementReceiptHeader;
