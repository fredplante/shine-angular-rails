(function(angular) {
  'use strict'

  angular
    .module('app')
    .controller('CustomerSearchController', CustomerSearchController)

  CustomerSearchController['$inject'] = ['$http', '$location']
  function CustomerSearchController($http, $location) {
    var vm = this

    vm.customers = []
    vm.search = search
    vm.previousPage = previousPage
    vm.nextPage = nextPage
    vm.page = 1
    vm.viewDetails = viewDetails

    // -------------------------------------------------------------------------

    function search(searchTerm) {
      if (searchTerm.length < 3) {
        return
      }

      $http.get('/customers.json',
                { 'params': { 'keywords': searchTerm, 'page': vm.page } }
      ).then(function(response) {
        vm.customers = response.data
      }, function(response) {
        alert('There was a problem: ' + response.status)
      })

      vm.searchedFor = searchTerm
    }

    function nextPage() {
      vm.page = vm.page + 1
      vm.search(vm.keywords)
    }

    function previousPage() {
      if (vm.page > 1) {
        vm.page = vm.page - 1
        vm.search(vm.keywords)
      }
    }

    function viewDetails(customer) {
      $location.path('/' + customer.id)
    }
  }
})(window.angular)
