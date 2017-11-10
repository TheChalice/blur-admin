/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.createConstantlyVolume')
        .controller('createConstantlyVolumeCtrl', createConstantlyVolumeCtrl);

    /** @ngInject */
    function createConstantlyVolumeCtrl(persistent,market,$state, Cookie, volume, $scope) {
        $scope.changeval = function(e){
            $scope.grid.val = e.from;
            $scope.$apply();

        }
        $scope.grid = {
            inved: false,
            num: false,
            dianji: false,
            val:1,
            creat:false
        }
        $scope.err= {
            blank:false,
            valid:false
        }
        $scope.volume = {
            name: '',
            size: '',
            metadata: {
                annotations: {
                    'dadafoundry.io/create-by': Cookie.get('namespace')
                }
            }
        }
        $scope.getPlan=true;
        market.get({type:'volume'}, function (data) {
            console.log(data.plans);
            $scope.plans = data.plans;
            $scope.getPlan=false;
        })
        $scope.$watch('grid.val', function (n, o) {
            console.log('222')
            if (n == o) {
                return
            }
            if (n && n >0) {
                $scope.grid.num=false

            }
        })
        $scope.namerr = {
            nil: false,
            rexed: false,
            repeated: false
        }
        $scope.nameblur = function () {
            if (!$scope.volume.name) {
                $scope.namerr.nil = true
            } else {
                $scope.namerr.nil = false
            }
        }
        $scope.namefocus = function () {
            $scope.namerr.nil = false
        }
        persistent.get({
            namespace:Cookie.get('namespace')
        }, function (res) {
            $scope.persmnamearr=res.items;
        })

        var rex =/^[a-z][a-z0-9-]{2,28}[a-z0-9]$/;

        $scope.$watch('volume.name', function (n, o) {
            if (n === o) {
                return;
            }
            if (n && n.length > 0) {
                if (rex.test(n)) {
                    $scope.namerr.rexed = false;
                    $scope.namerr.repeated=false;
                    if ($scope.persmnamearr) {
                        angular.forEach($scope.persmnamearr, function (bsiname, i) {
                            if (bsiname.metadata.name === n) {
                                $scope.namerr.repeated = true;

                            }else{
                                $scope.grid.creat = true;
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
        $scope.empty=function(){
            if ( $scope.volume.name==='') {

                //alert(1)
                $scope.err.blank = false;
                return
            }
        }
        $scope.isEmpty=function(){
            if ( $scope.volume.name==='') {
                //alert(1)
                $scope.err.blank = true;
                return
            } else {
                $scope.err.blank = false;
            }

        }
        $scope.creat = function () {
            if (!$scope.namerr.nil && !$scope.namerr.rexed && !$scope.namerr.repeated&&!$scope.timeouted) {

            }else {
                return
            }
            var r =/^[a-z][a-z0-9-]{2,28}[a-z0-9]$/;

            if ($scope.volume.name==='') {
                $scope.err.blank = true;
                return
            } else if (!r.test($scope.volume.name)) {
                $scope.err.valid = true;
                return
            }

            if ($scope.grid.val === 0) {
                $scope.grid.num=true;
                return
            }
            $scope.volume.size=$scope.grid.val;

            angular.forEach($scope.plans, function (plan,i) {
                console.log($scope.grid.val,plan.plan_level*10);
                if ($scope.grid.val === plan.plan_level*10) {
                    $scope.plan_id = plan.plan_id;
                }
            })

            $scope.loaded = true;
            console.log($scope.plan_id);
            volume.create({namespace:Cookie.get('namespace')}, $scope.volume, function (res) {
                $scope.loaded = false;
                $state.go('resourceMgm', {index: 1});
            }, function (err) {
                $scope.loaded = false;
                // Toast.open('创建失败,请重试');
            })


        }


    }



})();
