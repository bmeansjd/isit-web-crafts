/**
 * Created by charlie on 10/7/15.
 */

var walker = require('isit-site-tools-means').walker;

describe('Elvenware Simple Plain Suite', function() {

    'use strict';

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });

    it('expects walker to be defined', function() {
        expect(walker).toBeDefined();
    });

    it('expects the right methods to be defined on walker', function() {
        var methods = Object.getOwnPropertyNames(walker);
        expect(methods.indexOf('buildFileReport')).toBeGreaterThan(-1);
    });

    it('expects we can use walker', function() {
        var directoryToWalk = process.env.HOME + '/Documents/AllTest';
        console.log('start', directoryToWalk);
        walker.buildFileReport(directoryToWalk, '.md', function(report) {
            console.log('build');
            var directories = walker.getDirectories(report);
            walker.makePage(directoryToWalk, directories, report, null);
        });
    });

});
