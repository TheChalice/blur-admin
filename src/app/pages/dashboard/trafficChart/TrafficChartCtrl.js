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

          }
      },true);


      $scope.doughnutData = {
          labels: [
              'Other',
              'Search engines',

          ],
          datasets: [
              {data: [2000, 1500],
                  backgroundColor: [
                      dashboardColors.white,
                      dashboardColors.blueStone,
                  ],
                  hoverBackgroundColor: [
                      colorHelper.shade(dashboardColors.white, 15),
                      colorHelper.shade(dashboardColors.blueStone, 15),

                  ],
                  percentage: [87, 22]
              }]
      };

      var ctx = document.getElementById('chart-area').getContext('2d');
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
})();