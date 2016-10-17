/**
 * Created by zhengHu on 16-10-8.
 * 图片list处理
 */
import React from 'react';
import webCommon from 'actions/common';
class SettlementCreateAddress extends React.Component {
  clickAction(){
      if(this.props.data.onlyPickup){//自体联系人
          this.props.callForm('1');
      }else{
          window.location.href='http://m.secoo.com/appActivity/mShipAddress.shtml?cart='+decodeURIComponent(webCommon.getQueryString('cart'));
      }
  }
  render() {
    let classArray=['cell','clell_border'],classes='',datas=this.props.data,btnJson={'img':'http://mpic.secooimg.com/images/2016/09/27/kongdizhi@2x1.png','des':'您还没有收货地址，点击这里添加'};
    if(datas.onlyPickup){
      classArray.push('ziti-add-section');
      btnJson.img='http://mpic.secooimg.com/images/2016/09/27/konglianxi@2x.png';
      btnJson.des='您还没有自提联系人信息，点击这里添加';
      btnJson.type=1;
    }else{
      classArray.push('address-add-section');
    }
    classes=classArray.join(' ');

    return (
      <a className={classes} href='javascript:;' onClick={()=>this.clickAction()}>
        <div>
          <div className='info'>
            <div><img src={btnJson.img}/></div>
            <span>{btnJson.des}</span>
          </div>
        </div>
        <span className='secoo_icon_next in_pl'></span>
      </a>
    );
  }
}
SettlementCreateAddress.defaultProps = {

};
export default SettlementCreateAddress;
