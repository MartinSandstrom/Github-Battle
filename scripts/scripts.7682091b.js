"use strict";angular.module("githubArenaApp",["ngAnimate","ngResource","ngRoute","ngTouch","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("githubArenaApp").controller("MainCtrl",["$scope","$http","$q",function(a,b,c){a.players=[],a.ready=!1,a.master=-1,a.properties=["repos","repoStars","forks","gists","userFollowers"],a.propertyNames={repos:"Repos",repoStars:"Repo stars",forks:"Forks",gists:"Gists",userFollowers:"User followers"},a.winner={repos:-1,repoStars:-1,forks:-1,gists:-1,userFollowers:-1},a.players[0]={name:"seriema",repos:0,repoStars:0,forks:0,gists:0,userFollowers:0,total:0},a.players[1]={name:"odetocode",repos:0,repoStars:0,forks:0,gists:0,userFollowers:0,total:0},a.fight=function(){var d=[];angular.forEach(a.players,function(a){d.push(b.get("https://api.github.com/users/"+a.name+"/repos").then(function(b){a.repos=b.data.length;var c=_.map(b.data,function(a){return a.stargazers_count});a.repoStars=_.reduce(c,function(a,b){return a+b});var d=_.map(b.data,function(a){return a.forks_count});a.forks=_.reduce(d,function(a,b){return a+b})})),d.push(b.get("https://api.github.com/users/"+a.name).success(function(b){a.userFollowers=b.followers,a.gists=b.public_gists}))}),c.all(d).then(function(){angular.forEach(a.players,function(){}),angular.forEach(a.properties,function(b){var c=a.players[0][b]>a.players[1][b]?0:1;a.winner[b]=c,a.players[c].total+=1}),a.master=a.players[0].total>a.players[1].total?0:1,a.ready=!0})}}]),angular.module("githubArenaApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);