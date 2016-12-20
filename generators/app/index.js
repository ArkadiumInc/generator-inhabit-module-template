'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
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
      this.templateReplace =
      {
        name:this.moduleName,
        nameMin:this.moduleName.toLowerCase()
      };
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('project/public'),
      this.destinationPath('public'),
      this.templateReplace
    );
    this.fs.copyTpl(
      this.templatePath('project/src/defaultConfiguration.js'),
      this.destinationPath('src/defaultConfiguration.js'),
      this.templateReplace
    );
    this.fs.copyTpl(
      this.templatePath('project/webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      this.templateReplace
    );
    this.fs.copyTpl(
      this.templatePath('project/inhabitcfg.json'),
      this.destinationPath('inhabitcfg.json'),
      this.templateReplace
    );
    this.fs.copyTpl(
      this.templatePath('project/package.json'),
      this.destinationPath('package.json'),
      this.templateReplace
    );

    this.fs.copyTpl(
      this.templatePath('project/src/HelloworldModule.js'),
      this.destinationPath('src/' + this.moduleName + 'Module.js'),
      this.templateReplace
    );
    this.fs.copyTpl(
      this.templatePath('project/src/helloWorldView.hbs'),
      this.destinationPath('src/' + this.moduleName + 'View.hbs'),
      this.templateReplace
    );
  },

  install: function () {
    this.npmInstall();
  }
});
