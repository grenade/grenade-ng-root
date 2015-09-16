'use strict';

describe('Service: SoApi', function () {

  // load the service's module
  beforeEach(module('grenadeNgRootApp'));

  // instantiate service
  var SoApi;
  beforeEach(inject(function (_SoApi_) {
    SoApi = _SoApi_;
  }));

  it('should do something', function () {
    expect(!!SoApi).toBe(true);
  });

});
