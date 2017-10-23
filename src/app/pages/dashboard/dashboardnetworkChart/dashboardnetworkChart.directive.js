/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardNetworkChart', dashboardNetworkChart);

  /** @ngInject */
  function dashboardNetworkChart() {
    return {
      restrict: 'E',
      controller: 'DashboardNetworkChartCirt',
      templateUrl: 'app/pages/dashboard/dashboardnetworkChart/dashboardnetworkChart.html',
      scope:false,
    };
  }
})();