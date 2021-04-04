const compressor = require('node-minify');

// Using UglifyJS with wildcards
compressor.minify({
    compressor: 'uglifyjs',
    input: './dist-src/**/*.js',
    output: './dist-src/minifyed.js',
    callback: function (err, min) {
        !!err && console.log({ err });
    }
});
