/**
 * Created by zhengHu on 16-10-8.
 * 商品详情展示
 */
import React from 'react';
class SettlementProdDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick(message){//单击弹框处理
    alert(message);
  }
  specialProd(){
    let tips='',message='',dataS=this.props.data.commonCartItems[0];// 此特例品不参与会员折扣活动 此特例品不参与优惠券和会员折扣活动
    if(dataS.isSpecialProductAsTicket || dataS.isSpecificForUserDiscount){
        tips='特殊商品';
        if(dataS.isSpecialProductAsTicket){
            if(dataS.isSpecificForUserDiscount){
              message='此特例品不参与优惠券和会员折扣活动';
            }else{
              message='此特例品不参与优惠券活动';
            }
        }else{
              message='此特例品不参与会员折扣活动';
        }
    }
    return {'tips':tips,'message':message}
  }
  render() {
    let dataS=this.props.data.commonCartItems[0];
    return (
      <div className="pro-section clell_border link-page-view" name="pro-page-view">
        <div className="pro-info-first">
          <div className='info-icon'><img src={dataS.image} /></div>
          <div className='info-box'>
            <div>
              <div className='info-title'>{dataS.name}</div>
              <div className='info-mixin'>数量:x{dataS.quantity}{dataS.spec}</div>
            </div>
            <div className='info-wrap'>
              <div className='info-special' onClick={() => this.handleClick(this.specialProd().message)}>{this.specialProd().tips}<span className={this.specialProd().tips?'secoo_icon_Artboard-3':''}></span></div>
              <div className='info-amount'>{dataS.nowPrice}</div>
            </div>
          </div>
        </div>
        <div className="pro-info-second hide">
          <div className="info-gift">[赠品] Michael Kors/迈克·科尔斯 纯皮女款笑脸包提包黑色手提色手提手提包黑色手提</div>
          <div className="info-count">x1</div>
        </div>
      </div>
    );
  }
}
SettlementProdDetail.defaultProps = {
};
export default SettlementProdDetail;
