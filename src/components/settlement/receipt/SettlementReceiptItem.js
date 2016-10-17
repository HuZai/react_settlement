// 发票选择项
import React from 'react';
class SettlementReceiptItem extends React.Component{
  selectClick(invoicetype){
    this.props.selectItems(invoicetype);
  }
  render() {
    let data = this.props.data,
      selectClass = data.isChoose?'secoo_icon_xuanzhong':'secoo_icon_weixuan',
      borderClass = data.invoiceType == -1? "receipt-item cell":"receipt-item cell clell_border";
    return <div className={borderClass} onClick={this.selectClick.bind(this,data.invoiceType)}>
      <div className="">{data.name}</div>
                <span className={selectClass}>
                    <span className="path1"></span>
                    <span className="path2"></span>
                </span>
    </div>;
  }
}
SettlementReceiptItem.defaultProps = {};
SettlementReceiptItem.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementReceiptItem;
