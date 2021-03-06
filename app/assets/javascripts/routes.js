(function(angular) {
  'use strict'

  angular
    .module('app')
    .config(routes)

  routes['$inject'] = ['$routeProvider']
  function routes($routeProvider) {
    $routeProvider.when('/', {
      controller: 'CustomerSearchController',
      controllerAs: 'vm',
      templateUrl: 'templates/customers/search.html'
    }).when('/:id', {
      controller: 'CustomerShowController',
      controllerAs: 'vm',
      templateUrl: 'templates/customers/show.html'
    })
  }
})(window.angular)
