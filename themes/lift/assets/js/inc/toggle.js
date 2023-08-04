/**
 * Toggle an element off/on.
 *
 * @package Blueprint
 * @author  Clay Teller
 * @since   1.0.0
 */

export default class Toggle {
	constructor( options ) {
		// Default settings
		this.defaults = {
			// Class used to identify toggle trigger
			triggerClass:  'js-toggle',
		};

		// Update settings
		this.settings = { ...this.defaults, ...options };

		// Properties
		// Trigger elements
		this.triggers = document.querySelectorAll( `.${ this.settings.triggerClass }` );

		// Bail if there's no elements
		if ( ! this.triggers ) {
			return;
		}

		this.bindThis();
		this.activateTriggers();
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
	 * Activate triggers
	 */
	activateTriggers() {
		// Loop through triggers
		this.triggers.forEach( ( trigger ) => {
			// Toggle the target element on click
			trigger.addEventListener( 'click', this.doToggle );
		} );
	}

	/**
	 * Do toggle
	 */
	doToggle( event ) {
		const
			// Trigger element
			trigger     = event.currentTarget,
			// Target class (stored in 'data-target' attribute)
			targetClass = trigger.dataset.target,
			// CSS class used to style the 'on' state (remove 'js-' from beginning)
			onClass     = targetClass.slice( 3 ) + '--on';

		// Toggle the target element
		// Off (remove class from html tag)
		if ( document.documentElement.classList.contains( onClass ) ) {
			document.documentElement.classList.remove( onClass );

		// On (add class to html tag)
		} else {
			document.documentElement.classList.add( onClass );
		}
	}
}
