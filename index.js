
var path = require('path');
var fs = require('fs');

// clean up paths for convenient loading
function normalize(filepath) {

    // resolve to an absolute ppath
    if (!path.isAbsolute(filepath))
        filepath = path.resolve(path.dirname(module.parent.filename), filepath);

    // tack .json on the end if need be
    if (!/\.json$/.test(filepath))
        filepath = filepath + '.json';

    return filepath;
}

// process line-delimited files
function parse(contents, retained) {
    var errors = [], data = [], lines = 0;

    // process each line of the file
    contents.toString().split('\n').forEach(function(line) {
        if (!line) return;
        lines++;
        try {
            data.push(JSON.parse(line));
        } catch (e) {
            e.line = line;
            errors.push(e);
        }
    });

    // if no errors/data, don't return an empty array
    var ret = {};
    if (errors.length) ret.errors = errors;
    if (data.length) ret.data = data;

    // if every line failed, probably not line-delimited
    if (errors.length == lines) ret.errors = retained;

    return ret;
}

function load(path, cb) {
    path = normalize(path);

    // simple style
    var err;
    try { return cb(null, require(path)); } catch (e) { err = e; }

    // line-delimited
    fs.readFile(path, function(e, contents) {
        if (e) return cb(e);
        var res = parse(contents, err);
        cb(res.errors, res.data);
    });
}


function sync(path) {
    path = normalize(path);

    // simple
    var err;
    try { return require(path); } catch (e) { err = e; }

    // line-delimited
    var contents = fs.readFileSync(path);
    var res = parse(contents, err);
    if (res.errors) throw res.errors;
    return res.data;
}

load.sync = sync;
module.exports = load;
