/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.prImage', [])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('prImage', {
                url: '/pr_image_detail/:name',
                templateUrl: 'app/pages/pr_image_detail/pr_image_detail.html',
                controller: 'prImageCtrl'
            });
    }


})();