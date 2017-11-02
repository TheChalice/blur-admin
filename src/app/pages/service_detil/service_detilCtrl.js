/** * Created by sorcerer on 2017/10/25. */(function () {    'use strict';    angular.module('BlurAdmin.pages.servicedetil')        .controller('servicedetilCtrl', servicedetilCtrl);    /** @ngInject */    function servicedetilCtrl(mydc,$scope,Service,$rootScope,Route,Cookie,ReplicationController,$stateParams,Event,Ws,Pod) {        //console.log('mydc', mydc);        $scope.$on('$destroy', function () {            Ws.clear();        });        $rootScope.namespace=Cookie.get('namespace');        $scope.dc=angular.copy(mydc);        $scope.status={            text:'部署'        }        if ($scope.dc.spec.replicas === 0) {            $scope.status.text='启动'        }else {            $scope.status.text='停止'        }        $scope.resourceVersion = $scope.dc.metadata.resourceVersion;        var watchdcs = function (resourceVersion) {            Ws.watch({                api: 'other',                resourceVersion: resourceVersion,                namespace: $rootScope.namespace,                type: 'deploymentconfigs',                name: ''            }, function (res) {                var data = JSON.parse(res.data);                updatedcs(data);            }, function () {                //$log.info("webSocket start");            }, function () {                //$log.info("webSocket stop");                var key = Ws.key($rootScope.namespace, 'deploymentconfigs', '');                if (!$rootScope.watches[key] || $rootScope.watches[key].shouldClose) {                    return;                }            });        };        watchdcs($scope.resourceVersion);        var updatedcs = function (data) {            if (data.type == 'ERROR') {                //$log.info("err", data.object.message);                Ws.clear();                return;            }            $scope.resourceVersion = data.object.metadata.resourceVersion;            if (data.type == 'ADDED') {            } else if (data.type == "MODIFIED") {                    if ($scope.dc.metadata.name === data.object.metadata.name) {                        //alert(11)                        $scope.dc.status.updatedReplicas=data.object.status.updatedReplicas;                        $scope.dc.spec.replicas=data.object.spec.replicas;                        if ($scope.dc.spec.replicas === 0) {                            $scope.status.text='启动';                        }else {                            $scope.status.text='停止';                        }                        $scope.$apply()                    }            }        }        loadPods($scope.dc.metadata.name)        function loadPods(dc) {            var labelSelector = 'deploymentconfig=' + dc;            Pod.get({namespace: $scope.namespace, labelSelector: labelSelector}, function (pods) {                $scope.pods = pods;                angular.forEach($scope.pods.items, function (pod, i) {                    if (pod.spec.containers.length) {                        angular.forEach(pod.spec.containers, function (rongqi, k) {                            rongqi.podname = pod.metadata.name                        })                    }                })                console.log('$scope.pods', $scope.pods);            }, function (res) {            });        };        function loadService(dc) {            Service.get({namespace: $rootScope.namespace, name: dc.metadata.name}, function (res) {                loadRoutes(dc);            }, function (res) {            });        };        function loadRoutes(dc) {            Route.get({namespace: $rootScope.namespace,name:dc.metadata.name}, function (res) {                $scope.dc.route=res;            }, function (res) {            });        };    }})();//{//    "kind": "PodList",//    "apiVersion": "v1",//    "metadata": {//    "selfLink": "/api/v1/namespaces/datafoundry/pods",//        "resourceVersion": "2840005"//},//    "items": [//    {//        "metadata": {//            "name": "datafoundryservicevolume-12-m8nzt",//            "generateName": "datafoundryservicevolume-12-",//            "namespace": "datafoundry",//            "selfLink": "/api/v1/namespaces/datafoundry/pods/datafoundryservicevolume-12-m8nzt",//            "uid": "918a9b23-bf6f-11e7-8a5e-fa163e095b60",//            "resourceVersion": "2839782",//            "creationTimestamp": "2017-11-02T01:45:56Z",//            "labels": {//                "app": "datafoundryservicevolume",//                "deployment": "datafoundryservicevolume-12",//                "deploymentconfig": "datafoundryservicevolume"//            },//            "annotations": {//                "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicationController\",\"namespace\":\"datafoundry\",\"name\":\"datafoundryservicevolume-12\",\"uid\":\"2e0794e2-a5aa-11e7-9a15-fa163e095b60\",\"apiVersion\":\"v1\",\"resourceVersion\":\"2839761\"}}\n",//                "openshift.io/deployment-config.latest-version": "12",//                "openshift.io/deployment-config.name": "datafoundryservicevolume",//                "openshift.io/deployment.name": "datafoundryservicevolume-12",//                "openshift.io/generated-by": "OpenShiftNewApp",//                "openshift.io/scc": "restricted"//            },//            "ownerReferences": [//                {//                    "apiVersion": "v1",//                    "kind": "ReplicationController",//                    "name": "datafoundryservicevolume-12",//                    "uid": "2e0794e2-a5aa-11e7-9a15-fa163e095b60",//                    "controller": true,//                    "blockOwnerDeletion": true//                }//            ]//        },//        "spec": {//            "volumes": [//                {//                    "name": "default-token-phmkc",//                    "secret": {//                        "secretName": "default-token-phmkc",//                        "defaultMode": 420//                    }//                }//            ],//            "containers": [//                {//                    "name": "datafoundryservicevolume",//                    "image": "docker-registry.default.svc:5000/datafoundry/datafoundryvolume@sha256:d2da151479ab41b53f9134193adceba66b200519e9f42ab429e600e1579f4112",//                    "env": [//                        {//                            "name": "DATAFOUNDRY_ADMIN_PASS",//                            "value": "1234"//                        },//                        {//                            "name": "DATAFOUNDRY_ADMIN_USER",//                            "value": "hack"//                        },//                        {//                            "name": "DATAFOUNDRY_HOST_ADDR",//                            "value": "10.23.4.25:8443"//                        },//                        {//                            "name": "GLUSTER_ENDPOINTS_NAME",//                            "value": "glusterfs-cluster"//                        },//                        {//                            "name": "HEKETI_HOST_ADDR",//                            "value": "10.23.4.22"//                        },//                        {//                            "name": "HEKETI_HOST_PORT",//                            "value": "8080"//                        },//                        {//                            "name": "HEKETI_KEY",//                            "value": "kLd834dadEsfwcv"//                        },//                        {//                            "name": "HEKETI_USER",//                            "value": "admin"//                        },//                        {//                            "name": "STORAGE_CLASS_NAME",//                            "value": "gluster-heketi"//                        },//                        {//                            "name": "GLUSTER_VOLUME_REPLICA",//                            "value": "2"//                        }//                    ],//                    "resources": {},//                    "volumeMounts": [//                        {//                            "name": "default-token-phmkc",//                            "readOnly": true,//                            "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount"//                        }//                    ],//                    "terminationMessagePath": "/dev/termination-log",//                    "terminationMessagePolicy": "File",//                    "imagePullPolicy": "Always",//                    "securityContext": {//                        "privileged": false,//                        "seLinuxOptions": {//                            "level": "s0:c9,c4"//                        }//                    }//                }//            ],//            "restartPolicy": "Always",//            "terminationGracePeriodSeconds": 30,//            "dnsPolicy": "ClusterFirst",//            "serviceAccountName": "default",//            "serviceAccount": "default",//            "nodeName": "10.23.4.27",//            "securityContext": {//                "seLinuxOptions": {//                    "level": "s0:c9,c4"//                },//                "fsGroup": 1000080000//            },//            "imagePullSecrets": [//                {//                    "name": "default-dockercfg-jxpd8"//                }//            ],//            "schedulerName": "default-scheduler"//        },//        "status": {//            "phase": "Running",//            "conditions": [//                {//                    "type": "Initialized",//                    "status": "True",//                    "lastProbeTime": null,//                    "lastTransitionTime": "2017-11-02T01:45:56Z"//                },//                {//                    "type": "Ready",//                    "status": "True",//                    "lastProbeTime": null,//                    "lastTransitionTime": "2017-11-02T01:45:58Z"//                },//                {//                    "type": "PodScheduled",//                    "status": "True",//                    "lastProbeTime": null,//                    "lastTransitionTime": "2017-11-02T01:45:56Z"//                }//            ],//            "hostIP": "10.23.4.27",//            "podIP": "172.26.2.76",//            "startTime": "2017-11-02T01:45:56Z",//            "containerStatuses": [//                {//                    "name": "datafoundryservicevolume",//                    "state": {//                        "running": {//                            "startedAt": "2017-11-02T01:45:58Z"//                        }//                    },//                    "lastState": {},//                    "ready": true,//                    "restartCount": 0,//                    "image": "docker-registry.default.svc:5000/datafoundry/datafoundryvolume@sha256:d2da151479ab41b53f9134193adceba66b200519e9f42ab429e600e1579f4112",//                    "imageID": "docker-pullable://docker-registry.default.svc:5000/datafoundry/datafoundryvolume@sha256:d2da151479ab41b53f9134193adceba66b200519e9f42ab429e600e1579f4112",//                    "containerID": "docker://30c78b8dd8ea6737ab122a215020a593d11705f810cf263be3eedb11349c1fce"//                }//            ],//            "qosClass": "BestEffort"//        }//    }//]//}