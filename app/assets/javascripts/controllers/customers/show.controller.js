(function(angular) {
  'use strict'

  angular
    .module('app')
    .controller('CustomerShowController', CustomerShowController)

  CustomerShowController['$inject'] = ['$http', '$location', '$routeParams']
  function CustomerShowController($http, $location, $routeParams) {
    var vm = this

    var customerId = $routeParams.id

    vm.customer = {}

    init()

    // -------------------------------------------------------------------------

    function init() {
      $http.get('/customers/' + customerId + '.json')
        .then(function(response) {
          vm.customer = response.data
        }, function(response) {
          alert('There was a problem: ' + response.status)
        }
      )
    }
  }
})(window.angular)
