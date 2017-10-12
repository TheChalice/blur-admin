/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('BlurFeedCtrl', BlurFeedCtrl);

  /** @ngInject */
  function BlurFeedCtrl($scope,Project,$rootScope) {


    var obj={
      "metadata": {
          "name": "gitlab",
          "selfLink": "/oapi/v1/projects/gitlab",
          "uid": "4eccd7b3-0f77-11e7-858d-fa163efdbea8",
          "resourceVersion": "4818411",
          "creationTimestamp": "2017-03-23T03:17:55Z",
          "annotations": {
            "openshift.io/description": "",
            "openshift.io/display-name": "",
            "openshift.io/requester": "admin",
            "openshift.io/sa.scc.mcs": "s0:c11,c10",
            "openshift.io/sa.scc.supplemental-groups": "1000130000/10000",
            "openshift.io/sa.scc.uid-range": "1000130000/10000"
      }
    },
      "spec": {
      "finalizers": [
        "openshift.io/origin",
        "kubernetes"
      ]
    },
      "status": {
      "phase": "Active"
    }
    }
    Project.get({}, function (Project) {
      console.log("load project success", Project);

      $rootScope.projects = Project.items;
      $scope.feed=angular.copy($rootScope.projects)
      //$log.info("can't find project");
    }, function (res) {

    })

    $scope.expandMessage = function(message){
      message.expanded = !message.expanded;
    }
  }
})();