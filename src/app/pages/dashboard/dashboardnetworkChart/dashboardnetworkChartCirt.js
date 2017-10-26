/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardNetworkChartCirt', DashboardNetworkChartCirt);

    /** @ngInject */
    function DashboardNetworkChartCirt(baConfig, layoutPaths, baUtil, Metrics, $rootScope, Cookie, resourcequotas, $scope, MetricsService) {
        var layoutColors = baConfig.colors;
        var graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;
        //console.log('Cookie', Cookie.get('namespace'));
        if (!$rootScope.namespace) {
            //$rootScope.namespace = 'datafoundry'
            $rootScope.namespace=Cookie.get('namespace')
        }
        $scope.cpuData = [];
        $scope.memData = [];
        $scope.rederData = [];
        var chartdata = {
            "type": "serial",
            "theme": "light",
            "titles": [{
                "text":'',
                "size": 15
            }],
            "legend": {
                "align": "center",
                "equalWidths": false,
                "periodValueText": "total: [[value.sum]]",
                "valueAlign": "left",
                "valueText": "[[value]]",
                "valueWidth": 100
            },
            "dataProvider":{},
            "valueAxes": [{
                "id":"v1",
                "axisAlpha": 0,
                "gridAlpha": 0,
                "position": "left",
                "title": "RX"
            },
                {
                    "id":"v2",
                    "axisAlpha": 0,
                    "gridAlpha": 0,
                    "position": "right",
                    "title": "TX"
                }],
            "graphs": [{
                "valueAxis": "v2",
                "balloonText": "<img src='/assets/img/cpu.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>[[value]]KB/s</b></span>",
                "fillAlphas": 0.5,
                "lineAlpha": 0.5,
                "title": "RX(KB/s)",
                "valueField": "RX"
            }, {
                "valueAxis": "v1",
                "balloonText": "<img src='/assets/img/men.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>[[value]]KB/s</b></span>",
                "fillAlphas": 0.5,
                "lineAlpha": 0.5,
                "title": "TX(KB/s)",
                "valueField": "TX"
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
        //function prepareData (tp, data) {
        //    var res = [];
        //    MetricsService.normalize(data, tp);
        //    for (var i = 0; i < data.length - 1; i++) {
        //        res.push(data[i].value);
        //    }
        //    return user(res, tp);
        //};
        function user(users, tp) {

            angular.forEach(users, function (item, i) {

                if (item.avg == null) {
                    users[i] = 0
                } else {
                    //if (tp === 'RX') {Math.round(input.avg * 100) / 100
                        users[i] = Math.round(item.avg  * 100) / 100
                    //} else if (tp === 'TX') {
                    //    users[i] = Math.round(item / 1024 * 100) / 100
                    //}

                }
            })
            timep(users,tp)
            //return users
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
                if (tp === 'RX') {
                    $scope.rederData[i].RX=item;
                } else if (tp === 'TX') {
                    $scope.rederData[i].TX=item;
                }
            })
            $scope.rederData=$scope.rederData.reverse()

        }
        Metrics.network.all.query({
            tags: 'descriptor_name:network/tx_rate,pod_namespace:' + $rootScope.namespace,
            buckets: 30
        }, function (networktx) {
            user(networktx,"TX")
            Metrics.network.all.query({
                tags: 'descriptor_name:network/rx_rate,pod_namespace:' + $rootScope.namespace,
                buckets: 30
            }, function (networkrx) {
                user(networkrx,"RX")
                chartdata.dataProvider=$scope.rederData
                var chart = AmCharts.makeChart("chartdivnet", chartdata);
            })
        })
    }
})();