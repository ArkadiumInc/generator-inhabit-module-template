/** @type {InhabitModuleBase} */
var InhabitModuleBase = require('inhabit-module-base');
var DefaultConfiguration = require('./defaultConfiguration');
var helloWorldView = require('./helloWorldView.hbs');
/**
 * @extends {InhabitModuleBase}
 * @param configuration
 * @param dependencies
 * @constructor
 */
var HelloWorld = function (configuration, dependencies) {
    this.configuration = dependencies.$.extend(true, {}, DefaultConfiguration);
    this.$ = dependencies.$;
    InhabitModuleBase.prototype.constructor.call(this, configuration, dependencies);
    this.name = this.constructor.name;
};

HelloWorld.prototype = Object.create(InhabitModuleBase.prototype);
HelloWorld.prototype.constructor = HelloWorld;
HelloWorld.moduleName = "HelloWorld";
/**
 * Start async task that fetches content and return a this.deffered.promise()
 * @returns {Promise}
 */
HelloWorld.prototype.getContent = function () {
    var deferred = this.$.Deferred();
    deferred.resolve(this);
    return deferred.promise();
};

/**
 * Return a Thumbnail URL
 * @returns {string}
 */
HelloWorld.prototype.getThumbnail = function () {
    return "http://i.annihil.us/u/prod/marvel//universe3zx/images/f/f5/IronMan_Head.jpg";
};

/**
 * Return a Title
 * @returns {string}
 */
HelloWorld.prototype.getTitle = function () {
    return "Iron Man";
};

/**
 * @returns {boolean}
 */
HelloWorld.prototype.hasContent = function () {
    return true;
};

/**
 * Render content
 * @return {string}
 */
HelloWorld.prototype.display = function () {
    var compiledTemplate = this.handlebars.compile(helloWorldView);

    return compiledTemplate({greetings:this.configuration.say});
};

/**
 * Return a Type
 * @returns {string}
 */
HelloWorld.prototype.getType = function () {
    return "type"
};

InhabitModuleBase.publish(HelloWorld);