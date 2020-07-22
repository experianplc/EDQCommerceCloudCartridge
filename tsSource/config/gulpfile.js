var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var exec = require('child_process').exec;

gulp.task('default', function(done) {
  var mode = process.env.NODE_ENV || "development";

  // Salesforce Site Genesis
  command(`webpack --config ${path.join(__dirname, 'sgjc.js')}`);
  // Salesforce Storefront
  command(`webpack --config ${path.join(__dirname, 'sfra.js')}`);
  done();
});

function command(commandToBeRun) {
  exec(commandToBeRun, function(e, o, se) {
    console.log(o);
  });
}
