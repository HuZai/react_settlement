/**
 * 激活优惠券组件
 */
import React from 'react';
import webCommon from 'actions/common';
import settementAction from 'actions/settementAction';
class SettlementTicketHeaderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ticketNum:''};
  }
  componentDidMount() {
    this.refs.ticketInput.focus();
  }
  disClick(event) {
    event.stopPropagation();
    event.preventDefault();
  }



  ticketChange(event) {
    this.setState({ticketNum:event.target.value});
    this.refs.confirmBtn.classList.toggle("disabled", event.target.value == "");
  }

  render() {
    return <div className="input-pops selected">
      <div className="input-pops-item ticket-input selected" >
        <div className="title-line">
          <div onClick={this.props.closeForm} className="left-area secoo_icon_guanbi"></div>
          激活优惠券
        </div>
        <input className="mixin-input mt20" onChange={this.ticketChange.bind(this)} type="text" ref="ticketInput"
               placeholder="请输入优惠码" defaultValue={this.state.ticketNum}/>
        <a href="javascript:;" ref="confirmBtn" onClick={this.props.confirmClick.bind(this,this.state)}
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

