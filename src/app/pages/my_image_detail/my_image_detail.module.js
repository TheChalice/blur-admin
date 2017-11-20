/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.myImage', [])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('myImage', {
                url: '/my_image_detail/:name',
                templateUrl: 'app/pages/my_image_detail/my_image_detail.html',
                controller: 'myImageCtrl'
            });
    }


})();