(function(angular) {
  'use strict'

  angular
    .module('app')
    .controller('CustomerShowController', CustomerShowController)

  CustomerShowController['$inject'] = ['$http', '$location', '$routeParams', '$resource']
  function CustomerShowController($http, $location, $routeParams, $resource) {
    var vm = this
    vm.customerId = $routeParams.id
    var Customer = $resource('/customers/:customerId.json', { 'customerId': '@customer_id' },
      { 'save': { 'method': 'PUT' } })

    vm.customer = Customer.get({ 'customerId': vm.customerId })
    vm.save = save

    // -------------------------------------------------------------------------

    function save() {
      if (vm.form.$valid) {
        vm.customer.$save(function() {
          vm.form.$setPristine()
          vm.form.$setUntouched()
          alert('Save Successful!')
        }, function() {
          alert('Save Failed :(')
        })
      }
    }
  }
})(window.angular)
