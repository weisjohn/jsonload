# jsonload

read in a json file, handles line-delimited


### usage

`jsonload()` is similar to `require()`, given a file named `foo.json`:

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
    if (e.length)
        console.log('invalid JSON lines', e);

    // on complex files, there may be lines which parsed correctly
    console.log(results);
});

// sync
try {
    var foo = jsonload.sync('./foo');
} catch (e) {
    if (err.code == 'ENOENT')
        console.log('file not found');
    if (err.name == 'SyntaxError')
        console.log('invalid JSON file');
    if (e.length)
        console.log('invalid JSON lines', e);
}
```
