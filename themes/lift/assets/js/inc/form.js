/**
 * Validate and process contact form.
 *
 * @package Lift
 * @author  Airship
 * @since   1.0.0
 */

export default function handleForm() {
	const form = document.querySelector('.js-form');

	// Bail if no form
	if (! form) {
		return;
	}

	const submitButton = document.querySelector('#submit');

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		if (validateForm()) {
			submitButton.disabled = true;
			sendDataToGoogleSheet(form);
		}
	});

	function validateForm() {
		let isValid = true;

		const firstNameInput = document.getElementById('firstName');
		const lastNameInput = document.getElementById('lastName');
		const emailInput = document.getElementById('email');
		const phoneInput = document.getElementById('phone');
		const honeypotInput = document.getElementById('voightKampff');

		const firstNameError = document.getElementById('firstNameError');
		const lastNameError = document.getElementById('lastNameError');
		const emailError = document.getElementById('emailError');
		const phoneError = document.getElementById('phoneError');

		firstNameError.textContent = '';
		lastNameError.textContent = '';
		emailError.textContent = '';
		phoneError.textContent = '';

		if (firstNameInput.value.trim() === '') {
			firstNameError.textContent = 'Please enter your first name';
			isValid = false;
		}

		if (lastNameInput.value.trim() === '') {
			lastNameError.textContent = 'Please enter your last name';
			isValid = false;
		}

		if (emailInput.value.trim() === '') {
			emailError.textContent = 'Please enter your email';
			isValid = false;
		} else if (! isValidEmail(emailInput.value.trim())) {
			emailError.textContent = 'Please enter a valid email';
			isValid = false;
		}

		if (phoneInput.value.trim() !== '') {
			if (! isValidPhone(phoneInput.value.trim())) {
				phoneError.textContent = 'Please enter a valid phone';
				isValid = false;
			}
		}

		if (honeypotInput.value.trim() !== '') {
			// Dummy field filled out, indicating it's likely a bot
			isValid = false;
		}

		return isValid;
	}

	function isValidEmail(email) {
		// Basic email validation regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function isValidPhone(phoneNumber) {
		// Basic phone number validation regex
		const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number format
		return phoneRegex.test(phoneNumber);
	}

	function sendDataToGoogleSheet(form) {
		const scriptURL = 'https://script.google.com/macros/s/AKfycbxlHd-89RqLy5lm7Q-0BISFLpHDL2MafNq0p_35gHIejlHsT8Ka3w3fsmZhWA-tPwsPQw/exec';
		const formData = new FormData(form);

		fetch(scriptURL, {
			method: 'POST',
			body: formData,
		})
			.then(() => {
				// Scroll to top, hide form and show confirmation message
				window.scrollTo({ top: 0 });
				document.documentElement.classList.add('form--sent');
			})
			.catch((error) => {
				alert(error);
			})
			.finally(() => {
				submitButton.disabled = false;
			});
	}
}
