/**
 * Toggle FAQs.
 *
 * @package Base
 * @author  Clay Teller
 * @since   1.0.0
 */

export default class FAQ {
	constructor() {
		// FAQs
		this.faqs = document.querySelectorAll( '.faq__entry' );

		// Bail if there's no FAQs
		if ( ! this.faqs ) {
			return;
		}

		this.bindThis();
		this.activate();
	}

	/**
	 * Bind 'this' to methods
	 *
	 * @link https://dev.to/aman_singh/why-do-we-need-to-bind-methods-inside-our-class-component-s-constructor-45bn
	 */
	bindThis() {
		this.doToggle = this.doToggle.bind( this );
	}

	/**
	 * Activate FAQs
	 */
	activate() {
		// Loop through FAQs
		this.faqs.forEach( ( faq ) => {
			// Toggle the FAQ on click
			faq.addEventListener( 'click', this.doToggle );
		} );
	}

	/**
	 * Do toggle
	 */
	doToggle( event ) {
		const
			// FAQ when clicked
			clickedFAQ = event.currentTarget,
			// CSS class used to style the 'on' state
			onClass = 'faq__entry--on';

		// Off (remove class from html tag)
		if ( clickedFAQ.classList.contains( onClass ) ) {
			clickedFAQ.classList.remove( onClass );

		// On (add class to html tag)
		} else {
			clickedFAQ.classList.add( onClass );
		}
	}
}
