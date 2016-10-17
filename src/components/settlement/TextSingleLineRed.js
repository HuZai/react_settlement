/**
 * Created by zhengHu on 16-10-8.
 * 单条信息展示组件
 */
import React from 'react';

class TextSingleLineRed extends React.Component {
  render() {
    let data=this.props.data;
    return (
      <div className='cell clell_border tips red'>
        <div>{data.value}</div>
      </div>
    );
  }
}
TextSingleLineRed.defaultProps = {

};
export default TextSingleLineRed;
