/**
 * Nav/menu functionality.
 *
 * @package Lift
 * @author Airship
 * @since   1.0.0
 *
 * @requires gsap.js
 */

/* Tell eslint about global variables */
/* global gsap, ScrollTrigger */

/**
 * Clone the menu toggle button.
 */
export function cloneMenuToggle() {
	const menuToggle = document.querySelector( '.js-nav__toggle' ),
		menuToggleClone = menuToggle.cloneNode( true );

	// Insert clone after original
	menuToggle.after( menuToggleClone );

	// Update class names
	menuToggleClone.className = '';
	menuToggleClone.classList.add( 'nav__toggle-clone', 'js-nav__toggle-clone' );

	// Click the original when clone is clicked
	menuToggleClone.addEventListener( 'click', () => {
		menuToggle.click();
	} );
}

/**
 * Show/hide masthead and site menu button on scroll
 */
export function toggleOnScroll() {
	const
		masthead = document.querySelector( '.js-masthead' ),
		updateMin = 3;

	let // CSS class used to style the 'off' state
		classOff,
		distanceFromTop,
		updateCounter = 0;

	// Bail if there's no elements
	if ( ! masthead ) {
		return;
	}

	// Register GSAP ScrollTrigger plugin
	gsap.registerPlugin( ScrollTrigger );

	ScrollTrigger.matchMedia( {
		// SMALL SCREEN show/hide menu toggle
		'(max-width: 767px)': function () {
			classOff = 'nav__toggle-clone--off';
			distanceFromTop = masthead.offsetHeight + 'px';

			// Hide initially
			document.documentElement.classList.add( classOff );

			// Show/hide menu toggle when scroll direction changes
			ScrollTrigger.create( {
				onLeaveBack: () => document.documentElement.classList.add( classOff ),
				onUpdate: ( self ) => {
					// Note: Because onUpdate unexpectedly fires on page load, I use updateCounter and updateMin to prevent onUpdate function from firing then.
					updateCounter++;

					// Downward scroll
					if ( self.direction === 1 && updateCounter > updateMin ) {
						document.documentElement.classList.add( classOff );
						// Upward scroll
					} else if ( self.direction === -1 && updateCounter > updateMin ) {
						document.documentElement.classList.remove( classOff );
					}
				},
				start: distanceFromTop, // Only run when scrolled past this point
			} );
		},

		// LARGE SCREEN show/hide masthead
		'(min-width: 768px)': function () {
			const classScroll = 'masthead--scroll';

			classOff = 'masthead--off';
			distanceFromTop = masthead.offsetHeight + 40 + 'px';

			// Show/hide masthead hide when scroll direction changes
			ScrollTrigger.create( {
				// Change masthead style after scroll from top
				onEnter: () => {
					document.documentElement.classList.add( classScroll );
				},
				// Revert masthead style after scroll back to top
				onLeaveBack: () => {
					document.documentElement.classList.remove( classScroll );
				},
				onUpdate: ( self ) => {
					updateCounter++;

					// Downward scroll
					if ( self.direction === 1 && updateCounter > updateMin ) {
						// Hide masthead (add class to html tag)
						document.documentElement.classList.add( classOff );
						// Upward scroll
					} else if ( self.direction === -1 && updateCounter > updateMin ) {
						// Show masthead
						document.documentElement.classList.remove( classOff );
					}
				},
				// Start when scrolled past this point
				start: distanceFromTop,
			} );
		},
	} );
}


/**
 * Animate the menu toggle button on click.
 */
export function animateMenuToggle() {
	const
		menuToggle = document.querySelector( '.js-nav__toggle' ),
		menuBar1   = menuToggle.querySelector( 'rect:nth-child(1)' ),
		menuBar2   = menuToggle.querySelector( 'rect:nth-child(2)' ),
		menuBar3   = menuToggle.querySelector( 'rect:nth-child(3)' ),
		menuBar4   = menuToggle.querySelector( 'rect:nth-child(4)' );

	// Bail if there's no element
	if ( ! menuToggle ) {
		return;
	}

	// Timeline config
	const tl = gsap.timeline( {
		defaults: {
			duration: 0.4,
			ease: 'power4.inOut',
		},
		paused: true,
		reversed: true,
	} );

	// Timeline animations
	tl
		.to( menuBar1, {
			x: 14,
			y: -9,
			scaleX: 0,
		} )
		.to( menuBar4, {
			x: 14,
			y: 9,
			scaleX: 0,
		}, 0 )
		.to( menuBar2, {
			rotation: 45,
			transformOrigin: '50% 50%',
		}, 0 )
		.to( menuBar3, {
			rotation: -45,
			transformOrigin: '50% 50%',
		}, 0 );

	// Run animation on click
	menuToggle.addEventListener( 'click', () => {
		if ( tl.reversed() ) {
			tl.play();
		} else {
			tl.reverse();
		}
	} );
}

/**
 * Toggle off site menu on any click outside the menu.
 */
export function clickOffMenu() {
	const
		menuToggle      = document.querySelector( '.js-nav__toggle' ),
		menuToggleClone = document.querySelector( '.js-nav__toggle-clone' ),
		menu            = document.querySelector( '.js-nav__menu' );

	menuToggle.addEventListener( 'click', stopProp );
	menuToggleClone.addEventListener( 'click', stopProp );

	function stopProp( event ) {
		event.stopPropagation();
	}

	function closeMenu( event ) {
		// If menu is open then close it
		if ( ! menu.contains( event.target ) && document.documentElement.classList.contains( 'nav--on' ) ) {
			menuToggle.click();
		}
	}

	window.addEventListener( 'click', closeMenu );
	window.addEventListener( 'focusin', closeMenu );
}
