/** * Created by sorcerer on 2017/11/3. */(function () {    'use strict';    angular.module('BlurAdmin.pages.servicecreat')        .controller('serviceCreatBasicCtrl', serviceCreatBasicCtrl);    /** @ngInject */    function serviceCreatBasicCtrl($scope,ImageSelect) {        $scope.addContainer = function () {            $scope.dc.spec.template.spec.containers.push(angular.copy($scope.containerTpl));        };        $scope.addprot = function () {            $scope.portsArr.unshift({                containerPort: "",                protocol: "TCP",                hostPort: "",            })            console.log($scope.portsArr);        };        $scope.delprot = function (idx) {            //console.log($scope.portsArr);            if ($scope.portsArr[0] && $scope.portsArr[0].hostPort) {                $scope.grid.port = $scope.portsArr[0].hostPort;            }            $scope.portsArr.splice(idx, 1);        };    }})();