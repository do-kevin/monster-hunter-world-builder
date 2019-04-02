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
					>
						{({ values, handleSubmit, handleChange, isSubmitting }) => (
							<form className="loginContainer__form" onSubmit={handleSubmit}>
								<div style={{ textAlign: 'left' }}>
									<label>First name</label>
									<input
										type="text"
										name="firstName"
										onChange={handleChange}
										value={values.firstName}
										className="loginContainer__form__input"
									/>
								</div>
								<div style={{ textAlign: 'left' }}>
									<label>Last name</label>
									<input
										type="text"
										name="lastName"
										onChange={handleChange}
										value={values.lastName}
										className="loginContainer__form__input"
									/>
								</div>
								<div style={{ textAlign: 'left' }}>
									<label>Email</label>
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
					</Formik>
				</main>
			</div>
		);
	}
}

export default LoginModal;
