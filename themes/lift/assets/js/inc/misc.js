/**
 * Misc scripts.
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
 * Toggle FAQs.
 */
export const toggleFaqs = () => {
	const faqs = document.querySelectorAll('.faq__entry');

	// Bail if no FAQs
	if (! faqs.length) {
		return;
	}

	faqs.forEach((faq) => {
		faq.addEventListener('click', () => {
			faq.classList.toggle('faq__entry--on');
		});
	});
};

/**
 * Ken Burns effect on image when it's scrolled into view.
 */
export const kenBurnsEffect = (options = {}) => {
	const {
		// Settings
		SELECTOR = '.js-kbe', // Element with background image
		ZOOMED_OUT = '110%', // Initial zoom out
		DURATION = 9, // Duration of animation
	} = options;

	const elements = document.querySelectorAll(SELECTOR);

	// Bail if no elements
	if (! elements.length) {
		return;
	}

	let mm = gsap.matchMedia();

	elements.forEach(element => {
		mm.add( '(min-width: 992px)', () => {

			gsap.fromTo( element, {
				backgroundSize: ZOOMED_OUT,
			}, {
				backgroundSize: '100%',
				duration: DURATION,
				scrollTrigger: {
					trigger: element,
					start: 'top bottom',
					end: 'bottom top',
					toggleActions: 'play',
				},
			} );
		} );
	});
};

/**
 * Pin element on scroll.
 */
export const pin = (options = {}) => {
	const {
		// Settings
		SELECTOR = '.js-pin', // Element to pin
		PIN_OFFSET = 40, // Offset from top of viewport
	} = options;

	const elements = document.querySelectorAll(SELECTOR);

	// Bail if no elements
	if (! elements.length) {
		return;
	}

	elements.forEach(element => {
		ScrollTrigger.create({
			trigger: element,
			start: `top +=${PIN_OFFSET}`,
			pin: true,
		});
	});
};
