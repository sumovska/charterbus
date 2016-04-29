/*jslint nomen: true, regexp: true, unparam: true, sloppy: true, white: true, node: true */
/*global window, console, document, $, jQuery, google */

/**
 * On document ready
 */
$(document).ready(function () {

	/** Fastclick */
	FastClick.attach(document.body);

	/*** Forms ***/
	initForms();

	/*** Ajax Popup ***/
	$('.js-ajax').magnificPopup({
		type: 'ajax'
	});

	/*** Header ***/
	$('.header').each(function () {
		var _body = $('body');
		$(this).append('<span class="toggle"></span>');
		$('.toggle', this).each(function () {
			function handler(e) {
				if (!($(e.target).hasClass('nav') || ($(e.target).closest('.nav').length > 0))) {
					_body.removeClass('nav-open');
					_body.off('click touchstart', handler);
				}
			}
			$(this).on('click', function () {
				if (_body.hasClass('nav-open')) {
					_body.off('click touchstart', handler).removeClass('nav-open');
				} else {
					_body.on('click touchstart', handler).addClass('nav-open');
				}
				return false;
			});
		});
		$('.city', this).each(function () {
			function handler(e) {
				if (!($(e.target).hasClass('dropdown') || ($(e.target).closest('.dropdown').length > 0))) {
					_this.removeClass('open');
					_body.off('click touchstart', handler);
				}
			}

			var _this = $(this), _link = $('.link', _this), _scroll = $('.scroll', _this);
			_scroll.perfectScrollbar({
				minScrollbarLength: 18,
				maxScrollbarLength: 18,
				suppressScrollX: true
			});
			_link.on('click', function (e) {
				if (_this.hasClass('open')) {
					_body.off('click touchstart', handler);
					_this.removeClass('open');
				} else {
					_body.on('click touchstart', handler);
					_this.addClass('open');
					_scroll.perfectScrollbar('update');
				}
				return false;
			});
		});
	});

	/** Google Map */
	$('.map').each(function () {
		var _map = $(this);

		/** Map initialization */
		window.mapInit = function () {
			if (typeof google != 'undefined') {
				var pos = new google.maps.LatLng(56.8302988, 60.608876);

				var map = new google.maps.Map(_map[0], {
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					center: pos,
					zoom: 14,
					scrollwheel: false,
					disableDefaultUI: true,
					backgroundColor: "#f7f1d9"
				});

				google.maps.event.addDomListener(window, 'resize', function () {
					mapCenter.call(map);
				});
				mapCenter.call(map);
			}
		};

		/** Map centering */
		window.mapCenter = function () {
			var center = this.getCenter();
			google.maps.event.trigger(this, 'resize');
			this.setCenter(center);
		};

		/** Map script */
		function init() {
			$.getScript('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&language=ru-RU&callback=mapInit');
			_map.fadeIn();
		}

		$(this).on('location', function () {
			init();
		});

		if ($(this).hasClass('open')) {
			init();
		}
	});

	/** Item carousel */
	$('.block-item').each(function () {
		$('.picture', this).each(function () {
			$('.slider-for').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				asNavFor: '.slider-nav'
			});
			$('.slider-nav').slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				asNavFor: '.slider-for',
				dots: true,
				focusOnSelect: true
			});
		});
		$('.info', this).each(function () {
			$('.text', this).perfectScrollbar({
				minScrollbarLength: 18,
				maxScrollbarLength: 18,
				suppressScrollX: true
			});
		});
	});

});

/**
 * Forms initialization
 */
function initForms(scope) {
	if (typeof scope === 'undefined') {
		scope = document;
	}
}

/**
 * Magnific Popup default settings
 */
$.extend(true, $.magnificPopup.defaults, {
	tClose: 'Закрыть (Esc)',
	tLoading: '',
	closeMarkup: '<span title="%title%" class="mfp-close"><span class="mfp-in"></span></span>',
	ajax: {tError: '<a href="%url%">Контент</a> не найден.'},
	settings: {cache: false},
	mainClass: 'mfp-fade',
	midClick: true,
	removalDelay: 300,
	autoFocusLast: false,
	preload: false,
	callbacks: {
		ajaxContentAdded: function () {
			initForms(this.container);
		}
	}
});
