import React, { Component } from 'react';
import { registerEmail } from './RegistrationAPI';
import { Formik } from 'formik';

class LoginModal extends Component {
	state = {
		email: ''
	};

	createUser = () => {
		return registerEmail(this.state.email);
	};

	render() {
		return (
			<div>
				<main className="loginContainer">
					<h1>Sign Up</h1>
					<Formik
						initialValues={{ email: '' }}
						onSubmit={(values) => {
							this.setState(() => ({
								email: values.email
							}));
							return registerEmail(this.state.email);
						}}
					>
						{({ values, handleSubmit, handleChange, isSubmitting }) => (
							<form className="loginContainer__form" onSubmit={handleSubmit}>
								<input
									type="email"
									name="email"
									onChange={handleChange}
									value={values.email}
									className="loginContainer__form__input"
								/>
								<button
									type="submit"
									disabled={isSubmitting}
									className="loginContainer__registerEmail-btn"
								>
									Register Email
								</button>
							</form>
						)}
					</Formik>
				</main>
			</div>
		);
	}
}

export default LoginModal;
