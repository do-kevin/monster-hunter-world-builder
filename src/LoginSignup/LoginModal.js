import React, { Component } from 'react';
import { registerEmail } from './RegistrationAPI';
import { Formik } from 'formik';

class LoginModal extends Component {
	render() {
		return (
			<div>
				<main className="loginContainer">
					<h1>Sign Up</h1>
					<Formik
						initialValues={{ email: '', firstName: '', lastName: '' }}
						onSubmit={(values) => registerEmail(values.email)}
						validate={({ firstName, lastName, email }) => {
							let errors = {};
							if (!firstName) {
								errors.firstName = <span className='loginContainer__form__errorMessage'>{' '}required</span>;
							} else if (!lastName) {
								errors.lastName = <span className='loginContainer__form__errorMessage'>{' '}required</span>;
							} else if (!email) {
								errors.email = <span className='loginContainer__form__errorMessage'>{' '}required</span>;
							} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
								errors.email = <span className='loginContainer__form__errorMessage'>{' '}invalid email</span>;
							}
							return errors;
						}}
						render={({ values, handleSubmit, handleChange, isSubmitting, errors }) => (
							<form className="loginContainer__form" onSubmit={handleSubmit}>
								<div style={{ textAlign: 'left' }}>
									<label>First name {errors.firstName}</label>
									<input
										type="text"
										name="firstName"
										onChange={handleChange}
										value={values.firstName}
										className="loginContainer__form__input"
									/>
								</div>
								<div style={{ textAlign: 'left' }}>
									<label>Last name {errors.lastName}</label>
									<input
										type="text"
										name="lastName"
										onChange={handleChange}
										value={values.lastName}
										className="loginContainer__form__input"
									/>
								</div>
								<div style={{ textAlign: 'left' }}>
									<label>Email {errors.email}</label>
									<input
										type="email"
										name="email"
										onChange={handleChange}
										value={values.email}
										className="loginContainer__form__input"
									/>
								</div>
								<button
									type="submit"
									disabled={isSubmitting}
									className="loginContainer__registerEmail-btn"
								>
									Register Email
								</button>
							</form>
						)}
					/>
				</main>
			</div>
		);
	}
}

export default LoginModal;
