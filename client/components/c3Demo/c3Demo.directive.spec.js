'use strict';

describe('Directive: c3Demo', function () {

  // load the directive's module and view
  beforeEach(module('axismakerApp'));
  beforeEach(module('app/components/c3Demo/c3Demo/c3Demo.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<c3-demo></c3-demo>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the c3Demo directive');
  }));
});