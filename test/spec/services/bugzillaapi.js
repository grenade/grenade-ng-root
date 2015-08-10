'use strict';

describe('Service: BugzillaApi', function () {

  // load the service's module
  beforeEach(module('grenadeNgRootApp'));

  // instantiate service
  var BugzillaApi;
  beforeEach(inject(function (_BugzillaApi_) {
    BugzillaApi = _BugzillaApi_;
  }));

  it('should do something', function () {
    expect(!!BugzillaApi).toBe(true);
  });

});
