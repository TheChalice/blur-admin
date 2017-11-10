/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.createSecret', [])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('create_secret', {
                url: '/create_secret',
                templateUrl: 'app/pages/create_secret/create_secret.html',
                controller: 'createSecretCtrl',
            });
    }


})();