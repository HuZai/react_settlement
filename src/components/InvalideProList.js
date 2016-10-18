// 失效商品列表
import React from 'react';
class InvalideProList extends React.Component{
  constructor(props){
    super(props)
    this.state = {exceptionInventoryList:[{
      "image":"http://pic11.secooimg.com/product/500/500/20/46/15932046.jpg",
      "productId":15932046,
      "quantity":1,
      "name":"GUCCI/古驰女士帆布时尚印花单肩包400249KHNRN9674",
      "status":0
    }]};
  }
  closePops(){
    console.log("关闭");
  }
  render(){
    let proListAry = [],exceptionInventoryList = this.state.exceptionInventoryList;
    for(let i = 0; i < exceptionInventoryList.length; i ++){
      proListAry.push(
        <li>
          <div className="pro-icon"><img src={exceptionInventoryList[i].image}/></div>
          <div className="pro-info">
            <div className="pro-title">{exceptionInventoryList[i].name}</div>
            <div className="pro-count">数量:<span>x{exceptionInventoryList[i].quantity}</span></div>
          </div>
        </li>
      );
    }
    return <div className="mixin-pops selected">
      <div className="mixin-pops-item stockOut-list selected">
        <div className="pro-tips">以下商品暂时缺货，无法提交订单</div>
        <div className="pro-list">
          <ul className={proListAry.length == 3?"more-scroll":""}>
            {proListAry}
          </ul>
        </div>
        <div className="mixin-border pops-confirm-btn" onClick={this.closePops}>确定</div>
      </div>
    </div>;
  }
}
InvalideProList.defaultProps = {};
InvalideProList.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default InvalideProList;
