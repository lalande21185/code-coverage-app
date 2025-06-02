const { test } = require('uvu');
const assert = require('uvu/assert');
const { isBranchNameValid, isCoverageValid } = require('../../src/domain/validation');

test('isBranchNameValid', () => {
    assert.is(isBranchNameValid(''), false);
    assert.is(isBranchNameValid(15), false);
    assert.is(isBranchNameValid(15.5), false);
    assert.is(isBranchNameValid(true), false);
    assert.is(isBranchNameValid({test: 1}), false);
    assert.is(isBranchNameValid('name'), true);
    assert.is(isBranchNameValid('the_name'), true);
    assert.is(isBranchNameValid('theName'), true);
    assert.is(isBranchNameValid('the-name'), true);
});

test('isCoverageValid', () => {
    assert.is(isCoverageValid('name'), false);
    assert.is(isCoverageValid(true), false);
    assert.is(isCoverageValid({test: 1}), false);
    assert.is(isCoverageValid(15), true);
    assert.is(isCoverageValid(15.0), true);
    assert.is(isCoverageValid(15.00), true);
    assert.is(isCoverageValid(15.01), true);
    assert.is(isCoverageValid(15.001), false);
});

test.run();