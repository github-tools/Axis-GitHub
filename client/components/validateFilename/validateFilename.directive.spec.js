'use strict';

describe('Directive: validateFilename', function () {

  // load the directive's module
  beforeEach(module('axismakerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<validate-filename></validate-filename>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the validateFilename directive');
  }));
});