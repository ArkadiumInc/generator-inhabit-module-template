/**
 * Created by WMTS on 8/25/2016.
 */
var config = require('../config');
var stringify = require('stringify');
var sassify = require('sassify');

/**
 * @property addPlugin
 * @returns {{entries: *[], cache: {}, packageCache: {}, debug: boolean, plugin: Array, transform: *[]}}
 */
var Configurator = function () {
    var configuration = {
        entries: [config.sources.jsEntry],
        cache: {},
        packageCache: {},
        debug: true,
        plugin: [],
        transform: [
            [
                stringify,
                {
                    appliesTo: {includeExtensions: ['.hbs']},
                    minify: false
                }
            ],
            [
                sassify,
                {
                    'auto-inject': true,
                    sourceMap: true
                }
            ]
        ]
    };

    /**
     * Add plugin(s) to browserify configuration
     * @param {(string|[])} options
     */
    configuration.addPlugin = function (options) {
        if (!options) {
            return;
        }
        if (typeof options === 'string') {
            options = [options];
        }
        Array.isArray(options) && options.forEach(function (plugin) {
            configuration.plugin.push(plugin);
        });
    };

    return configuration;
};

module.exports = Configurator;