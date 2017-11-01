/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages', [
            'ui.router',
            'BlurAdmin.resource',
            'BlurAdmin.pages.dashboard',
            'BlurAdmin.pages.build',
            'BlurAdmin.pages.build_detail',
            'BlurAdmin.pages.service',
            'BlurAdmin.pages.resourceMgm',
            'BlurAdmin.pages.secretDetail',
            'BlurAdmin.pages.configDetail',
            'BlurAdmin.pages.consDetail',
            'BlurAdmin.pages.ui',
            'BlurAdmin.pages.login',
            'BlurAdmin.pages.components',
            'BlurAdmin.pages.form',
            'BlurAdmin.pages.tables',
            'BlurAdmin.pages.charts',
            'BlurAdmin.pages.maps',
            'BlurAdmin.pages.profile',
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
        $urlRouterProvider.otherwise('/login');

        baSidebarServiceProvider.addStaticItem({
            title: 'Pages',
            icon: 'ion-document',
            subMenu: [{
                title: 'Sign In',
                fixedHref: 'auth.html',
                blank: true
            }, {
                title: 'Sign Up',
                fixedHref: 'reg.html',
                blank: true
            }, {
                title: 'User Profile',
                stateRef: 'profile'
            }, {
                title: '404 Page',
                fixedHref: '404.html',
                blank: true
            }]
        });
        var obj = {
            title: 'Menu Level 1',
            icon: 'ion-ios-more',
            subMenu: [{
                title: 'Menu Level 1.1',
                disabled: true
            }, {
                title: 'Menu Level 1.2',
                subMenu: [{
                    title: 'Menu Level 1.2.1',
                    disabled: true
                }]
            }]
        }
        baSidebarServiceProvider.addStaticItem(obj);
    }

})();
