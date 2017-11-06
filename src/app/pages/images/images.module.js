/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.images', [])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('images', {
                url: '/images',
                templateUrl: 'app/pages/images/images.html',
                controller: 'imagesCtrl',
                title: 'Images',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                },
            });
    }


})();