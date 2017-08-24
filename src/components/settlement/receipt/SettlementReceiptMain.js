import React from 'react';
import {render} from 'react-dom';
import ReceiptHeader from 'components/settlement/receipt/SettlementReceiptHeader';
import ReceiptLayer from 'components/settlement/receipt/SettlementReceiptLayer';
import ReceiptItem from 'components/settlement/receipt/SettlementReceiptItem';
import webCommon from 'actions/common';
class SettlementReceiptMain extends React.Component {
  constructor(props) {
    super(props);
    // this.state = this.props.data;
    this.state = this.props.location.state.invoice;
  }
  selectItems(invoiceType){
    let data = this.state,
      invoiceTypeList = data.invoiceTypeList;
    data.invoiceParam.invoiceType=invoiceType;
    for(let i = 0; i < invoiceTypeList.length; i++){
      if(invoiceTypeList[i].invoiceType == invoiceType){
        invoiceTypeList[i].isChoose = true;
      }else{
        invoiceTypeList[i].isChoose = false;
      }
    }
    this.setState(invoiceTypeList);
  }
  getSelectData(){
    let data = this.state,
      invoiceTypeList = data.invoiceTypeList;
    for(let i = 0; i < invoiceTypeList.length; i++){
      if(invoiceTypeList[i].isChoose){
        return invoiceTypeList[i];
      }
    }
  }
  receiptSubmit(){ // 提交
    var invoice = this.getSelectData(), invoiceParam={},_t=this;
    if(invoice.invoiceType == 1){
      invoiceParam.invoiceTitle=this.refs.companyInput.value;
      invoiceParam.invoiceNorCode=this.refs.NorCodeInput.value;
      if(invoiceParam.invoiceTitle.length<2 || invoiceParam.invoiceNorCode.length==0){
        return;
      }
    }
    invoiceParam.invoiceType=invoice.invoiceType;
    _t.context.router.replace(
      {pathname: '/index.html',
        query: { cart: webCommon.setSettlemntParam({"invoiceParam":invoiceParam})}
        //state: {shippingInfo:{zitiForm:false},customsInfo:{showCardForm:false}}
      }
    )
  }
  companyChange(){
      let datas=this.state,invoiceTypeList = datas.invoiceTypeList;
      for(let i = 0; i < invoiceTypeList.length; i++){
        if(invoiceTypeList[i].invoiceType=='1'){
          invoiceTypeList[i].invoiceTitle=this.refs.companyInput.value;
        }
      }
    datas.invoiceParam.invoiceTitle=this.refs.companyInput.value;
    this.setState(datas);
  }
  codeInput(){
     var codeVal = this.refs.NorCodeInput.value.replace(/\s/g, "");
    codeVal = codeVal.replace(/[\u4e00-\u9fa5]/g,"");
     // if(codeVal.length > 20){
     //    codeVal = codeVal.substr(0,20);
     // }
    this.refs.NorCodeInput.value = codeVal;
  }
  NorCodeChange() {
    let datas=this.state,invoiceParam = datas.invoiceParam;
    invoiceParam.invoiceNorCode=this.refs.NorCodeInput.value;
    this.setState(datas);
  }
  setBtnState(){
      let btnClass=['secoo_btn','secoo_btn_default'];
      if(this.state.invoiceParam.invoiceType=='1'){
        if(!(this.state.invoiceParam.invoiceTitle && this.state.invoiceParam.invoiceTitle.length>1) || !(this.state.invoiceParam.invoiceNorCode && this.state.invoiceParam.invoiceNorCode.length>0)){
          btnClass.push('disabled')
        }

      }
    return btnClass.join(' ');
  }
  receiptLayerClick() { // 纳税人识别号说明
    render(
    <ReceiptLayer data={this.state}/>,
    document.getElementById("receipt-layer"));
  }
  render(){
    let data = this.state,
      invoiceTypeList = data.invoiceTypeList,
      invoiceParam = data.invoiceParam,
      receiptItems = [];
    for(let i = 0; i < invoiceTypeList.length;i++){
      let company = invoiceTypeList[i].invoiceType == 1;
      receiptItems.push(
        <ReceiptItem data={invoiceTypeList[i]} selectItems={this.selectItems.bind(this)}/>
      );
      if(company && invoiceTypeList[i].isChoose){
        receiptItems.push(
          <div className="company-input selected">
            <input className="mixin-input" defaultValue={invoiceTypeList[i].invoiceTitle} onInput={()=>this.companyChange()} ref="companyInput" type="text" placeholder="请输入公司发票抬头"/>
            <div className="invoiceNorCode">
            <input className="mixin-input" defaultValue={invoiceParam.invoiceNorCode} onInput={()=>this.codeInput()} onChange={()=>this.NorCodeChange()} ref="NorCodeInput" type="text" placeholder="请输入纳税人识别号"/>
            <div onClick={this.receiptLayerClick.bind(this)}></div>
            </div>
          </div>
        );
      }
    }
    // 存在海外商品
    let tipsHtml = data.subTitle?<div className="cell tips red" style={{background:'transparent'}}><div>{data.subTitle}</div></div>:undefined;
    return (
      <div className="page-view selected">
        <header className="header"><ReceiptHeader/></header>
        <div className="page-content">
          <div className={tipsHtml?"":"mt20"}>
            {tipsHtml}
            {receiptItems}
            <div className="receipt-page-btn">
              <a href="javascript:;" onClick={this.receiptSubmit.bind(this)} className={this.setBtnState()}>提交</a>
            </div>
          </div>
        </div>
        <div id="receipt-pops"></div>
        <div id="receipt-layer"></div>
      </div>
    )
  }
}
SettlementReceiptMain.defaultProps = {};
SettlementReceiptMain.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementReceiptMain;
