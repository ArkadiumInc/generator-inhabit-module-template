/** @type {InhabitModuleBase} */
var InhabitModuleBase = require('inhabit-module-base').InhabitModuleBase;
var DefaultConfiguration = require('./defaultConfiguration');
var <%= name %>View = require('./<%= name %>View.hbs');
/**
 * @extends {InhabitModuleBase}
 * @param configuration
 * @param dependencies
 * @constructor
 */
var <%= name %> = function (configuration, dependencies) {
    InhabitModuleBase.prototype.constructor.call(this, configuration, dependencies);
    this.configuration = dependencies.$.extend(true, {}, DefaultConfiguration);
    this.$ = dependencies.$;
    this.events = dependencies.events;
};

<%= name %>.prototype = Object.create(InhabitModuleBase.prototype);
<%= name %>.prototype.constructor = <%= name %>;
<%= name %>.moduleName = "<%= nameMin %>";
/**
 * Start async task that fetches content and return a this.deffered.promise()
 * @returns {Promise}
 */
<%= name %>.prototype.getContent = function () {
    var deferred = this.$.Deferred();
    deferred.resolve(this);
    return deferred.promise();
};

/**
 * Return a Thumbnail URL
 * @returns {string}
 */
<%= name %>.prototype.getThumbnail = function () {
    return "";
};

/**
 * Return a Title
 * @returns {string}
 */
<%= name %>.prototype.getTitle = function () {
    return "<%= name %>";
};

/**
 * @returns {boolean}
 */
<%= name %>.prototype.hasContent = function () {
    return true;
};

/**
 * Render content
 * @return {string}
 */
<%= name %>.prototype.display = function () {
    var compiledTemplate = this.handlebars.compile(<%= name %>View);

    return compiledTemplate({greetings:this.configuration.say});
};

/**
 * Return a Type
 * @returns {string}
 */
<%= name %>.prototype.getType = function () {
    return <%= name %>.moduleName;
};

InhabitModuleBase.publish(<%= name %>);
