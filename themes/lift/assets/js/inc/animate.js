/**
 * Animation javascript.
 *
 * @package Lift
 * @author Airship
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
export const kenBurnsEffect = () => {
	const element = document.querySelector( '.js-kbe' );

	// Bail if there's no element
	if ( ! element ) {
		return;
	}

	let mm = gsap.matchMedia();

	mm.add( '(min-width: 992px)', () => {

		gsap.fromTo( element, {
			backgroundSize: '120%',
		}, {
			backgroundSize: '100%',
			duration: 7,
			scrollTrigger: {
				trigger: element,
				start: 'top bottom',
				end: 'bottom top',
				toggleActions: 'play reset play reset',
			},
		} );
	} );
};
