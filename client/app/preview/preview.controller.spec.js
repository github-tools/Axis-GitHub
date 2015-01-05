'use strict';

describe('Controller: PreviewCtrl', function () {

  // load the controller's module
  beforeEach(module('axismakerApp'));

  var PreviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PreviewCtrl = $controller('PreviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
