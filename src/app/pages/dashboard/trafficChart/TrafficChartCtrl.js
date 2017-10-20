/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('TrafficChartCtrl', TrafficChartCtrl);

  /** @ngInject */
  function TrafficChartCtrl($scope, baConfig, colorHelper,Metrics,$rootScope,Cookie) {

      $scope.transparent = baConfig.theme.blur;
      var dashboardColors = baConfig.colors.dashboard;
      //console.log('canrender', $scope.canrender);
      $scope.$watch('canrender', function (n,o) {
          if (n === o) {
              return
          }
          if (n) {
              console.log('canrender', n);
              var allcpu = 0;
              angular.forEach(n.cpuData, function (cpu,i) {
                  allcpu+=cpu
              })
              var user = Math.round((allcpu/n.cpuData.length)*1000)/1000
              $scope.baifenbi={
                  type:'CPU',
                  per:user
              }
              $scope.doughnutData = {
                  labels: [
                      'Other',
                      'user',

                  ],
                  datasets: [
                      {data: [100-user, user],
                          backgroundColor: [
                              dashboardColors.white,
                              dashboardColors.blueStone,
                          ],
                          hoverBackgroundColor: [
                              colorHelper.shade(dashboardColors.white, 15),
                              colorHelper.shade(dashboardColors.blueStone, 15),

                          ],
                          percentage: [100-user, user]
                      }]
              };
              window.myDoughnut = new Chart(ctx, {
                  type: 'doughnut',
                  data: $scope.doughnutData,
                  options: {
                      cutoutPercentage: 64,
                      responsive: true,
                      elements: {
                          arc: {
                              borderWidth: 0
                          }
                      }
                  }
              });
          }
      },true);




      var ctx = document.getElementById('chart-area').getContext('2d');

  }
})();