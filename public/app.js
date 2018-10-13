import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';
import overviewTemplate from './templates/index.html';
import detailTemplate from './templates/detail.html';
import healthTemplate from './templates/health.html';
import analyzeTemplate from './templates/analyze.html';
import tasteTemplate from './templates/taste.html';
import MeachineLearningTemplate from './templates/MeachineLearning.html';
import testTemplate from './templates/test.html';

uiRoutes.enable();
uiRoutes
.when('/', {
  template: overviewTemplate,
  controller: 'elasticsearchStatusController',
  controllerAs: 'ctrl'
})
.when('/index/:name', {
  template: detailTemplate,
  controller: 'elasticsearchDetailController',
  controllerAs: 'ctrl'
})
.when('/cluster_health', {
  template: healthTemplate,
  controller: 'clusterHealthController',
  controllerAs: 'ctrl'
})
.when('/indices_analyze', {
  template: analyzeTemplate,
  controller: 'indicesAnalyzeController',
  controllerAs: 'ctrl'
})
.when('/taste_event', {
  template: tasteTemplate,
  controller: 'tasteEventController',
  controllerAs: 'ctrl'
})
.when('/MeachineLearning', {
  template: MeachineLearningTemplate,
  controller: 'MeachineLearningController',
  controllerAs: 'ctrl'
})
.when('/test', {
  template: testTemplate,
  controller: 'testController',
  controllerAs: 'ctrl'
});


uiModules
.get('app/elasticsearch_status')
.controller('elasticsearchStatusController', function ($http) {
  $http.get('../api/elasticsearch_status/indices').then((response) => {
    console.log('elasticsearchStatusController成功获取数据');
    this.indices = response.data;
  });
})
.controller('elasticsearchDetailController', function($routeParams, $http) {
  this.index = $routeParams.name;

  $http.get(`../api/elasticsearch_status/index/${this.index}`).then((response) => {
    this.status = response.data;
  });
})
.controller('clusterHealthController', function($http){
  $http.get('../api/elasticsearch_status/cluster_health').then((response)=>{
    console.log('clusterHealthController成功获取数据');
    // this.status = response.data;
    //将字符串response.data转化为JSON格式-----------待解决，返回的不是标准格式？？？
    this.data = JSON.stringify(response.data, null, 4);
    this.cluster_name = response.data.cluster_name;
    this.status = response.data.status;
  })
})
.controller('indicesAnalyzeController', function($http){
  // $http.get('../api/elasticsearch_status/indices_analyze').then((response)=>{
  //   console.log('indicesAnalyzeController成功获取数据');
  //   this.data = response.data;
  //   console.log('response.data');
  // })
})
.controller('tasteEventController', function($http) {
  $http.get(`../api/elasticsearch_status/taste_event`).then((response) => {
    console.log('tasteEventController成功获取数据');
    console.log('response.data');
    this.data = response.data;
  });
})
.controller('MeachineLearningController', function ($http) {
  $http.post('http://127.0.0.1:9200/_taste').
  success(function(data){
    console.log("MeachineLearningController成功获取数据");
    console.log("data="+data.message);
  }).
  error(function(data){
    console.log("MeachineLearningController获取数据失败");
  })
})
.controller('testController', function($http){
  
});
//==========================================