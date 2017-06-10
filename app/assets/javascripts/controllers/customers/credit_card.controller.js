(function(angular) {
  'use strict'

  angular
    .module('app')
    .controller('CustomerCreditCardController', CustomerCreditCardController)

  CustomerCreditCardController['$inject'] = ['$resource']
  function CustomerCreditCardController($resource) {
    var CreditCard = $resource('/fake_billing.json')

    var vm = this

    vm.setCardholderId = function(customerId) {
      vm.creditCard = CreditCard.get({ 'cardholder_id': customerId })
    }
  }
})(window.angular)
