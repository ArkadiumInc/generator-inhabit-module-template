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
    this.moduleName = "helloWorld";
    var prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'Enter name of your module, camelCased without numbers or special symbols, only letters',
      default: this.moduleName
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.moduleName = props.moduleName;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('project/build'),
      this.destinationPath('build'),
      { name:this.moduleName}
    );
    this.fs.copyTpl(
      this.templatePath('project/gulp'),
      this.destinationPath('gulp'),
      { name:this.moduleName}
    );
    this.fs.copyTpl(
      this.templatePath('project/src/defaultConfiguration.js'),
      this.destinationPath('src/defaultConfiguration.js'),
      { name:this.moduleName}
    );
    this.fs.copyTpl(
      this.templatePath('project/gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      { name:this.moduleName}
    );
    this.fs.copyTpl(
      this.templatePath('project/inhabitcfg.json'),
      this.destinationPath('inhabitcfg.json'),
      { name:this.moduleName}
    );
    this.fs.copyTpl(
      this.templatePath('project/package.json'),
      this.destinationPath('package.json'),
      { name:this.moduleName.toLowerCase()}
    );
    this.fs.copyTpl(
      this.templatePath('project/src/HelloworldModule.js'),
      this.destinationPath('src/' + this.moduleName + 'Module.js'),
      { name:this.moduleName}
    );
    this.fs.copyTpl(
      this.templatePath('project/src/helloWorldView.hbs'),
      this.destinationPath('src/' + this.moduleName + 'View.hbs'),
      { name:this.moduleName}
    );
  },

  install: function () {
    this.installDependencies();
  }
});
