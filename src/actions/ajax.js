function ajax(options) {
  options = options || {};
  options.type = (options.type || "GET").toUpperCase();

  options.dataType = options.dataType || "json";
  if(!options.headers){
    var headerJson={
        'upk':getCookie('Sid'),
        'app-ver':'5.6.0',
        'channel':getCookie('channel'),
        'platform-type':'2'
    }
    options.headers=headerJson;
  }
  var headers = options.headers || {}, params = formatParams(options.data);

  //创建 - 非IE6 - 第一步
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  } else { //IE6及其以下版本浏览器
    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  //接收 - 第三步
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  }

  //连接 和 发送 - 第二步
  if (options.type == "GET") {
    xhr.open("GET", options.url + "?" + params, true);
    for(var key in headers){
      xhr.setRequestHeader(key,headers[key])
    }
    xhr.send(null);
  } else if (options.type == "POST") {
    xhr.open("POST", options.url, true);
    //设置表单提交时的内容类型
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    for(var key in headers){
      xhr.setRequestHeader(key,headers[key])
    }
    xhr.send(params);
  }
}
//格式化参数
function formatParams(data) {
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }
  arr.push(("v=" + Math.random()).replace(".",""));
  return arr.join("&");
}
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) return unescape(arr[2]);
  else return null;
}
module.exports=ajax;

