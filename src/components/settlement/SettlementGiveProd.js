/**
 * Created by zhengHu on 16-10-8.
 * 赠送商品展示
 */
import React from 'react';
class SettlementGiveProd extends React.Component {
  render() {
    return (
      <div className='pro-info-second'>
        <div className='info-gift'>{this.props.name}</div>
        <div className='info-count'>x{this.props.quantity}</div>
      </div>
    );
  }
}
SettlementGiveProd.defaultProps = {
};
export default SettlementGiveProd;
