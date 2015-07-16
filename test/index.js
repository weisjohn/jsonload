
// a simple test runner
var fs = require('fs');
fs.readdir(__dirname, function(err, files) {
    if (err) return cb(err);
    files.forEach(function(file) {
        if (file == "index.js") return;
        if (/.js$/.test(file)) require('./' + file)();
    });
});

// don't bolt if inside node-dev
if (/node-dev$/.test(process.env._))
    setInterval(function() {});
