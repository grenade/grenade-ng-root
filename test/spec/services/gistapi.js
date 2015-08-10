'use strict';

describe('Service: GistApi', function () {

  // load the service's module
  beforeEach(module('grenadeNgRootApp'));

  // instantiate service
  var GistApi;
  beforeEach(inject(function (_GistApi_) {
    GistApi = _GistApi_;
  }));

  it('should do something', function () {
    expect(!!GistApi).toBe(true);
  });

});
