/**
 * Created by zhengHu on 16-10-8.
 * 单条信息展示组件
 */
import React from 'react';

class SettlementTextList extends React.Component {
  getAttribute(){
    let classNames=['cell','content'];
    if(this.props.data.top){
      classNames.push('clell_border');
      classNames.push('header')
    }
    return classNames.join(' ');
  }
  render() {
    let datas=this.props.data;
    return (
      <div className={this.getAttribute()}>
        <div>{datas.name}</div>
        <div className="info">
          <span className="phone-amount">{datas.beforePrice?datas.beforePrice:''}</span>
          {datas.value}
        </div>
      </div>
    );
  }
}
SettlementTextList.defaultProps = {

};
export default SettlementTextList;
