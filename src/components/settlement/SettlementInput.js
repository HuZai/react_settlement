/**
 * Created by zhengHu on 16-10-8.
 * 单条信息展示组件
 */
import React from 'react';

class SettlementInput extends React.Component {
  componentDidMount() {
    console.log(this.props.data.focus)
    if(this.props.data.focus && this.props.data.refName){
      this.refs[this.props.data.refName].focus();
    }
  }
  render() {
    let datas=this.props.data;
    return (
      <input className='mixin-input mt20' type='text' placeholder={datas.placeholder} ref={datas.refName} defaultValue={datas.value} onInput={this.props.haddleInput.bind(this,datas.refName)}/>
    );
  }
}
SettlementInput.defaultProps = {

};
export default SettlementInput;
