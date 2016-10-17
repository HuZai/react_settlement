/**
 * Created by zhengHu on 16-10-8.
 * 单条信息展示组件
 */
import React from 'react';

class SettlementTextList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {classNames: 'mixin-pops'};
  }
  handleMove(evnet){
    event.stopPropagation();
    event.preventDefault();
  }
  render() {
    let datas=this.props.data,styles='';
    if(datas && datas.none){
      styles={'background': 'none'}
    }
    return (
      <div className={this.state.classNames} style={{styles}} ref="mixin-pops" onTouchMove={this.handleMove}>
      </div>
    );
  }
}
SettlementTextList.defaultProps = {

};
export default SettlementTextList;
