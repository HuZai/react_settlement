/**
 * 激活优惠券组件
 */
import React from 'react';
import webCommon from 'actions/common';
import settementAction from 'actions/settementAction';
class SettlementTicketHeaderForm extends React.Component {
  componentDidMount() {
    this.refs.ticketInput.focus();
  }

  closeClick() {
    document.getElementById("ticket-pops").innerHTML = "";
  }

  disClick(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  confirmClick() {
    let _t=this,vals=_t.refs.ticketInput.value,carts=webCommon.setSettlemntParam({"ticketParam":{"ticketSn":vals}});
    settementAction.getData(carts,function(data){
      if(data.retCode==0){
        _t.context.router.push(
          {pathname: '/index.html',
            query: { cart: carts},
            state: data
          }
        )
      }else if(data.retMsg){
        alert(data.retMsg)
      }

    });
  }

  ticketChange(event) {
    this.refs.confirmBtn.classList.toggle("disabled", event.target.value == "");
  }

  render() {
    return <div className="input-pops selected" onClick={this.closeClick.bind(this)}>
      <div className="input-pops-item ticket-input selected" onClick={this.disClick}>
        <div className="title-line">
          <div onClick={this.closeClick} className="left-area secoo_icon_guanbi"></div>
          激活优惠券
        </div>
        <input className="mixin-input mt20" onChange={this.ticketChange.bind(this)} type="text" ref="ticketInput"
               placeholder="请输入优惠码"/>
        <a href="javascript:;" ref="confirmBtn" onClick={this.confirmClick.bind(this)}
           className="secoo_btn secoo_btn_default disabled">确定</a>
      </div>
    </div>;
  }
}
SettlementTicketHeaderForm.defaultProps = {};
SettlementTicketHeaderForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementTicketHeaderForm;

