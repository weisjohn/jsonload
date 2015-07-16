
// test successful async calls

var assert = require('assert');
var jsonload = require('../');

module.exports = function() {

    // simple file
    jsonload('./files/simple', function(err, simple) {
        assert(!err, 'simple - should not return an error');
        assert.equal(simple.bool, true, "simple - boolean property failed");
        assert.equal(simple.array.length, 3, "simple - array property failed");
    });

    // line-delimited file
    jsonload('./files/line-delimited', function(err, lines) {
        assert(!err, 'line-delimited - should not return an error');
        assert.equal(err, null, "line-delimited - err should be null");
        assert.equal(lines.length, 4, "line-delimited - delimited failed - wrong number of objects");
    });

}