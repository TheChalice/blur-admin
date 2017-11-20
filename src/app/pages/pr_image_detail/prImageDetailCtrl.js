/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.prImage')
        .controller('prImageCtrl', prImageCtrl);

    /** @ngInject */
    function prImageCtrl(pubregistrytag,ModalPullImage, $scope,$stateParams) {

        var namespace=$stateParams.name.split('/')[0];
        var name=$stateParams.name.split('/')[1];
        console.log("cmd1", $stateParams.name);
        pubregistrytag.get({namespace:namespace,name:name}, function (tag) {
            $scope.data = tag;
            $scope.name = tag.name
            $scope.tags=[];
            angular.forEach(tag.tags, function (item, i) {
                var obj = {tag:item,isPrImage:true};
                $scope.tags.push(obj)

            });

        })
        $scope.pull = function (name) {
            var s = $scope.data.name;
            //console.log(name);
            var str =s + ':' + name
            ModalPullImage.open(str)
                .then(function (res) {


                });
        };


    }



})();
