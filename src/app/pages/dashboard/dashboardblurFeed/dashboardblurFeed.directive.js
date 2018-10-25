/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardBlurFeed', dashboardblurFeed);

  /** @ngInject */
  function dashboardblurFeed() {
    return {
      restrict: 'E',
      controller: 'dashboardBlurFeedCtrl',
      templateUrl: 'app/pages/dashboard/dashboardblurFeed/dashboardblurFeed.html',

    };
  }
})();