var sources = {
        directory: "./src",
        jsMask: "*.js",
        jsEntry: "HelloworldModule.js",
        html: "*.html"
    },
    destination = {
        directory: "./build",
        moduleDirectory: "./build/modules",
        js: "helloWorld.js"
    },
    package = {
        directory: "./package/",
        file : "HelloWorld.zip"
    };

module.exports = {
    sources: {
        directory: sources.directory,
        jsEntry: sources.directory + '/' + sources.jsEntry,
        html: sources.directory + '/' + sources.html
    },
    destination: {
        directory: destination.directory,
        moduleDirectory: destination.moduleDirectory,
        jsOutput: destination.js
    },
    package : {
        directory: package.directory,
        file: package.file
    }
};