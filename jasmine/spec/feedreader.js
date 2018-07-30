/* All of tests within the $() function, to ensure all DOM elements are
 * loaded before the tests run
 */

$(function() {
    // Test feed variables
    describe('RSS Feeds', function() {
        // Ensure that allFeeds array is defined and populated
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Ensure that each feed url is defined and property isn't empty
        it('contain defined URLs that are not empty', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        // Ensure that each feed has a name and property isn't empty
        it('have defined names that are not empty', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    // Test menu show and hide
    describe('The menu', function() {
        const bodyClasses = document.querySelector('body').classList;

        // Ensure that the menu is hidden by default
        it('is hidden by default', function() {
            expect(bodyClasses).toContain('menu-hidden');
        });

        // Ensure that clicking menu toggles visibility
        it('toggles visibility when clicked', function() {
            const menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(bodyClasses).not.toContain('menu-hidden');

            menu.click();
             expect(bodyClasses).toContain('menu-hidden');
        });
    });
    
 
    // Test that someting is loaded
    describe('Initial Entries', function() {
        // Ensure loadFeed() is done
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // Ensure feed container has at least 1 entry when loadFeed() is done
        it('are loaded and contain at least one entry', function(done) {
            const feedEntries = document.querySelector('.feed').children;

            expect(feedEntries).not.toBeNull();
            expect(feedEntries.length > 0).toBe(true);
            expect(feedEntries[0]).toBeDefined();
            
            done();
        });
    });


    // Test new feed selection
    describe('New Feed Selection', function() {
        const feed = document.querySelector('.feed');
        let firstFeed, secondFeed;
        
        // Ensure initial feed is done and log text of first item in feed
        beforeEach(function(done) {
            loadFeed(0);
            firstFeed = feed.children;
            done();
        });

        // Ensure second feed is done and log text of first item in feed
        afterEach(function(done) {
            loadFeed(1);
            secondFeed = feed.children;
            done();
        })

        // Ensure text of first feed does not equal text of second feed
        it('changes content when new feed is loaded', function(done) {
            expect(firstFeed).not.toBeNull();
            expect(secondFeed).not.toBeNull();
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        });
    });
}());
