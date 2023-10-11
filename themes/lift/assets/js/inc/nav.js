/**
 * Nav/menu functionality.
 *
 * @package Lift
 * @author  Airship
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

	// Insert clone at the bottom of the page
	const pageElement = document.querySelector('.page');
	pageElement.appendChild(menuToggleClone);

	// Update class names
	menuToggleClone.className = '';
	menuToggleClone.classList.add( 'nav__toggle-clone', 'js-nav__toggle-clone' );

	// Click the original when clone is clicked
	menuToggleClone.addEventListener( 'click', () => {
		menuToggle.click();
	} );
}


/**
 * Show/hide masthead on scroll
 */
export function showHideMasthead() {
	const MASTHEAD = document.querySelector( '.js-masthead' );

	// Bail if no masthead
	if ( ! MASTHEAD ) {
		return;
	}

	const
		// Settings
		CLASS_OFF = 'masthead--off', // CSS class used to style the 'off' state
		CLASS_SCROLL = 'masthead--scroll', // CSS class used to indicate page has scrolled
		BREAKPOINT = 700,
		DISTANCE_FROM_TOP = MASTHEAD.offsetHeight + 40 + 'px',
		UPDATE_MIN = 3;

	let
		updateCounter = 0,
		mm = gsap.matchMedia();

	// Taller screens only
	mm.add(`(min-height: ${BREAKPOINT}px)`, () => {

		// Show/hide masthead when scroll direction changes
		ScrollTrigger.create( {
			// Page has been scrolled past the 'start'
			onEnter: () => {
				document.documentElement.classList.add( CLASS_SCROLL );
			},
			// Page has been scrolled back to the 'start'
			onLeaveBack: () => {
				document.documentElement.classList.remove( CLASS_SCROLL );
			},
			// Note: Because onUpdate unexpectedly fires on page load, I use updateCounter and updateMin to prevent onUpdate function from firing then.
			onUpdate: ( self ) => {
				updateCounter++;

				// Downward scroll
				if ( self.direction === 1 && updateCounter > UPDATE_MIN ) {
					// Don't hide masthead if menu is currently open
					if (document.documentElement.classList.contains('nav--on')) {
						return;
					}
					// Hide masthead
					document.documentElement.classList.add( CLASS_OFF );
				// Upward scroll
				} else if ( self.direction === -1 && updateCounter > UPDATE_MIN ) {
					// Show masthead
					document.documentElement.classList.remove( CLASS_OFF );
				}
			},
			// Start when scrolled past this point
			start: DISTANCE_FROM_TOP,
		} );
	});

	// Ensure masthead is visible after window resize
	window.addEventListener('resize', () => {
		if (window.innerHeight < BREAKPOINT) {
			document.documentElement.classList.remove(CLASS_OFF);
		}
	});
}

/**
 * Show/hide site menu toggle button on scroll
 */
export function showHideMenuToggle() {
	const	MASTHEAD = document.querySelector( '.js-masthead' );

	// Bail if no masthead
	if ( ! MASTHEAD ) {
		return;
	}

	const
		// Settings
		CLASS_OFF = 'nav__toggle-clone--off',
		BREAKPOINT = 767,
		DISTANCE_FROM_TOP = MASTHEAD.offsetHeight + 'px',
		UPDATE_MIN = 3;

	let
		updateCounter = 0,
		mm = gsap.matchMedia();

	// Smaller screens only
	mm.add(`(max-width: ${BREAKPOINT}px)`, () => {

		// Hide initially
		document.documentElement.classList.add( CLASS_OFF );

		// Show/hide menu toggle when scroll direction changes
		ScrollTrigger.create( {
			// Page has been scrolled back to the 'start'
			onLeaveBack: () => document.documentElement.classList.add( CLASS_OFF ),
			// Note: Because onUpdate unexpectedly fires on page load, I use updateCounter and updateMin to prevent onUpdate function from firing then.
			onUpdate: ( self ) => {
				updateCounter++;

				// Downward scroll
				if ( self.direction === 1 && updateCounter > UPDATE_MIN ) {
					// Hide menu toggle
					document.documentElement.classList.add( CLASS_OFF );
					// Upward scroll
				} else if ( self.direction === -1 && updateCounter > UPDATE_MIN ) {
					// Show menu toggle
					document.documentElement.classList.remove( CLASS_OFF );
				}
			},
			start: DISTANCE_FROM_TOP, // Only run when scrolled past this point
		} );
	});
}

/**
 * Animate the menu toggle button on click.
 */
export function animateMenuToggle() {
	const
		// Settings
		MENU_TOGGLE = document.querySelector( '.js-nav__toggle' ),
		MENU_BAR_1  = MENU_TOGGLE.querySelector( 'rect:nth-child(1)' ),
		MENU_BAR_2  = MENU_TOGGLE.querySelector( 'rect:nth-child(2)' ),
		MENU_BAR_3  = MENU_TOGGLE.querySelector( 'rect:nth-child(3)' ),
		MENU_BAR_4  = MENU_TOGGLE.querySelector( 'rect:nth-child(4)' ),
		DURATION    = 0.4;

	// Timeline config
	const tl = gsap.timeline( {
		defaults: {
			duration: DURATION,
			ease: 'power4.inOut',
		},
		paused: true,
		reversed: true,
	} );

	// Timeline animations
	tl
		.to( MENU_BAR_1, {
			x: 14,
			y: -9,
			scaleX: 0,
		} )
		.to( MENU_BAR_4, {
			x: 14,
			y: 9,
			scaleX: 0,
		}, 0 )
		.to( MENU_BAR_2, {
			rotation: 45,
			transformOrigin: '50% 50%',
		}, 0 )
		.to( MENU_BAR_3, {
			rotation: -45,
			transformOrigin: '50% 50%',
		}, 0 );

	// Run animation on click
	MENU_TOGGLE.addEventListener( 'click', () => {
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
		// Settings
		MENU_TOGGLE       = document.querySelector( '.js-nav__toggle' ),
		MENU_TOGGLE_CLONE = document.querySelector( '.js-nav__toggle-clone' ),
		MENU              = document.querySelector( '.js-nav__menu' );

	MENU_TOGGLE.addEventListener( 'click', stopProp );
	MENU_TOGGLE_CLONE.addEventListener( 'click', stopProp );

	function stopProp( event ) {
		event.stopPropagation();
	}

	function closeMenu( event ) {
		// If menu is open then close it
		if ( ! MENU.contains( event.target ) && document.documentElement.classList.contains( 'nav--on' ) ) {
			MENU_TOGGLE.click();
		}
	}

	window.addEventListener( 'click', closeMenu );
	window.addEventListener( 'focusin', closeMenu );
}
