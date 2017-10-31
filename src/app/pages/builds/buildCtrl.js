/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.build')
        .controller('buildCtrl', buildCtrl);

    /** @ngInject */
    function buildCtrl(BuildConfig,Cookie,Sort,$scope,Build) {
        //分页
        $scope.grid = {
            page: 1,
            size: 10,
            txt: ''
        };
        var refresh = function(page) {
            var skip = (page - 1) * $scope.grid.size;
            $scope.items = $scope.data.slice(skip, skip + $scope.grid.size);
        };
        //获取buildConfig列表
        var loadBuildConfigs = function () {
            BuildConfig.get({namespace: Cookie.get('namespace')}, function(data){
                data.items = Sort.sort(data.items, -1); //排序
                $scope.data = data.items;
                $scope.grid.total = data.items.length;
                refresh(1);
                loadBuilds($scope.data);
            }, function(res) {
                //todo 错误处理
            });
        };
        loadBuildConfigs();
        //根据buildConfig标签获取build列表
        var loadBuilds = function(items){
            var labelSelector = '';
            if (items.length > 0) {
                labelSelector = 'buildconfig in (';
                for (var i = 0; i < items.length; i++) {
                    labelSelector += items[i].metadata.name + ','
                }
                labelSelector = labelSelector.substring(0, labelSelector.length - 1) + ')';
            }
            Build.get({namespace: Cookie.get('namespace'),labelSelector: labelSelector}, function (data) {
                //$log.info("builds", data);

                $scope.resourceVersion = data.metadata.resourceVersion;
                // watchBuilds(data.metadata.resourceVersion);

                // fillBuildConfigs(data.items);
            });
        };

    }



})();
