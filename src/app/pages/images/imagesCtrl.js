/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.images')
        .controller('ImageCtrl', ImageCtrl);

    /** @ngInject */
    function ImageCtrl($scope,ImageStream, Cookie, ImageStreamTag,platformlist, pubregistry,pubregistrytag) {
        $scope.grid = {
            page: 1,
            ckpage:1,
            size: 12,
            txt:'',
            cktxt:'',
        };
        // 构建镜像
        ImageStream.get({namespace: Cookie.get('namespace')}, function (images) {
            var newimg = [];
            angular.forEach(images.items, function (item, i) {
                if(item.status.tags&&item.status.tags[0].tag&&item.status.tags[0].items[0].created){
                    newimg.push(item)
                }
            })
            $scope.images = newimg;
            $scope.grid.total = $scope.images.length;
            refresh(1)
        })
        //构建镜像翻页
        var refresh = function (page) {
            $(document.body).animate({
                scrollTop: 0
            }, 200);
            var skip = (page - 1) * $scope.grid.size;
                $scope.newimage = $scope.images.slice(skip, skip + $scope.grid.size);
                $scope.grid.total = $scope.images.length;

        };
        $scope.$watch('grid.page', function (newVal, oldVal) {
            if (newVal != oldVal) {
                    refresh(newVal);
            }
        });
        // 构建镜像搜索
        $scope.search = function (txt) {
            if (!txt) {
                refresh(1);
                return;
            }
            var imagearr = [];
            txt = txt.replace(/\//g, '\\/');
            var reg = eval('/' + txt + '/');
            if($scope.newimage){
                for (var i = 0; i < $scope.newimage.length; i++) {
                    if (reg.test($scope.newimage[i].metadata.name)) {
                        imagearr.push($scope.newimage[i]);
                    }
                }
            }
            $scope.newimage = imagearr;
            $scope.grid.total = 0

        };
        //仓库镜像
        pubregistry.get(function (data) {
            $scope.ckimages = []
            angular.forEach(data.repositories, function (image, i) {
                var namespace = image.split('/')[0];
                var name = image.split('/')[1];
                $scope.ckimages.push({metadata: {name: image}, status: {

                }})
                pubregistrytag.get({namespace: namespace, name: name}, function (tags) {
                    $scope.ckimages[i].status.tags = [];
                    //console.log('tags', tags);
                    angular.forEach(tags.tags, function (tag,k) {
                        $scope.ckimages[i].status.tags.push({tag:tag,ist: {
                            metadata :{
                                name:$scope.ckimages[i].metadata.name + ':' + tag,
                            },
                            ispublicimage:true
                        }})
                    })
                })
            })
            console.log($scope.ckimages);
            $scope.grid.ckTotal = $scope.ckimages.length;
            ckRefresh(1)

        })
        //仓库镜像翻页
        var ckRefresh = function (page) {
            $(document.body).animate({
                scrollTop: 0
            }, 200);
            var skip = (page - 1) * $scope.grid.size;
            $scope.newCkImage = $scope.ckimages.slice(skip, skip + $scope.grid.size);
            $scope.grid.ckTotal = $scope.ckimages.length;

        };
        $scope.$watch('grid.ckpage', function (newVal, oldVal) {
            if (newVal != oldVal) {
                ckRefresh(newVal);
            }
        });
        // 仓库镜像搜索
        $scope.ckSearch = function (txt) {
            if (!txt) {
                ckRefresh(1);
                return;
            }
            var imagearr = [];
            txt = txt.replace(/\//g, '\\/');
            var reg = eval('/' + txt + '/');
            if($scope.newCkImage){
                for (var i = 0; i < $scope.newCkImage.length; i++) {
                    if (reg.test($scope.newCkImage[i].metadata.name)) {
                        imagearr.push($scope.newCkImage[i]);
                    }
                }
            }
            $scope.newCkImage = imagearr;
            $scope.grid.ckTotal = 0

        };












    }



})();
