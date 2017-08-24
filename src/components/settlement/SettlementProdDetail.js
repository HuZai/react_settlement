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
  specialMessage(){
    let tips='',message='',dataS=this.props.data.commonCartItems[0];// 此特例品不参与会员折扣活动 此特例品不参与优惠券和会员折扣活动
    if(dataS.isSpecialProductAsTicket || dataS.isSpecificForUserDiscount){
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
    return {'message':message}
  }
  specialProd(){
    let presentCartItems=this.props.data.presentCartItems;
    let special=[];
    if(presentCartItems && presentCartItems.length>0){
      for(let j = 0; j < presentCartItems.length; j++){
        special.push(
          <div className="pro-info-second">
            <div className="info-gift">[赠品] {presentCartItems[j].name}</div>
            <div className="info-count">x{presentCartItems[j].quantity}</div>
          </div>
        );
      }
    }
    return special;
  }
  isSpecial(){
    let datas=this.props.data.commonCartItems[0],prodBox=[];
    if(datas){
        if(datas.isSpecialProductAsTicket || datas.isSpecificForUserDiscount){
            prodBox.push(
              <div className='info-special' onClick={() => this.handleClick(this.specialMessage().message)}>
                特例品 <span className='secoo_icon_Artboard-3'>
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                </span>
              </div>

            )
        }
    }
    return prodBox;
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
              {this.isSpecial()}
              <div className='info-amount'>{dataS.nowPrice}</div>
            </div>
          </div>
        </div>
        {this.specialProd()}
      </div>
    );
  }
}
SettlementProdDetail.defaultProps = {
};
export default SettlementProdDetail;
