/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.build_detail')
        .controller('build_detailCtrl', build_detailCtrl);

    /** @ngInject */
    function build_detailCtrl(BuildConfig, $log, Cookie, Sort, $scope, $rootScope, $stateParams,$state, Build) {

        var loadBuildConfig = function () {
            BuildConfig.get({
                namespace: Cookie.get('namespace')
            }, function (data) {
                $log.info('data', data);

            }, function (res) {
                //错误处理
            });
        };
        loadBuildConfig();


         //根据buildConfig标签获取build列表
         var loadBuilds = function(name){
            Build.get({
                namespace: Cookie.get('namespace')
            }, function (data) {
               data.items = Sort.sort(data.items, -1); //排序
                $scope.databuild = data;
            });
        };
        loadBuilds();























    }



})();