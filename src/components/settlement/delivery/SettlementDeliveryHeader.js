/**
 * 配送方式头部header
 */
import React from 'react';
class SettlementDeliveryHeader extends React.Component{
  backClick(){
    this.context.router.goBack();
  }
  render(){
    return <div className="innerHeader">
      <div className="back" onClick={()=>this.backClick()}>
        <div><span className="secoo_icon_back"></span></div>
      </div>
      <div className="content"><div>配送方式</div></div>
      <div className="more"></div>
    </div>
  }
}
SettlementDeliveryHeader.defaultProps = {};
SettlementDeliveryHeader.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementDeliveryHeader;
