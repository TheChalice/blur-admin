(function () {
    'use strict';

    angular.module('BlurAdmin.pages.servicedetil', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {

        $stateProvider
            .state('servicedetil', {
                url: '/servicedetil',
                templateUrl: 'app/pages/service_detil/addVolumePage.html',
                controller: 'addVolumePageCtrl',
            })

    }

})();