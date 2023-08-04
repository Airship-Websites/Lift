/**
 * Popup (overlay) script.
 *
 * @requires jquery.js
 * @requires jquery.ba-throttle-debounce.js
 */

jQuery( document ).ready( function( $ ) {

	var popup = ( function() {

		var
			$html = $( 'html' ),
			// Toggle button
			$popupButton = $( '[ data-popup="button" ]' ),
			popupID = null,
			mobilePopupIDs = [ 'site-menu__container' ],
			screenWidthBreakPoint = 817;

		/**
		 * Check if popup is open
		 */
		var isPopupOpen = function() {
			return $html.hasClass( popupID + '-open' );
		};

		/**
		 * Close popup
		 */
		var closePopup = function() {

			$html.removeClass( popupID + '-open popup-open' );

			$( '#' + popupID )
				.removeClass( 'popup--open' )
				.trigger( 'popup:close' );

			$( window ).off( 'resize.popup' );

		};

		/**
		 * Open popup
		 * @uses jquery.ba-throttle-debounce.js
		 */
		var openPopup = function() {

			$html.addClass( popupID + '-open popup-open' );

			$( '#' + popupID )
				.addClass( 'popup--open' )
				.trigger( 'popup:open' );

			$( window ).on( 'resize.popup', $.throttle( 500, closeOnResize ) );

		};

		/**
		 * Toggle popup
		 */
		var togglePopup = function( e ) {

			// If touch event (mobile), prevent click event
			// if( e.type == 'touchstart' ) {
			// 	e.stopImmediatePropagation();
			// 	e.preventDefault();
			// }

			// Close popup
			if ( isPopupOpen() ) {
				closePopup();

			// Open popup
			} else {
				popupID = $( this ).attr( 'aria-controls' );
				openPopup();
			}

		};

		/**
		 * Set popup and related elements
		 */
		var setPopup = function() {

			// Toggle popup open/close on popup button touch (mobile)
			// $popupButton.on( 'touchstart pointerdown', togglePopup );

			// Toggle popup open/close on popup button click
			$popupButton.on( 'click', togglePopup );


			// Close popup on 'ESC' key press
			$( document ).on( 'keydown', function( e ) {
				if ( 27 === e.which ) {
					closePopup();
				}
			} );

		};

		/**
		 * Close popup if screen exceeds a certain width.
		 */
		var closeOnResize = function() {
			if ( getScreenWidth() > screenWidthBreakPoint ) {
				if ( mobilePopupIDs.includes( popupID ) ) {
					closePopup();
				}
			}
		};

		/**
		 * Get screen width.
		 *
		 * @return integer Screen width.
		 */
		var getScreenWidth = function() {
			return $( window ).width();
		};

		/**
		 * Initialize popup functionality
		 */
		var init = function() {

			// Set popup and related elements
			$( document ).ready( setPopup );

		};

		// Public API
		return {
			init: init,
		};

	} )();

	// Initialize popup functionality
	popup.init();

} );
