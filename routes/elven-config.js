/**
 * @author Charlie
 */

var fs = require('fs');
var os = require('os');
var utils = require('isit-code-means').elfUtils;
var elfLog = require('isit-code-means').elfLog;

function getConfigName() {
    'use strict';
    var configFileName = 'ElvenConfig.json';
    var configName = '';
    if (os.platform() === 'darwin') {
        configName = process.env.HOME + '/.config/' + configFileName;
    } else if (os.platform() === 'linux') {
        configName = process.env.HOME + '/.config/' + configFileName;
    } else if (os.platform() === 'win32') {
        configName = process.env.USERPROFILE + '\\Config\\' + configFileName;
    }
    return configName;
}

function reportError(err) {
    'use strict';
    console.log('*********************************');
    console.log(err);
    console.log('*********************************');
    console.log('Error condition in elven-config.js!');
    console.log('This program requires a config file');
    console.log('Please put ElvenConfig.json somewhere we can find it.');
    console.log('Contrl-C to abort');
    console.log('Error condition!');
    console.log('*********************************');
}

function elvenConfig() {

}

elvenConfig.configData = {};
elvenConfig.loaded = false;

var load = function(callback) {
    'use strict';
    var configName = getConfigName();
    try {
        elfLog.log(elfLog.logLevelDetails, 'Configuration Name: ' + configName);
        utils.readFile(configName, function(result) {
            elvenConfig.configData = JSON.parse(result.result);
            elfLog.log(elfLog.logLevelSilent, 'In load: ' + JSON.stringify(elvenConfig.configData, null, 4));
        });
    } catch (e) {
        console.log(e);
    }
};

elvenConfig.get = function(property) {
    'use strict';
    return elvenConfig.configData.calvert[property];
};

load();

module.exports = elvenConfig;
