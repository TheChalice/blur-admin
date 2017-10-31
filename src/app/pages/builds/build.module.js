/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.build', [])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('build', {
                url: '/build',
                templateUrl: 'app/pages/builds/build.html',
                controller: 'buildCtrl',
                title: 'Build',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                },
            });
    }


})();