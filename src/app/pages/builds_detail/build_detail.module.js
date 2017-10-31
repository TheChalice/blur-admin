/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.build_detail', [])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('build_detail', {
                url: '/build_detail',
                templateUrl: 'app/pages/builds_detail/build_detail.html',
                controller: 'build_detailCtrl',
                title: 'build_detail',
               
            });
    }


})();