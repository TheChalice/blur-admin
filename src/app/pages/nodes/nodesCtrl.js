/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.nodes')
        .controller('nodesCtrl', nodesCtrl);

    /** @ngInject */
    function nodesCtrl(nodes,Cookie,Sort,$scope,nodeslist,$rootScope) {
        //分页
        //$scope.grid = {
        //    page: 1,
        //    size: 10,
        //    txt: ''
        //};
        $scope.users = [
            {
                "name": "Esther Vang",
                "value": 'qweqweqwe'
            }, {
                "name": "Esther Vang1",
                "value": 'qweqweqwe'
            }, {
                "name": "Esther Vang2",
                "value": 'qweqweqwe'
            }, {
                "name": "Esther Vang3",
                "value": 'qweqweqwe'
            }, {
                "name": "Esther Vang4",
                "value": 'qweqweqwe'
            }
        ];
        console.log('nodeslist', nodeslist);
        $scope.nodelist = nodeslist.items
        $scope.$on('checkedone', function (event,item) {
            console.log('item', item);

        })
        $scope.addUser = function() {
            $scope.inserted = {
                name: '',
                value: ''
            };
            $scope.users.push($scope.inserted);
        };
        //var refresh = function(page) {
        //    var skip = (page - 1) * $scope.grid.size;
        //    $scope.items = $scope.data.slice(skip, skip + $scope.grid.size);
        //};
        //获取buildConfig列表
        //var loadBuildConfigs = function () {
        //    //nodes.get({}, function(data){
        //    //    $scope.nodes = data.items
        //    //    console.log('node', $scope.nodes);
        //    //
        //    //}, function(res) {
        //    //    //todo 错误处理
        //    //});
        //};
        //loadBuildConfigs();
        //根据buildConfig标签获取build列表
        //var loadBuilds = function(items){
        //    var labelSelector = '';
        //    if (items.length > 0) {
        //        labelSelector = 'buildconfig in (';
        //        for (var i = 0; i < items.length; i++) {
        //            labelSelector += items[i].metadata.name + ','
        //        }
        //        labelSelector = labelSelector.substring(0, labelSelector.length - 1) + ')';
        //    }
        //    Build.get({namespace: Cookie.get('namespace'),labelSelector: labelSelector}, function (data) {
        //        //$log.info("builds", data);
        //
        //        $scope.resourceVersion = data.metadata.resourceVersion;
        //        // watchBuilds(data.metadata.resourceVersion);
        //
        //        // fillBuildConfigs(data.items);
        //    });
        //};

    }



})();
