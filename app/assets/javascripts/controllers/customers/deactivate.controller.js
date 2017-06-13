(function(angular) {
  'use strict'

  angular
    .module('app')
    .controller('CustomerDeactivateController', CustomerDeactivateController)

  CustomerDeactivateController['$inject'] = ['$scope', '$uibModalInstance']

  function CustomerDeactivateController($scope, $uibModalInstance) {
    var vm = this
    vm.deactivate = deactivate
    vm.nevermind = nevermind

    // -------------------------------------------------------------------------

    function deactivate() {
      $uibModalInstance.close()
    }

    function nevermind() {
      $uibModalInstance.dismiss('cancel')
    }
  }
})(window.angular)
