/**
 * Created by zhengHu on 16-10-8.
 */
import React from 'react';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state={data:{test:'test'}};
  //  this.props.location.state  location.state;
  }
  text(){
    this.context.router.replace(
      {pathname: '/',
        query: { modal: true },
        state: this.state
      }
    )
  }
  goOut(){
    window.location.href="http://m.secoo.com/";
  }
  back(){
    this.props.history.goBack()
  }
  render() {
    return (
      <div>
        <header className="header">
          <div className="back">
            <div><span className="secoo_icon_back"></span></div>
          </div>
          <div className="content"><div>{this.props.title}33</div></div>
          <div className="more"></div>
        </header>
        <div className="d" onClick={()=>this.text()}>选择后返回
        </div>
        <div className="d" onClick={()=>this.back()}>历史返回
        </div>
        <div className="d" onClick={()=>this.goOut()}>
          跳出
        </div>
        </div>
    );
  }
}
 Header.defaultProps = {
};
Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default Header;
