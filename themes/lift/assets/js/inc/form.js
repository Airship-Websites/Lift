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

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		if (validateForm()) {
			const formData = new FormData(form);

			fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(formData).toString(),
			})
				.then(() => {
					// Scroll to top, hide form and show confirmation message
					window.scrollTo({ top: 0 });
					document.documentElement.classList.add( 'form--sent' );
				})
				.catch((error) => alert(error));
		}
	});

	function validateForm() {
		let isValid = true;

		const firstNameInput = document.getElementById('firstName');
		const lastNameInput = document.getElementById('lastName');
		const emailInput = document.getElementById('email');
		const phoneInput = document.getElementById('phone');

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

	function sendToHubSpot(data) {
		console.log(data);
		// Implement your code to send data to HubSpot CRM
		// Example: You can use fetch API or an AJAX request to send data to your server-side code that interacts with HubSpot CRM API.
		// Make sure you have the necessary authentication and endpoint setup to send data to HubSpot CRM.
	}

}
