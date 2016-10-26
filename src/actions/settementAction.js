/**
 * Created by zhengHu on 16-10-15.
 */
var SettementData = {
  getData: function (upParams,callback) {
    //http://las.secoo.com/api/cart/confirm?cart={"cartType":"","aid":"5","ticketParam":{},"customsParam":{},"deliverTypeParam":[]}
    //http://las.secoo.com/api/cart/confirm?cart={"cartType":"","shippingParam":{"shippingId":"421206"},"aid":"1","ticketParam":{"ticketId":"47534578"},"customsParam":{},"invoiceParam":{"invoiceType":"-1","invoiceTitle":" "},"deliverTypeParam":[]}&c_upk=c33b86724be5464090d1eabcec07cf8b|14002435405|45e71fd8d4e64cb7ac97294c771c40af|A8F8214D18173560995D1FEA8A6D3490&c_platform-type=2&c_platform=2
    var headerJson={
      'c_upk':getCookie('Sid'),
      'c_app_ver':'5.6.0',
      'c_channel':getCookie('channel'),
      'c_platform_type':'2'
    }
    $.extend(headerJson,{cart: decodeURIComponent(upParams)});
    $.ajax({
      url: "http://las.secoo.com/api/cart/confirm",              //请求地址
      type: "get",                       //请求方式
      data: headerJson,        //请求参数
      dataType: "jsonp",
      success: function (response, xml) {
        // 此处放成功后执行的代码
        //console.log(response)
        callback && callback(response);
      },
      fail: function (status) {

      }
    });
  },
  commitData:function(upParams,callback){
    var headerJson={
      'upk':getCookie('Sid'),
      'c_app_ver':'5.6.0',
      'c_channel':getCookie('channel'),
      'c_platform_type':'2'
    }
   ;
    $.extend(headerJson,{cart: decodeURIComponent(upParams)});
    $.ajax({
      url: "http://las.secoo.com/api/cart/submit",//请求地址
      type: "get", //请求方式
      data: headerJson,//请求参数
      dataType: "jsonp",
      success: function (response) {
        // 此处放成功后执行的代码
        //console.log(response)
        callback && callback(response);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('ajax error');
        callback && callback({redCode:"-1"})
      }
    });
  }
}
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) return unescape(arr[2]);
  else return null;
}


module.exports=SettementData;
