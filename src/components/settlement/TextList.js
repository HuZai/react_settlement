/**
 * Created by zhengHu on 16-10-8.
 * 单条信息展示组件
 */
import React from 'react';
import TextLine from 'components/settlement/TextLine';
import TextSingleLineRed from 'components/settlement/TextSingleLineRed';
class SettlementTextList extends React.Component {
  getAttribute(){
    let classNames=['cell','content'];
    if(this.props.data.top){
      classNames.push('clell_border');
      classNames.push('header')
    }
    return classNames.join(' ');
  }
  render() {
    let data=this.props.data,datas=this.props.data.priceDetail,items=[],otherPrice=[];
    for(var key in datas) {
      items.push(<TextLine data={datas[key]} key={key}/>);
    }
    if(data.otherAmountDesc){
      otherPrice.push(
        <TextSingleLineRed data={{value:data.otherAmountDesc}} key={data.otherAmountDesc}/>
      );
    }
    return (
        <div>
          <TextLine data={{top:true,name:data.totalSecooPriceDesc,value:data.totalSecooPrice,beforeExclusiveSecooPrice:data.beforeExclusiveSecooPrice}} />
          {items}
          {otherPrice}
        </div>
    );
  }
}
SettlementTextList.defaultProps = {

};
export default SettlementTextList;
