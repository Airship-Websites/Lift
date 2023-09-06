/**
 * Load javascript modules and run scripts.
 *
 * @package Lift
 * @author  Airship
 * @since   1.0.0
 */

/* Tell eslint about global variables */
/* global gsap, ScrollTrigger */

gsap.registerPlugin(ScrollTrigger);

import Toggle from 'js/inc/toggle';
import Rotate from 'js/inc/rotate';
import * as Nav from 'js/inc/nav';
import { toggleFaqs, kenBurnsEffect, pin } from 'js/inc/misc.js';

( function () {

	// Toggle nav
	const toggle = new Toggle( {
		triggerSelector: '.js-nav__toggle',
	} );

	// Rotate testimonials
	const rotateTestimonials = new Rotate( {
		selector: '.js-rotate--testimonials',
		displayTime:    14,
	} );

	// Nav
	Nav.cloneMenuToggle();
	Nav.showHideMasthead();
	Nav.showHideMenuToggle();
	Nav.animateMenuToggle();
	Nav.clickOffMenu();

	// Toggle FAQ
	toggleFaqs();

	// Animations
	kenBurnsEffect();

	// Pin
	pin();

} )();
