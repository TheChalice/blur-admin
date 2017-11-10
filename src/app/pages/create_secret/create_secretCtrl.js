/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.createSecret')
        .controller('createSecretCtrl', createSecretCtrl);

    /** @ngInject */
    function createSecretCtrl($scope,Cookie, secretskey, $state,$base64) {
        $scope.secrets = {
            "kind": "Secret",
            "apiVersion": "v1",
            "metadata": {
                "name": ""
            },
            "data": {},
            "secretsarr": [],
            "type": "Opaque"
        }
        $scope.grid = {
            secreteno: false,
            secretnames: true,
            nameerr: false,
            keychongfu: false,
            keybuhefa: false,
            keynull: false
        }
        $scope.addSecret = function () {
            $scope.secrets.secretsarr.push({key: '', value: ''});
            //console.log($scope.secretsarr);
        }
        $scope.rmsecret = function (idx) {
            $scope.secrets.secretsarr.splice(idx, 1);
        }
        var by = function (name) {
            return function (o, p) {
                var a, b;
                if (typeof o === "object" && typeof p === "object" && o && p) {
                    a = o[name];
                    b = p[name];
                    if (a === b) {
                        return 0;
                    }
                    if (typeof a === typeof b) {
                        return a < b ? -1 : 1;
                    }
                    return typeof a < typeof b ? -1 : 1;
                } else {
                    throw ("error");
                }
            }
        }
        $scope.$watch('secrets', function (n, o) {
            if (n == o) {
                return
            }
            ;
            //console.log(n);
            $scope.grid.keychongfu = false;
            $scope.grid.keynull = false;
            $scope.grid.keybuhefa = false;

            if (n.metadata.name && n.secretsarr) {
                var arr = angular.copy(n.secretsarr);
                arr.sort(by("key"));
                if (arr && arr.length > 0) {
                    var kong = false;
                    var r = /^\.?[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$/;
                    angular.forEach(arr, function (item, i) {

                        if (!item.key || !item.value) {
                            $scope.grid.keynull = true;
                            kong = true;
                        } else {
                            if (arr[i] && arr[i + 1]) {
                                if (arr[i].key == arr[i + 1].key) {
                                    $scope.grid.keychongfu = true;
                                    kong = true;
                                }
                            }
                            if (!r.test(arr[i].key)) {
                                //console.log(arr[i].key);
                                $scope.grid.keybuhefa = true;
                                kong = true;
                            }
                        }
                    });

                    if (!kong) {
                        $scope.grid.secreteno = true
                    } else {

                        $scope.grid.secreteno = false
                    }
                } else {
                    $scope.grid.secreteno = false
                }
            } else {
                $scope.grid.secreteno = false
            }
        }, true);

        $scope.checknames = function () {
            var r =/^[a-z][a-z0-9-]{2,28}[a-z0-9]$/;
            if (!r.test($scope.secrets.metadata.name)) {
                $scope.grid.secretnames = false;
            } else {
                $scope.grid.secretnames = true;
            }
        }
        $scope.checkedkv = function () {
            var r = /^[a-zA-Z][a-zA-Z0-9_]{1,20}$/; // key值的验证;
            for (var i = 0; i < $scope.secretsarr.length; i++) {
                if ($scope.secretsarr[i].key && $scope.secretsarr[i].value && r.test($scope.secretsarr[i].key)) {
                    $scope.grid.secreteno = true;
                } else {
                    $scope.grid.secreteno = false;
                }
            }
        }
        $scope.namerr = {
            nil: false,
            rexed: false,
            repeated: false
        }
        $scope.nameblur = function () {
            if (!$scope.secrets.metadata.name) {
                $scope.namerr.nil = true
            } else {
                $scope.namerr.nil = false
            }
        }
        $scope.namefocus = function () {
            $scope.namerr.nil = false
        }
        secretskey.get({namespace: Cookie.get('namespace')}, function (res) {
            $scope.secremnamearr=res.items;

        })


        var rex =/^[a-z][a-z0-9-]{2,28}[a-z0-9]$/;

        $scope.$watch('secrets.metadata.name', function (n, o) {
            if (n === o) {
                return;
            }
            if (n && n.length > 0) {
                if (rex.test(n)) {
                    $scope.namerr.rexed = false;
                    $scope.namerr.repeated=false;
                    if ($scope.secremnamearr) {
                        //console.log($scope.buildConfiglist);
                        angular.forEach($scope.secremnamearr, function (bsiname, i) {
                            console.log(bsiname);
                            if (bsiname.metadata.name === n) {
                                console.log(bsiname,n);
                                $scope.namerr.repeated = true;

                            }
                        })
                    }

                } else {
                    $scope.namerr.rexed = true;
                }
            } else {
                $scope.namerr.rexed = false;
            }
        })

        $scope.postsecret = function () {
            if (!$scope.namerr.nil && !$scope.namerr.rexed && !$scope.namerr.repeated) {

            }else {
                return
            }
            $scope.loaded = true;
            angular.forEach($scope.secrets.secretsarr, function (item, i) {
                $scope.secrets.data[item.key] = Base64.encode(item.value);
            })
            delete $scope.secrets.secretsarr;
            secretskey.create({namespace:Cookie.get('namespace')}, $scope.secrets, function (res) {
                $scope.grid.nameerr = false;
                $scope.loaded = false;
                $state.go('resourceMgm', {index: 3});
            }, function (res) {
                if (res.status == 409) {
                    $scope.grid.nameerr = true;
                }
            })

        }

    }



})();
