var url={};url.api={},url.api.endpoint="https://api.fibos123.com",url.api.bp_info=url.api.endpoint+"/bp_info",url.api.bp_status=url.api.endpoint+"/bp_status",url.api.bp_status_change_logs=url.api.endpoint+"/bp_status_change_logs",url.api.check_p2p=url.api.endpoint+"/check_p2p",url.api.json2jsonp=url.api.endpoint+"/json2jsonp",url.api.bp_history=url.api.endpoint+"/bp_history",url.rpc={},url.rpc.endpoint="https://rpc-mainnet.fibos123.com",url.rpc.get_table_rows=url.rpc.endpoint+"/v1/chain/get_table_rows",url.rpc.get_info=url.rpc.endpoint+"/v1/chain/get_info",url.rpc.get_account=url.rpc.endpoint+"/v1/chain/get_account",url.rpc.get_transaction=url.rpc.endpoint+"/v1/history/get_transaction";var util={ajax:function(a,b,c){a=Object.assign({timeout:5e3,tryCount:0,retryLimit:3,success:function(a,c){b(a)},error:function(a,b,d){if("timeout"==b&&++this.tryCount<=this.retryLimit)return void $.ajax(this);c(b)}},a),$.ajax(a)},getStaked:function(a){var b=0;if(0==a)return b;var c=Date.now()/1e3-946684800,d=Math.floor(c/604800)/52;return(b=a/Math.pow(2,d)/1e4).toFixed(0)},compare_sort:function(a){return function(b,c){var d=b[a],e=c[a];return d<e?-1:d>e?1:0}},compare_reverse:function(a){return function(b,c){var d=b[a],e=c[a];return d<e?1:d>e?-1:0}},copy:function(a){return JSON.parse(JSON.stringify(a))},totalVotessum:function(a){for(var b=0,c=0;c<a.length;c++)b+=parseFloat(a[c].total_votes);return b},weightPercent:function(a,b){return(parseFloat(a)/parseFloat(b)*100).toFixed(3)},getClaimRewards:function(a,b,c){if(a){var d=0,e=0,f=b.perblock_bucket*a.unpaid_blocks/b.total_unpaid_blocks/1e4,g=b.pervote_bucket*a.total_votes/(1*b.total_producer_vote_weight)/1e4,h=1*a.last_claim_time/1e3+864e5,i=4879e5/365*.2*.9*a.total_votes/b.total_producer_vote_weight;return g<1e3&&(g=0),i<1e3&&(i=0),d=c<=21?3200+i:i,e=h>Date.now()?0:f+g,{total:d.toFixed(0),unreceived:e.toFixed(0)}}},timetrans:function(a){var a=new Date(a);return a.getFullYear()+"-"+(a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1)+"-"+(a.getDate()<10?"0"+a.getDate():a.getDate())+" "+(a.getHours()<10?"0"+a.getHours():a.getHours())+":"+(a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes())+":"+(a.getSeconds()<10?"0"+a.getSeconds():a.getSeconds())},unique:function(a){for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c];-1===b.indexOf(e)&&b.push(e)}return b}};angular.module("appApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ng-layer"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/bp",{templateUrl:"views/bp.html",controller:"BpCtrl"}).when("/bp/:bpname",{templateUrl:"views/bp_detail.html",controller:"BpdetailCtrl"}).when("/monitor",{templateUrl:"views/monitor.html",controller:"MonitorCtrl"}).when("/monitor/pointer",{templateUrl:"views/monitor_pointer.html",controller:"MonitorPointerCtrl"}).when("/monitor/logs",{templateUrl:"views/monitor_logs.html",controller:"MonitorLogsCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("appApp").controller("HeaderCtrl",["$scope","$location",function(a,b){a.isActive=function(a){return a===b.path().slice(1).split("/")[0]},a.menuItems=[{name:"网站",icon:"fas fa-map-signs",url:""},{name:"节点列表",icon:"fas fa-server",url:"bp"},{name:"节点监控",icon:"fab fa-connectdevelop",url:"monitor"}]}]),angular.module("appApp").controller("MainCtrl",["$scope",function(a){function b(){util.ajax({url:url.api.json2jsonp,dataType:"jsonp",data:{url:"https://fibos.io/getExchangeInfo"}},function(a){c=a.price,d=1/a.price,setTimeout(b,5e3)},function(){})}document.title="FIBOS 导航",$(window).scrollTop(0),a.data=websites;var c,d,e=0;b();var f=setInterval(function(){c&&(document.title=e%2==0?c+" FO / EOS | FIBOS 导航":d.toFixed(6)+" EOS / FO | FIBOS 导航",e++)},3e3);a.$on("$destroy",function(){clearInterval(f)})}]),angular.module("appApp").controller("BpCtrl",["$scope",function(a){function b(){p={},e(function(a){m=a.rows[0],f(function(a){k=a.rows,o=util.totalVotessum(a.rows);for(var b=0;b<k.length;b++){var c=k[b];k[b].rank=b+1,k[b].history={},k[b].history.weekpercent=0,k[b].staked=util.getStaked(c.total_votes),k[b].weight_percent=util.weightPercent(c.total_votes,o);var d=util.getClaimRewards(c,m,k[b].rank);k[b].claim_rewards_total=d.total,k[b].claim_rewards_unreceived=d.unreceived,p[c.owner]=b,g(b,c.owner,function(a,b,c){k[a]=Object.assign(k[a],c),k[a]=Object.assign(k[a],{bp_info:!0}),l=!0},function(){}),i(c.owner)}l=!0,h()},function(){})})}function c(){util.ajax({url:url.rpc.get_info},function(b){n=b,a.info=n,setTimeout(function(){$(".progress-bar").width("100%")},1),void 0!==p[n.head_block_producer]&&g(p[n.head_block_producer],n.head_block_producer,function(a,b,c){k[a]=Object.assign(k[a],c),l=!0},function(){}),a.$apply(),clearTimeout(j),j=setTimeout(function(){c()},1e3)},function(){})}function d(){a.items=k,a.$apply(),$(".tooltip").remove(),$('[data-toggle="tooltip"]').tooltip()}function e(a,b){util.ajax({url:url.rpc.get_table_rows,type:"POST",data:JSON.stringify({code:"eosio",json:!0,limit:1,scope:"eosio",table:"global"})},function(b){a(b)},function(a){b(a)})}function f(a,b){util.ajax({type:"post",url:url.rpc.get_table_rows,data:JSON.stringify({scope:"eosio",code:"eosio",table:"producers",json:"true",limit:100,key_type:"float64",index_position:2})},function(b){a(b)},function(a){b(a)})}function g(a,b,c,d){util.ajax({url:url.api.bp_info,data:{bpname:b}},function(d){c(a,b,d)},function(a){d(a)})}function h(){util.ajax({url:url.rpc.get_table_rows,data:JSON.stringify({json:"true",code:"producerjson",scope:"producerjson",table:"producerjson",limit:1e3}),type:"POST"},function(a){for(var b=0;b<a.rows.length;b++){var c=JSON.parse(a.rows[b].json),d=a.rows[b].owner;void 0!==p[d]&&(k[p[d]]=Object.assign(k[p[d]],{json:c}))}l=!0},function(){})}function i(a){util.ajax({url:url.api.bp_history,data:{bpname:a}},function(b){if(void 0!==p[a]){for(var c=b.rows.length-4800-1,d=b.rows.length-1,e=0,f=0,g=c;g<d;g++)f+=b.rows[g],b.rows[g]<12&&(e+=12-b.rows[g]);var h=100*(1-e/(12*(d-c)));b.weekpercent=h.toFixed(3),k[p[a]]=Object.assign(k[p[a]],{history:b})}l=!0},function(){})}document.title="节点列表 | FIBOS 导航",$(window).scrollTop(0);var j,k=[],l=!1,m={},n={},o=0,p={};a.refresh=b,b(),c();var q=setInterval(function(){l&&(l=!1,d())},200);a.$on("$destroy",function(){clearInterval(q),clearTimeout(j)})}]),angular.module("appApp").controller("BpdetailCtrl",["$scope","$routeParams",function(a,b){function c(a){if(a.min){for(var b=Math.floor((a.min-k)/l),c=Math.floor((a.max-k)/l),d=0,e=0,f=b;f<c;f++)e+=m[f],m[f]<12&&(d+=12-m[f]);var g=100*(1-d/(12*(c-b)));n.setTitle(null,{text:" 从 "+util.timetrans(a.min)+" 至 "+util.timetrans(a.max)+"，出块数量："+e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+" 块，未出块数量："+d.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+" 块，出块率："+g.toFixed(3)+" %"})}}function d(){util.ajax({url:url.api.bp_info,data:{bpname:g}},function(b){h=Object.assign(h,b),a.info=h,a.$apply(),util.ajax({url:url.api.bp_history,data:{bpname:g}},function(a){if(m=a.rows.slice(0,a.rows.length-1),!m.length)return void n.showLoading("暂无数据，请刷新页面重试");n.series[0].setData(m),n.hideLoading()},function(){n.showLoading("加载失败，请刷新页面重试")})},function(){n.showLoading("加载失败，请刷新页面重试")}),util.ajax({url:url.rpc.get_account,type:"POST",data:JSON.stringify({account_name:g})},function(b){h=Object.assign(h,b),a.info=h,a.$apply()},function(){}),f(function(b){i=util.totalVotessum(b.rows),a.totalVotessum=i;for(var c=0;c<b.rows.length;c++)b.rows[c].owner==g&&(h=Object.assign(h,b.rows[c]),h=Object.assign(h,{rank:c+1}),a.info=h,a.$apply())},function(){}),util.ajax({url:url.rpc.get_table_rows,data:JSON.stringify({json:"true",code:"producerjson",scope:"producerjson",table:"producerjson",limit:1e3}),type:"POST"},function(b){if(b.rows)for(var c=0;c<b.rows.length;c++)if(b.rows[c].owner==g){var d=JSON.parse(b.rows[c].json);h=Object.assign(h,{json:d}),a.info=h,a.$apply()}},function(){})}function e(a,b){util.ajax({url:url.rpc.get_table_rows,type:"POST",data:JSON.stringify({code:"eosio",json:!0,limit:1,scope:"eosio",table:"global"})},function(b){a(b)},function(a){b(a)})}function f(a,b){util.ajax({type:"post",url:url.rpc.get_table_rows,data:JSON.stringify({scope:"eosio",code:"eosio",table:"producers",json:"true",limit:100,key_type:"float64",index_position:2})},function(b){a(b)},function(a){b(a)})}var g=b.bpname,h={},i=0,j={};a.bpname=g,a.global=j,a.getStaked=util.getStaked,a.totalVotessum=util.totalVotessum,a.weightPercent=util.weightPercent,a.getClaimRewards=util.getClaimRewards,Highcharts.setOptions({global:{useUTC:!1}});var k=15354144e5,l=126e3,m=[],n=Highcharts.stockChart("history",{chart:{zoomType:"x",backgroundColor:"transparent"},tooltip:{split:!1,shared:!0},rangeSelector:{buttons:[{type:"day",count:3,text:"3天"},{type:"week",count:1,text:"1周"},{type:"month",count:1,text:"1个月"},{type:"month",count:6,text:"6个月"},{type:"year",count:1,text:"1年"},{type:"all",text:"所有"}],selected:1},title:{text:g+" 节点每轮出块情况"},xAxis:{events:{afterSetExtremes:c}},series:[{pointStart:k,pointInterval:l,name:"平均值",tooltip:{valueDecimals:1,valueSuffix:""}}]});n.showLoading("使出吃奶的劲加载中..."),document.title=g+" 节点详情 | FIBOS 导航",$(window).scrollTop(0),e(function(b){j=b.rows[0],a.global=j,d()})}]),angular.module("appApp").controller("MonitorCtrl",["$scope",function(a){function b(){util.ajax({url:url.api.bp_status},function(d){a.data=d,a.items=d.rows2,a.$apply(),c=setTimeout(function(){b()},1e3)},function(){})}document.title=" 节点监控 | FIBOS 导航",$(window).scrollTop(0);var c;b(),a.$on("$destroy",function(){clearTimeout(c)})}]),angular.module("appApp").controller("MonitorLogsCtrl",["$scope",function(a){function b(){d={},util.ajax({url:url.api.bp_status_change_logs},function(b){a.data=b,a.items=b.rows,a.$apply()},function(){})}document.title=" 节点监控 | FIBOS 导航",$(window).scrollTop(0);var c,d=[];b(),a.refresh=b,a.is_all=!1,a.show_all=function(){a.is_all=!0},a.$on("$destroy",function(){clearTimeout(c)})}]),angular.module("appApp").controller("MonitorPointerCtrl",["$scope","layer",function(a,b){function c(){j=[],k=[],l=[],util.ajax({url:url.rpc.get_info},function(b){m=b,a.info=m},function(){}),util.ajax({url:url.rpc.get_table_rows,data:JSON.stringify({json:"true",code:"producerjson",scope:"producerjson",table:"producerjson",limit:1e3}),type:"POST"},function(a){h=[];for(var b=0;b<a.rows.length;b++){var c=JSON.parse(a.rows[b].json),d=a.rows[b].owner;d=h.push({bpname:d,producerjson:c,score:0,http:{status:"un",msg:"unset",endpoint:"",version:"",number:0,history:!1,cors:!0},https:{status:"un",msg:"unset",endpoint:"",version:"",number:0,history:!1,cors:!0},p2p:{status:"un",msg:"unset",endpoint:"",detecting:!0}})-1;for(var j=0;j<c.nodes.length;j++)f(d,c.nodes[j],"http",function(a,b){h[a].http=Object.assign(h[a].http,b),h[a].score=e(h[a]),i=!0}),f(d,c.nodes[j],"https",function(a,b){h[a].https=Object.assign(h[a].https,b),h[a].score=e(h[a]),i=!0}),g(d,c.nodes[j],function(a,b){h[a].p2p=Object.assign(h[a].p2p,b),h[a].score=e(h[a]),i=!0})}},function(){})}function d(){a.items=util.copy(h).sort(util.compare_reverse("score")),a.urls={"p2p-peer-address":util.unique(l),"http-api-address":util.unique(j),"https-api-address":util.unique(k)},a.$apply(),$(".tooltip").remove(),$('[data-toggle="tooltip"]').tooltip()}function e(a){var b=0,c=0,d=0;return b+=a.http.endpoint?1:0,b+="ok"===a.http.status?2:0,b+="ok"===a.http.status&&!0===a.http.cors?1:0,b+=!0===a.http.history?.5:0,b+=a.http.number>m.last_irreversible_block_num?1:0,b>=5&&j.push(a.http.endpoint),c+=a.https.endpoint?1:0,c+="ok"===a.https.status?2:0,c+="ok"===a.https.status&&!0===a.https.cors?1:0,c+=!0===a.https.history?.5:0,c+=a.https.number>m.last_irreversible_block_num?1:0,c>=5&&k.push(a.https.endpoint),d+=a.p2p.endpoint?1:0,d+="ok"===a.p2p.status?3:0,4==d&&l.push(a.p2p.endpoint),b+c+d}function f(a,b,c,d){var e="";if("http"==c&&(e=b.api_endpoint||b.rpc_endpoint),"https"==c&&(e=b.ssl_endpoint),e){if("http"===c&&0!==e.indexOf("http://"))return d(a,{status:"ng",msg:"not http",endpoint:e});if("https"===c&&0!==e.indexOf("https://"))return d(a,{status:"ng",msg:"not https",endpoint:e});d(a,{status:"ing",msg:"connecting",endpoint:e});var f=e+"/v1/chain/get_info",g=e+"/v1/history/get_key_accounts";util.ajax({url:f},function(b){return b&&b.head_block_num?(util.ajax({url:g,type:"POST",headers:{"content-type":"application/json"},data:'{"public_key":"FO6MzV92DgYjwDa7K3rtc28dPhGt2Gy8oUoHjESUq4gBx63v8num"}'},function(b){if(b)return d(a,{history:!0})},function(){}),util.ajax({url:f,headers:{"content-type":"application/json"}},function(){},function(){d(a,{cors:!1})}),d(a,{status:"ok",msg:"",number:b.head_block_num,version:b.server_version_string})):d(a,{status:"ng",msg:"offline"})},function(b){return"timeout"==b?d(a,{status:"ng",msg:"timeout"}):d(a,{status:"ng",msg:"error"})})}}function g(a,b,c){var d=b.p2p_endpoint;if(d){d=d.replace("http://","");var e=d.split(":"),f=e[0],g=e[1];c(a,{status:"ing",msg:"connecting",endpoint:d}),util.ajax({url:url.api.check_p2p,data:{host:f,port:g}},function(b){if(!(b&&b.rows&&b.rows.length))return c(a,{status:"un",msg:"unknown",detecting:!1});for(var d=b.rows,e="",f=0,h=1,i=0;i<h;i++){(d[i].indexOf("connect ")>=0||d[i].indexOf("connection ")>=0)&&-1===d[i].indexOf("failed ")&&f++;d[i].split(g)[1].substr(1).replace(/\s+/g,"")&&(e=d[i].split(g)[1].substr(1))}return f==h?c(a,{status:"ok",msg:"connect"}):c(a,{status:"ng",msg:e})},function(b){"timeout"==b?c(a,{status:"un",msg:"timeout"}):c(a,{status:"un",msg:"unknown"})})}}document.title="节点监控 | FIBOS 导航",$(window).scrollTop(0);var h=[],i=!1,j=[],k=[],l=[],m={};if("https:"===window.location.protocol)return void(window.location.href="http:"+window.location.href.substring(window.location.protocol.length));c(),a.refresh=c,a.url_api_check_p2p=url.api.check_p2p,a.openLayer=function(){b.open({type:1,title:"可用接入点列表",area:["","420px"],content:'<div style="padding: 20px"><pre><code>{{ urls | json}}</code></pre></div>',scope:a})};var n=setInterval(function(){i&&(i=!1,d())},200);a.$on("$destroy",function(){clearInterval(n)})}]),angular.module("appApp").controller("AboutCtrl",["$scope",function(a){document.title="BP 信息 | FIBOS 导航",$(window).scrollTop(0),$("body").addClass("full-bg"),$(".navbar").addClass("navbar-dark").removeClass("navbar-light"),a.$on("$destroy",function(){$("body").removeClass("full-bg"),$(".navbar").addClass("navbar-light").removeClass("navbar-dark")})}]),angular.module("appApp").run(["$templateCache",function(a){"use strict";a.put("views/about.html",'<div class="part-about"> <div class="container py-5"> <h2>FIBOS 导航竞选 FIBOS 超级节点</h2> <h5 class="pt-4">简介</h5> <p> FIBOS 导航是由在日本中国人 Andy 发起。 <br> 旨在维护稳定的 FIBOS 节点，向公众传播有关 FIBOS 知识，为社区做出贡献。 <br> </p> <h5 class="pt-3">成员</h5> <p> <b>Andy 创始人</b><br> <span>全栈开发者，现居日本东京。</span> </p> <h5 class="pt-3">节点信息</h5> <table class="table table-dark table-bordered table-hover table-sm table-striped"> <tbody> <tr> <th scope="row">节点账户</th> <td>fibos123comm</td> </tr> <tr> <th scope="row">HTTP</th> <td>http://rpc-mainnet.fibos123.com</td> </tr> <tr> <th scope="row">HTTPS</th> <td>https://rpc-mainnet.fibos123.com</td> </tr> <tr> <th scope="row">P2P</th> <td>p2p-mainnet.fibos123.com:9977</td> </tr> </tbody> </table> <h5 class="pt-3">联系</h5> <p> <b>Email</b> <span>&#98;&#112;&#64;&#102;&#105;&#98;&#111;&#115;&#49;&#50;&#51;&#46;&#99;&#111;&#109;</span> </p> </div> </div>'),a.put("views/bp.html",'<main role="main"> <div class="py-4 bg-light"> <div class="container part-monitor"> <div class="d-flex justify-content-between pb-2"> <div> <h3>节点列表 </h3> <div>生产者： {{info.head_block_producer}}</div> <div>最新区块：{{ info.head_block_num | number }} </div> <div>不可逆区块：{{ info.last_irreversible_block_num | number }} </div> <div>出块时间： <span ng-if="info.head_block_time"> {{ info.head_block_time + "Z" | date : "yyyy-MM-dd HH:mm:ss Z" }} </span> </div> </div> <div class="mt-auto"> <div class="text-right"><a class="a-link" ng-click="refresh()"><i class="fas fa-sync-alt"></i> 刷新</a> </div> <div class="input-group input-group-sm pb-1"> <input type="text" autocomplete="off" placeholder="搜索" class="form-control" ng-model="q"> </div> </div> </div> <div class="pt-2 pb-2"> <h6>显示选项</h6> <label> <input type="checkbox" ng-init="q1 = true" ng-model="q1"> 编号 </label> \x3c!-- <label> <input type="checkbox" ng-init="q19 = true" ng-model="q19"> LOGO </label> --\x3e <label> <input type="checkbox" ng-init="q20 = true" ng-model="q20"> 节点名称 </label> <label> <input type="checkbox" ng-init="q2 = false" ng-model="q2"> 节点账户 </label> <label> <input type="checkbox" ng-init="q3 = true" ng-model="q3"> 状态 </label> <label> <input type="checkbox" ng-init="q4 = true" ng-model="q4"> 有效票数 </label> <label> <input type="checkbox" ng-init="q17 = false" ng-model="q17"> 得票权重 </label> <label> <input type="checkbox" ng-init="q5 = true" ng-model="q5"> 得票率 </label> <label> <input type="checkbox" ng-init="q6 = true" ng-model="q6"> 每日收益 </label> <label> <input type="checkbox" ng-init="q7 = false" ng-model="q7"> 未领取收益 </label> <label> <input type="checkbox" ng-init="q8 = false" ng-model="q8"> 未支付块 </label> <label> <input type="checkbox" ng-init="q16 = false" ng-model="q16"> 上次领取时间 </label> <label> <input type="checkbox" ng-init="q9 = false" ng-model="q9"> 首次出块区块 </label> <label> <input type="checkbox" ng-init="q10 = false" ng-model="q10"> 首次出块时间 </label> <label> <input type="checkbox" ng-init="q11 = false" ng-model="q11"> 最终出块区块 </label> <label> <input type="checkbox" ng-init="q12 = false" ng-model="q12"> 最终出块时间 </label> <label> <input type="checkbox" ng-init="q13 = false" ng-model="q13"> 累计出块</label> <label> <input type="checkbox" ng-init="q18 = false" ng-model="q18"> 7天出块率 </label> <label> <input type="checkbox" ng-init="q15 = false" ng-model="q15"> 网站 </label> <label> <input type="checkbox" ng-init="q14 = true" ng-model="q14"> 操作 </label> </div> <div ng-if="items"> <div ng-if="q"> <h6>搜索结果</h6> <table ng-if="items" class="table table-bordered table-hover table-sm table-striped monospaced-font"> <thead ng-include src="\'thead\'"></thead> <tbody> <tr ng-repeat="(key, value) in items | filter:q" ng-if="$index < 21" ng-include src="\'tbody\'"> </tr> </tbody> </table> </div> <div ng-if="!q"> <h6>出块节点</h6> <table ng-if="items" class="table table-bordered table-hover table-sm table-striped monospaced-font"> <thead ng-include src="\'thead\'" ng-init="value.rank = 0"></thead> <tbody> <tr ng-repeat="(key, value) in items | filter:q" ng-if="$index < 21" ng-include src="\'tbody\'"> </tr> </tbody> </table> <h6>备选节点</h6> <table ng-if="items" class="table table-bordered table-hover table-sm table-striped monospaced-font"> <thead ng-include src="\'thead\'"></thead> <tbody> <tr ng-repeat="(key, value) in items | filter:q" ng-if="$index >= 21" ng-include src="\'tbody\'"> </tr> </tbody> </table> </div> </div> <div ng-if="!items">获取中...</div> <script type="text/ng-template" id="thead"><tr>\n\t\t<th width="50" class="text-center" ng-if="q1">编号</th>\n\t\t\x3c!-- <th width="" ng-if="q19">LOGO</th> --\x3e\n\t\t<th width="" ng-if="q20">节点名称</th>\n\t\t<th width="" ng-if="q2">节点账户</th>\n\t\t<th width="" ng-if="q3">状态</th>\n\t\t<th width="" ng-if="q4">有效票数</th>\n\t\t<th width="" ng-if="q17">得票权重</th>\n\t\t<th width="" ng-if="q5">得票率</th>\n\t\t<th width="" ng-if="q6">每日收益</th>\n\t\t<th width="" ng-if="q7">未领取收益</th>\n\t\t<th width="" ng-if="q8">未支付块</th>\n\t\t<th width="" ng-if="q16">上次领取时间</th>\n\t\t<th width="" ng-if="q9">首次出块区块</th>\n\t\t<th width="" ng-if="q10">首次出块时间</th>\n\t\t<th width="" ng-if="q11">最终出块区块</th>\n\t\t<th width="" ng-if="q12">最终出块时间</th>\n\t\t<th width="" ng-if="q13">累计出块</th>\n\t\t<th width="" ng-if="q18">7天出块率</th>\n\t\t<th width="" ng-if="q15">网站</th>\n\t\t<th width="" ng-if="q14">操作</th>\n\t</tr><\/script> <script type="text/ng-template" id="tbody"><td ng-if="q1" align="center">{{ $index + 1 }}</td>\n\n\t\t<td ng-if="q20">\n\t\t\t<span ng-if="value.json.org.branding.logo_256">\n\t\t\t\t<img src="{{ value.json.org.branding.logo_256 }}" alt="" width="21" height="21">\n\t\t\t</span>\t\n\t\t\t{{ value.json.org.candidate_name || value.owner }}\n\t\t</td>\n\n\t\t<td ng-if="q2">\n\t\t\t{{ value.owner }}\n\t\t</td>\n\n\t\t<td ng-if="q3">\n\t\t\t<span ng-if="info.head_block_producer == value.owner">\n\t\t\t\t<div class="progress">\n\t\t\t\t  <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" aria-valuemax="100" style="width:0%">出块中</div>\n\t\t\t\t</div>\n\t\t\t</span>\n\t\t\t\n\t\t\t<span ng-if="info.head_block_producer != value.owner && value.bp_info">\n\t\t\t\t<span ng-if="value.rank <= 21">\n\t\t\t\t\t<span ng-if="info.head_block_num - value.last_block <= 244" class="icon icon-ok">在线</span>\n\t\t\t\t\t<span ng-if="info.head_block_num - value.last_block > 244" class="icon icon-ng">离线</span>\n\t\t\t\t</span>\n\t\t\t</span>\n\n\t\t\t<span ng-if="!value.bp_info && value.rank <= 21" class="gray">\n\t\t\t\t获取中\n\t\t\t</span>\n\n\t\t\t<span ng-if="value.rank > 21" class="gray">\n\t\t\t\t待机中\n\t\t\t</span>\n\n\t\t</td>\n\n\t\t<td ng-if="q4">{{ value.staked | number }} FO</td>\n\n\t\t<td ng-if="q17">\n\t\t\t{{ value.total_votes | number }}\n\t\t</td>\n\n\t\t<td ng-if="q5">{{ value.weight_percent }} %</td>\n\t\t<td ng-if="q6">\n\t\t\t{{ value.claim_rewards_total | number }} FO\n\t\t</td>\n\n\t\t<td ng-if="q7">\n\t\t\t{{ value.claim_rewards_unreceived | number }} FO\n\t\t</td>\n\n\t\t<td ng-if="q8">\n\t\t\t{{ value.unpaid_blocks | number }}\n\t\t</td>\n\n\t\t<td ng-if="q16">\n\t\t\t<span ng-if="value.last_claim_time">\n\t\t\t\t{{ value.last_claim_time / 1000 | date : "yyyy-MM-dd HH:mm:ss Z" }}\n\t\t\t</span>\n\t\t\t<span ng-if="!value.last_claim_time">\n\t\t\t\t-\n\t\t\t</span>\n\t\t</td>\n\n  \t\t<td ng-if="q9">\n\t\t\t{{ value.first_block | number }}\n\t\t</td>\n\n  \t\t<td ng-if="q10">\n\t\t\t<span ng-if="value.first_time">\n\t\t\t\t{{ value.first_time + "Z" | date : "yyyy-MM-dd HH:mm:ss Z" }}\n\t\t\t</span>\n\t\t\t<span ng-if="!value.first_time">\n\t\t\t\t-\n\t\t\t</span>\n\t\t</td>\n\n \t\t<td ng-if="q11">\n\t\t\t{{ value.last_block | number }}\n\t\t</td>\n\t\t\n  \t\t<td ng-if="q12">\n\t\t\t<span ng-if="value.last_time">\n\t\t\t\t{{ value.last_time + "Z" | date : "yyyy-MM-dd HH:mm:ss Z" }}\n\t\t\t</span>\n\t\t\t<span ng-if="!value.last_time">\n\t\t\t\t-\n\t\t\t</span>\n\t\t</td>\n\n \t\t<td ng-if="q13">\n\t\t\t{{ value.block_count | number }}\n\t\t</td>\n\n \t\t<td ng-if="q18">\n \t\t\t<span ng-class="{\n\t\t\t\t\t\tgreen: value.rank <= 21 && value.history.weekpercent == 100,\n\t\t\t\t\t\torange: value.rank <= 21 && value.history.weekpercent >= 99 && value.history.weekpercent < 100,\n\t\t\t\t\t\tred: value.rank <= 21 && value.history.weekpercent < 99,\n\t\t\t\t\t}">\n\t\t\t\t{{ value.history.weekpercent }} %\n\t\t\t</span>\n\t\t</td>\n\n\t\t<td ng-if="q15">\n\t\t\t<a ng-if="value.url" class="trim-link" target="_blank" href="{{ value.url }}">\n\t\t\t\t{{ value.url }}\n\t\t\t</a>\n\t\t</td>\n\n\t\t<td ng-if="q14">\n\t\t\t<a class="a-link" ng-href="#!/bp/{{ value.owner }}">详情</a>\n\t\t</td><\/script> </div> </div> </main>'),a.put("views/bp_detail.html",'<main role="main"> <div class="py-4 bg-light"> <div class="container part-monitor"> <div class="d-flex justify-content-between pb-4"> <div> <h3 class="mb-1">{{ bpname }} 节点详情</h3> <a ng-if="info.url" target="_blank" href="{{ info.url }}"> {{ info.url }} </a> </div> <div class="mt-auto"> <div class="input-group input-group-sm pb-1"> <a href="#!/bp">返回列表</a> </div> </div> </div> <div id="history"></div> <div class="pb-0 gray text-right" style="font-size: 12px"> <b>说明：</b> 数据缓存时间为 1 个小时。 平均标准值为 12.0。 每 126 秒为一轮。 </div> <div ng-if="info"> <h6>基本信息</h6> <table class="table table-bordered table-hover table-sm table-striped monospaced-font"> <tbody> <tr> <th width="20%">创建时间</th> <td> <span ng-if="info.created"> {{ info.created + "Z" | date : "yyyy-MM-dd HH:mm:ss Z" }} </span> <span ng-if="!info.created"> - </span> </td> </tr> <tr> <th>排名</th> <td> <span ng-if="info.rank"> {{ info.rank }} </span> <span ng-if="!info.rank"> - </span> </td> </tr> <tr> <th>有效票数</th> <td>{{ getStaked(info.total_votes) | number }} FO</td> </tr> <tr> <th>得票权重</th> <td>{{ info.total_votes | number }}</td> </tr> <tr> <th>得票率</th> <td>{{ weightPercent(info.total_votes, totalVotessum) }} %</td> </tr> <tr> <th>公钥</th> <td>{{ info.producer_key }}</td> </tr> </tbody> </table> <h6>收益信息</h6> <table class="table table-bordered table-hover table-sm table-striped monospaced-font"> <tbody> <tr> <th width="20%">每日收益</th> <td>{{ getClaimRewards(info, global, info.rank).total | number }} FO</td> </tr> <tr> <th>未领取收益</th> <td>{{ getClaimRewards(info, global, info.rank).unreceived | number }} FO</td> </tr> <tr> <th>未支付块</th> <td>{{ info.unpaid_blocks | number }}</td> </tr> <tr> <th>上次领取时间</th> <td> <span ng-if="info.last_claim_time"> {{ info.last_claim_time / 1000 | date : "yyyy-MM-dd HH:mm:ss Z" }} </span> <span ng-if="!info.last_claim_time"> - </span> </td> </tr> </tbody> </table> <h6>出块信息</h6> <table class="table table-bordered table-hover table-sm table-striped monospaced-font"> <tbody> <tr> <th width="20%">首次出块区块</th> <td>{{ info.first_block | number }}</td> </tr> <tr> <th>最终出块区块</th> <td>{{ info.last_block | number }}</td> </tr> <tr> <th>首次出块时间</th> <td> <span ng-if="info.first_time"> {{ info.first_time + "Z" | date : "yyyy-MM-dd HH:mm:ss Z" }} </span> <span ng-if="!info.first_time"> - </span> </td> </tr> <tr> <th>最终出块时间</th> <td> <span ng-if="info.last_time"> {{ info.last_time + "Z" | date : "yyyy-MM-dd HH:mm:ss Z" }} </span> <span ng-if="!info.last_time"> - </span> </td> </tr> <tr> <th>累计出块</th> <td>{{ info.block_count | number }}</td> </tr> </tbody> </table> <h6>JSON 信息</h6> <table ng-if="info.json" class="table table-bordered table-hover table-sm table-striped monospaced-font"> <tbody> <tr ng-repeat="(key, value) in info.json.org"> <th width="20%">{{ key }}</th> <td> {{ value }} </td> </tr> </tbody> </table> <h6>接入点信息</h6> <table ng-if="info.json" class="table table-bordered table-hover table-sm table-striped monospaced-font"> <tbody> <tr ng-repeat="(key, value) in info.json.nodes"> <th width="20%">{{ value.node_type }}</th> <td> <div> <b>国家或地区：</b> <span ng-if="value.location.name"> {{ value.location.name }}, </span> {{ value.location.country }} </div> <div ng-if="\n\t\t\t\t\t\t\t\tvalue.p2p_endpoint ||\n\t\t\t\t\t\t\t\tvalue.rpc_endpoint ||\n\t\t\t\t\t\t\t\tvalue.api_endpoint ||\n\t\t\t\t\t\t\t\tvalue.ssl_endpoint\n\t\t\t\t\t\t\t"> <b>接入点地址：</b> <div ng-if="value.p2p_endpoint"> {{ value.p2p_endpoint }}</div> <div ng-if="value.rpc_endpoint"> {{ value.rpc_endpoint }}</div> <div ng-if="value.api_endpoint"> {{ value.api_endpoint }}</div> <div ng-if="value.ssl_endpoint"> {{ value.ssl_endpoint }}</div> </div> </td> </tr> </tbody> </table> <div ng-if="!info.json">节点未提交 JSON</div> </div> <div class="pt-2"><a href="#!/bp">返回列表</a></div> </div> </div> </main>'),a.put("views/main.html",'<main role="main"> <section class="jumbotron text-center"> <div class="container"> <h1 class="jumbotron-heading">FIBOS 导航</h1> <p class="lead"> 一个收录 FIBOS 网址及资源的小导航 </p> </div> </section> <div class="py-5 bg-light"> <div class="container part-websites"> <section ng-repeat="value in data"> <div class="panel-heading"><a id="{{ value.name }}" data-aos="fade-up"> <i class="{{ value.icon }}"></i> {{ value.name }}</a> </div> <div class="content" ng-repeat="value in value.sub" data-aos="fade-up" ng-class="{ line1: value.child.length <= 5 }"> <header ng-if="value.name"> <h2 class="icon-download"><a id="{{ value.name }}"><i ng-if="value.icon" class="{{ value.icon }}"></i> {{ value.name }}</a></h2> </header> <ul class="website-list"> <li ng-repeat="value in value.child"> <a href="{{ value.url }}" class="website" target="_blank"> <p class="name"><i ng-if="value.icon" class="{{ value.icon }}"></i> {{ value.name }}</p> <p class="description">{{ value.desc }}</p> </a> <p class="more" ng-if="value.more"> <a href="{{ value.more.url }}" target="_blank" class="{{ value.more.color }}"> <i ng-if="value.more.icon" class="{{ value.more.icon }}"></i> {{ value.more.name }} </a> </p> </li> </ul> </div> </section> </div> </div> </main>'),a.put("views/monitor.html",'<main role="main"> <div class="py-4 bg-light"> <div class="container part-monitor"> <ul class="nav nav-pills flex-column flex-sm-row"> <li class="nav-item"> <a class="nav-link active" ng-href="#!/monitor">出块节点在线状态</a> </li> <li class="nav-item"> <a class="nav-link" ng-href="#!/monitor/logs">出块节点在线状态变更记录</a> </li> <li class="nav-item"> <a class="nav-link" ng-href="#!/monitor/pointer">接入点状态监测</a> </li> </ul><br> <div class="d-flex justify-content-between"> <div> <h3>出块节点在线状态</h3> <div> 最新区块：{{ data.head_block_num | number }}<br> 状态更新时间：{{ data.bp_status_refresh_time | date : "yyyy-MM-dd HH:mm:ss Z" }} </div> </div> <div class="mt-auto"> <div class="input-group input-group-sm pb-1"> <input type="text" autocomplete="off" placeholder="搜索" class="form-control" ng-model="q"> </div> </div> </div> <table ng-if="items" class="table table-bordered table-hover table-sm table-striped monospaced-font"> <thead> <tr> <th width="50" class="text-center">编号</th> <th>节点账户</th> <th width="20%">状态</th> <th width="20%">生产区块</th> <th width="35%">最终生产时间</th> </tr> </thead> <tbody> <tr ng-repeat="(key, value) in items | filter:q" ng-class="{ \'font-weight-bold\': data.head_block_producer == value.bpname }"> <td align="center">{{ $index + 1 }}</td> <td>{{ value.bpname }}</td> <td ng-if="data.head_block_num - value.number <= 242" class="icon icon-ok"> online </td> <td ng-if="data.head_block_num - value.number > 242" class="icon icon-ng"> offline </td> <td> {{ value.number | number }} </td> <td> {{ value.date | date : "yyyy-MM-dd HH:mm:ss Z" }} </td> </tr> </tbody> </table> <div ng-if="!items">获取中...</div> </div> </div> </main>'),a.put("views/monitor_logs.html",'<main role="main"> <div class="py-4 bg-light"> <div class="container part-monitor"> <ul class="nav nav-pills flex-column flex-sm-row"> <li class="nav-item"> <a class="nav-link" ng-href="#!/monitor">出块节点在线状态</a> </li> <li class="nav-item"> <a class="nav-link active" ng-href="#!/monitor/logs">出块节点在线状态变更记录</a> </li> <li class="nav-item"> <a class="nav-link" ng-href="#!/monitor/pointer">接入点状态监测</a> </li> </ul><br> <div class="d-flex justify-content-between"> <div> <h3>出块节点在线状态变更记录 </h3> <div ng-if="data"> 记录更新时间：{{ data.now_time | date : "yyyy-MM-dd HH:mm:ss Z" }} <br> 最多显示最近 100 条记录。 </div> </div> <div class="mt-auto"> <div class="text-right"><a class="a-link" ng-click="refresh()"><i class="fas fa-sync-alt"></i> 刷新</a> </div> <div class="input-group input-group-sm pb-1"> <input type="text" autocomplete="off" placeholder="搜索" class="form-control" ng-model="q"> </div> </div> </div> <table ng-if="items" class="table table-bordered table-hover table-sm table-striped monospaced-font"> <thead> <tr><th width="50" class="text-center">编号</th><th>时间</th><th>节点账户</th><th>旧状态</th><th>新状态</th></tr> </thead> <tbody> <tr ng-repeat="(key, value) in items | filter:q" ng-if="\n\t\t\t\tq || ($index < 20 || is_all)\n\t\t\t\t"> <td align="center">{{ $index + 1 }}</td> <td>{{ value.date | date : "yyyy-MM-dd HH:mm:ss Z" }}</td> <td>{{ value.bp }}</td> <td class="icon" ng-class="{\n'+"\t\t\t\t\t'icon-ok': value.from == 'online', \n\t\t\t\t\t'icon-ng': value.from == 'offline', \n\t\t\t\t\t'icon-un': value.from == 'over21'\n\t\t\t\t\t}\">{{ value.from }}</td> <td class=\"icon\" ng-class=\"{\n\t\t\t\t\t'icon-ok': value.to == 'online', \n\t\t\t\t\t'icon-ng': value.to == 'offline', \n\t\t\t\t\t'icon-un': value.to == 'over21'\n\t\t\t\t\t}\">{{ value.to }}</td> </tr> </tbody> </table> <a class=\"a-link\" ng-click=\"show_all()\" ng-if=\"!is_all && items && !q && items.length - 20 > 0\"> 查看剩余的 {{ items.length - 20 }} 条记录 </a> <div ng-if=\"!items\">获取中...</div> </div> </div> </main>"),
a.put("views/monitor_pointer.html",'<main role="main"> <div class="py-4 bg-light"> <div class="container part-monitor"> <ul class="nav nav-pills flex-column flex-sm-row"> <li class="nav-item"> <a class="nav-link" ng-href="#!/monitor">出块节点在线状态</a> </li> <li class="nav-item"> <a class="nav-link" ng-href="#!/monitor/logs">出块节点在线状态变更记录</a> </li> <li class="nav-item"> <a class="nav-link active" ng-href="#!/monitor/pointer">接入点状态监测</a> </li> </ul><br> <div class="d-flex justify-content-between"> <div><h3>接入点状态监测 </h3></div> <div class="mt-auto"> <div class="text-right"></div> <div class="input-group input-group-sm pb-1"> <a class="a-link" ng-click="openLayer()" style="margin-right:20px"><i class="fas fa-server"></i> 可用接入点列表</a> <a class="a-link" ng-click="refresh()" style="margin-right:20px"><i class="fas fa-sync-alt"></i> 刷新</a> <input type="text" autocomplete="off" placeholder="搜索" class="form-control" ng-model="q"> </div> </div> </div> <table ng-if="items" class="table table-bordered table-hover table-sm table-striped monospaced-font"> <thead> <tr> <th width="50" class="text-center">编号</th> <th>节点账户</th> <th width="25%">HTTP 状态</th> <th width="25%">HTTPS 状态</th> <th width="25%">P2P 状态</th> </tr> </thead> <tbody> <tr ng-repeat="(key, value) in items | filter:q"> <td align="center">{{ $index + 1 }}</td> <td> <span ng-class="{\n\t\t\t\t\t\tgreen: value.score >= 14,\n\t\t\t\t\t\tred: value.score <= 3,\n\t\t\t\t\t}"> <span ng-if="value.score >= 14" data-toggle="tooltip" title="优质接入点"><i class="fas fa-thumbs-up"></i> {{ value.bpname }}</span> <span ng-if="value.score < 14">{{ value.bpname }}</span> </span> <a class="hide-link float-right" ng-if="value.producerjson.org.website" target="_blank" href="{{ value.producerjson.org.website }}" data-toggle="tooltip" title="打开新窗口查看网站"> <i class="fas fa-link"></i> </a> </td> <td> <span class="icon" ng-class="{\n\t\t\t\t\t\t\'icon-ok\': value.http.status == \'ok\',\n\t\t\t\t\t\t\'icon-ng\': value.http.status == \'ng\',\n\t\t\t\t\t\t\'icon-ing\': value.http.status == \'ing\',\n\t\t\t\t\t\t\'icon-un\': value.http.status == \'un\',\n\t\t\t\t\t\t\'icon-warn\': (!value.http.cors && value.http.status != \'ok\') ||\n\t\t\t\t\t\t\t\t\t (value.http.number && value.http.number < info.last_irreversible_block_num)\n\t\t\t\t\t\t}\n\t\t\t\t\t\t"> <span ng-if="value.http.history" data-toggle="tooltip" title="已开启 history 插件"> <i class="fas fa-history"></i> </span> <span data-toggle="tooltip" title="{{ value.http.endpoint }}"> <span>{{ value.http.msg }}</span> <span ng-if="value.http.status == \'ok\'"> {{ value.http.number | number }} ( {{ value.http.version }} ) </span> </span> </span> <span ng-if="!value.http.cors || (value.http.number && value.http.number < info.last_irreversible_block_num)" data-toggle="tooltip" title="\n\t\t\t\t\t\t{{ !value.http.cors ? (value.http.status == \'ok\' ? \'未完整开启 CORS\' : \'未开启 CORS\') : \'\' }}\n\t\t\t\t\t\t{{ !value.http.cors && (value.http.number && value.http.number < info.last_irreversible_block_num) ? \',\' : \'\' }}\n\t\t\t\t\t\t{{ (value.http.number && value.http.number < info.last_irreversible_block_num) ? \'不在最新区块\' : \'\' }}\n\t\t\t\t\t\t"> <i class="fas fa-exclamation-circle"></i> </span> <a class="hide-link float-right" ng-if="value.http.msg != \'unset\'" target="_blank" href="{{ value.http.endpoint }}/v1/chain/get_info" data-toggle="tooltip" title="打开新窗口查看接入点"> <i class="fas fa-link"></i> </a> </td> <td> <span class="icon" ng-class="{\n\t\t\t\t\t\t\'icon-ok\': value.https.status == \'ok\',\n\t\t\t\t\t\t\'icon-ng\': value.https.status == \'ng\',\n\t\t\t\t\t\t\'icon-ing\': value.https.status == \'ing\',\n\t\t\t\t\t\t\'icon-un\': value.https.status == \'un\',\n\t\t\t\t\t\t\'icon-warn\': !value.https.cors ||\n\t\t\t\t\t\t\t\t\t (value.https.number && value.https.number < info.last_irreversible_block_num)\n\t\t\t\t\t\t}"> <span ng-if="value.https.history" data-toggle="tooltip" title="已开启 history 插件"> <i class="fas fa-history"></i> </span> <span data-toggle="tooltip" title="{{ value.https.endpoint }}"> <span>{{ value.https.msg }}</span> <span ng-if="value.https.status == \'ok\'"> {{ value.https.number | number }} ( {{ value.https.version }} ) </span> </span> </span> <span ng-if="!value.https.cors || (value.https.number && value.https.number < info.last_irreversible_block_num)" data-toggle="tooltip" title="\n\t\t\t\t\t\t{{ !value.https.cors ? (value.https.status == \'ok\' ? \'未完整开启 CORS\' : \'未开启 CORS\') : \'\' }}\n\t\t\t\t\t\t{{ !value.https.cors && (value.https.number && value.https.number < info.last_irreversible_block_num) ? \',\' : \'\' }}\n\t\t\t\t\t\t{{ (value.https.number && value.https.number < info.last_irreversible_block_num) ? \'不在最新区块\' : \'\' }}\n\t\t\t\t\t\t"> <i class="fas fa-exclamation-circle"></i> </span> <a class="hide-link float-right" ng-if="value.https.msg != \'unset\'" target="_blank" href="{{ value.https.endpoint }}/v1/chain/get_info" data-toggle="tooltip" title="打开新窗口查看接入点"> <i class="fas fa-link"></i> </a> </td> <td> <span data-toggle="tooltip" title="{{ value.p2p.endpoint }}" class="icon" ng-class="{\n\t\t\t\t\t\t\'icon-ok\': value.p2p.status == \'ok\',\n\t\t\t\t\t\t\'icon-ng\': value.p2p.status == \'ng\',\n\t\t\t\t\t\t\'icon-ing\': value.p2p.status == \'ing\',\n\t\t\t\t\t\t\'icon-un\': value.p2p.status == \'un\',\n\t\t\t\t\t\t\'icon-warn\': value.p2p.warning}"> {{ value.p2p.msg | lowercase }} </span> <span ng-if="!value.p2p.detecting" data-toggle="tooltip" title="这是新接入点，服务器未对其进行监测，请把该接入点地址({{ value.p2p.endpoint }})发送给 &#98;&#112;&#64;&#102;&#105;&#98;&#111;&#115;&#49;&#50;&#51;&#46;&#99;&#111;&#109; "> <i class="fas fa-exclamation-circle"></i> </span> <span> <a class="hide-link float-right" ng-if="value.p2p.msg != \'unset\'" target="_blank" href="{{ url_api_check_p2p }}?host={{ value.p2p.endpoint.split(\':\')[0] }}&port={{ value.p2p.endpoint.split(\':\')[1] }}" data-toggle="tooltip" title="打开新窗口查看接入点"> <i class="fas fa-link"></i> </a> </span> </td> </tr> </tbody> </table> <div ng-if="!items">获取中...</div> </div> </div> </main>')}]);