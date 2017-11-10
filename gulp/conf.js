/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'release',
  devDist: 'dev-release',
  tmp: '.tmp',
  e2e: 'e2e'
};

exports.proxy = [
  {
    path:'/signin',
    relay:{
      target: 'https://lab.new.dataos.io',
      changeOrigin: true,
      secure: false
    }
  },{
    path:'/v2/',
    relay:{
      target: 'http://192.168.1.139:5000',
      secure: false
    }
  },{
    path:'/apis/',
    relay:{
      target: 'https://new.dataos.io:8443',
      changeOrigin: true,
      secure: false
    }
  },{
    path:'/oapi/',
    relay:{
      target: 'https://new.dataos.io:8443',
      changeOrigin: true,
      secure: false
    }
  },{
    path:'/ws/',
    relay:{
      target: 'https://new.dataos.io:8443',
      pathRewrite: {'^/ws/' : '/'},
      changeOrigin: true,
      secure: false,
      ws:true
    }
  },{
    path:'/registry/',
    relay:{
      target: 'https://registry.dataos.io',
      pathRewrite: {'^/registry/' : '/'},
      changeOrigin: true,
      secure: false
    }
  },{
    path:'/api/',
    relay:{
      target: 'https://new.dataos.io:8443',
      changeOrigin: true,
      secure: false
    }
  },{
    path:'/hawkular/',
    relay:{
      target: 'https://hawkular-metrics.new.dataos.io',
      changeOrigin: true,
      secure: false
    }
  },
]

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [/\/bootstrap\.js$/, /\/bootstrap-sass\/.*\.js/, /\/require\.js/],
  directory: 'bower_components'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
