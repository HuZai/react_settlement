/**
 * Created by zhengHu on 16-10-8.
 */
import React from 'react';
import SettlementTextList from 'components/settlement/TextList';
import BtnBarA from 'components/settlement/BtnBarA';
import BtnBarDiv from 'components/settlement/BtnBarDiv';
import SettlementImgList from 'components/settlement/SettlementImgList';
import SettlementProdDetail from 'components/settlement/SettlementProdDetail';
import SettlementCreateAddress from 'components/settlement/SettlementAddress/SettlementCreateAddress';
import SettlementAddressInfo from 'components/settlement/SettlementAddress/SettlementAddressInfo';
import SettlementFooter from 'components/settlement/SettlementFooter';
import Shade from 'components/settlement/Shade';
import ShadeForm from 'components/settlement/ShadeForm';
import {Router,Route,History} from 'react-router';
import webCommon from 'actions/common';

import settementAction from '../actions/settementAction';

class Settlement extends React.Component {
  constructor(props) {
    super(props);
    this.state={retCode:0,cart:{}};
    this.cartParam='{"cartType":"","shippingParam":{},"aid":"5","ticketParam":{},"customsParam":{},"invoiceParam":{},"deliverTypeParam":{}}';
    this.closeOther=this.closeOther.bind(this);
    this.callForm=this.callForm.bind(this);
    this.saveAddressClick=this.saveAddressClick.bind(this);
    this.addressUpdate=this.addressUpdate.bind(this);
    this.btnClick=this.btnClick.bind(this);
    console.log("--init--");
  }
  init(){
    let dataJson=this.state;
    let items=[],footerPrice=[],otherItems=[];
    if(dataJson && dataJson.retCode==0){
      //配送方式
        if(dataJson.deliverType){
          items.push(
              <BtnBarA data={{'name':'配送方式','text':dataJson.deliverType.valueDesc,rightFixed:true,isFrist:true,clickType:'0'}} btnClick={this.btnClick} key="1"/>
          )
        }
      //收货信息处理
        if(dataJson.shippingInfo){
            if(dataJson.shippingInfo.shippingId){//有收货信息
              items.push(<SettlementAddressInfo data={dataJson.shippingInfo} key='2' addressUpdate={this.addressUpdate} />)
            }else{
              items.push(<SettlementCreateAddress data={dataJson.shippingInfo} key='3'  callForm={this.callForm}/>)
            }
            if(dataJson.otherInfo && dataJson.otherInfo.zitiForm){
              otherItems.push(<ShadeForm data={dataJson.shippingInfo} type='1' saveAddressClick={this.saveAddressClick} closeOther={this.closeOther}/>)
            }
        }
      //身份信息处理
        if(dataJson.customsInfo){
            if(!dataJson.customsInfo.cardNo){
              items.push(<BtnBarA data={{'name':'身份证号','text':'添加收货人身份证号以便清关','gray':true,clickType:'1'}} btnClick={this.btnClick} callForm={()=>this.callForm}/>)
            }else{
              items.push(<BtnBarDiv data={{'name':'身份证号','text':dataJson.customsInfo.cardNo,'hide':true}} />)
            }
            if(dataJson.otherInfo && dataJson.otherInfo.showCardForm){
              otherItems.push(<ShadeForm data={dataJson.customsInfo} type='2' saveAddressClick={this.saveAddressClick} closeOther={this.closeOther}/>)
            }
        }
        items.push(<div className='line-color'></div>)//添加收货分割线
      //优惠券
        if(dataJson.ticket){
          if(dataJson.ticket.canUse){//
            items.push(<BtnBarA data={{'name':'优惠券','text':dataJson.ticket.valueDesc,clickType:'2'}} btnClick={this.btnClick} />)//可单击
          }else{
            items.push(<BtnBarDiv data={{'name':'优惠券','text':dataJson.ticket.valueDesc,'hide':true}} />)//不可单击
          }
        }
        //发票信息
        if(dataJson.invoice){
          if(dataJson.invoice.invoiceTypeList){//是否支持发票(海外商品不支持)
            items.push(<BtnBarA data={{'name':'发票','text':dataJson.invoice.valueDesc,clickType:'3'}} btnClick={this.btnClick}/>)
          }else{
            items.push(<BtnBarDiv data={{'name':'发票','text':dataJson.invoice.valueDesc,'hide':true}} />)
          }
        }
        //商品信息
        if(dataJson.cart.cartItems){
          let titles=dataJson.cart.cartItems.commonCartCount+'件商品';
          if(dataJson.cart.cartItems.commonCartCount>1){//多个商品
            items.push(
              <div className="mt20">
                <BtnBarDiv data={{'name':titles,'text':'','hide':true}} />
                <SettlementImgList data={dataJson.cart.cartItems}/>
              </div>

            )
          }else{//1个商品
            items.push(
              <div className="mt20">
                <BtnBarDiv data={{'name':titles,'text':'','hide':true}} />
                <SettlementProdDetail data={dataJson.cart.cartItems}/>
              </div>
            )
          }
        }
        //结算金额信息
        if(dataJson.cart.prices){
          items.push(
            <SettlementTextList data={dataJson.cart.prices}/>
          )
          footerPrice.push(//底部金额处理
            <SettlementFooter data={dataJson.cart.prices} commitOrder={()=>this.commitOrder()} btnState={this.state.btnState}/>
          )
        }
      return(
        <div className="page-view selected">
          <div className='page-content'>
            {items}
          </div>
          <div>
            {footerPrice}
          </div>
          <Shade />
          {otherItems}
      </div>
      )
    }else{
      alert("商品已提交");
    }
  }

