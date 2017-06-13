(function(angular) {
  'use strict'

  angular
    .module('app')
    .controller('CustomerShowController', CustomerShowController)

  CustomerShowController['$inject'] = ['$routeParams', '$resource', '$uibModal']
  function CustomerShowController($routeParams, $resource, $uibModal) {
    var vm = this
    vm.customerId = $routeParams.id
    var Customer = $resource('/customers/:customerId.json', { 'customerId': '@customer_id' },
      { 'save': { 'method': 'PUT' } })

    vm.customer = Customer.get({ 'customerId': vm.customerId })
    vm.save = save
    vm.closeAlert = closeAlert
    vm.deactivate = deactivate

    // -------------------------------------------------------------------------

    function deactivate() {
      var modalInstance = $uibModal.open({
        templateUrl: 'templates/customers/deactivate.html',
        controller: 'CustomerDeactivateController',
        controllerAs: 'vm'
      })

      modalInstance.result.then(function() {
        vm.alert = {
          type: 'success',
          message: 'Customer deactivated'
        }
      }, function(reason) {
        vm.alert = {
          type: 'warning',
          message: 'Customer still active'
        }
      })
    }

    function closeAlert(index) {
      vm.alert = undefined
    }

    function save() {
      if (vm.form.$valid) {
        vm.customer.$save(function() {
          vm.form.$setPristine()
          vm.form.$setUntouched()
          vm.alert = {
            type: 'success',
            message: 'Customer successfully saved.'
          }
        }, function() {
          vm.alert = {
            type: 'danger',
            message: 'Customer couldn\'t be saved'
          }
        })
      }
    }
  }
})(window.angular)
