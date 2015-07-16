
var assert = require('assert');
var jsonload = require('../');

module.exports = function() {

    // file not found
    assert.throws(function() {
        jsonload.sync('./files/missing');
    }, 'missing - should throw');

    try {
        jsonload.sync('./files/missing');
    } catch (err) {
        assert.equal(err.code, 'ENOENT', 'missing - threw wrong code');
    }

    // invalid JSON file
    assert.throws(function() {
        jsonload.sync('./files/invalid');
    }, 'invalid - should throw');

    try {
        jsonload.sync('./files/invalid');
    } catch (err) {
        assert.equal(err.name, 'SyntaxError', 'invalid - should error');
    }


    // invalid JSON lines
    assert.throws(function() {
        jsonload.sync('./files/complex');
    }, 'complex - should throw');

    try {
        jsonload.sync('./files/complex');
    } catch (err) {
        assert(err, 'complex - did not return an error');
        assert.equal(err.length, 2, 'complex - should return multiple errorrs');
    }

}