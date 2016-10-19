/**
 * Created by zhengHu on 16-10-8.
 * 条状按钮组件
 */
import React from 'react';
class BtnBar extends React.Component {
  setClassName(){
    let classArray=['cell'];
    if(!this.props.data.isFrist){//是否是第一个
      classArray.push('clell_border');
    }
    if(this.props.data.hasMarTop){
      classArray.push('mt20');
    }
    if(this.props.data.rightFixed){//右侧固定大小
      classArray.push('delivery-area');
    }
    return classArray.join(' ');
  }
  setBtnMark(){
    let classArray=['secoo_icon_next','in_pl'];
    if(this.props.data.hide){
      classArray.push('hide');
    }
    return classArray.join(' ');
  }
  setDesc(){
    let classArray=['info'];
    if(this.props.data.gray){
      classArray.push('gray');
    }
    return classArray.join(' ');
  }
  btnType(){
    let type='a';
    if(this.props.data.type==0){
      type='div'
    }
    return type
  }
  render() {
    return (
      <a className={this.setClassName()}  href='javascript:;' onClick={()=>this.props.btnClick(this.props.data.clickType)}>
        <div className='bold'>{this.props.data.name}</div>
        <div className={this.setDesc()}>{this.props.data.text}</div>
        <span className={this.setBtnMark()}></span>
      </a>
    );
  }
}
BtnBar.defaultProps = {
};
export default BtnBar;
