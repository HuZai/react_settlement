/**
 * Created by zhengHu on 16-10-8.
 * 单条信息展示组件
 */
import React from 'react';

class SettlementInput extends React.Component {
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
