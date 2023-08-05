/**
 * Load javascript modules and run scripts.
 *
 * @package Lift
 * @author Airship
 * @since   1.0.0
 */

import Toggle from 'js/inc/toggle';
import Rotate from 'js/inc/rotate';
import * as Nav from 'js/inc/nav';
import FAQ from 'js/inc/faq.js';
import { kenBurnsEffect } from 'js/inc/animate.js';

( function () {

	// Toggle FAQ
	const faq = new FAQ();

	// Toggle nav
	const toggle = new Toggle( {
		triggerClass: 'js-nav__toggle',
	} );

	// Rotate testimonials
	const rotateTestimonials = new Rotate( {
		containerClass: 'js-rotate--testimonials',
		displayTime:    14,
	} );

	// Nav
	Nav.cloneMenuToggle();
	Nav.toggleOnScroll();
	Nav.animateMenuToggle();
	Nav.clickOffMenu();

	// Animations
	kenBurnsEffect();

} )();
