/** * Created by sorcerer on 2017/3/8. */(function () {    'use strict';    angular.module('BlurAdmin.resource', ['ngResource'])        .factory('User', ['$resource', 'GLOBAL', function ($resource, GLOBAL) {            var User = $resource(GLOBAL.host + '/users/:name', {name: '@name'}, {                create: {method: 'POST'}            });            return User;        }])        .factory('Project', ['$resource', 'GLOBAL', function ($resource, GLOBAL) {            var Project = $resource(GLOBAL.host + '/projects/:name', {name: '@name'}, {                create: {method: 'POST'}            });            return Project;        }])        .factory('Metrics', ['$resource', 'GLOBAL', function ($resource, GLOBAL) {            var Metrics = {};            Metrics.mem = $resource(GLOBAL.host_hawkular + '/gauges/:gauges/data', {                gauges: '@gauges',                buckets: '@buckets',                start: '@start'            });            Metrics.cpu = $resource(GLOBAL.host_hawkular + '/counters/:counters/data', {                counters: '@counters',                buckets: '@buckets',                start: '@start'            });            Metrics.network = $resource(GLOBAL.host_hawkular + '/network/:network/data', {                network: '@network',                buckets: '@buckets',                start: '@start'            });            Metrics.mem.all = $resource(GLOBAL.host_hawkular + '/gauges/data', {tags: '@tags', buckets: '@buckets'});            Metrics.network.all = $resource(GLOBAL.host_hawkular + '/gauges/data', {tags: '@tags', buckets: '@buckets'});            Metrics.cpu.all = $resource(GLOBAL.host_hawkular + '/counters/data', {tags: '@tags', buckets: '@buckets'});            return Metrics;        }])        .factory('BuildConfig', ['$resource', 'GLOBAL', function ($resource, GLOBAL) {            var BuildConfig = $resource(GLOBAL.host + '/namespaces/:namespace/buildconfigs/:name', {                name: '@name',                namespace: '@namespace'            }, {                create: {method: 'POST'},                put: {method: 'PUT'}            });            BuildConfig.instantiate = $resource(GLOBAL.host + '/namespaces/:namespace/buildconfigs/:name/instantiate', {                name: '@name',                namespace: '@namespace'            }, {                create: {method: 'POST'}            });            return BuildConfig;        }])        .factory('Build', ['$resource', '$rootScope', '$ws', '$log', 'Cookie', 'GLOBAL', function ($resource, $rootScope, $ws, $log, Cookie, GLOBAL) {            var Build = $resource(GLOBAL.host + '/namespaces/:namespace/builds/:name?region=:region', {                name: '@name',                namespace: '@namespace',                region: '@region'            }, {                create: {method: 'POST'},                put: {method: 'PUT'}            });            Build.log = $resource(GLOBAL.host + '/namespaces/:namespace/builds/:name/log', {                name: '@name',                namespace: '@namespace'            }, {                get: {method: 'GET', responseType: 'text'}            });            return Build;        }])    /** @ngInject */})();