/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.nodes', [])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('nodes', {
                url: '/nodes',
                templateUrl: 'app/pages/nodes/nodes.html',
                controller: 'nodesCtrl',
                resolve: {
                    nodeslist:['nodes', '$stateParams','Cookie', function (nodes,$stateParams) {
                        return nodes.get().$promise;
                    }],
                },
                title: 'nodes',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                },

            });
    }


})();