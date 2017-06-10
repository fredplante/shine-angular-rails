(function(angular) {
  'use strict'

  angular
    .module('app')
    .controller('CustomerShowController', CustomerShowController)

  CustomerShowController['$inject'] = ['$http', '$location', '$routeParams', '$resource']
  function CustomerShowController($http, $location, $routeParams, $resource) {
    var vm = this
    vm.customerId = $routeParams.id
    var Customer = $resource('/customers/:customerId.json')


    vm.customer = Customer.get({ 'customerId': vm.customerId })
  }
})(window.angular)
