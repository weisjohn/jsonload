
var assert = require('assert');
var jsonload = require('../');
var EJSON = require('mongodb-extended-json');

module.exports = function() {

    // sync file
    var ejson = jsonload.sync('./files/ejson', EJSON);
    assert.equal(ejson.length, 2, 'ejson - wrong number of objects');

    assert(typeof ejson[0]._id === 'object', 'ejson - parser not used');
    assert(ejson[0].created instanceof Date, 'ejson - parser not used');

    // async file
    jsonload('./files/ejson', EJSON, function(err, ejson) {
        assert(!err, 'ejson - error while parsing');

        assert.equal(ejson.length, 2, 'ejson - wrong number of objects');
        assert(typeof ejson[0]._id === 'object', 'ejson - parser not used');
        assert(ejson[0].created instanceof Date, 'ejson - parser not used');
    });

}