/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.myImage')
        .controller('myImageCtrl', myImageCtrl);

    /** @ngInject */
    function myImageCtrl(Confirm,ModalPullImage, $state, ImageStream,$rootScope, $scope, ImageStreamTag,Cookie) {

        $scope.name = $state.params.name
        ImageStream.get({namespace: Cookie.get('namespace'), name: $scope.name}, function (data) {
            angular.forEach(data.status.tags, function (tag,i) {
                data.status.tags[i].port=[]
                ImageStreamTag.get({
                    namespace: Cookie.get('namespace'),
                    name: $scope.name + ':' + tag.tag,
                    region:$rootScope.region
                }, function (newdata) {

                    for( var k in newdata.image.dockerImageMetadata.Config.ExposedPorts){
                        data.status.tags[i].port.push(k)

                    }
                    if (i === data.status.tags.length - 1) {
                        console.log(data);
                        $scope.date = data;
                    }
                })
            })

            $scope.date = data;
            $scope.tags = data.status.tags;
            console.log('5555555', data.status.tags);

        })

        $scope.pull = function (name) {
            var s = $scope.name;
            var str =$scope.name + ':' + name
            ModalPullImage.open(str,'project')
                .then(function (res) {

                });
        };
        $scope.delete = function (idx) {
            var title = "删除镜像版本";
            var msg = "您确定要删除该镜像版本吗?";
            var tip = "";
            Confirm.open(title, msg, tip, 'recycle').then(function () {
                var name = $scope.date.status.tags[idx].tag
                if (!name) {
                    return;
                }
                ImageStreamTag.delete({
                    namespace: Cookie.get('namespace'),
                    name: $scope.name + ':' + name,
                    region:$rootScope.region
                }, function (data) {
                    for (var i = 0; i < $scope.date.status.tags.length; i++) {
                        if (name == $scope.date.status.tags[i].tag) {
                            $scope.date.status.tags.splice(i, 1)
                        }
                    }
                })
            })

        };

    }



})();
