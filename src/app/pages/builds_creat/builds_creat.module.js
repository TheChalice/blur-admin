/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.buildscreat', [])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('builds_creat', {
                url: '/builds_creat/',
                templateUrl: 'app/pages/builds_creat/builds_creat.html',
                controller: 'buildscreatCtrl'
            });
    }


})();