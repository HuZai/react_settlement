/**
 * 激活优惠券组件
 */
import React from 'react';
import TicketItem from 'components/settlement/ticket/SettlementTicketLine';
import HeaderCom from 'components/settlement/header/Header';
import SettlementTicketHeaderForm from 'components/settlement/ticket/SettlementTicketHeaderForm';
import webCommon from 'actions/common';
import settementAction from 'actions/settementAction';
class SettlementTicketList extends React.Component {
  constructor(props) {
    super(props);
    this.confirmClick=this.confirmClick.bind(this);
    this.state = this.props.location.state;
  }
  componentDidMount(){
  }
  componentDidUpdate(){
    let _t=this;
    if(this.state.ticket.seleted==true){
      _t.context.router.replace(
        {pathname: '/reactSettlement/index.html',
          query: { cart: webCommon.setSettlemntParam({"ticketParam":{"ticketId":_t.getSelectData().ticketId}})},
          state: _t.state
        }
      )
    }
  }
  activeClick(){//激活处理
      this.setState({otherInfo:{creatTicket:true}});
  }
  selectItems(ticketId) {
    let data = this.state.ticket,
      canUseTicketList = data.canUseTicketList;
    for (let i = 0; i < canUseTicketList.length; i++) {
      if (canUseTicketList[i].ticketId == ticketId) {
        canUseTicketList[i].isChoose = true;
      } else {
        canUseTicketList[i].isChoose = false;
      }
    }
    data.seleted=true;
    this.setState(data);
  }
  getSelectData() {
    let data = this.state.ticket,
      canUseTicketList = data.canUseTicketList;
    for (let i = 0; i < canUseTicketList.length; i++) {
      if (canUseTicketList[i].isChoose) {
        return canUseTicketList[i];
      }
    }
  }
  colseForm(){
    this.setState({otherInfo:null});
  }
  confirmClick(vals) {
    if(!vals.ticketNum){
      return;
    }
    let _t=this,carts=webCommon.setSettlemntParam({"ticketParam":{"ticketSn":vals.ticketNum}});
    settementAction.getData(carts,function(data){
      if(data.retCode==0){
        data.otherInfo=null;
        alert("激活成功");
        _t.setState(data);
        if(data.ticket.ticketSn && data.ticket.ticketId){
          _t.context.router.replace(
            {pathname: '/reactSettlement/index.html',
              query: {cart:carts},
              state: _t.state
            }
          )
        }
      }else if(data.retMsg){
        alert(data.retMsg)
      }
    });
  }
  render() {
    let ticketList = [], ableTicket = [], unableTicket = [],creatTicket=[];
    let data = this.state.ticket,
      canUseTicketList = data.canUseTicketList,
      canotUseTicketList = data.canotUseTicketList;
    console.log("render")
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
    if(canotUseTicketList.length>0){
      for (let j = 0; j < canotUseTicketList.length; j++) {
        unableTicket.push(
          <TicketItem listType='0' data={canotUseTicketList[j]} key={j}/>
        );
      }
      // 不可用优惠券
      ticketList.push(
        <div className='unable-ticket-tips' key="unable">
          <div>不可用优惠券</div>
          {data.canotUseTicketDesc?<span>({data.canotUseTicketDesc})</span>:""}
        </div>);
      ticketList.push(
        <div className='ticket-list unable-ticket-list' key="list1">
          <ul>{unableTicket}</ul>
        </div>
      );
    }
    //激活优惠券
    if(this.state.otherInfo && this.state.otherInfo.creatTicket){
      creatTicket.push(<SettlementTicketHeaderForm confirmClick={this.confirmClick.bind(this)} closeForm={()=>this.colseForm()}/>)
    }
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
        <HeaderCom data={{title:'优惠券',btnDes:'激活'}} rightClick={()=>this.activeClick()}/>
        <div className='page-content'>
          <div className='ticket-section'>{ticketList}</div>
        </div>
        <div id="ticket-pops">
          {creatTicket}
        </div>
      </div>
    )
  }
}
SettlementTicketList.defaultProps = {};
SettlementTicketList.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementTicketList;
