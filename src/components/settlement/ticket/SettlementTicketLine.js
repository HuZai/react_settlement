/**
 * 激活优惠券组件
 */
import React from 'react';
class SettlementTicketList extends React.Component{
  selectClick (ticketId){
    this.props.selectItems && this.props.selectItems(ticketId);
  }
  render () {
    let btnHtml="",selectClass = this.props.data.isChoose?'secoo_icon_xuanzhong_red':'secoo_icon_weixuan';
    let desc,isUrgent,data = this.props.data;
    if(this.props.listType == 0){
      btnHtml = <span className='secoo_icon_weixuan'></span>;
      desc = data.canotUseDesc;
    }else{
      // 不使用优惠券
      if(data.ticketId == -1){
        return <li onClick={this.selectClick.bind(this,data.ticketId)} className="cell mt20 ticket-item">
          <div>不使用优惠券</div>
                <span className={selectClass}>
                    <span className="path1"></span>
                    <span className="path2"></span>
                </span>
        </li>;
      }
      btnHtml = <span className={selectClass}><span className='path1'></span><span className='path2'></span></span>;
      isUrgent = data.isUrgent;
      desc = data.useDateDesc;
    }
    let descHtml = <em className={isUrgent?"red":""}>{desc}</em>;
    return <li onClick={this.selectClick.bind(this,data.ticketId)} className='ticket-item'>
      <div className='ticket-amount'><div><span className="yen-show">&yen;</span>{data.amount}</div></div>
      <div className='ticket-box'>
        <div className='ticket-info'>
          <div>{data.name}</div>
          <span>{data.desc}</span>
          {descHtml}
        </div>
        {btnHtml}
      </div>
    </li>;
  }
}
SettlementTicketList.defaultProps = {

};
SettlementTicketList.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementTicketList;

