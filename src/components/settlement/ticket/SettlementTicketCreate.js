/**
 * 激活优惠券组件
 */
import React from 'react';
class SettlementTicketCreate extends React.Component{
    componentDidMount (){
        this.refs.ticketInput.focus();
    }
    closeClick(){
        document.getElementById("ticket-pops").innerHTML = "";
    }
    disClick(event){
        event.stopPropagation();
        event.preventDefault();
    }
    confirmClick(){
        console.log(this.refs.ticketInput.value);
    }
    ticketChange(event){
        this.refs.confirmBtn.classList.toggle("disabled",event.target.value == "");
    }
    render(){
        return <div className="input-pops selected" onClick={this.closeClick}>
            <div className="input-pops-item ticket-input selected" onClick={this.disClick}>
                <div className="title-line">
                    <div onClick={this.closeClick} className="left-area secoo_icon_guanbi"></div>激活优惠券
                </div>
                <input className="mixin-input mt20" onChange={this.ticketChange} type="text" ref="ticketInput" placeholder="请输入优惠码"/>
                <a href="javascript:;" ref="confirmBtn" onClick={this.confirmClick} className="secoo_btn secoo_btn_default disabled">确定</a>
            </div>
        </div>;
    }
}
SettlementTicketCreate.defaultProps = {};
SettlementTicketCreate.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementTicketCreate;
