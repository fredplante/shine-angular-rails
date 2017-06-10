describe('CustomerCreditCardController', function() {
  describe('Initialization', function() {
    var vm           = null
    var cardholderId = 42
    var httpBackend  = null
    var cardInfo     = {
      lastFour: '4321',
      cardType: 'visa',
      expirationMonth: 3,
      expirationYear: 2018,
      detailsLink: 'http://billing.example.com/foo'
    }

    beforeEach(module('app'))

    beforeEach(inject(function($controller, $httpBackend) {
      httpBackend = $httpBackend

      httpBackend.when('GET',
                       '/fake_billing.json?cardholder_id=' + cardholderId
      ).respond(cardInfo)

      vm = $controller('CustomerCreditCardController')
    }))

    it('does not hit the backend initially', function() {
      expect(vm.creditCard).not.toBeDefined()
    })

    it('when setCardholderId is called, hits back-end', function() {
      vm.setCardholderId(cardholderId)
      expect(vm.creditCard).toBeDefined()
      expect(vm.creditCard.lastFour).not.toBeDefined()
      httpBackend.flush()
      expect(vm.creditCard).toEqualData(cardInfo)
    })
  })
})
