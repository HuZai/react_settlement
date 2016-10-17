/**
 * Created by zhengHu on 16-10-15.
 */
/**
 * 发送一个ajax请求
 * @author: allstar, erik, berg
 * @name ajax.request
 * @function
 * @grammar ajax.request(url[, options])
 * @param {string}     url 发送请求的url
 * @param {Object}     options 发送请求的选项参数
 * @config {String}     [method]             请求发送的类型。默认为GET
 * @config {Boolean}  [async]             是否异步请求。默认为true（异步）
 * @config {String}     [data]                 需要发送的数据。如果是GET请求的话，不需要这个属性
 * @config {Object}     [headers]             要设置的http request header
 * @config {number}   [timeout]       超时时间，单位ms
 * @config {String}     [username]             用户名
 * @config {String}     [password]             密码
 * @config {Function} [onsuccess]         请求成功时触发，function(XMLHttpRequest xhr, string responseText)。
 * @config {Function} [onfailure]         请求失败时触发，function(XMLHttpRequest xhr)。
 * @config {Function} [onbeforerequest]    发送请求之前触发，function(XMLHttpRequest xhr)。
 *
 * @meta standard
 * @see ajax.get,ajax.post
 *
 * @returns {XMLHttpRequest} 发送请求的XMLHttpRequest对象
 */
var ajax = {};
ajax.request = function(url,options,type){
  // 是否需要异步
  var async = options.async || true,
  // 用户名、密码
    username = options.username || "",
    password = options.password || "",
  // 需要传输的数据
    data = options.data || "",
  // GET还是POST
    method = (options.method || "GET").toUpperCase(),
  // 请求头
    headers = options.headers || {},
  // 事件处理函数表
    eventHandler = {},
  // 请求数据类型
    dataType = type || "string";//xml || string

  function stateChangeHandler(){
    // 看看是否已经准备好了
    if(xhr.readyState == 4){
      // 得到xhr当前状态
      var sta = xhr.status;
      // 判断是否成功
      if(sta == 200 || sta == 304){
        // 成功则触发成功
        fire("success");
      }else{
        // 失败则触发失败
        fire("failure");
      }

      // 清除绑定
      window.setTimeout(function(){
        xhr.onreadystatechange= new Function();
        if (async){
          xhr = null;
        }
      },0);
    }
  }


  function fire(type){
    // 把type变成ontype
    type = "on"+type;
    // 在事件处理器表中找到对应事件的处理函数
    var handler = eventHandler[type];
    // 如果函数存在，则
    if(handler){
      // 不成功的话
      if(type != "onsuccess"){
        handler(xhr);
        // 成功了
      }else{
        // 则根据dataType返回不同的数据
        handler(xhr,dataType!="xml"?xhr.responseText:xhr.responseXML);
      }
    }
  }

  // 组装eventHandler
  for(var key in options){
    eventHandler[key] = options[key];
  }

  // 新建一个XMLHttpRequest对象
  var xhr = new XMLHttpRequest();
  // 如果方法是GET，则把数据组装到url中
  if(method == "GET"){
    url += (url.indexOf("?")>=0)?"&":"?";
    url += data;
    // 清空data
    data = null;
  }
  // 如果是异步
  if (async){
    // 绑定readystatechange的处理器
    xhr.onreadystatechange = stateChangeHandler;
  }
  // 看看是否需要输入密码
  if(username){
    xhr.open(method,url,async,username,passowrd);
  }else{
    xhr.open(method,url,async);
  }
  // 如果是POST
  if(method == "POST"){
    // 设置一下请求头
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }
  // 把options中的请求头信息全部设置进去
  for(var key in headers){
    xhr.setRequestHeader(name,headers[key])
  }
  // 触发事件beforerequest
  fire("beforerequest");
  // 发送数据
  xhr.send(data);

  // 如果不是异步
  if (!async){
    // 则直接运行stateChangeHandler来处理数据
    stateChangeHandler();
  }

  return xhr;
}

/**
 * 发送一个post请求
 * @name ajax.post
 * @function
 * @grammar ajax.post(url, data[, onsuccess])
 * @param {string}     url         发送请求的url地址
 * @param {string}     data         发送的数据
 * @param {Function} [onsuccess] 请求成功之后的回调函数，function(XMLHttpRequest xhr, string responseText)
 * @meta standard
 * @see ajax.get,ajax.request
 *
 * @returns {XMLHttpRequest}     发送请求的XMLHttpRequest对象
 */
ajax.post = function(url,data,onsuccess){
  return ajax.request(url,{"data":data,"onsuccess":onsuccess,method:"POST"});
}

/**
 * 发送一个get请求
 * @name ajax.get
 * @function
 * @grammar ajax.get(url[, onsuccess])
 * @param {string}     url         发送请求的url地址
 * @param {Function} [onsuccess] 请求成功之后的回调函数，function(XMLHttpRequest xhr, string responseText)
 * @meta standard
 * @see ajax.post,ajax.request
 *
 * @returns {XMLHttpRequest}     发送请求的XMLHttpRequest对象
 */
ajax.get = function(url,data,onsuccess){
  return ajax.request(url,{"data":data,"onsuccess":onsuccess});
}

/* 创建ajax */
ajax.createXMLHttpRequest = function() {
  var request = false;
  if(window.XMLHttpRequest) {
    request = new XMLHttpRequest();
    if(request.overrideMimeType) {
      request.overrideMimeType('text/xml');
    }
  } else if(window.ActiveXObject) {
    var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
    for(var i=0; i<versions.length; i++) {
      try {
        request = new ActiveXObject(versions[i]);
        if(request) {
          return request;
        }
      } catch(e) {}
    }
  }
  return request;
};
