'use strict';

describe('Service: MozHgApi', function () {

  // load the service's module
  beforeEach(module('grenadeNgRootApp'));

  // instantiate service
  var MozHgApi;
  beforeEach(inject(function (_MozHgApi_) {
    MozHgApi = _MozHgApi_;
  }));

  it('should do something', function () {
    expect(!!MozHgApi).toBe(true);
  });

});
