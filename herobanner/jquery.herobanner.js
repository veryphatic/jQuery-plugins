/* "hero banner" jQuery plugin
 *
 * Rotates through the banner and lead stories on the homepage
 * Created May 2012 by Nathen Street
 *
 * Initiate plugin with $('#banner').heroBanner();
 */

    (function($) {       
        $.fn.heroBanner = function() {
            // Get the id of calling element
            var calledDivId = this.attr('id');
          
            // How many banners are there?
            var numBanners = this.find('li').not('li li').length-1;
            
            // Show the pause button
            $('#bannerControl').show();
          
            // Set the number of seconds to wait between transitions
            var transitionTime = 7;
            
            // First node to show
            var currentNode = 0;
            var previousNode = 0;
            
            // Rotate through each image ever "transitionTime" seconds
	    var slideInterval = setInterval(nextImage, transitionTime*1000);
            
            // Bind the clear interval to the pause button
            $('#bannerControl a').bind('click', function(event) {
                var linkText = $(this).text();
                // Handle pause
                if (linkText == "Pause") {
                    // clear the interval
                    clearInterval(slideInterval);
                    // relabel the link
                    $(this).text("Play");
                }
                // Handle play
                if (linkText == "Play") {
                    // restart the interval
                    slideInterval = setInterval(nextImage, transitionTime*1000);
                    // relabel the link
                    $(this).text("Pause");
                }
            });
            

            // Bind a hover event over the h2 so that the panel is opened
            $('#banners ul li h2').hover(function(event) {
               var thisObj = this;
               onMouseStop = setTimeout(function() {
                    // Save the previous node as the current node
                    var tempPrev = previousNode;
                    // Grab the index of the hovered element and save it as the current node
                    var tempCur = $(thisObj).parent().index();
                    // Only show hide panels if they're not already open
                    if (tempCur != currentNode) {
                        previousNode = currentNode;
                        currentNode = tempCur;
                        showHidePanels();
                    }
               }, 300);
               
               }, function() {
                       clearTimeout(onMouseStop);
             });

            // Bind to pause when the mouse is hovering over the text and link
            $('#banners ul').bind('mouseenter', function(event) {
               // pause the slider
               clearInterval(slideInterval);
            });
            
            // Restart the slider when the mouse moves out
            $('#banners ul li ul').bind('mouseleave', function(event) {
               // pause the slider
               slideInterval = setInterval(nextImage, transitionTime*1000);
            });
            
            // Bind a change event to the tabs so the slider only works when its being viewed
            $('#persona-nav li').bind('click', function(event) {
                if ($(this).find('a').text() != 'News') {
                    // Clear the interval
                    clearInterval(slideInterval);
                }
                if ($(this).find('a').text() == 'News') {
                    // Restart the interval
                    slideInterval = setInterval(nextImage, transitionTime*1000);
                }
            });
            
            // Called when there is a new news item to display
            function nextImage() {
                // Store the current item as the previous item
                previousNode = currentNode;
                // Reset the counter
                if (currentNode >= numBanners) {
                    currentNode = 0;
                }
                else {
                    currentNode ++;
                }
                showHidePanels();
            }
            
            
            // Show / hide the panels
            function showHidePanels() {
                // Show the next
                $('#banners ul li h2 a').not('li li').eq(currentNode).addClass('active');
                $('#banners li').not('li li').eq(currentNode).find('ul').slideDown();
                $('#banners li').not('li li').eq(currentNode).find('img').fadeIn();
                // Hide the previous
                $('#banners ul li h2 a').not('li li').eq(previousNode).removeClass('active');
                $('#banners li').not('li li').eq(previousNode).find('ul').slideUp();
                $('#banners li').not('li li').eq(previousNode).find('img').fadeOut();
            }
          
        };
    })(jQuery);
    