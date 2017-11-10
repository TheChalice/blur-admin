/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.createConstantlyVolume', [])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('createConstantlyVolume', {
                url: '/create_constantly_volume',
                templateUrl: 'app/pages/create_constantly_volume/create_constantly_volume.html',
                controller: 'createConstantlyVolumeCtrl',
            });
    }


})();