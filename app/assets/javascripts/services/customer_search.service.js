(function(angular) {
  'use strict'

  angular
    .module('app')
    .factory('customerSearch', customerSearch)

  customerSearch['$inject'] = ['$http']

  function customerSearch($http) {
    var page = 1
    var mostRecentSearchTerm = undefined

    var success = function() {}

    var successCallback = function(newCallback) {
      success = newCallback
    }

    var search = function(searchTerm) {
      if (searchTerm.length < 3) {
        return
      }

      if (mostRecentSearchTerm !== searchTerm) {
        mostRecentSearchTerm = searchTerm
        page = 1
      }

      $http.get('/customers.json', {
        'params': {
          'keywords': searchTerm,
          'page': page
        }
      }).then(function(response) {
        success(response.data)
      }, function(response) {
        alert('There was a problem: ' + response.status)
      })
    }

    var previousPage = function() {
      if ( (page > 1) && mostRecentSearchTerm) {
        page = page - 1
        search(mostRecentSearchTerm)
      }
    }

    var nextPage = function() {
      if (mostRecentSearchTerm) {
        page = page + 1
        search(mostRecentSearchTerm)
      }
    }

    return {
      'successCallback': successCallback,
      'search': search,
      'previousPage': previousPage,
      'nextPage': nextPage
    }
  }
})(window.angular)
