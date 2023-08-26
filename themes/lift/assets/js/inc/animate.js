/**
 * Animation javascript.
 *
 * @package Lift
 * @author  Airship
 * @since   1.0.0
 *
 * @requires gsap.js
 * @requires scrolltrigger.js
 */

/* Tell eslint about global variables */
/* global gsap, ScrollTrigger */

/**
 * Ken Burns effect on image when it's scrolled into view.
 */
export const kenBurnsEffect = (options = {}) => {
	const {
		// Default settings
		selector = '.js-kbe',
		zoomedOut = '112%',
		duration = 7,
	} = options;

	const elements = document.querySelectorAll(selector);

	// Bail if there are no elements
	if (! elements.length) {
		return;
	}

	let mm = gsap.matchMedia();

	elements.forEach(element => {
		mm.add( '(min-width: 992px)', () => {

			gsap.fromTo( element, {
				backgroundSize: zoomedOut,
			}, {
				backgroundSize: '100%',
				duration: duration,
				scrollTrigger: {
					trigger: element,
					start: 'top bottom',
					end: 'bottom top',
					toggleActions: 'play reset play reset',
				},
			} );
		} );
	});
};
