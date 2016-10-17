// 配送方式 商品列表
import React from 'react';
class SettlementDeliveryProList extends React.Component {
  render() {
    let items=[],datas = this.props.cartItems;
    for(var key in datas){
      items.push(<img src={datas[key].image} />);
    }
    return (
      <div className='img_box clell_border'>
        <div className='float_div'></div>
        <div className='cell img_list'>
          {items}
        </div>
      </div>
    );
  }
}
SettlementDeliveryProList.defaultProps = {};
SettlementDeliveryProList.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default SettlementDeliveryProList;
