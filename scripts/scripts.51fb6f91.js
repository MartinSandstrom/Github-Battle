var countTo=angular.module("countTo",[]).directive("countTo",["$timeout",function(a){return{replace:!1,scope:!0,link:function(b,c,d){var e,f,g,h,i,j,k,l=c[0],m=function(){f=30,i=0,b.timoutId=null,j=parseInt(d.countTo)||0,b.value=parseInt(d.value,10)||0,g=1e3*parseFloat(d.duration)||0,h=Math.ceil(g/f),k=(j-b.value)/h,e=b.value},n=function(){b.timoutId=a(function(){e+=k,i++,i>=h?(a.cancel(b.timoutId),e=j,l.innerText=j):(l.innerText=Math.round(e),n())},f)},o=function(){b.timoutId&&a.cancel(b.timoutId),m(),n()};return d.$observe("countTo",function(a){a&&o()}),d.$observe("value",function(){o()}),!0}}}]);angular.module("githubArenaApp",["ngAnimate","ngResource","ngRoute","ngTouch","ui.bootstrap","countTo"]).value("_",window._).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html"}).when("/contact",{templateUrl:"views/contact.html"}).otherwise({redirectTo:"/"})}]),angular.module("githubArenaApp").controller("MainCtrl",["$scope","$q","$timeout","$location","Github","Rounds","_",function(a,b,c,d,e,f){a.players=[],a.ready=!1,a.roundsDone=!1,a.master={},a.rounds=[],a.countDelay=1;var g=1e3,h=1500;a.isActive=function(a){return console.log(a),a===d.path()},a.players[0]={name:"seriema",total:0},a.players[1]={name:"odetocode",total:0},a.reset=function(){a.ready=!1,a.roundsDone=!1,a.master={},a.rounds=[],f.reset(),angular.forEach(a.players,function(a){a.total=0,a.userData={},a.repoData={}})},a.fight=function(){var c=[];a.roundsDone=!1,angular.forEach(a.players,function(a){c.push(e.repo(a.name).then(function(b){a.repoData=b.data})),c.push(e.user(a.name).then(function(b){a.userData=b.data}))}),b.all(c).then(function(){angular.forEach(a.players,function(){}),a.ready=!0,a.nextRound()})},a.nextRound=function(){if(f.finished()){a.roundsDone=!0;var b=a.players[0].total>a.players[1].total?0:1;return void(a.master.name=a.players[b].name)}var d=f.startNew();a.rounds.push(d),function(b){c(function(){var c=b.score(a.players[0])>b.score(a.players[1])?0:1;b.winner=a.players[c],a.players[c].total+=1},g)}(d),a.wait()},a.wait=function(){c(function(){a.nextRound()},h)}}]),angular.module("githubArenaApp").service("Github",["$http","$q",function(a,b){function c(a){var c=b.defer();return c.resolve({data:a}),c.promise}function d(b){var d=g[b];return d?c(d):a.get(b).success(function(a){g[b]=a,window.localStorage.setItem("cache",JSON.stringify(g))})}var e="https://api.github.com/users/",f="?page=1&per_page=100",g={},h=window.localStorage.getItem("cache");h&&(g=JSON.parse(h)),this.repo=function(a){return d(e+a+"/repos"+f)},this.user=function(a){return d(e+a)}}]),angular.module("githubArenaApp").factory("Rounds",function(){function a(a,b){var c=_.map(a.repoData,function(a){return a[b]}),d=_.reduce(c,function(a,b){return a+b});return d}function b(){return h[g]}function c(){g++}function d(){return g>=h.length}function e(){g=0}function f(){var a={};return angular.copy(b(),a),c(),a}var g=0,h=[{title:"Repos",score:function(a){return a.repoData.length}},{title:"Repos stars",score:function(b){return a(b,"stargazers_count")}},{title:"Forks",score:function(b){return a(b,"forks_count")}},{title:"Gists",score:function(a){return a.userData.public_gists}},{title:"Followers",score:function(a){return a.userData.followers}}];return{finished:d,reset:e,startNew:f}});