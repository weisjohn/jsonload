
// test errors returned from async calls

var assert = require('assert');
var jsonload = require('../');

module.exports = function() {

    // file not found
    jsonload('./files/missing', function(err) {
        assert.equal(err.code, 'ENOENT', 'missing - file should error');
    });

    // invalid JSON file
    jsonload('./files/invalid', function(err, results) {
        assert(err, 'invalid - did not return an error');
        assert.equal(err.name, 'SyntaxError', 'invalid - should error');
    });

    // invalid JSON lines
    jsonload('./files/complex', function(err, results) {
        assert(err, 'complex - did not return an error');
        assert.equal(err.length, 2, 'complex - should return multiple errorrs');
        assert.equal(results.length, 3, 'complex - should return results');
        assert.equal(results[0].bool, true, 'complex - should return results');
    });

}