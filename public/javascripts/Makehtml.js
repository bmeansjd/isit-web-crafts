/**
 * Created by charlie on 7/9/16.
 */

define(['display', 'walking'], function(display, walking) {
    'use strict';

    var radioWalkType = 'qSingle';

    /**
     * @typedef {Object} configSummary
     * @property {Object} siteDirs
     * @property {Object} destinationDirs
     * @property {String} baseDir
     * @property {String} mostRecentDate
     */
    function loadConfig() {
        $.getJSON('/makers/config', function(configSummary) {
            display.clearConfig();
            $('#displayArea').html(JSON.stringify(configSummary, null, 4));
            configSummary.siteDirs.forEach(function(dir) {
                var showDir = configSummary.baseDir + dir;
                $('#dirsToWalk').append('<option value="' + showDir + '">' + showDir + '</option>');
            });
            configSummary.destinationDirs.forEach(function(dir) {
                $('#destinationDirs').append('<option value="' + dir + '">' + dir + '</option>');
            });
            $('#mostRecentDate').html(configSummary.mostRecentDate);
        }).done(function() {
            display.showDebug('Config loaded second success');
        }).fail(function(jqxhr, textStatus, error) {
            display.showDebug('Config load error: ' + jqxhr.status + ' ' + textStatus + ' ' + error);
        }).always(function() {
            display.showDebug('Config loaded complete');
        });
    }

    function walk() {
        walking.runWalk(radioWalkType);
    }

    return {
        init: function() {
            $('#pageLoad').load('/makers/makeHtml', function() {
                $('#loadConfig').click(loadConfig);
                $('#walk').click(walk);
                $('#walktype').change(function() {
                    radioWalkType = $('input[name=walktype]:checked').attr('id');
                });
                walking.configurePageOne();
                loadConfig();
            });
        }
    };
});
