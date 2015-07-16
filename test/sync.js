
var assert = require('assert');
var jsonload = require('../');

module.exports = function() {

    // simple file
    var simple = jsonload.sync('./files/simple');
    assert.equal(simple.bool, true, "simple - boolean property failed");
    assert.equal(simple.array.length, 3, "simple - array property failed");

    // line-delimited file
    var lines = jsonload.sync('./files/line-delimited');
    assert.equal(lines.length, 4, "line-delimited - wrong number of objects");

}