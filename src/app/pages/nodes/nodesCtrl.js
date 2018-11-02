/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.nodes')
        .controller('nodesCtrl', nodesCtrl);

    /** @ngInject */
    function nodesCtrl(toastr, Cookie, Sort, $scope, nodeslist, $rootScope, nodesupdata) {
        //分页
        //$scope.grid = {
        //    page: 1,
        //    size: 10,
        //    txt: ''
        //};
        $scope.editableTableData = []
        //console.log('nodeslist', nodeslist);
        $scope.nodelist = nodeslist.items;
        function checkedone(item){
            $scope.checked = item
            //console.log('item', item);
            var labels = [];
            var nodeInfo = [];

            angular.forEach(item.metadata.labels, function (item, i) {
                labels.push({"name": i, "value": item})

            })
            angular.forEach(item.status.nodeInfo, function (item, i) {
                nodeInfo.push({"name": i, "value": item})

            })
            if (item.spec && item.spec.unschedulable) {
                nodeInfo.unshift({"name": 'schedulable', "value": 'No'})
            } else {
                nodeInfo.unshift({"name": 'schedulable', "value": 'Yes'})
            }
            $scope.labels = angular.copy(labels);
            $scope.nodeInfo = angular.copy(nodeInfo);
        }

        function creatupdataobj(){
            var updata = {
                "metadata":
                {
                    "labels": {

                    }
                }
            }
            angular.forEach($scope.labels, function (item, i) {
                if (item.name && item.value) {
                    updata.metadata.labels[item.name]=item.value;
                }
            })
            return updata
        }
        function testerr(updata){
            var namerex=/^([A-Za-z0-9][-A-Za-z0-9_.\/]*)?[A-Za-z0-9]$/
            var valuerex=/^(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])?$/
            var err = false;
            //console.log('updata.labels', updata);
            angular.forEach(updata.metadata.labels, function (item,i) {
                console.log(i, item);
                console.log(namerex.test(i), valuerex.test(item));
                if (!namerex.test(i)) {

                    err=true
                }
                if (!valuerex.test(item)) {
                    err=true
                }

            })
            if (!err) {
                return false
            }else {
                return true
            }
        }
        $scope.$on('checkedone', function (event, item) {
            checkedone(item)
        })

        $scope.addUser = function () {
            $scope.inserted = {
                name: '',
                value: ''
            };
            $scope.labels.push($scope.inserted);
        };
        $scope.removelist= function (index) {
            //console.log('$scope.labels[index].name',$scope.labels[index].name);
            var updataobj = creatupdataobj();
            if ($scope.labels[index].name) {
                updataobj.metadata.labels[$scope.labels[index].name]=null;
            }
            nodesupdata.updata({node: $scope.checked.metadata.name},updataobj, function (data) {
                checkedone(data)
            })
        }
        $scope.savelist = function (rowform,name) {
            if (name) {
                var oldname = name
            }
           var updataobj = creatupdataobj();
            if (rowform.$data.name) {
                updataobj.metadata.labels[rowform.$data.name]=rowform.$data.value;
            }
            if (name) {
                updataobj.metadata.labels[oldname]=null;
            }
            //console.log('testerr(updataobj)', testerr(updataobj));
            if (testerr(updataobj)) {
                toastr.error('输入错误', '输入参数不合法', {
                    "autoDismiss": false,
                    "positionClass": "toast-top-right",
                    "type": "error",
                    "timeOut": "5000",
                    "extendedTimeOut": "2000",
                    "allowHtml": false,
                    "closeButton": false,
                    "tapToDismiss": true,
                    "progressBar": false,
                    "newestOnTop": true,
                    "maxOpened": 0,
                    "preventDuplicates": false,
                    "preventOpenDuplicates": false
                })
               return
            }
            nodesupdata.updata({node: $scope.checked.metadata.name},updataobj, function (data) {
                $scope.inserted = false;
                rowform.$visible=false;
                checkedone(data)
            })
        }


    }


})();
