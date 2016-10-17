/**
 * Created by zhengHu on 16-10-8.
 * 图片list处理
 */
import React from 'react';
import SettlementInput from 'components/settlement/SettlementInput';
class SettlementZiTiForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({},this.props.data,{type:"card"});
    this.haddleInput = this.haddleInput.bind(this);
  }
  haddleInput(names,event){
    let jsons={};
    jsons[names]=event.target.value;
    this.setState(jsons);
  }
  componentDidMount(){

  }
  btnClass(){
      let classArray=['secoo_btn','secoo_btn_default'];
      if(this.state.cardNo){

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
          <span className='left-area secoo_icon_guanbi' onClick={()=>this.props.close('card')}></span>输入身份证号
        </div>
        <SettlementInput data={{placeholder:'请输入收货人身份证号',refName:'cardNo',value:datas.cardNo}} ref='name' haddleInput={this.haddleInput}/>
        <a href='javascript:;' className={this.btnClass()}  onClick={()=>this.props.saveAddressClick(datas)} ref="btnZiTi" >确定</a>
      </div>
    );
  }
}
SettlementZiTiForm.defaultProps = {

};
export default SettlementZiTiForm;
