    /*
     * Indexify jQuery Plugin
     *
     * This plugin thakes a list of headings h3 elements with following ul elements. The ul elements are hidden until the user
     * clicks on the + link.
     *
     * Created by Nathen Street, May 2012
     *
     * Usage:
     * $(containerDiv).indexify();
     *
     * HTML:
     * <div id="containerDiv")
     *   <h3>Index heading</h3>
     *   <ul>
     *     <li>Index content item</li>
     *     <li>Index content item</li>
     *     <li>Index content item</li>
     *   </ul>
     * </div>
     *
     */
    
    (function($) {       
        $.fn.indexify = function() {
            
            // get the name of the container div
            var containerDiv = $(this).attr('id');
            
            // Find the first h2 and add the show all / hide all buttons
            var elem = $('#' + containerDiv).find('h2:first');
            $('<input type="button" class="showAll" value="Show All" /> <input type="button" class="hideAll" value="Hide All" />').insertBefore(elem);
            
            // loop through each h3 ul and collapse
            hideAll();
            
            // Add expand to each item
            $('#' + containerDiv + ' h3').prepend('<a class="expand">+</a>');
            
            // Bind the click event
            $('#' + containerDiv + ' h3').click(function() {

                // If the item clicked is already selected, then collapse it
                if ( $(this).hasClass('selected') ) {
                    $(this).find('a.expand').text('+');
                    $(this).removeClass('selected');
                    $(this).next('ul').hide();
                } else {
                    // show the selected
                    $(this).next('ul').show();
                    $(this).find('a.expand').text('-');
                    $(this).addClass('selected');
                }
            }); 

            // Bind the show all button to show all
            $('.showAll').click(function(event){
                $('#' + containerDiv + ' h3 + ul').each(function(index) {
                    $(this).show();
                });
                // Make all the + turn to -
                $('#' + containerDiv + ' h3').each(function(index) {
                    $(this).find('a.expand').text('-');
                    $(this).addClass('selected');
                });
            });

            // Bind the show all button to show all
            $('.hideAll').click(function(event){
                hideAll();            
            });
            
            // Loops through each h3, finds the next UL element and hides it
            function hideAll() {
                $('#' + containerDiv + ' h3 + ul').each(function(index) {
                    $(this).hide();
                });
                // Reset the h3 expand values
                $('#' + containerDiv + ' h3').each(function(index) {
                    if ( $(this).hasClass('selected') ) {
                        $(this).find('a.expand').text('+');
                        $(this).removeClass('selected');
                    }
                });
            }
          
        };
    })(jQuery);