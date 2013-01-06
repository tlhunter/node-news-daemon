# Daemon

daemon (dēmən) n-A computer program that runs continuously in the background and performs specified operations at predefined times or in response to certain events.

## Backstory

In one scene in the book Daemon, there is a daemon component which reads an RSS feed
once every minute, looking for keywords. Once it finds those keywords, it performs its
function (e.g. calling out to another daemon component), then erases itself. I took
this a step further, where the component can scan several different RSS feeds at a
configurable frequency before performing its function. It doesn't delete itself when
discovering a notable item though, and so it will keep track of items it finds in this
manner to prevent duplicates from causing multiple triggers.

## Book

[Daemon by Daniel Suarez](http://www.amazon.com/dp/0451228731/?tag=tlhunter-20)

## Installation and Execution

    # Downlaod & Extract
    npm install
    node server.js

## Example Output

    $ ./server.js 
    Scan 1/8: http://news.yahoo.com/rss/world
    US drone strike in Pakistan kills influential Taliban commander Key Pakistani Taliban commander Maulvi Nazir – considered a "good" Taliban by some among the Pakistani military – died in a US drone strike that left at least six dead on Thursday, according to local reports.
    Scan 2/8: http://news.yahoo.com/rss/middle-east
    Scan 3/8: http://news.yahoo.com/rss/europe
    Scan 4/8: http://news.yahoo.com/rss/latin-america
    Scan 5/8: http://news.yahoo.com/rss/africa
    Scan 6/8: http://news.yahoo.com/rss/asia
    US drones kill senior Taliban figure in Pakistan ISLAMABAD (AP) — An American drone strike in Pakistan has killed a top Taliban commander who sent money and fighters to battle the U.S. in Afghanistan but had a truce with the Pakistani military, officials said Thursday.
    Pakistan says US drones kill senior Taliban figure PESHAWAR, Pakistan (AP) — Two U.S. drone strikes on northwest Pakistan killed a senior Taliban commander who fought American forces in Afghanistan but had a truce with the Pakistani military, intelligence officials said Thursday.
    TEST:Pakistan: US drones kill 13, including commander PESHAWAR, Pakistan (AP) — A pair of U.S. drone strikes in northwest Pakistan near the Afghan border killed 13 people Thursday, including a senior militant commander who had a truce with the Pakistani military, intelligence officials and residents said.
    Pakistan: Drones kill 13, including top militant PESHAWAR, Pakistan (AP) — Pakistani intelligence officials say two U.S. drone strikes in the tribal regions bordering Afghanistan have killed 13 people, including a senior militant commander who had a truce with Pakistan's military.
    Scan 7/8: http://news.yahoo.com/rss/canada
    Scan 8/8: http://news.yahoo.com/rss/australia-antarctica
    Scan 1/8: http://news.yahoo.com/rss/world
    Scan 2/8: http://news.yahoo.com/rss/middle-east
    Scan 3/8: http://news.yahoo.com/rss/europe
    Scan 4/8: http://news.yahoo.com/rss/latin-america
    Scan 5/8: http://news.yahoo.com/rss/africa
    Scan 6/8: http://news.yahoo.com/rss/asia
    Scan 7/8: http://news.yahoo.com/rss/canada
    Scan 8/8: http://news.yahoo.com/rss/australia-antarctica
    Scan 1/8: http://news.yahoo.com/rss/world
    Scan 2/8: http://news.yahoo.com/rss/middle-east
    Scan 3/8: http://news.yahoo.com/rss/europe

## TODO

* Handle errors gracefully (e.g. 404's and invalid feeds)
* Persist Sources, Triggers, and Activated Triggers to disk
* Allow sources and triggers to be updated on the fly
 * Listen for incoming HTTP requests to update these lists
 * Dynamically update timers
* Make it an NPM module

# License

MIT
