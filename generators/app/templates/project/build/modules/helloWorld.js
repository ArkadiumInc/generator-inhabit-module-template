(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var usedContent = [];
var MODULE_STORAGE = global.__ark_app__.apps;

/**
 * @constructor
 * @param configuration
 * @param dependencies
 */
function InhabitModuleBase(configuration, dependencies) {
  if (!configuration) {
    throw Error('No configuration presented.');
  }

  if (!dependencies) {
    throw Error('No dependencies presented.');
  }

  if (!this.configuration) {
    this.configuration = {};
  }

  this.name = this.constructor.name;

  this.inject(dependencies).configure(configuration);
}

/**
 * Start async task that fetches content and return a this.deffered.promise()
 * @returns {Promise}
 */
InhabitModuleBase.prototype.getContent = mustBeOverrided;

/**
 * Return a Thumbnail URL
 * @returns {string}
 */
InhabitModuleBase.prototype.getThumbnail = mustBeOverrided;

/**
 * Return a Title
 * @returns {string}
 */
InhabitModuleBase.prototype.getTitle = mustBeOverrided;

/**
 * @returns {boolean}
 */
InhabitModuleBase.prototype.hasContent = mustBeOverrided;

/**
 * Render content
 * @return {string}
 */
InhabitModuleBase.prototype.display = mustBeOverrided;

/**
 * Return a Type
 * @returns {string}
 */
InhabitModuleBase.prototype.getType = mustBeOverrided;

/**
 * Store dependencies
 * @param dependencies
 * @returns {InhabitModuleBase}
 */
InhabitModuleBase.prototype.inject = function (dependencies) {
  this.$ = dependencies.$;
  this.handlebars = dependencies.handlebars;
  this.textClassificationService = dependencies.textClassificationService;
  this.searchEngineService = dependencies.searchEngineService;
  this.events = dependencies.events || { on: console.log.bind(console, 'There is not events') };

  return this;
};

/**
 * Configure
 * @param configuration
 */
InhabitModuleBase.prototype.configure = function (configuration) {
  this.$.extend(true, this.configuration, configuration);

  return this;
};

/**
 * Static method for publishing Modules
 * @static
 * @param {InhabitModuleBase}
 */
InhabitModuleBase.publish = function (Module) {
  MODULE_STORAGE.push(Module);
};

function mustBeOverrided() {
  throw Error('This method must be overrided.');
}

module.exports = InhabitModuleBase;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
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
},{"./defaultConfiguration":3,"./helloWorldView.hbs":4,"inhabit-module-base":1}],3:[function(require,module,exports){
module.exports = {
    say:"hello world"
};
},{}],4:[function(require,module,exports){
module.exports = "<div style=\"background: red\">\r\n    {{ greetings }}\r\n</div>\r\n<div style=\"background: yellow\">\r\n    <img src=\"http://i.annihil.us/u/prod/marvel//universe3zx/images/3/3e/Ironman02.jpg\"/>\r\n</div>";

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaW5oYWJpdC1tb2R1bGUtYmFzZS9idWlsZC9JbmhhYml0TW9kdWxlQmFzZS5qcyIsInNyYy9IZWxsb3dvcmxkTW9kdWxlLmpzIiwic3JjL2RlZmF1bHRDb25maWd1cmF0aW9uLmpzIiwic3JjL2hlbGxvV29ybGRWaWV3LmhicyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHVzZWRDb250ZW50ID0gW107XG52YXIgTU9EVUxFX1NUT1JBR0UgPSBnbG9iYWwuX19hcmtfYXBwX18uYXBwcztcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSBjb25maWd1cmF0aW9uXG4gKiBAcGFyYW0gZGVwZW5kZW5jaWVzXG4gKi9cbmZ1bmN0aW9uIEluaGFiaXRNb2R1bGVCYXNlKGNvbmZpZ3VyYXRpb24sIGRlcGVuZGVuY2llcykge1xuICBpZiAoIWNvbmZpZ3VyYXRpb24pIHtcbiAgICB0aHJvdyBFcnJvcignTm8gY29uZmlndXJhdGlvbiBwcmVzZW50ZWQuJyk7XG4gIH1cblxuICBpZiAoIWRlcGVuZGVuY2llcykge1xuICAgIHRocm93IEVycm9yKCdObyBkZXBlbmRlbmNpZXMgcHJlc2VudGVkLicpO1xuICB9XG5cbiAgaWYgKCF0aGlzLmNvbmZpZ3VyYXRpb24pIHtcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSB7fTtcbiAgfVxuXG4gIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcblxuICB0aGlzLmluamVjdChkZXBlbmRlbmNpZXMpLmNvbmZpZ3VyZShjb25maWd1cmF0aW9uKTtcbn1cblxuLyoqXG4gKiBTdGFydCBhc3luYyB0YXNrIHRoYXQgZmV0Y2hlcyBjb250ZW50IGFuZCByZXR1cm4gYSB0aGlzLmRlZmZlcmVkLnByb21pc2UoKVxuICogQHJldHVybnMge1Byb21pc2V9XG4gKi9cbkluaGFiaXRNb2R1bGVCYXNlLnByb3RvdHlwZS5nZXRDb250ZW50ID0gbXVzdEJlT3ZlcnJpZGVkO1xuXG4vKipcbiAqIFJldHVybiBhIFRodW1ibmFpbCBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbkluaGFiaXRNb2R1bGVCYXNlLnByb3RvdHlwZS5nZXRUaHVtYm5haWwgPSBtdXN0QmVPdmVycmlkZWQ7XG5cbi8qKlxuICogUmV0dXJuIGEgVGl0bGVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbkluaGFiaXRNb2R1bGVCYXNlLnByb3RvdHlwZS5nZXRUaXRsZSA9IG11c3RCZU92ZXJyaWRlZDtcblxuLyoqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuSW5oYWJpdE1vZHVsZUJhc2UucHJvdG90eXBlLmhhc0NvbnRlbnQgPSBtdXN0QmVPdmVycmlkZWQ7XG5cbi8qKlxuICogUmVuZGVyIGNvbnRlbnRcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuSW5oYWJpdE1vZHVsZUJhc2UucHJvdG90eXBlLmRpc3BsYXkgPSBtdXN0QmVPdmVycmlkZWQ7XG5cbi8qKlxuICogUmV0dXJuIGEgVHlwZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuSW5oYWJpdE1vZHVsZUJhc2UucHJvdG90eXBlLmdldFR5cGUgPSBtdXN0QmVPdmVycmlkZWQ7XG5cbi8qKlxuICogU3RvcmUgZGVwZW5kZW5jaWVzXG4gKiBAcGFyYW0gZGVwZW5kZW5jaWVzXG4gKiBAcmV0dXJucyB7SW5oYWJpdE1vZHVsZUJhc2V9XG4gKi9cbkluaGFiaXRNb2R1bGVCYXNlLnByb3RvdHlwZS5pbmplY3QgPSBmdW5jdGlvbiAoZGVwZW5kZW5jaWVzKSB7XG4gIHRoaXMuJCA9IGRlcGVuZGVuY2llcy4kO1xuICB0aGlzLmhhbmRsZWJhcnMgPSBkZXBlbmRlbmNpZXMuaGFuZGxlYmFycztcbiAgdGhpcy50ZXh0Q2xhc3NpZmljYXRpb25TZXJ2aWNlID0gZGVwZW5kZW5jaWVzLnRleHRDbGFzc2lmaWNhdGlvblNlcnZpY2U7XG4gIHRoaXMuc2VhcmNoRW5naW5lU2VydmljZSA9IGRlcGVuZGVuY2llcy5zZWFyY2hFbmdpbmVTZXJ2aWNlO1xuICB0aGlzLmV2ZW50cyA9IGRlcGVuZGVuY2llcy5ldmVudHMgfHwgeyBvbjogY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAnVGhlcmUgaXMgbm90IGV2ZW50cycpIH07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvbmZpZ3VyZVxuICogQHBhcmFtIGNvbmZpZ3VyYXRpb25cbiAqL1xuSW5oYWJpdE1vZHVsZUJhc2UucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChjb25maWd1cmF0aW9uKSB7XG4gIHRoaXMuJC5leHRlbmQodHJ1ZSwgdGhpcy5jb25maWd1cmF0aW9uLCBjb25maWd1cmF0aW9uKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3RhdGljIG1ldGhvZCBmb3IgcHVibGlzaGluZyBNb2R1bGVzXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge0luaGFiaXRNb2R1bGVCYXNlfVxuICovXG5JbmhhYml0TW9kdWxlQmFzZS5wdWJsaXNoID0gZnVuY3Rpb24gKE1vZHVsZSkge1xuICBNT0RVTEVfU1RPUkFHRS5wdXNoKE1vZHVsZSk7XG59O1xuXG5mdW5jdGlvbiBtdXN0QmVPdmVycmlkZWQoKSB7XG4gIHRocm93IEVycm9yKCdUaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJyaWRlZC4nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbmhhYml0TW9kdWxlQmFzZTsiLCIvKiogQHR5cGUge0luaGFiaXRNb2R1bGVCYXNlfSAqL1xyXG52YXIgSW5oYWJpdE1vZHVsZUJhc2UgPSByZXF1aXJlKCdpbmhhYml0LW1vZHVsZS1iYXNlJyk7XHJcbnZhciBEZWZhdWx0Q29uZmlndXJhdGlvbiA9IHJlcXVpcmUoJy4vZGVmYXVsdENvbmZpZ3VyYXRpb24nKTtcclxudmFyIGhlbGxvV29ybGRWaWV3ID0gcmVxdWlyZSgnLi9oZWxsb1dvcmxkVmlldy5oYnMnKTtcclxuLyoqXHJcbiAqIEBleHRlbmRzIHtJbmhhYml0TW9kdWxlQmFzZX1cclxuICogQHBhcmFtIGNvbmZpZ3VyYXRpb25cclxuICogQHBhcmFtIGRlcGVuZGVuY2llc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZhciBIZWxsb1dvcmxkID0gZnVuY3Rpb24gKGNvbmZpZ3VyYXRpb24sIGRlcGVuZGVuY2llcykge1xyXG4gICAgdGhpcy5jb25maWd1cmF0aW9uID0gZGVwZW5kZW5jaWVzLiQuZXh0ZW5kKHRydWUsIHt9LCBEZWZhdWx0Q29uZmlndXJhdGlvbik7XHJcbiAgICB0aGlzLiQgPSBkZXBlbmRlbmNpZXMuJDtcclxuICAgIEluaGFiaXRNb2R1bGVCYXNlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIGNvbmZpZ3VyYXRpb24sIGRlcGVuZGVuY2llcyk7XHJcbiAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XHJcbn07XHJcblxyXG5IZWxsb1dvcmxkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSW5oYWJpdE1vZHVsZUJhc2UucHJvdG90eXBlKTtcclxuSGVsbG9Xb3JsZC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBIZWxsb1dvcmxkO1xyXG5cclxuLyoqXHJcbiAqIFN0YXJ0IGFzeW5jIHRhc2sgdGhhdCBmZXRjaGVzIGNvbnRlbnQgYW5kIHJldHVybiBhIHRoaXMuZGVmZmVyZWQucHJvbWlzZSgpXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxyXG4gKi9cclxuSGVsbG9Xb3JsZC5wcm90b3R5cGUuZ2V0Q29udGVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBkZWZlcnJlZCA9IHRoaXMuJC5EZWZlcnJlZCgpO1xyXG4gICAgZGVmZXJyZWQucmVzb2x2ZSh0aGlzKTtcclxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIGEgVGh1bWJuYWlsIFVSTFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuSGVsbG9Xb3JsZC5wcm90b3R5cGUuZ2V0VGh1bWJuYWlsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIFwiaHR0cDovL2kuYW5uaWhpbC51cy91L3Byb2QvbWFydmVsLy91bml2ZXJzZTN6eC9pbWFnZXMvZi9mNS9Jcm9uTWFuX0hlYWQuanBnXCI7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIGEgVGl0bGVcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbkhlbGxvV29ybGQucHJvdG90eXBlLmdldFRpdGxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIFwiSXJvbiBNYW5cIjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbkhlbGxvV29ybGQucHJvdG90eXBlLmhhc0NvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXIgY29udGVudFxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5IZWxsb1dvcmxkLnByb3RvdHlwZS5kaXNwbGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNvbXBpbGVkVGVtcGxhdGUgPSB0aGlzLmhhbmRsZWJhcnMuY29tcGlsZShoZWxsb1dvcmxkVmlldyk7XHJcblxyXG4gICAgcmV0dXJuIGNvbXBpbGVkVGVtcGxhdGUoe2dyZWV0aW5nczp0aGlzLmNvbmZpZ3VyYXRpb24uc2F5fSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIGEgVHlwZVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuSGVsbG9Xb3JsZC5wcm90b3R5cGUuZ2V0VHlwZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBcInR5cGVcIlxyXG59O1xyXG5cclxuSW5oYWJpdE1vZHVsZUJhc2UucHVibGlzaChIZWxsb1dvcmxkKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHNheTpcImhlbGxvIHdvcmxkXCJcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBzdHlsZT1cXFwiYmFja2dyb3VuZDogcmVkXFxcIj5cXHJcXG4gICAge3sgZ3JlZXRpbmdzIH19XFxyXFxuPC9kaXY+XFxyXFxuPGRpdiBzdHlsZT1cXFwiYmFja2dyb3VuZDogeWVsbG93XFxcIj5cXHJcXG4gICAgPGltZyBzcmM9XFxcImh0dHA6Ly9pLmFubmloaWwudXMvdS9wcm9kL21hcnZlbC8vdW5pdmVyc2UzengvaW1hZ2VzLzMvM2UvSXJvbm1hbjAyLmpwZ1xcXCIvPlxcclxcbjwvZGl2PlwiO1xuIl19
