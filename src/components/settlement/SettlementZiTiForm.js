/**
 * Created by zhengHu on 16-10-8.
 * 图片list处理
 */
import React from 'react';
import SettlementInput from 'components/settlement/SettlementInput';
class SettlementZiTiForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({},this.props.data,{type:"ziti"});
    this.haddleInput = this.haddleInput.bind(this);
  }
  haddleInput(names,event){
    let jsons={};
    jsons[names]=event.target.value;
    this.setState(jsons);
  }

  btnClass(){
      let classArray=['secoo_btn','secoo_btn_default'];
      if(this.state.name && this.state.phone){

      }else{
        classArray.push('disabled');
      }
    return classArray.join(' ');
  }
  render() {
    let datas=this.state;
    return (
      <div className='input-pops-item ziti-input selected'>
        <div className='title-line'>
          <span className='left-area secoo_icon_guanbi' onClick={()=>this.props.close('ziti')}></span>自提联系人信息
        </div>
        <SettlementInput data={{placeholder:'请输入自提联系人姓名',refName:'name',value:datas.name,focus:true}} ref='name' haddleInput={this.haddleInput}/>
        <SettlementInput data={{placeholder:'请输入自提联系人手机号',refName:'phone',value:datas.phone}} ref="phone" haddleInput={this.haddleInput}/>
        <a href='javascript:;' className={this.btnClass()}  onClick={this.props.saveAddressClick.bind(this,datas)} ref="btnZiTi" >确定</a>
      </div>
    );
  }
}
SettlementZiTiForm.defaultProps = {

};
export default SettlementZiTiForm;
