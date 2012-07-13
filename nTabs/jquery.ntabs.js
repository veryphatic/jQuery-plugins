/*
 * nTabs
 * =====
 *
 * JQuery tabs plugin. Design based on JQuery UI Tabs
 *
 * Code by Nathen Street May 2012
 *
 * Usage
 * =====
 *
 * Page header
 * -----------
 * <script type="text/javascript" src="jquery.ntabs.js"></script>
 * <link rel="stylesheet" href="ntabs-css.css" media="screen" />
 *
 * Additional script only required if enableBack is set to true
 * <script type="text/javascript" src="hashchange.js"></script>
 *
 * HTML format
 * -----------
 * <div id="yourDivName">
 * 
 * <!-- tab menu -->
 * <ul>
 * <li><a href="#tab1">Tab 1</li>
 * <li><a href="#tab2">Tab 2</li>
 * <li><a href="#tab2">Tab 2</li>
 * </ul>
 * 
 * <!-- tab content -->
 * <div id="tab1">Content</div>
 * <div id="tab2">Content</div>
 * <div id="tab3">Content</div>
 * 
 * </div>
 *
 * Instantiation
 * -------------
 * $('#yourDivName).tabs({options});
 * eg) $('#yourDivName).tabs({ width: 500, enableBack: false, marginBottomHeight: 100 });
 *
 * - Options
 * width: The width of the tabs area pixels only
 * marginBottomHeight: Provides extra spacing at the bottom of the tabs block; measured in pixels
 * enableBack: Enables or disables the abilty for the back button to back tab. Boolean, true or false. IE 6-7 browsers will require hashchange.js for this feature to work
 * defaultTab: Sets the default tab. Tabs 0 to x. Default tab is 0
 * tabsContentMarginTop: Offsets the tab content from the tab menu items. Defaults (-15px). Measured in pixels
 * 
 * Deep linking
 * ------------
 * Tabs can be deep linked by passing the tab name in the URL. For example if you want tab 2 to be opened from a link, pass the hash name of the tab
 * eg) <a href="page.html#tab2">Tab 2</a>
 *
 * Public functions
 * ----------------
 * It is possible to open a tab via javascript. Using the OpenTab(#tabName) method will open the required tab
 * eg) $('#yourDivName').tabs.OpenTab('#advancedsearch');
 * 
 */

(function($) {
    
    // meta data
    $.meta = {
	tabs: {
	    application: 'nTabs',
	    version: '1.0.4',
	    createdby: 'Nathen Street',
	    createdate: 'July 2012'
	}
    };
    
    
    // plugin setup
    $.fn.tabs = function(options,callback){
        
	// plugin defaults
	var defaults = {
	    enableBack: true,
	    defaultTab: 0,
        };
	
        // settings & variable declarations
        var tabsArray = [];
	var hashCheck = false;
	var currentTab = '';
	
        // setup callback for public methods
        if (options == undefined) {
	    console.log('no options');
            //return $.fn.tabs[callback](this,options);
        }
        
        // default options
        var settings = $.extend({}, defaults, options);
    	
	
        /**
        * public methods
        */ 
        
        // opens a tab; pass #tabname for tab
        $.fn.tabs.OpenTab = function(tab) {
            _openTab(tab);
        };
        
	
        
        /**
        * private methods
        */ 
        
        // setup the tabs
        var _init = function() {
	    
	    // first disable the hashchange facility on IE 6 & IE 7
	    if ($.browser.msie) {
		if ($.browser.version == 6 || $.browser.version == 7) {
		    settings.enableBack = false;
		}
	    }
	    // find the nav and divs, apply css
            $tabNavigation = $this.find('ul:first');			
            $tabNavigation.addClass('nTabs_nav');
	    
	    // what are the div content names
            $.each($tabNavigation.find('li a[href]'),function(num) {
		var divName = this.hash;
		tabsArray.push(divName);
		$(divName).addClass('nTabs_content');
		$(divName).hide();
		var contentDivHeight = $(divName).height() + settings.marginBottomHeight;
		
		// check if the url hash value is equal to one of the tabs
		if (divName == document.location.hash) {
		    hashCheck = true;
		}
            });
	    // add event listener
	    $tabNavigation.find('li').bind('click', _mouseControl);
	    
            // if the url hash value = a tab, open the tab; otherwise open the default tab
	    if (hashCheck) {
		_openTab(document.location.hash);
	    } else {
		_openTab(tabsArray[settings.defaultTab]);
	    }
	    
	    // enable the back button to back through the index
	    if (settings.enableBack) {
		$(window).bind('hashchange', function() {
		    _hashBack();
		});
	    }
	    return false;
            
        };
        
        // Open tabs
        var _openTab = function(tabName) {
	    if (settings.enableBack) {
		if (tabName != '') {
		    currentTab = tabName;
		}
	    }
	    // opens the new tab, closes all the others
	    $.each(tabsArray, function(key, value){
		if (value == tabName) {
		    $(value).show();
		} else {
		    $(value).hide();
		}
	    });
	    
	    // adds the selected class to the nav item, removes it from others
	    $.each($tabNavigation.find('li a'), function(key,value) {
		if (value.hash == tabName) {
		    $(value).parent().addClass('selected');
		} else {
		    $(value).parent().removeClass('selected');
		}
	    });
	    return false;
	    
        };
	
        
        var _keyboardControl = function(event) {
	    if (event.which == 32){
                $(window).scroll().stop();
                _openTab($(this).parent());
	    }
	    return false;
        };
	
        
        var _mouseControl = function(event) {
	    var clicked = $(this).find('a').attr('href');
	    if (settings.enableBack) {
		location.hash = clicked;
	    }
	    _openTab(clicked);
	    return false;
        };
	
	
	// function checks the URL hash value and sets the index if found
	var _hashBack = function() {
	    if (document.location.hash != currentTab && document.location.hash != '') {
		_openTab(location.hash);
	    }
	    if (location.hash == '' || location.hash == '#') {
		_openTab(tabsArray[settings.defaultTab]);
	    }
	    return false;
	};
        
	
        return this.each(function(){
	    
            $this = $(this);
            _init();
	    
        });        
        
        
    };


})(jQuery);