/** * Created by sorcerer on 2017/10/24. */(function () {    'use strict';    angular.module('BlurAdmin.pages.service')        .controller('serviceCtrl', serviceCtrl);    /** @ngInject */    function serviceCtrl(Cookie,$log,$scope,dcs,$rootScope,Route,ReplicationController,Ws,DeploymentConfig) {        $rootScope.namespace=Cookie.get('namespace');        $scope.deploymentconfigs = angular.copy(dcs);        $scope.resourceVersion = $scope.deploymentconfigs.metadata.resourceVersion;        var watchdcs = function (resourceVersion) {            Ws.watch({                api: 'other',                resourceVersion: resourceVersion,                namespace: $rootScope.namespace,                type: 'deploymentconfigs',                name: ''            }, function (res) {                var data = JSON.parse(res.data);                updatedcs(data);            }, function () {                $log.info("webSocket start");            }, function () {                $log.info("webSocket stop");                var key = Ws.key($rootScope.namespace, 'deploymentconfigs', '');                if (!$rootScope.watches[key] || $rootScope.watches[key].shouldClose) {                    return;                }            });        };        watchdcs($scope.deploymentconfigs.metadata.resourceVersion);        var updatedcs = function (data) {            if (data.type == 'ERROR') {                $log.info("err", data.object.message);                Ws.clear();                return;            }            $scope.resourceVersion = data.object.metadata.resourceVersion;            if (data.type == 'ADDED') {                //$scope.rcs.items.shift(data.object);            } else if (data.type == "MODIFIED") {                //console.log($scope.deploymentconfigs.items, data.object);                angular.forEach($scope.deploymentconfigs.items, function (dc,i) {                    //console.log(data.object.metadata.name, dc.metadata.name);                    if (dc.metadata.name === data.object.metadata.name) {                        $scope.deploymentconfigs.items[i].status.updatedReplicas=data.object.status.updatedReplicas;                        $scope.deploymentconfigs.items[i].spec.replicas=data.object.spec.replicas;                        if ($scope.deploymentconfigs.items[i].spec.replicas === 0) {                            $scope.deploymentconfigs.items[i].change='启动';                        }else {                            $scope.deploymentconfigs.items[i].change='停止';                        }                        $scope.$apply()                    }                  })            }        }        function getRc(deploymentconfigs,labelSelector){            ReplicationController.get({                namespace: $rootScope.namespace,                labelSelector: labelSelector            }, function (rcs) {                //console.log("Replicationcontrollers", rcs);                $scope.rcs = rcs;                $scope.rcMap = {};                for (var i = 0; i < rcs.items.length; i++) {                    $scope.rcMap[rcs.items[i].metadata.name] = rcs.items[i];                }                for (var i = 0; i < deploymentconfigs.items.length; i++) {                    var cTt = deploymentconfigs.items[i].metadata.name + '-' + deploymentconfigs.items[i].status.latestVersion;                    //console.log('cTt', cTt);                    deploymentconfigs.items[i].rc = $scope.rcMap[cTt];                }                //console.log('deploymentconfigs', deploymentconfigs);            });        }        function getroute(deploymentconfigs){            Route.get({namespace: $rootScope.namespace, region: $rootScope.region}, function (route) {                //$log.info("Route", data);                $scope.routeMap = {};                var labelSelector = '';                for (var i = 0; i < route.items.length; i++) {                    $scope.routeMap[route.items[i].spec.to.name] = route.items[i];                    if (route.items[i].spec.tls) {                        route.items[i].spec.host='https://'+route.items[i].spec.host                    }else {                        route.items[i].spec.host='http://'+route.items[i].spec.host                    }                }                labelSelector = 'openshift.io/deployment-config.name in (';                angular.forEach(deploymentconfigs.items, function (dc,i) {                    //deploymentconfigs.items[i].change=''                    if (dc.spec.replicas === 0) {                       deploymentconfigs.items[i].change='启动'                    }else {                        deploymentconfigs.items[i].change='停止'                    }                    if ($scope.routeMap[dc.metadata.name]) {                        deploymentconfigs.items[i].route= $scope.routeMap[dc.metadata.name]                    }                    if (deploymentconfigs.items.length > 0) {                        labelSelector += dc.metadata.name + ','                    }                })                labelSelector = labelSelector.substring(0, labelSelector.length - 1) + ')';                if (!deploymentconfigs.items.length) {                    labelSelector = '';                }                getRc(deploymentconfigs,labelSelector)            });        }        getroute($scope.deploymentconfigs)        $scope.$on('$destroy', function () {            Ws.clear();        });        $scope.change = function (idx) {            DeploymentConfig.get({namespace: $rootScope.namespace, region: $rootScope.region,name:$scope.deploymentconfigs.items[idx].metadata.name}, function (data) {                if ($scope.deploymentconfigs.items[idx].change === '启动') {                    if (data.metadata.annotations['dadafoundry.io/last-replicas']) {                        if (data.metadata.annotations['dadafoundry.io/last-replicas'] - 0 > 0) {                            data.spec.replicas=data.metadata.annotations['dadafoundry.io/last-replicas']                        }else {                            data.spec.replicas=1;                        }                    }else {                        data.spec.replicas=1;                    }                }else {                    data.metadata.annotations['dadafoundry.io/last-replicas']=data.spec.replicas.toString();                    data.spec.replicas=0;                }                DeploymentConfig.put({namespace: $rootScope.namespace, region: $rootScope.region,name:$scope.deploymentconfigs.items[idx].metadata.name}                    ,data, function (data) {                    })            })        };    }})();