/* global edubinScreenReaderText */
(function($) {
"use strict";

    // Variables and DOM Caching.
    var $body = $('body'),
        $customHeader = $body.find('.custom-header'),
        $branding = $customHeader.find('.site-branding'),
        $navigation = $body.find('.navigation-top'),
        $navWrap = $navigation.find('.wrap'),
        $navMenuItem = $navigation.find('.menu-item'),
        $menuToggle = $navigation.find('.menu-toggle'),
        $menuScrollDown = $body.find('.menu-scroll-down'),
        $sidebar = $body.find('#secondary'),
        $entryContent = $body.find('.entry-content'),
        $formatQuote = $body.find('.format-quote blockquote'),
        isFrontPage = $body.hasClass('edubin-front-page') || $body.hasClass('home blog'),
        navigationFixedClass = 'site-navigation-fixed',
        navigationHeight,
        navigationOuterHeight,
        navPadding,
        navMenuItemHeight,
        idealNavHeight,
        navIsNotTooTall,
        headerOffset,
        menuTop = 0,
        resizeTimer;
    // Ensure the sticky navigation doesn't cover current focused links.
    $('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]', '.site-content-contain').filter(':visible').focus(function() {
        if ($navigation.hasClass('site-navigation-fixed')) {
            var windowScrollTop = $(window).scrollTop(),
                fixedNavHeight = $navigation.height(),
                itemScrollTop = $(this).offset().top,
                offsetDiff = itemScrollTop - windowScrollTop;
            // Account for Admin bar.
            if ($('#wpadminbar').length) {
                offsetDiff -= $('#wpadminbar').height();
            }
            if (offsetDiff < fixedNavHeight) {
                $(window).scrollTo(itemScrollTop - (fixedNavHeight + 50), 0);
            }
        }
    });
    // Set properties of navigation.
    function setNavProps() {
        navigationHeight = $navigation.height();
        navigationOuterHeight = $navigation.outerHeight();
        navPadding = parseFloat($navWrap.css('padding-top')) * 2;
        navMenuItemHeight = $navMenuItem.outerHeight() * 2;
        idealNavHeight = navPadding + navMenuItemHeight;
        navIsNotTooTall = navigationHeight <= idealNavHeight;
    }
    // Make navigation 'stick'.
    function adjustScrollClass() {
        // Make sure we're not on a mobile screen.
        if ('none' === $menuToggle.css('display')) {
            // Make sure the nav isn't taller than two rows.
            if (navIsNotTooTall) {
                // When there's a custom header image or video, the header offset includes the height of the navigation.
                if (isFrontPage && ($body.hasClass('has-header-image') || $body.hasClass('has-header-video'))) {
                    headerOffset = $customHeader.innerHeight() - navigationOuterHeight;
                } else {
                    headerOffset = $customHeader.innerHeight();
                }
                // If the scroll is more than the custom header, set the fixed class.
                if ($(window).scrollTop() >= headerOffset) {
                    $navigation.addClass(navigationFixedClass);
                } else {
                    $navigation.removeClass(navigationFixedClass);
                }
            } else {
                // Remove 'fixed' class if nav is taller than two rows.
                $navigation.removeClass(navigationFixedClass);
            }
        }
    }
    // Set margins of branding in header.
    function adjustHeaderHeight() {
        if ('none' === $menuToggle.css('display')) {
            // The margin should be applied to different elements on front-page or home vs interior pages.
            if (isFrontPage) {
                $branding.css('margin-bottom', navigationOuterHeight);
            } else {
                $customHeader.css('margin-bottom', navigationOuterHeight);
            }
        } else {
            $customHeader.css('margin-bottom', '0');
            $branding.css('margin-bottom', '0');
        }
    }
    // Set icon for quotes.
    function setQuotesIcon() {
        $(edubinScreenReaderText.quote).prependTo($formatQuote);
    }
    // Add 'below-entry-meta' class to elements.
    function belowEntryMetaClass(param) {
        var sidebarPos /*, sidebarPosBottom*/ ;
        if (!$body.hasClass('has-sidebar') || ($body.hasClass('search') || $body.hasClass('single-attachment') || $body.hasClass('error404') || $body.hasClass('edubin-front-page'))) {
            return;
        }
        sidebarPos = $sidebar.offset();
        $entryContent.find(param).each(function() {
            var $element = $(this),
                elementPos = $element.offset(),
                elementPosTop = elementPos.top;
        });
    }
    /*
     * Test if inline SVGs are supported.
     * @link https://github.com/Modernizr/Modernizr/
     */
    function supportsInlineSVG() {
        var div = document.createElement('div');
        div.innerHTML = '<svg/>';
        return '//www.w3.org/2000/svg' === ('undefined' !== typeof SVGRect && div.firstChild && div.firstChild.namespaceURI);
    }
    /**
     * Test if an iOS device.
     */
    function checkiOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    /*
     * Test if background-attachment: fixed is supported.
     * @link https://stackoverflow.com/questions/14115080/detect-support-for-background-attachment-fixed
     */
    function supportsFixedBackground() {
        var el = document.createElement('div'),
            isSupported;
        try {
            if (!('backgroundAttachment' in el.style) || checkiOS()) {
                return false;
            }
            el.style.backgroundAttachment = 'fixed';
            isSupported = ('fixed' === el.style.backgroundAttachment);
            return isSupported;
        } catch (e) {
            return false;
        }
    }
    // Fire on document ready.
    $(document).ready(function() {
        // If navigation menu is present on page, setNavProps and adjustScrollClass.
        if ($navigation.length) {
            setNavProps();
            adjustScrollClass();
        }
        // If 'Scroll Down' arrow in present on page, calculate scroll offset and bind an event handler to the click event.
        if ($menuScrollDown.length) {
            if ($('body').hasClass('admin-bar')) {
                menuTop -= 32;
            }
            if ($('body').hasClass('blog')) {
                menuTop -= 30; // The div for latest posts has no space above content, add some to account for this.
            }
            if (!$navigation.length) {
                navigationOuterHeight = 0;
            }
            $menuScrollDown.on(function(e) {
                e.preventDefault();
                $(window).scrollTo('#primary', {
                    duration: 600,
                    offset: {
                        top: menuTop - navigationOuterHeight
                    }
                });
            });
        }
        adjustHeaderHeight();
        setQuotesIcon();
        if (true === supportsInlineSVG()) {
            document.documentElement.className = document.documentElement.className.replace(/(\s*)no-svg(\s*)/, '$1svg$2');
        }
        if (true === supportsFixedBackground()) {
            document.documentElement.className += ' background-fixed';
        }
        $(".navigation-section .mobile-menu-wrapper").append('<div class="mobile-menu"></div>');
        $(".main-menu").clone().appendTo(".navigation-section .mobile-menu");
        //Add toggle dropdown icon
        $(".mobile-menu .main-menu").find('.menu-item-has-children').append('<span class="zmm-dropdown-toggle fas fa-plus"></span>');
        $(".mobile-menu .main-menu").find('.sub-menu').slideToggle();
        $(".mobile-menu-icon").on("click", function() {
            $(".mobile-menu").slideToggle();
        });
        //dropdown toggle
        $(".zmm-dropdown-toggle").on("click", function() {
            var parent = $(this).parent('li').children('.sub-menu');
            $(this).parent('li').children('.sub-menu').slideToggle();
            $(this).toggleClass('fa-minus');
            if ($(parent).find('.sub-menu').length) {
                $(parent).find('.sub-menu').slideUp();
                $(parent).find('.zmm-dropdown-toggle').removeClass('fa-minus');
            }
        });
    });
    var $scroll_obj = $('#back-to-top');
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $scroll_obj.fadeIn();
        } else {
            $scroll_obj.fadeOut();
        }
    });
    $scroll_obj.on(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    // If navigation menu is present on page, adjust it on scroll and screen resize.
    if ($navigation.length) {
        // On scroll, we want to stick/unstick the navigation.
        $(window).on('scroll', function() {
            adjustScrollClass();
            adjustHeaderHeight();
        });
        // Also want to make sure the navigation is where it should be on resize.
        $(window).resize(function() {
            setNavProps();
            setTimeout(adjustScrollClass, 500);
        });
    }
    $(window).resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            belowEntryMetaClass('blockquote.alignleft, blockquote.alignright');
        }, 300);
        setTimeout(adjustHeaderHeight, 1000);
    });
    // Add header video class after the video is loaded.
    $(document).on('wp-custom-header-video-loaded', function() {
        $body.addClass('has-header-video');
    });
})(jQuery);