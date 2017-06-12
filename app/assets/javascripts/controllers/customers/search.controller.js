(function(angular) {
  'use strict'

  angular
    .module('app')
    .controller('CustomerSearchController', CustomerSearchController)

  CustomerSearchController['$inject'] = ['$http', '$location', 'customerSearch']
  function CustomerSearchController($http, $location, customerSearch) {
    var vm = this

    vm.customers = []

    customerSearch.successCallback(searchSuccess)

    vm.search = customerSearch.search
    vm.previousPage = customerSearch.previousPage
    vm.nextPage = customerSearch.nextPage
    vm.page = 1
    vm.viewDetails = viewDetails

    // -------------------------------------------------------------------------

    function searchSuccess(customers) {
      vm.customers = customers
    }

    function viewDetails(customer) {
      $location.path('/' + customer.id)
    }
  }
})(window.angular)
