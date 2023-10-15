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
 * Ken Burns effect on background image when it's scrolled into view.
 */
export const kenBurnsEffect = (options = {}) => {
	const {
		// Settings
		SELECTOR = '.js-kbe', // Element with background image
		SCALE = 1.1, // Initial zoom out
		DURATION = 9, // Duration of animation
	} = options;

	const elements = document.querySelectorAll(SELECTOR);

	// Bail if no elements
	if (! elements.length) {
		return;
	}

	Array.from(elements).forEach(element => {
		const
			backgroundImageCSS = getComputedStyle(element).backgroundImage,
			backgroundImage = backgroundImageCSS.replace(/url\(['"]?(.*?)['"]?\)/i, '$1'),
			newContainer = document.createElement('div'),
			newImage = document.createElement('img');

		newImage.src = backgroundImage;

		Object.assign(element.style, {
			position: 'relative',
			zIndex: 1,
		});

		Object.assign(newContainer.style, {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			zIndex: -1,
			overflow: 'hidden',
		});

		Object.assign(newImage.style, {
			objectFit: 'cover',
			height: '100%',
			width: '100%',
		});

		// Remove the background image from the target element
		element.style.backgroundImage = 'none';

		// Append the background container to the target element
		element.append(newContainer);
		newContainer.append(newImage);

		// Animate the background container
		gsap.from(newImage, {
			duration: DURATION,
			scale: SCALE,
			scrollTrigger: {
				trigger: newImage,
				start: 'top bottom',
			},
		});
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
