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

	/*** Header ***/
	$('.header').each(function () {
		$(this).append('<span class="toggle"></span>');
		$('.city', this).each(function () {
			var _list = $('ul', this);
			_list.each(function () {
				$('a', this).on('click', function () {
					_list.toggleClass('open');
					$(this).closest('li').addClass('active').siblings('li.active').removeClass('active');
					return false;
				});
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
	mainClass: 'mfp-zoom-in',
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
