/**
 * Toggle FAQs.
 *
 * @package Lift
 * @author  Airship
 * @since   1.0.0
 */

export default class FAQ {
	constructor() {
		// Select all faq entries
		this.faqs = document.querySelectorAll('.faq__entry');

		// Bail if there are no faq entries
		if (! this.faqs.length) {
			return;
		}

		// Initialize the faq component
		this.init();
	}

	// Initialize the faq component
	init() {
		// Loop through each faq entry
		this.faqs.forEach((faq) => {
			// Add a click event listener to toggle the faq entry
			faq.addEventListener('click', this.toggleFAQ.bind(this, faq));
		});
	}

	// Toggle the faq entry
	toggleFAQ(faq) {
		// Toggle the 'faq__entry--on' class when the faq entry is clicked
		faq.classList.toggle('faq__entry--on');
	}
}
