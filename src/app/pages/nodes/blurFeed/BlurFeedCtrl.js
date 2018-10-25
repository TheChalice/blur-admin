/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.nodes')
      .controller('BlurFeedCtrl', BlurFeedCtrl);

  /** @ngInject */
  function BlurFeedCtrl($scope,$rootScope,Cookie,$state) {
    console.log('$scope.nodelist',$scope.feed);
    //Project.get({}, function (Project) {
    //  console.log("load project success", Project);
    //
    //  $rootScope.projects = Project.items;
    //  $scope.feed=angular.copy($rootScope.projects)
    //  //$log.info("can't find project");
    //}, function (res) {
    //
    //})

    $scope.expandMessage = function(message){
      $rootScope.namespace=message.metadata.name;
      Cookie.set('namespace', $rootScope.namespace, 10 * 365 * 24 * 3600 * 1000);
      //$state.reload();
      //alert(message.metadata.name)

      //message.expanded = !message.expanded;
    }
  }
})();