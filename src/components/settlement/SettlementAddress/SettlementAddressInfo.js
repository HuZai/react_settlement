/**
 * Created by zhengHu on 16-10-8.
 * 图片list处理
 */
import React from 'react';
class SettlementAddressInfo extends React.Component {
  render() {
    let classArray=['cell','clell_border'],classes='',datas=this.props.data,title='收货人信息';
    if(datas.onlyPickup){
      classArray.push('ziti-section');
      title='自提联系人';
    }else{
      classArray.push('address-section');
    }
    classes=classArray.join(' ');
    return (
    <a className={classes}  href='javascript:;' onClick={()=>this.props.addressUpdate(datas)}>
      <div>
        <div className='bold'>{title}</div>
        <div className='info'>
          <div className='user-info'>{datas.name}  {datas.phone}</div>
          <div className={datas.onlyPickup?'user-address hide':'user-address'}>{datas.address}</div>
        </div>
      </div>
      <span className='secoo_icon_next in_pl'></span>
    </a>
    );
  }
}
SettlementAddressInfo.defaultProps = {

};
export default SettlementAddressInfo;
