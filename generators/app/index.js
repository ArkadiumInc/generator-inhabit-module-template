'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'You are about to install ' + chalk.red('Inhabit module template') + ' make sure that you know what are you doing!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'I am sure!',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('project'),
      this.destinationPath('')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
