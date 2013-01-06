#!/usr/bin/env node

var feedparser = require('feedparser');
require('colors');

/**
 * How often should each RSS feed be scanned
 */
var scanFreq = 60 * 1000;

/**
 * List of RSS feed URLs to scan
 */
var sources = [
    'http://news.yahoo.com/rss/world',
    'http://news.yahoo.com/rss/middle-east',
    'http://news.yahoo.com/rss/europe',
    'http://news.yahoo.com/rss/latin-america',
    'http://news.yahoo.com/rss/africa',
    'http://news.yahoo.com/rss/asia',
    'http://news.yahoo.com/rss/canada',
    'http://news.yahoo.com/rss/australia-antarctica'
];
var sourceLen = sources.length;

var timeBetweenInits = scanFreq / sources.length; // Offset between RSS scans in the "scan loop"

/**
 * Phrases which will trigger our event, e.g. "drone strike" or
 * "Death of Matthew Sobol"
 */
var triggers = [
    "drones kill",
    "drone kills",
    "drones murder",
    "drone murder",
    "drone strike"
];
var triggerLen = triggers.length;

/**
 * A list of the GUID's of articles which have triggered an
 * event, so that they don't trigger an event multiple times.
 * Right now we use GUID, which Yahoo provides, but in the
 * future we may want to change that to a hash of the article.
 */
var activatedTriggers = [];

/**
 * Makes the scanning syntax a little prettier
 */
var scanFeed = function(url, parser, callback) {
    parser.parseUrl(url).on('article', callback);
};

/**
 * Look through the provided text for any of the trigger phrases
 */
var scanTextForTriggers = function(title, body) {
    var triggered = false;

    for (var i = 0; i < triggerLen; i++) {
        if (title.indexOf(triggers[i]) >= 0 || body.indexOf(triggers[i]) >= 0) {
            triggered = true;
        }
    }

    return triggered;
};

/**
 * What do we do when an article has been scanned
 */
var articleCallback = function(article) {
    var title = article.title;
    var body = article.summary.replace(/<(?:.|\n)*?>/gm, ''); // strip out HTML

    if (activatedTriggers.indexOf(article.guid) < 0 && scanTextForTriggers(title, body)) {
        console.log(title.blue, body);
        activatedTriggers.push(article.guid);
        
        // Communicate details to third party service
    }
};

/**
 * Displays a pretty message on the progress of the scans
 */
var displayProgress = function(index, url) {
    console.log('Scan'.cyan + ' ' + (index+1) + '/' + sourceLen + ': ' + url.blue);
};

/**
 * This sets up our timer loops. There's a main loop (e.g. 60 seconds)
 * and every RSS feed will get scanned once per this loop. The offsets
 * of the scans of each RSS feed will be evenly distributed within this
 * loop.
 */
for (var i = 0; i < sourceLen; i++) {
    (function(i) {
        var url = sources[i];
        setTimeout(function() {
            displayProgress(i, url);
            scanFeed(url, feedparser, articleCallback);

            setInterval(function() {
                displayProgress(i, url);
                scanFeed(url, feedparser, articleCallback);
            }, scanFreq);
        }, i * timeBetweenInits);
    })(i);
}

/**
 * When exiting the progress, we display a list of the
 * guid's of articles that have triggered an event.
 */
process.on('SIGINT', function() {
    console.log('Dumping Activated Triggers');
    console.log(activatedTriggers);
    process.exit();
});
