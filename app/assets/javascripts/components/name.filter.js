(function(angular) {
  'use strict'

  angular
    .module('app')
    .filter('name', nameFilter)

  function nameFilter() {
    return function(input) {
      if (!input) {
        return input
      }
      if ( (input.toLowerCase() === input) || (input.toUpperCase() === input) ) {
        return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
      } else {
        return input
      }
    }
  }
})(window.angular)
