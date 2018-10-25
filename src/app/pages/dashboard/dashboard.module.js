/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/pages/dashboard/dashboard.html',
                title: 'Dashboard',
                resolve: {
                    projectlist:['Project', function (Project) {
                        return Project.get().$promise;
                    }],
                },
                controller: function ($scope,projectlist,$rootScope,Cookie,$state) {
                    $scope.Projectlist = projectlist.items
                    console.log('Projectlist', $scope.Projectlist);
                    $scope.canrender={render:false};
                    $scope.$on('checkedone', function (event,item) {
                        console.log('item', event);
                        $rootScope.namespace=item.metadata.name;
                        Cookie.set('namespace', $rootScope.namespace, 10 * 365 * 24 * 3600 * 1000);
                        $state.reload();
                    })
                },

                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 0,
                },
            });
    }

})();
