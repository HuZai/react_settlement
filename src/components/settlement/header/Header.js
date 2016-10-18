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
  handleClick(){
      this.context.router.goBack();
  }
  render() {
    return (
        <header className="header">
          <div className="back" onClick={()=>this.handleClick()}>
            <div><span className="secoo_icon_back"></span></div>
          </div>
          <div className="content"><div>{this.props.data.title}</div></div>
          <div className="more" onClick={this.props.rightClick}><div><span>{this.props.data.btnDes}</span></div></div>
        </header>
    );
  }
}
 Header.defaultProps = {
};
Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default Header;
