/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.nodes')
      .directive('blurFeed', blurFeed);

  /** @ngInject */
  function blurFeed() {
    return {
      restrict: 'E',
      scope: {
        feed: "="
      },
      controller: 'BlurFeedCtrl',
      templateUrl: 'app/pages/nodes/blurFeed/blurFeed.html',

    };
  }
})();