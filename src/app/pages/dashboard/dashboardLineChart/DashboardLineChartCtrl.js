/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardLineChartCtrl', DashboardLineChartCtrl);

    /** @ngInject */
    function DashboardLineChartCtrl(baConfig, layoutPaths, baUtil, Metrics, $rootScope, Cookie, resourcequotas, $scope, MetricsService) {
        var layoutColors = baConfig.colors;
        var graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;
        console.log('Cookie', Cookie.get('namespace'));
        if (!$rootScope.namespace) {
            $rootScope.namespace = 'datafoundry'
            //$rootScope.namespace=Cookie.get('namespace')
        }
        $scope.cpuData = [];
        $scope.memData = [];
        $scope.rederData = [];
        var chartdata = {
            "type": "serial",
            "theme": "light",
            "titles": [{
                "text": "瞎测的",
                "size": 15
            }],
            "legend": {
                "align": "center",
                "equalWidths": false,
                "periodValueText": "total: [[value.sum]]",
                "valueAlign": "left",
                "valueText": "[[value]]",
                //"valueText": "[[value]] ([[percents]]%)",
                "valueWidth": 100
            },
            "dataProvider":{},
            "valueAxes": [{
                "id":"v1",
                "axisAlpha": 0,
                "gridAlpha": 0,
                "position": "left",
                "title": "memory"
            },
                {
                    "id":"v2",
                    "axisAlpha": 0,
                    "gridAlpha": 0,
                    "position": "right",
                    "title": "cpu"
                }],
            "graphs": [{
                "valueAxis": "v2",
                "balloonText": "<img src='https://www.amcharts.com/lib/3/images/motorcycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
                "fillAlphas": 0.5,
                "lineAlpha": 0.5,
                "title": "cpu",
                "valueField": "cpu"
            }, {
                "valueAxis": "v1",
                "balloonText": "<img src='https://www.amcharts.com/lib/3/images/bicycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
                "fillAlphas": 0.5,
                "lineAlpha": 0.5,
                "title": "memory",
                "valueField": "memory"
            }],
            "plotAreaBorderAlpha": 0,
            "marginLeft": 0,
            "marginBottom": 0,
            "chartCursor": {
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "hour",
            "categoryAxis": {
                "startOnAxis": true,
                "axisColor": layoutColors,
                "gridAlpha": 0.07
            },
            "export": {
                "enabled": true
            },
            credits: { enabled: false}
        }
        function prepareData (tp, data) {
            var res = [];
            MetricsService.normalize(data, tp);
            for (var i = 0; i < data.length - 1; i++) {
                res.push(data[i].value);
            }
            return user(res, tp);
        };
        function user(users, tp) {

            angular.forEach(users, function (item, i) {

                if (item == null) {
                    users[i] = 0
                } else {
                    if (tp === 'CPU') {
                        users[i] = Math.round(item  * 1000) / 1000
                    } else if (tp === '内存') {
                        users[i] = Math.round(item / 1024 * 100) / 100
                    }

                }
            })
            timep(users,tp)
            return users
        }
        function timep(dataarr,tp) {
            var d = new Date();
            d.setMinutes(0);
            if (!$scope.rederData.length) {
                angular.forEach(dataarr, function (item,i) {

                    var hh=angular.copy(d.getHours()+':'+d.getMinutes());

                    $scope.rederData.unshift({hour: hh})

                    d.setMinutes(d.getMinutes()-15);

                })
            }

            angular.forEach(dataarr, function (item,i) {
                if (tp === 'CPU') {
                    $scope.rederData[i].cpu=item;
                } else if (tp === '内存') {
                    $scope.rederData[i].memory=item;
                }
            })
            $scope.rederData=$scope.rederData.reverse()
            //console.log('$scope.rederData', $scope.rederData);

        }
        Metrics.cpu.all.query({
            tags: 'descriptor_name:cpu/usage,pod_namespace:' + $rootScope.namespace,
            buckets: 30
        }, function (cpuuser) {
            $scope.cpuData = prepareData('CPU', cpuuser);
            //console.log('$scope.cpuData', $scope.cpuData);

            Metrics.mem.all.query({
                tags: 'descriptor_name:memory/usage,pod_namespace:' + $rootScope.namespace,
                buckets: 30
            }, function (memoryuser) {
                $scope.memData = prepareData('内存', memoryuser);
                //console.log('memoryuser', $scope.memData);
                resourcequotas.get({namespace: $rootScope.namespace}, function (rcdata) {
                    chartdata.dataProvider=$scope.rederData
                    var chart = AmCharts.makeChart("chartdiv", chartdata);

                })
            })
        }, function (err) {

        })
    }
})();