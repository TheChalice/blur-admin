'use strict';

angular.module('BlurAdmin', [
        'ngAnimate',
        'ui.bootstrap',
        'ui.sortable',
        'ui.router',
        'ngTouch',
        'toastr',
        'smart-table',
        "xeditable",
        'ui.slimscroll',
        'ngJsTree',
        'BlurAdmin.resource',
        'BlurAdmin.service',
        'BlurAdmin.controller',
        'angular-progress-button-styles',
        'BlurAdmin.theme',
        'BlurAdmin.pages',
        'BlurAdmin.filter',
        'base64',
        'BlurAdmin.webSocket'
    ])
    .constant('GLOBAL', {
        size: 10,
        host: '/oapi/v1',
        host_k8s: '/api/v1',
        host_wss: '/ws/oapi/v1',
        host_wss_k8s: '/ws/api/v1',
        host_registry: '/registry/api',
        login_uri: '/login',
        signin_uri: '/signin',
        common_url:'registry.dataos.io',
        host_hawkular: '/hawkular/metrics',
        host_webhooks: 'https://dev.dataos.io:8443'
    })
    .constant('AUTH_EVENTS', {
        loginNeeded: 'auth-login-needed',
        loginSuccess: 'auth-login-success',
        httpForbidden: 'auth-http-forbidden'
    })
    .config(['$httpProvider', 'GLOBAL', function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    }])