describe('CustomerShowController', function() {
  describe('Initialization', function() {
    var vm          = null
    var id          = 42
    var httpBackend = null
    var customer    = {
      id: id,
      first_name: 'Bob',
      last_name: 'Jones',
      username: 'bob.jones',
      email: 'bobbyj@somewhere.net',
      created_at: '2014-01-03T11:12:34'
    }

    beforeEach(module('app'))

    beforeEach(inject(function($controller, $routeParams, $httpBackend) {
      httpBackend = $httpBackend

      $routeParams.id = id

      httpBackend.when('GET', '/customers/' + id + '.json').
                  respond(customer)

      vm  = $controller('CustomerShowController')
    }))

    it('fetches the customer from the back-end', function() {
      expect(vm.customerId).toEqualData(customer.id)
      httpBackend.flush()
      expect(vm.customer).toEqualData(customer)
    })
  })
})
