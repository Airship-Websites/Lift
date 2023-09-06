/**
 * Rotate HTML elements into view.
 *
 * @package Lift
 * @author  Airship
 * @since   1.0.0
 *
 * @link https://www.snorkl.tv/greensock-staggers-with-seamless-loops/
 *
 * @requires gsap.js
 */

export default class Rotate {
	constructor( options ) {
		// Default settings
		this.defaults = {
			// Class used to identify container
			selector: '.js-rotate',
			// Class used to identify item
			itemSelector: '.js-rotate__item',
			// Time (seconds) to display each item
			displayTime: 7,
			// Time (seconds) to transition to next item
			transitionTime: 0.7,
		};

		// Update settings
		this.settings = { ...this.defaults, ...options };

		// Properties
		// Container elements
		this.containers = document.querySelectorAll( this.settings.selector );

		// Bail if no elements
		if ( ! this.containers ) {
			return;
		}

		this.bindThis();
		this.doRotate();
	}

	/**
	 * Bind 'this' to methods
	 *
	 * @link https://dev.to/aman_singh/why-do-we-need-to-bind-methods-inside-our-class-component-s-constructor-45bn
	 */
	bindThis() {
		// this.doRotate = this.doRotate.bind( this );
	}

	/**
	 * Do rotate
	 */
	doRotate() {
		// Loop through containers
		this.containers.forEach( ( container ) => {
			const
				// Items being rotated into view
				rotatingItems  = container.querySelectorAll( this.settings.itemSelector ),
				numItems       = rotatingItems.length,
				staggerTime    = this.settings.displayTime + this.settings.transitionTime,
				repeatDelay    = ( staggerTime * ( numItems - 1 ) ) + this.settings.displayTime,
				tl             = gsap.timeline( { repeat: -1 } );

			// Show container (initially hidden with CSS)
			gsap.set( container, { autoAlpha: 1 } );

			// Center the items
			gsap.set( rotatingItems, {
				xPercent: -50,
				yPercent: -50,
			} );

			tl.from( rotatingItems, {
				y:        70,
				duration: this.settings.transitionTime,
				opacity:  0,
				stagger: {
					each:        staggerTime,
					repeat:      -1,
					repeatDelay: repeatDelay,
				},
			} );

			tl.to( rotatingItems, {
				y:        -70,
				duration: this.settings.transitionTime,
				opacity:  0,
				stagger: {
					each:        staggerTime,
					repeat:      -1,
					repeatDelay: repeatDelay,
				},
			}, staggerTime );
		} );
	}
}
