var assert = require('assert');
var jsonload = require('../');

module.exports = function() {

    // check exports
    assert(typeof jsonload == "function", "jsonload is not a function");
    assert(typeof jsonload.sync == "function", "jsonload.sync is not a function");

}