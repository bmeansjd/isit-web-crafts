/**
 * Created by charlie on 7/11/16.
 */

var express = require('express');
var router = express.Router();
var walker = require('isit-site-tools-means').walker;
var walkRunner = require('isit-site-tools-means').walkRunner;
var imagesTest = require('isit-site-tools-means').imagesTest;
var config = require('isit-code-means').elfConfig;
var fs = require('fs');
var utils = require('isit-code-means').elfUtils;
var imageHelp = require('isit-site-tools-means').imageHelp;
var elfLog = require('isit-code-means').elvenLog('makers');
elfLog.setLevel(elfLog.logLevelDetails);

router.get('/makeHtml', function(request, response) {
    'use strict';
    response.render('make-html', {
        title: 'Make HTML',
        author: 'Charlie Calvert'
    });
});

router.get('/pixPicker', function(request, response) {
    'use strict';
    response.render('pix-picker', {
        title: 'Pix Picker',
        author: 'Charlie Calvert'
    });
});

router.get('/config', function(request, response) {
    'use strict';
    config.useLocalConfig = false;
    var user = 'calvert';
    config.loadAsync()
        .then(function(configData) {
            elfLog.nano('CONFIG DATA: ', JSON.stringify(configData, null, 4));

            var baseDir = config.get(user, 'base-dir');
            var siteDirs = config.get(user, 'site-dirs');
            var mostRecentDate = config.get(user, 'most-recent-date');
            var destinationDirs = config.get(user, 'destination-dirs');
            var configSummary = {
                'baseDir': baseDir,
                'mostRecentDate': mostRecentDate,
                'siteDirs': siteDirs,
                'destinationDirs': destinationDirs
            };
            console.log('Config is:', configSummary);
            response.status(200).send(configSummary);
        })
        .catch(function(err) {
            throw err;
        });
});

router.get('/makeImages', function(request, response) {
    imagesTest.run()
        .then(function(reports) {
            reports.forEach(function(report) {
                console.log(report.markdownFileWithImages);
            });
            response.send(reports);
        })
        .catch(function(err) {
            response.send(err);
        });
});

router.get('/makeMarkdown', function(request, response) {
    'use strict';
    console.log('makeMarkdown route called');
    var makeMarkdown = new imageHelp.MakeMarkdown();

    makeMarkdown.loadAndRun(function(report) {
        if (report.spacesInFileNames) {
            console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
            console.log('You have spaces in one or more file names.');
            console.log('The problem is probably in your images directory.');
            console.log('FileNames or Directories with spaces in their ');
            console.log('names is not a good idea. Run this command in ');
            console.log('the offending directory and then restart:');
            console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
            console.log('find -name "* *" -type f | rename "s/ /_/g"');
            console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
            response.send({
                error: 'spaces in file name'
            });
        } else if (report.markdownFileExists) {
            response.send({
                error: 'Markdown file exists: ' + report.markdownFileWithImages
            });
        } else {
            response.send({
                'success': 'makeMarkdown',
                'report': report
            });
        }
        console.log(report);
    });
});

router.get('/deleteMarkdown', function(request, response) {
    'use strict';
    var makeMarkdown = new imageHelp.MakeMarkdown();
    makeMarkdown.deleteMarkdownFileWithImages(function(result) {
        console.log(result);
        response.send({
            'result': 'file deleted'
        });
    });
});
/*
router.get('/walk', function(request, response) {
    console.log(request.query);
    //const runConfig = require('./markdown-to-html/runners/sample-runner');
    walkRunner('calvert', request.query.siteDirsIndex)
        .then(function(report) {
            response.send(report);
        })
        .catch(function(err) {
            throw err;
        })
});*/

router.get('/walk', function(request, response) {
    walkRunner('calvert', request.query.siteDirsIndex, false)
        .then(function(report) {
            response.send(report);
        })
        .catch(function(err) {
            throw err;
        });
});



router.get('/walk-old', function(request, response) {
    'use strict';
    console.log('In walk', request.query);
    var directoryToWalk = request.query.directoryToWalk;
    var destinationDir = request.query.destinationDir;
    var highlight = request.query.highlight || true;
    var bootswatchTheme = request.query.theme || 'darkly';
    var mostRecentDate = request.query.mostRecentDate;

    fs.access(directoryToWalk, fs.F_OK | fs.R_OK, function(err) {
        if (err) {
            console.log('Could not find', directoryToWalk);
            response.sendStatus(401);
        } else {
            console.log('start', request.query, directoryToWalk);
            walker.buildFileReport(directoryToWalk, '.md', mostRecentDate, function(report) {
                console.log('build');
                var directories = walker.getDirectories(report);
                var settings = {
                    report: report,
                    directoryToWalk: directoryToWalk,
                    destinationDir: destinationDir,
                    directories: directories,
                    highlight: highlight === 'true',
                    testRun: false,
                    bootswatch: bootswatchTheme
                };
                try {
                    walker.makePage(settings, function(masterListOfNames, htmlFilesWritten) {
                        response.send({
                            result: 'success',
                            destinationDir: destinationDir,
                            directories: directories,
                            masterListOfNames: masterListOfNames,
                            htmlFilesWritten: htmlFilesWritten
                        });

                        utils.writeFile('RunReport.txt', JSON.stringify(report, null, 4), function() {
                            elfLog.log(elfLog.logLevelInfo, 'Wrote report to: RunReport.txt');
                        });
                    });

                } catch (e) {
                    console.log('The error:', e);
                    // response.sendStatus(500);
                    response.status(500).send(e.toString());
                }
            });
        }
    });

});

module.exports = router;
