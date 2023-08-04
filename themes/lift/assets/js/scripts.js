/**
 * Load javascript modules and run scripts.
 *
 * @package Base
 * @author  Clay Teller
 * @since   1.0.0
 */

import {
	kenBurnsEffect
} from 'js/inc/animate.js';
import FAQ from 'js/inc/faq.js';
import Toggle from 'js/inc/toggle';
import * as Nav from 'js/inc/nav';

( function () {

	// Animations
	kenBurnsEffect();

	// FAQ toggle
	const faq = new FAQ();

	// Nav toggle
	const toggle = new Toggle( {
		triggerClass: 'js-nav__toggle',
	} );

	// Nav
	Nav.cloneMenuToggle();
	Nav.toggleOnScroll();
	Nav.animateMenuToggle();
	Nav.clickOffMenu();
} )();
