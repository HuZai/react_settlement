/**
 * Created by zhengHu on 16-10-8.
 * 单条信息展示组件
 */
import React from 'react';
import SettlementZiTiForm from '../../components/settlement/SettlementZiTiForm';
import SettlementCardNoForm from '../../components/settlement/SettlementCardNoForm';
class ShadeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {classNames: 'input-pops selected'};
  }
  handleMove(evnet){
    event.stopPropagation();
    event.preventDefault();
    return false;
  }
  render() {
    let datas=this.props.data,type=this.props.type,componentsArray=[];
    console.log(type);
    switch (type){
      case '1'://自体联系人 新增修改
        componentsArray.push(
          <SettlementZiTiForm data={datas} key="SettlementZiTiForm" saveAddressClick={this.props.saveAddressClick} close={this.props.closeOther}/>
        )
            break;
      case '2'://身份证

            componentsArray.push(
              <SettlementCardNoForm data={datas} key="SettlementCardNoForm" saveAddressClick={this.props.saveAddressClick} close={this.props.closeOther}/>
            );
            break;
    }
    return (
      <div className={this.state.classNames} ref="input-pops" onTouchMove={this.handleMove}>
        {componentsArray}
      </div>
    );
  }
}
ShadeForm.defaultProps = {

};
export default ShadeForm;
