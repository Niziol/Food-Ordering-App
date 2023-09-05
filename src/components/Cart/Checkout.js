import { useRef } from 'react';
import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';

const isNotEmpty = (value) => value.trim() !== '';
function isValidZipCode(zipCode) {
	return /(^\d{5}$)|(^\d{2}-\d{3}$)/.test(zipCode);
}
const isValidEmail = (email) => {
	return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
};

const Checkout = (props) => {
	const {
		value: enteredName,
		isValid: nameInputIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameInputChangeHandler,
		blurHandler: nameInputBlurHandler,
		reset: nameInputReset,
	} = useInput(isNotEmpty);

	const {
		value: enteredEmail,
		isValid: emailInputIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailInputChangeHandler,
		blurHandler: emailInputBlurHandler,
		reset: emailInputReset,
	} = useInput(isValidEmail);

	const {
		value: enteredStreet,
		isValid: streetInputIsValid,
		hasError: streetInputHasError,
		valueChangeHandler: streetInputChangeHandler,
		blurHandler: streetInputBlurHandler,
		reset: streetInputReset,
	} = useInput(isNotEmpty);

	const {
		value: enteredPostalCode,
		isValid: postalCodeInputIsValid,
		hasError: postalCodeInputHasError,
		valueChangeHandler: postalCodeInputChangeHandler,
		blurHandler: postalCodeInputBlurHandler,
		reset: postalCodeInputReset,
	} = useInput(isValidZipCode);

	const {
		value: enteredCity,
		isValid: cityInputIsValid,
		hasError: cityInputHasError,
		valueChangeHandler: cityInputChangeHandler,
		blurHandler: cityInputBlurHandler,
		reset: cityInputReset,
	} = useInput(isNotEmpty);

	const confirmHandler = (event) => {
		event.preventDefault();

		nameInputBlurHandler();
		emailInputBlurHandler();
		streetInputBlurHandler();
		postalCodeInputBlurHandler();
		cityInputBlurHandler();

		const formIsValid =
			nameInputIsValid &&
			streetInputIsValid &&
			postalCodeInputIsValid &&
			emailInputIsValid &&
			cityInputIsValid;

		if (!formIsValid) {
			return;
		}

		// Submit cart dataw

		nameInputReset();
		emailInputReset();
		streetInputReset();
		postalCodeInputReset();
		cityInputReset();
	};

	const controlClasses = (hasError) => {
		return !hasError
			? `${classes.control}`
			: `${classes.control} ${classes.invalid}`;
	};

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={controlClasses(nameInputHasError)}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					value={enteredName}
					onChange={nameInputChangeHandler}
					onBlur={nameInputBlurHandler}
				/>
				{nameInputHasError && (
					<p className="error-text">You must enter correct name!</p>
				)}
			</div>
			<div className={controlClasses(emailInputHasError)}>
				<label htmlFor="email">Your Email</label>
				<input
					type="email"
					id="email"
					value={enteredEmail}
					onChange={emailInputChangeHandler}
					onBlur={emailInputBlurHandler}
				/>
				{emailInputHasError && (
					<p className="error-text">You must enter correct email!</p>
				)}
			</div>
			<div className={controlClasses(streetInputHasError)}>
				<label htmlFor="street">Street</label>
				<input
					type="text"
					id="street"
					value={enteredStreet}
					onChange={streetInputChangeHandler}
					onBlur={streetInputBlurHandler}
				/>
				{streetInputHasError && (
					<p className="error-text">You must enter correct street!</p>
				)}
			</div>
			<div className={controlClasses(postalCodeInputHasError)}>
				<label htmlFor="postal">Postal Code</label>
				<input
					type="text"
					id="postal"
					value={enteredPostalCode}
					onChange={postalCodeInputChangeHandler}
					onBlur={postalCodeInputBlurHandler}
				/>
				{postalCodeInputHasError && (
					<p className="error-text">
						You must enter correct postal code (5 characters long)!
					</p>
				)}
			</div>
			<div className={controlClasses(cityInputHasError)}>
				<label htmlFor="city">City</label>
				<input
					type="text"
					id="city"
					value={enteredCity}
					onChange={cityInputChangeHandler}
					onBlur={cityInputBlurHandler}
				/>
				{cityInputHasError && (
					<p className="error-text">You must enter correct city!</p>
				)}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
