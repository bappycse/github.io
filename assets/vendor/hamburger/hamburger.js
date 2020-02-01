( function( $ ) {

	$(document).ready(function () {
		var trigger = $('.hamburger'),
			overlay = $('.overlay'),
			isClosed = false;

		trigger.click(function () {
			hamburger_cross();
		});

		function hamburger_cross() {

			if (isClosed == true) {
				overlay.hide();
				trigger.removeClass('is-open');
				trigger.addClass('is-closed');
				$('body').removeClass('body-overflow');

				isClosed = false;
			} else {
				overlay.show();
				trigger.removeClass('is-closed');
				trigger.addClass('is-open');
				$('body').addClass('body-overflow');
				isClosed = true;
			}
		}

		$('[data-toggle="offcanvas"]').click(function () {
			$('#page').toggleClass('toggled');
		});

	});

} )( jQuery );
