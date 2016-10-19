/**
 * Created by zhengHu on 16-10-8.
 */
import React from 'react';
class SettlementFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state =this.props.btnState?this.props.btnState:{btnState:0};
    //this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {//父级组件 传值变化是 触发
    //console.log(nextProps.btnState)
    this.setState({btnState:nextProps.btnState});
  }

  btnDiv(){
    let btn=[];
    if(this.state.btnState==0){//可单击
      btn.push(<span>提交</span>);
    }else if(this.state.btnState==1){//提交中。。。
      btn.push(<span>提交...</span>);
    }else {
      btn.push(<span>提交</span>);
    }
    return btn;
  }
  render() {
    let data=this.props.data,price=[];
    if(data.totalFavoredAmount){
      price.push(<div className="pref-amount" key="totalFavoredAmount">优惠金额：{data.totalFavoredAmount}</div>);
    }
    return (
      <div className="footer-section">
        <div className="footer-section-fixed">
          <div>
            <div className="pay-amount">{data.realCurrTotalPriceDesc}{data.realCurrentTotalPrice}</div>
            {price}
          </div>
          <div id="submit-order-btn" onClick={()=>this.props.commitOrder()}>{this.btnDiv()}</div>
        </div>
      </div>
    );
  }
}
SettlementFooter.defaultProps = {

};
export default SettlementFooter;
