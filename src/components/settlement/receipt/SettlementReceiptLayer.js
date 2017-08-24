/**
 * 纳税人识别号说明
 */
import React from 'react';
class SettlementReceiptLayer extends React.Component {
  closeClick(){
    document.getElementById("receipt-layer").innerHTML = "";
  }
  render(){
    let dataState = this.props.data,
        invoiceParam = dataState.invoiceParam,
        invoiceNorCodeIns = invoiceParam.invoiceNorCodeIns || [],
        layer_list = [];
    for(var i = 0; i < invoiceNorCodeIns.length; i++){
      layer_list.push(
          <div className="lc_title">{invoiceNorCodeIns[i].t}</div>,
          <div className="lc_des">{invoiceNorCodeIns[i].v}</div>
      );
    }
    return <div className="receipt_layer">
            <div className="layer_header">
                <div></div>
                <span>纳税人识别号说明</span>
                <div className="hr_close" onClick={this.closeClick}></div>
            </div>
            <div className="layer_content">
              {layer_list}
            </div>
        </div>;
  }
}
SettlementReceiptLayer.defaultProps = {};
SettlementReceiptLayer.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementReceiptLayer;
