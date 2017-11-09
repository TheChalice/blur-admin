/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.createConfigVolume', [])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('createConfigVolume', {
                url: '/create_config_volume',
                templateUrl: 'app/pages/create_config_volume/create_config_volume.html',
                controller: 'createConfigVolumeCtrl',
            });
    }


})();