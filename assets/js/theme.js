/* global gigAjaxUrl */
window.Project = (function (window, document, $, undefined) {
	'use strict';

	var app = {
		initialize: function () {
			app.initHamburgerMenu();
			app.initFeatureSlider('.feature-slider-inner');
			app.initTestimonialSlider('.footer-message-area');
			app.initMatchHeight('.adjust-post-card-height');
			app.initMatchHeight('.adjust-category-post-height');
			app.initMenuItemActive();
			//app.initDropDownHover();
			$(window).on('resize', app.hoverable_dropdown);
			app.hoverable_dropdown();
			app.initIsotope();
			//app.initCalendar();
			app.initMagnific();
			app.menubarPosition();
			app.copyToClipboard();
			app.nextPostForSingle();

			app.initEventDatePicker('.event-date-picker');
		},

		menubarPosition: function () {

			$(window).scroll(function () {
				if ($(window).scrollTop() > 200) {
					$('.wrapper-navbar').addClass('sticky-header');
				} else if ($(window).scrollTop() < 50) {
					$('.wrapper-navbar').removeClass('sticky-header');
				}
			});

		},

		copyToClipboard: function () {

			$('#copy-url-btn').on('click', function (e) {
				e.preventDefault();

				var elem = $(this).attr('data-url');

				var $temp = $('<input>');
				$('body').append($temp);
				$temp.val(elem).select();

				try {
					document.execCommand('copy');
					$temp.remove();
					window.alert('Copied current URL to clipboard!');
				}
				catch (err) {
					window.alert('unable to copy text');
				}

			});

		},

		initMagnific: function () {
			$('.image-large').magnificPopup({
				type: 'image'
			});

			$('.play-video').magnificPopup({
				type: 'iframe'
			});

			$.extend(true, $.magnificPopup.defaults, {
				iframe: {
					patterns: {
						youtube: {
							index: 'youtube.com/',
							id: 'v=',
							src: 'http://www.youtube.com/embed/%id%?autoplay=1'
						}
					}
				}
			});
		},


		initCalendar: function () {
			$('#community-calendar').fullCalendar();
		},

		initIsotope: function () {
			var $isotopeContainer = $('.isotope');
			$('#container').imagesLoaded(function () {
				$isotopeContainer.isotope({
					resizable: true,
					itemSelector: '.grid-item',
					masonry: {
						columnWidth: '.grid-item'
					}
				});
			});

			// bind filter button click
			$('.isotope-filters').on('click', 'button', function () {
				var filterValue = $(this).attr('data-filter');
				$isotopeContainer.isotope({filter: filterValue});
			});

			// change active class on buttons
			$('.isotope-filters').each(function (i, buttonGroup) {
				var $buttonGroup = $(buttonGroup);
				$buttonGroup.on('click', 'button', function () {
					$buttonGroup.find('.active').removeClass('active');
					$(this).addClass('active');
				});
			});
		},
		hoverable_dropdown: function () {
			if ($(window).width() < 768) {
				$('.dropdown-toggle').attr('data-toggle', 'dropdown');
			} else {
				$('.dropdown-toggle').removeAttr('data-toggle dropdown');
			}
		},

		/*	initDropDownHover: function () {
                $('.main-menu li.dropdown').hover(function () {
                    $(this).addClass('open');
                }, function () {
                    $(this).removeClass('open');
                });
            },*/
		initMenuItemActive: function () {
			$('.main-menu li').on('click', function () {
				$(this).addClass('active').siblings().removeClass('active');
			});
		},
		initHamburgerMenu: function () {
			$('.hamburger-button').on('click', function () {
				$('.hamburger-menu, .hamburger-full-body-overlay').addClass('active');
				return false;
			});
			$('.hamburger-menu-close, .hamburger-full-body-overlay').on('click', function () {
				$('.hamburger-menu, .hamburger-full-body-overlay').removeClass('active');
			});
		},
		initMatchHeight: function ($selector) {
			$($selector).matchHeight({
				property: 'height'
			});
		},

		initFeatureSlider: function ($selector) {
			$($selector).owlCarousel({
				items: 1,
				loop: true,
				autoplay: true,
			    autoplayTimeout: 4000,
				slideTransition: 'ease',
				autoplaySpeed: 1000,
				autoplayHoverPause: true,
				margin: 10,
				nav: false,
				dots: true,
				navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
			});
		},

		initTestimonialSlider: function ($selector) {
			$($selector).owlCarousel({
				items: 1,
				autoplay: true,
				loop: true,
				margin: 10,
				nav: false,
				dots: false
			});
		},
		nextPostForSingle: function() {
            if ( $( 'body' ).hasClass( 'single-post' ) ) {
                $( window ).on( 'scroll', function( ) {
                    var target_pos = $('.giggle-next-post-nav').position();
                    if( ( target_pos.top - window.scrollY - window.outerHeight ) < 100 && ! app.postCalled ) {
                        app.postCalled = true;
                        app.getSinglePostByAjax();
                    }
                } );
            }
		},
		initEventDatePicker: function ($selector) {
			var today = new Date();

			$($selector).datepicker({
				changeMonth: true,
				changeYear: true,
				dateFormat: 'yy-mm-dd',
				minDate: today
			});

		},
		getSinglePostByAjax: function() {
            var postId = $('.giggle-next-post-nav').data( 'id' );
            if ( postId === '' || postId === 0 ) {
                return;
            }

            $.ajax( {
                method: 'POST',
                url: gigAjaxUrl,
                data: {
                    action: 'giggle_get_next_post',
                    id: postId
                }
            } ).done( function( res ) {
                $( res.data.post_view ).insertBefore('.giggle-next-post-nav');
                $('.giggle-next-post-nav').data( 'id', res.data.next_id );

                var theTitle = $( '<div />' ).html( res.data.next_title ).text();

                window.history.pushState( { pageTitle: theTitle }, '', res.data.next_url );
                document.title = theTitle;
                // app.headingNumber();
                // app.photoCaption();
            } ).always( function() {
                app.postCalled = false;
            } );
        }
	};

	$(document).ready(app.initialize);

	return app;
})(window, document, jQuery);


