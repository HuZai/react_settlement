/**
 * Created by zhengHu on 16-10-15.
 */
var SettementData = {
  getData: function (upParams,callback) {
    var headerJson={
      'c_upk':getCookie('Sid'),
      'c_app_ver':'5.6.0',
      'c_channel':getCookie('channel'),
      'c_platform_type':'2'
    }
    $.extend(headerJson,{cart: decodeURIComponent(upParams)});
    $.ajax({
      url: "/api/cart/confirm",              //请求地址
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
      url: "/api/cart/submit",//请求地址
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
