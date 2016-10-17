let CommWap = {
  setCookie: function (name, value, domain, path, time) {
    var Days = 300;
    var exp = new Date();
    if (time) {
      exp = time;
    } else {
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    }
    document.cookie = name + "=" + value + ";expires=" + exp.toGMTString() + (!!domain ? ";domain=" + domain : "") + ";path=" + (path ? path : "/");
  },

// 读取cookies
  getCookie: function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
  },
// 删除cookies
  delCookie: function (name, domain, path) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + (domain ? ";domain=" + domain : window.location.host) + ";path=" + (path ? path : "/");
  },
  getQueryString:function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  },
  setSettlemntParam:function(params){
      var _t=this;
      var cart=_t.getQueryString('cart'),returnPar='';
    cart=cart?cart:'{"cartType":"","shippingParam":{},"aid":"5","ticketParam":{},"customsParam":{},"invoiceParam":{}}';
      try{
        cart=decodeURIComponent(cart);
        var base=$.extend(JSON.parse(cart),params);
        returnPar=JSON.stringify(base);

      }catch (e){
        returnPar=cart
      }
      return returnPar;
  }

}
module.exports=CommWap;
