/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a URL', function() {
            // loop through allFeeds
            for(const feed of allFeeds){
                // ensure that feed URL is defined
                expect(feed.url).toBeDefined();
                // ensure that feed URL is not empty 
                expect(feed.url.trim().length).not.toBe(0);
                // ensure that feed URL stars with "http://" or "https://"
                expect(feed.url).toMatch(/http(s)?:\/\/(.*)/gi);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name', function() {
            // loop through allFeeds
            for(const feed of allFeeds){
                // ensure that feed name is defined
                expect(feed.name).toBeDefined();
                // ensure that feed name is not empty
                expect(feed.name.trim().length).not.toBe(0);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            // check if body has class 'menu-hidden'
            const menuHidden = $('body').hasClass('menu-hidden');
            // ensure that menu is hidden by default
            expect(menuHidden).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when the menu icon is clicked', function() {
            const menuIcon = $('.menu-icon-link');
            // simulate click to show menu
            menuIcon.trigger('click');
            // ensure that menu is displayed
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // simulate click to hide menu
            menuIcon.trigger('click');
            // ensure that menu is hidden
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            // load feed 0, Udacity Blog
            loadFeed(0, function(){
                done();
            });
        });
        
        it('should have at least a single entry', function(done) {
            // ensure that feed entries has been populated in the DOM
            expect($('.feed .entry').length).toBeGreaterThanOrEqual(1);
            done();
        });
    });
    
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let entries, initEntryLinks=[], newEntryLinks=[];
        
        beforeEach(function(done){
            // load init feed 1, CSS Tricks
            loadFeed(1, function(){
                // get feed entries in DOM
                entries = $('.feed .entry-link');
                // loop through each feed entries
                for(entry of entries){
                    // store the entry link in an array (initEntryLinks)
                    initEntryLinks.push(entry.href);
                }
                // load new feed 0, Udacity Blog
                loadFeed(0, function(){
                    // get feed entries in DOM
                    entries = $('.feed .entry-link');
                    // loop through each feed entries
                    for(entry of entries){
                        // store the entry link in an array (newEntryLinks)
                        newEntryLinks.push(entry.href);
                    }
                    done();
                });
            });
        });
        
        it('should have new content', function(done) {
            // ensure that content changes (new content is different from init content)
            // use deep equality comparison (toEqual) to compare initEntryLinks and newEntryLinks arrays
            expect(initEntryLinks).not.toEqual(newEntryLinks);
            done();
        });
    });
    
}());
