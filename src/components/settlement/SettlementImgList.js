/**
 * Created by zhengHu on 16-10-8.
 * 图片list处理
 */
import React from 'react';
class SettlementImgList extends React.Component {
  setClass(){
    let classNames='float_div more hide';
    if(this.props.data.commonCartCount>4){
      classNames='float_div more';
    }
    return classNames;
  }
  render() {
    let items=[],datas=this.props.data.commonCartItems;
    for(var key in datas){
      items.push(<img src={datas[key].image} key={datas[key].productId} />);
    }
    return (
      <div className='img_box clell_border'>
        <div className='float_div'></div>
        <div className='cell img_list'>
          {items}
        </div>
        <div className={this.setClass()}>
          <span className='secoo_icon_next in_pl'></span>
        </div>
      </div>
    );
  }
}
SettlementImgList.defaultProps = {

};
export default SettlementImgList;
