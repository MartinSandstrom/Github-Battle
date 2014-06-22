'use strict';

describe('Service: Rounds', function () {

  // load the service's module
  beforeEach(module('githubArenaApp'));

  // instantiate service
  var Rounds;
  beforeEach(inject(function (_Rounds_) {
    Rounds = _Rounds_;
  }));

  it('should do something', function () {
    expect(!!Rounds).toBe(true);
  });

});
