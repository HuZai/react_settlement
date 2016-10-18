/**
 * 激活优惠券组件
 */
import React from 'react';
import TicketItem from 'components/settlement/ticket/SettlementTicketLine';
import SettlementTicketHeader from 'components/settlement/ticket/SettlementTicketHeader';
import webCommon from 'actions/common';
class SettlementTicketList extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state.ticket;
  }
  componentDidMount(){
  }
  componentDidUpdate(){
    let _t=this;
    //webCommon.
      _t.context.router.replace(
        {pathname: '/index.html',
          query: { cart: webCommon.setSettlemntParam({"ticketParam":{"ticketId":_t.getSelectData().ticketId}})},
          //state: {shippingInfo:{zitiForm:false},customsInfo:{showCardForm:false}}
        }
      )
  }
  selectItems(ticketId) {
    let data = this.state,
      canUseTicketList = data.canUseTicketList;
    for (let i = 0; i < canUseTicketList.length; i++) {
      if (canUseTicketList[i].ticketId == ticketId) {
        canUseTicketList[i].isChoose = true;
      } else {
        canUseTicketList[i].isChoose = false;
      }
    }
    this.setState(data);
  }
  getSelectData() {
    let data = this.state,
      canUseTicketList = data.canUseTicketList;
    for (let i = 0; i < canUseTicketList.length; i++) {
      if (canUseTicketList[i].isChoose) {
        return canUseTicketList[i];
      }
    }
  }
  render() {
    console.log("render")
    let ticketList = [], ableTicket = [], unableTicket = [];
    let data = this.state,
      canUseTicketList = data.canUseTicketList,
      canotUseTicketList = data.canotUseTicketList;
    // 可用优惠券数据
    for (let i = 0; i < canUseTicketList.length; i++) {
      ableTicket.push(
        <TicketItem listType='1' data={canUseTicketList[i]} selectItems={this.selectItems.bind(this)} key={i}/>
      );
    }
    // 可用优惠券
    ticketList.push(
      <div className='ticket-list able-ticket-list' key="able-ticket-list2">
        <ul>{ableTicket}</ul>
      </div>
    );
    // 不可用优惠券数据
    for (let j = 0; j < canotUseTicketList.length; j++) {
      unableTicket.push(
        <TicketItem listType='0' data={canotUseTicketList[j]} key={j}/>
      );
    }
    // 不可用优惠券
    ticketList.push(
      <div className='unable-ticket-tips' key="unable">
        <div>不可用优惠券</div>
        <span>（订单中的特例品不参与优惠券活动）</span>
    </div>);
    ticketList.push(
      <div className='ticket-list unable-ticket-list' key="list1">
        <ul>{unableTicket}</ul>
      </div>
    );
    // 没有优惠券
    if (!canUseTicketList.length && !canotUseTicketList.length) {
      ticketList = <div className='ticket-section'>
        <div className='no-ticket'>
          <div><img src='http://mpic.secooimg.com/images/2016/10/11/wuyouhuiquan@3x.png'/></div>
          <span>您还没有优惠券</span>
        </div>
      </div>;
    }
    return (
      <div>
        <div className='page-content'>
          <header className="header">
              <SettlementTicketHeader/>
          </header>
          <div className='ticket-section'>{ticketList}</div>
        </div>
        <div id="ticket-pops"></div>
      </div>
    )
  }
}
SettlementTicketList.defaultProps = {};
SettlementTicketList.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementTicketList;
