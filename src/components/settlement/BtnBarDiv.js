/**
 * Created by zhengHu on 16-10-8.
 * 条状按钮组件
 */
import React from 'react';
class BtnBar extends React.Component {
  setClassName(){
    let classArray=['cell'];
    if(!this.props.data.isFrist){
      classArray.push('clell_border');
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
  btnType(){
    let type='a';
    if(this.props.data.type==0){
      type='div'
    }
    return type
  }
  render() {
    return (
      <div className={this.setClassName()}  href='javascript:;'>
        <div className='bold'>{this.props.data.name}</div>
        <div className='info'>{this.props.data.text}</div>
        <span className={this.setBtnMark()}></span>
      </div>
    );
  }
}
BtnBar.defaultProps = {
};
export default BtnBar;
