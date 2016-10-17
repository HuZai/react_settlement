/**
 * 激活优惠券组件
 */
import React from 'react';
import {render} from 'react-dom';
import InputPops from 'components/settlement/ticket/SettlementTicketHeaderForm';
class SettlementTicketHeader extends React.Component{
  activeClick(){
    // 激活优惠券
    render(
      <InputPops/>,
      document.getElementById("ticket-pops"));
  }
  backClick(){
    this.context.router.goBack();
  }
  render(){
    return <div className="innerHeader">
      <div className="back" onClick={()=>this.backClick()}>
        <div><span className="secoo_icon_back"></span></div>
      </div>
      <div className="content"><div>优惠券</div></div>
      <div className="more" onClick={this.activeClick}>
        <div><span>激活</span></div>
      </div>
    </div>
  }
}
SettlementTicketHeader.defaultProps = {};
SettlementTicketHeader.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementTicketHeader;
