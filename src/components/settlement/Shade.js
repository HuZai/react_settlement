/**
 * Created by zhengHu on 16-10-8.
 * 单条信息展示组件
 */
import React from 'react';

class SettlementTextList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {classNames: 'mixin-pops selected'};
  }

  handleMove(evnet) {
    console.log(evnet);
    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    let datas = this.props.data, styles = '';
    if (datas && datas.transparent) {
      styles = {'background': 'none'}
    }
    return (
      <div className={this.state.classNames} style={styles} ref="mixin-pops" onTouchMove={this.handleMove.bind(this)}>
      </div>
    );
  }
}
SettlementTextList.defaultProps = {};
export default SettlementTextList;
