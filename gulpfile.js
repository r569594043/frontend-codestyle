var p = require('./package.json');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var util = require('util');
var path = require('path');
var del = require('del');
var os = require('os');
var highlight = require('highlight.js');
var fs = require('fs');


var options = {
    "tasks": {
        "markdown": {
            "enabled": true,
            "src": 'docs/**/*.md',
            "dist": 'build/',
            "cache": 'markdown'
        },
        "copy:css": {
            "enabled": true,
            "src": 'assets/css/**/*.css',
            "dist": 'build/assets/css/',
            "cache": 'copy:css'
        }
    },
    "env": "development",
    'port': 9876,
    'host': '0.0.0.0',
    'copy': false
};

function defaultErrorHandler(error) {
    $.notify.onError("Error: <%= error.message %>")(error);
}


function log(){
    var text = util.format.apply(null, arguments);
    $.util.log(text);
}

gulp.task('markdown', function() {
    var o = options.tasks.markdown;
    return gulp.src(o.src)
        .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
        .pipe($.cached(o.cache))
        .pipe($.markdown({
            highlight: function (code) {
                return highlight.highlightAuto(code).value;
            }
        }))
        .pipe($.header(fs.readFileSync('include/header.html', 'utf8')))
        .pipe($.footer(fs.readFileSync('include/footer.html', 'utf8')))
        // .pipe($.jsBeaut({
        //     'html': {
        //         'wrap_line_length': 0
        //     },
        //     'quiet': true
        // }))
        .pipe($.jsbeautifier({
            
        }))
        .pipe(gulp.dest(o.dist))
        .pipe($.connect.reload());
});

gulp.task('copy:css', function() {
    var o = options.tasks['copy:css'];
    return gulp.src(o.src)
        .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
        .pipe($.cached(o.cache))
        .pipe($['if'](options.env === 'production', $.cssnano()))
        .pipe(gulp.dest(o.dist))
        .pipe($.connect.reload());
});

// gulp.task('eslint', function() {
//     return gulp.src('src/babel/*.es6')
//         .pipe($.eslint())
//         .pipe($.eslint.format())
//         // To have the process exit with an error code (1) on 
//         // lint error, return the stream and pipe to failAfterError last. 
//         .pipe($.eslint.failAfterError());
// });

// gulp.task('jscs', function() {
//     return gulp.src('src/babel/*.es6')
//         .pipe($.jscs())
//         .pipe($.jscs.reporter())
//         .pipe($.jscs.reporter('fail'));
// });

gulp.task('clean', function() {
    del(['build/**/*']);
});

gulp.task('zip', function() {
    return gulp.src('dist/**/*')
        .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
        .pipe($.zip((p.name ? p.name : 'archive') + '.zip'))
        .pipe(gulp.dest('.'));
});

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

gulp.task('connect', function() {
    $.connect.server({
        root: 'build',
        livereload: {
            port: randInt(1025, 65535)
        },
        port: options.port,
        host: options.host
    });
});

function watchFatory(srcPath, taskName, cacheName) {
    var watcher = gulp.watch(srcPath, [taskName]);
    watcher.on('change', function (event) {
        var relativePath = path.relative(path.resolve('.'), event.path);
        if (event.type === 'deleted') {
            try{
                delete $.cached.caches[cacheName][event.path];
            } catch(e) {}
        }
    });
}

gulp.task('watch', ['IP', 'connect'], function () {
    for(var prop in options.tasks) {
        if(options.tasks.hasOwnProperty(prop) && options.tasks[prop] && options.tasks[prop].enabled) {
            var o = options.tasks[prop];
            watchFatory(o.src, prop, o.cache);
        }
    }
});

gulp.task('development', function () {
    options.env = "development";
});

gulp.task('production', function () {
    options.env = "production";
});

gulp.task('IP', function() {
    $.util.log($.util.colors.magenta('本地地址: ') + "'" + $.util.colors.cyan('http://localhost:' + options.port + '/') + "'");
    var interfaces = os.networkInterfaces();
    for(var name in interfaces) {
        var addresses = interfaces[name];
        if(addresses.length > 0) {
            for(var i = 0,len=addresses.length;i<len;i++) {
                var address = addresses[i];
                if(address.family == 'IPv4') {
                    $.util.log($.util.colors.magenta(name + ': ') + "'" + $.util.colors.cyan('http://' + address.address + ':' + options.port + '/') + "'");
                }
            }
        }
    }
});

var tasks = [];

(function(){
    for(var prop in options.tasks) {
        if(options.tasks.hasOwnProperty(prop) && options.tasks[prop] && options.tasks[prop].enabled) {
            tasks.push(prop);
        }
    }
})();

gulp.task('default', ['watch'].concat(tasks));

gulp.task('compile', ['development'].concat(tasks));

gulp.task('build', ['production'].concat(tasks));