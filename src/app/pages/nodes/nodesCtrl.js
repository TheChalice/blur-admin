/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.nodes')
        .controller('nodesCtrl', nodesCtrl);

    /** @ngInject */
    function nodesCtrl(nodes,Cookie,Sort,$scope,nodeslist,$rootScope) {
        //分页
        //$scope.grid = {
        //    page: 1,
        //    size: 10,
        //    txt: ''
        //};
        $scope.editableTableData=[]
        //console.log('nodeslist', nodeslist);
        $scope.nodelist = nodeslist.items;
        $scope.$on('checkedone', function (event,item) {
            $scope.checked = item
            //console.log('item', item);
            var labels = [];
            var nodeInfo = [];

            angular.forEach(item.metadata.labels, function (item,i) {
                labels.push({"name": i, "value": item})

            })
            angular.forEach(item.status.nodeInfo, function (item,i) {
                nodeInfo.push({"name": i, "value": item})

            })
            if (item.spec&&item.spec.unschedulable) {
                nodeInfo.unshift({"name": 'schedulable', "value": 'No'})
            }else {
                nodeInfo.unshift({"name": 'schedulable', "value": 'Yes'})
            }
            $scope.labels=angular.copy(labels);
            $scope.nodeInfo=angular.copy(nodeInfo);


        })

        $scope.addUser = function() {
            $scope.inserted = {
                name: '',
                value: ''
            };
            $scope.labels.push($scope.inserted);
        };


    }



})();
