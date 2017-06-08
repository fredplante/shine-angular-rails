describe('CustomerSearchController', function() {
  describe('Initialization', function() {
    var vm = null

    beforeEach(module('app'))

    beforeEach(inject(function($controller) {
      vm  = $controller('CustomerSearchController')
    }))

    it('defaults to an empty customer list', function() {
      expect(vm.customers).toEqualData([])
    })
  })

  describe('Fetching Search Results', function() {
    var vm  = null
    var httpBackend = null

    var serverResults = [{
      id: 123,
      first_name: 'Bob',
      last_name: 'Jones',
      email: 'bjones@foo.net',
      username: 'jonesy'
    },
    {
      id: 456,
      first_name: 'Bob',
      last_name: 'Johnsons',
      email: 'johnboy@bar.info',
      username: 'bobbyj'
    }]

    beforeEach(module('app'))

    beforeEach(inject(function($controller, $httpBackend) {
      httpBackend = $httpBackend
      vm  = $controller('CustomerSearchController')
    }))

    beforeEach(function() {
      httpBackend.when('GET', '/customers.json?keywords=bob&page=1').
                  respond(serverResults)
    })

    it('populates the customer list with the results', function() {
      vm.search('bob')
      httpBackend.flush()
      expect(vm.customers).toEqualData(serverResults)
    })
  })

  describe('Error Handling', function() {
    var vm  = null
    var httpBackend = null

    beforeEach(module('app'))

    beforeEach(inject(function($controller, $httpBackend) {
      httpBackend = $httpBackend
      vm = $controller('CustomerSearchController')
    }))

    beforeEach(function() {
      httpBackend.when('GET', '/customers.json?keywords=bob&page=1').
                  respond(500, 'Internal Server Error')
      spyOn(window, 'alert')
    })

    it('alerts the user on an error', function() {
      vm.search('bob')
      httpBackend.flush()
      expect(vm.customers).toEqualData([])
      expect(window.alert).toHaveBeenCalledWith(
        'There was a problem: 500')
    })
  })
})
