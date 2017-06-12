(function(angular) {
  'use strict'

  angular
    .module('app')
    .directive('customerSummary', customerSummary)

  function customerSummary() {
    return {
      'restrict': 'E',
      'scope': {
        'cust': '=',
        'viewDetailsFunction': '='
      },
      'templateUrl': 'templates/customers/summary.html'
    }
  }
})(window.angular)