  componentDidUpdate(){
    this.props.location.state=null;
    //let _t=this, cart=webCommon.getQueryString('cart');
    //cart=cart?cart:this.cartParam;
    //settementAction.getData(cart,function(res){
    //  console.log(res);
    //  _t.setState(res);
    //})
  }
  componentDidMount(){
    let dataJson,_t=this;
    //if(this.props.location.state){
    //  dataJson=this.props.location.state.data;
    //  this.setState(dataJson);
    //}else{
     let cart=webCommon.getQueryString('cart');
      cart=cart?cart:this.cartParam;
      settementAction.getData(cart,function(res){
        if(res.retCode==0){
          _t.setState(res);
        }else if(res.retMsg){
          alert(res.retMsg)
        }
        console.log(res);

      })
    //}
  }
  //
  addressUpdate(data){
      if(data && !data.onlyPickup){
        window.location.href='http://m.secoo.com/appActivity/mShipAddress.shtml?cart='+webCommon.setSettlemntParam({"shippingParam":{"shippingId":data.shippingId}});
      }else{
        this.setState({otherInfo:{showCardForm:true}});
      }
  }
  //保存自体地址,身份证信息 表单
  saveAddressClick(data){
    let _t=this;
      if(data.type=="ziti"){
        settementAction.getData(webCommon.setSettlemntParam({"shippingParam":{"shipping":{"name":data.name,"phone":data.phone,"isPickupShipping":true},shippingId:data.shippingId}}),function(res){
          if(res.retCode==0){
            _t.setState(res);
          }else if(res.errMsg){
            alert(res.errMsg)
          }
        })
      }else if(data.type=="card"){
        if(data.cardNo){
          settementAction.getData(webCommon.setSettlemntParam({"customsParam":{"cardNo":data.cardNo}}),function(res){
            if(res.retCode==0){
              _t.setState(res);
            }else if(res.errMsg){
              alert(res.errMsg)
            }
          })
        }
      }

      console.log(data);
  }
  //调起地址保存,身份证件填写 表单
  callForm(type){
    switch (type){
      case '1':
        this.setState({otherInfo:{zitiForm:true}});
            break;
      case '2':
        this.setState({otherInfo:{showCardForm:true}});
    }

  }
  //关闭地址保存,身份证件填写 表单
  closeOther(type){
    this.setState({otherInfo:''});
  }
  //按钮
  btnClick(type){
    let cart=webCommon.getQueryString('cart');
    cart=cart?cart:this.cartParam;
      switch (type){
        case '0'://配送
          this.context.router.push(
            {pathname: '/delivery?cart='+cart,
              state: this.state
            }
          )
            break;
        case '1'://身份证
              this.callForm('2');
              break;
        case '2'://优惠券
          this.context.router.push(
            {pathname: '/SettlementTicketList?cart='+cart,
              state: this.state
            }
          )
          break;
        case '3'://发票
          this.context.router.push(
            {pathname: '/receipt?cart='+cart,
              state: this.state
            }
          )
          break;
      }
  }
  commitOrder(){
    this.setState({btnState:1});
    let _t=this,dataJson=this.state;
    let paramAry = [],chooseDeliverTypes = dataJson.deliverType.chooseDeliverTypes;
    for(let i = 0; i < chooseDeliverTypes.length; i++){
      paramAry[i] = {
        deliverTypeId:chooseDeliverTypes[i].deliverTypeId
      };
      let deliverTypeTempls = chooseDeliverTypes[i].deliverTypeTempls;
      for(let j = 0; j < deliverTypeTempls.length; j++){
        if(deliverTypeTempls[j].isChoose){
          paramAry[i].deliverType = deliverTypeTempls[j].deliverType;
          if(deliverTypeTempls[j].deliverType == 0){
            let pickUpList = deliverTypeTempls[j].pickUpList;
            for(let k = 0; k < pickUpList.length; k++){
              if(pickUpList[k].isChoose){
                paramAry[i].vendorWarehouseId = pickUpList[k].vendorWarehouseId;
              }
            }
          }
        }
      }
    }
    console.log({deliverTypeParam:paramAry});
    let cart={"cartType":"","deliverTypeParam":{},"invoiceParam":{},"shippingParam":{"shippingId":0},"ticketParam":{"ticketId":"-1"}};
    cart.deliverTypeParam=paramAry;
    cart.invoiceParam=dataJson.invoice.invoiceParam;
    cart.shippingParam.shippingId=dataJson.shippingInfo.shippingId;
    cart.ticketParam.ticketId=dataJson.ticket.ticketId;
    console.log(JSON.stringify(cart))
    settementAction.commitData(JSON.stringify(cart),function(res){
      _t.setState({btnState:0});
      if(res.retCode==0){
        window.location.href='http://m.secoo.com/appActivity/mPayment.shtml?orderId='+res.order.orderId+'&prodTotalPrice='+res.order.totalPay;
      }else if(res.retMsg){
        alert(res.retMsg)
      }
    })
  }
  render() {
    console.log("render");
    return (
      this.init()
    );
  }
}
Settlement.contextTypes = {
  router: React.PropTypes.object.isRequired
};
Settlement.defaultProps = {
};
export default Settlement;
