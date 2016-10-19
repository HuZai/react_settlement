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
import Header from 'components/settlement/header/Header';
import InvalideProList from 'components/settlement/InvalideProList';
class Settlement extends React.Component {
  constructor(props) {
    super(props);
    this.state=this.props.location.state? this.props.location.state:{retCode:0,isLoading:true,cart:{}};
    this.cartParam='{"cartType":"","shippingParam":{},"aid":"5","ticketParam":{},"customsParam":{},"invoiceParam":{},"deliverTypeParam":{}}';
    this.closeOther=this.closeOther.bind(this);
    this.callForm=this.callForm.bind(this);
    this.saveAddressClick=this.saveAddressClick.bind(this);
    this.addressUpdate=this.addressUpdate.bind(this);
    this.btnClick=this.btnClick.bind(this);
  }
  init(){
    let dataJson=this.state;
    let items=[],footerPrice=[],otherItems=[];
    if(dataJson && dataJson.retCode==0){
        items.push(<div className="mt20"></div>);
        if(dataJson.isLoading){
          items.push(
            <Shade data={{transparent:true}} ref="shadeBOX"/>
          )
        }
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
              otherItems.push(<ShadeForm data={dataJson.shippingInfo} type='1' saveAddressClick={this.saveAddressClick} closeOther={this.closeOther} key='1_1'/>)
            }
        }
      //身份信息处理
        if(dataJson.customsInfo){
            if(!dataJson.customsInfo.cardNo){
              items.push(<BtnBarA data={{'name':'身份证号','text':'添加收货人身份证号以便清关','gray':true,clickType:'1'}} btnClick={this.btnClick} callForm={()=>this.callForm} key='4'/>)
            }else{
              items.push(<BtnBarDiv data={{'name':'身份证号','text':dataJson.customsInfo.cardNo,'hide':true}} key='5' />)
            }
            if(dataJson.otherInfo && dataJson.otherInfo.showCardForm){
              otherItems.push(<ShadeForm data={dataJson.customsInfo} type='2' saveAddressClick={this.saveAddressClick} closeOther={this.closeOther} key='1_2'/>)
            }
        }
        items.push(<div className='line-color' key='line1'></div>)//添加收货分割线
      //优惠券
        if(dataJson.ticket){
          if(dataJson.ticket.canUse){//
            items.push(<BtnBarA data={{'name':'优惠券','text':dataJson.ticket.valueDesc,clickType:'2',hasMarTop:true,isFrist:true}} btnClick={this.btnClick} key='6'/>);//可单击
          }else{
            items.push(<BtnBarDiv data={{'name':'优惠券','text':dataJson.ticket.valueDesc,'hide':true,hasMarTop:true,isFrist:true}} key='7'/>);//不可单击
          }
        }
        //发票信息
        if(dataJson.invoice){
          if(dataJson.invoice.invoiceTypeList){//是否支持发票(海外商品不支持)
            items.push(<BtnBarA data={{'name':'发票','text':dataJson.invoice.valueDesc,clickType:'3'}} btnClick={this.btnClick} key='8'/>)  ;
          }else{
            items.push(<BtnBarDiv data={{'name':'发票','text':dataJson.invoice.valueDesc,'hide':true}} key='9' />);
          }
        }
        //商品信息
        if(dataJson.cart.cartItems){
          let titles=dataJson.cart.cartItems.commonCartCount+'件商品';
          if(dataJson.cart.cartItems.commonCartCount>1){//多个商品
            items.push(
              <div className="mt20">
                <BtnBarDiv data={{'name':titles,'text':'','hide':true,isFrist:true}} key='10'/>
                <SettlementImgList data={dataJson.cart.cartItems} key='10_1' btnClick={()=>this.btnClick('4')}/>
              </div>

            )
          }else{//1个商品
            items.push(
              <div className="mt20">
                <BtnBarDiv data={{'name':titles,'text':'','hide':true,isFrist:true}} key='11'/>
                <SettlementProdDetail data={dataJson.cart.cartItems} key='11_1'/>
              </div>
            )
          }
        }
        //结算金额信息
        if(dataJson.cart.prices){
          items.push(
            <SettlementTextList data={dataJson.cart.prices} key='12'/>
          );
          footerPrice.push(//底部金额处理
            <SettlementFooter data={dataJson.cart.prices} commitOrder={()=>this.commitOrder()} btnState={this.state.btnState} key='13'/>
          );
        }
        items.push(<div className="mt20"></div>);
        //无效商品
        if(dataJson.otherInfo && dataJson.otherInfo.exceptionInventoryList){
          otherItems.push(<InvalideProList data={{exceptionInventoryList:dataJson.otherInfo.exceptionInventoryList}} closeOther={this.closeOther} key='13'/>)
        }
      return(
        <div className="page-view selected">
          <Header data={{title:'结算中心'}} key='header_0'/>
          <div className='page-content' key='box'>

            {items}
          </div>
          <div>
            {footerPrice}
          </div>

          {otherItems}

      </div>
      )
    }else{
      alert(dataJson.retMsg);
    }
  }
  dataPriceAction(data){
    function formatNum(num, n){

      var numStr = num.toString(),
        pointIndex = numStr.indexOf('.'),
        beforePoint,
        afterPoint;
      if(pointIndex < 0){
        beforePoint = numStr;
        afterPoint = '';
      }else{
        beforePoint = numStr.substring(0, pointIndex);
        if(typeof n == 'undefined'){
          afterPoint = numStr.substring(pointIndex);
        }else{
          afterPoint = numStr.substring(pointIndex, pointIndex + n + 1);
        }
      }
      var re = /(-?\d+)(\d{3})/;
      while(re.test(beforePoint)){
        beforePoint = beforePoint.replace(re,"$1,$2");
      }
      return beforePoint + afterPoint;
    }
    data.cart.prices.totalSecooPrice='￥'+formatNum(data.cart.prices.totalSecooPrice,2);
    data.cart.prices.realCurrentTotalPrice='￥'+formatNum(data.cart.prices.realCurrentTotalPrice,2);
    if(data.cart.prices.totalFavoredAmount){
      data.cart.prices.totalFavoredAmount='￥'+formatNum(data.cart.prices.totalFavoredAmount,2);
    }
    for(var key in data.cart.cartItems.commonCartItems){
      data.cart.cartItems.commonCartItems[key].nowPrice='￥'+formatNum(data.cart.cartItems.commonCartItems[key].nowPrice,2);
    }
    return data;
  }
  componentDidUpdate(){
    this.props.location.state=null;
    //let _t=this, cart=webCommon.getQueryString('cart');
    //cart=cart?cart:this.cartParam;
    //settementAction.getData(cart,function(res){
    //  console.log(res);
    //  _t.setState(res);
    //})
    console.log('update------')
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
          res=_t.dataPriceAction(res);
          res.isLoading=false;
          _t.setState(res);
        }else if(res.retMsg){
          alert(res.retMsg)
        }
      })
    //}
  }
  //
  addressUpdate(data){
      if(data && !data.onlyPickup){
        window.location.href='http://m.secoo.com/appActivity/mShipAddress.shtml?cart='+webCommon.setSettlemntParam({"shippingParam":{"shippingId":data.shippingId}});
      }else{
        this.setState({otherInfo:{zitiForm:true}});
      }
  }
  //保存自体地址,身份证信息 表单
  saveAddressClick(data){
    let _t=this;
      if(data.type=="ziti"){
        settementAction.getData(webCommon.setSettlemntParam({"shippingParam":{"shipping":{"name":data.name,"phone":data.phone,"isPickupShipping":true},shippingId:data.shippingId}}),function(res){
          if(res.retCode==0){
            res.otherInfo={};
            _t.setState(res);
          }else if(res.errMsg){
            alert(res.errMsg)
          }
        })
      }else if(data.type=="card"){
        if(data.cardNo){
          settementAction.getData(webCommon.setSettlemntParam({"customsParam":{"cardNo":data.cardNo}}),function(res){
            if(res.retCode==0){
              res.otherInfo={};
              _t.setState(res);
            }else if(res.errMsg){
              alert(res.errMsg)
            }
          })
        }
      }
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
    if(type && type=='faild'){
      window.history.replaceState('', "", "/shoppingCart.html");
      window.history.go();
    }
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
        case '4'://多组商品列表
          this.context.router.push(
            {pathname: '/SettlementProList?cart='+cart,
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
    let cart={"aid":"5","cartType":"","deliverTypeParam":{},"invoiceParam":{},"shippingParam":{"shippingId":0},"ticketParam":{"ticketId":"-1"}};
    cart.deliverTypeParam=dataJson.deliverType.deliverTypeParam;
    cart.invoiceParam=dataJson.invoice.invoiceParam;
    cart.shippingParam.shippingId=dataJson.shippingInfo.shippingId;
    cart.ticketParam.ticketId=dataJson.ticket.ticketId;
    let res={exceptionInventoryList:[{"image":"http://pic11.secooimg.com/product/500/500/20/46/15932046.jpg","productId":15932046,"quantity":1,"name":"GUCCI/古驰女士帆布时尚印花单肩包400249KHNRN9674","status":0},{"image":"http://pic11.secooimg.com/product/500/500/20/46/15932046.jpg","productId":15932046,"quantity":1,"name":"GUCCI/古驰女士帆布时尚印花单肩包400249KHNRN9674","status":0},{"image":"http://pic11.secooimg.com/product/500/500/20/46/15932046.jpg","productId":15932046,"quantity":1,"name":"GUCCI/古驰女士帆布时尚印花单肩包400249KHNRN9674","status":0}]};
    //_t.setState({otherInfo:{exceptionInventoryList:res.exceptionInventoryList}});
    //return false ;
    settementAction.commitData(JSON.stringify(cart),function(res){
      _t.setState({btnState:0});
      if(res.retCode==0){
        if(res.exceptionInventoryList && res.exceptionInventoryList.length>0){
             _t.setState({otherInfo:{exceptionInventoryList:res.exceptionInventoryList}});
        }else{
          //window.location.href='http://m.secoo.com/appActivity/mPayment.shtml?orderId='+res.order.orderId+'&prodTotalPrice='+res.order.totalPay;
          window.history.replaceState('', "", "/appActivity/mPayment.shtml?orderId="+res.order.orderId+'&prodTotalPrice='+res.order.totalPay);
          window.history.go();
        }
      }else if(res.retMsg){
          alert(res.retMsg)
      }
    })
  }
  render() {
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
