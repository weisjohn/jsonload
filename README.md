# jsonload

read in a json file, handles line-delimited


### usage

```javascript
var jsonload = require('jsonload');

// async
jsonload('./foo', function(err, results) {
    console.log(results);
});

// sync
var foo = jsonload.sync('./foo');
```


### errors

Because `jsonload` handles simple and line-delimited JSON files, there are a three possible errors that may be returned/thrown:

 - file not found
 - an invalid JSON file
 - an invalid JSON line(s)


```javascript
// async
jsonload('./foo', function(err, results) {
    if (err.code == 'ENOENT')
        console.log('file not found');
    if (err.name == 'SyntaxError')
        console.log('invalid JSON file');
    if (err.length)
        console.log('invalid JSON lines', e);

    // on complex files, there may be lines which parsed correctly
    console.log(results);
});

// sync
try {
    var foo = jsonload.sync('./foo');
} catch (err) {
    if (err.code == 'ENOENT')
        console.log('file not found');
    if (err.name == 'SyntaxError')
        console.log('invalid JSON file');
    if (err.length)
        console.log('invalid JSON lines', e);
}
```


### parser

By default, `jsonload` utilizes the built-in [`JSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) parser. You can optionally specify a different parser. It must be an object with a `.parse()` function:

```javascript
var EJSON = require('mongodb-extended-json');
var sync = jsonload.sync('./ejson-file', EJSON);

jsonload('./ejson-file', EJSON, function(err, ejson) {
    console.log(ejson[0]);
});
```

The parser is invoked line-by-line. To log each line before parsing (tap-style):

```javascript
jsonload('./json-file', { parse: function(obj) {
    console.log(obj);
    return JSON.parse(obj);
} }, function() {});
```
