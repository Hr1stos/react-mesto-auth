import { useRef } from 'react';
import { FormValidator } from "../utils/FormValidator";


export const Login = ({ onLogin }) => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const { values, errors, isFormValid, handleChange } = FormValidator();

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onLogin({
			email: emailInputRef.current.value,
			password: passwordInputRef.current.value
		});
	}

	return (
		<section className="login">
			<h2 className="login__title">Вход</h2>
			<form
				className="login__form form"
				onSubmit={handleSubmit}
				noValidate
			>
				<input
					type="email"
					name="email"
					className="login__input"
					placeholder="Email"
					required
					value={values.email || ''}
					onChange={handleChange}
					ref={emailInputRef}
				/>
				<span
					id="error-email"
					className={`inputError ${errors.email ? `inputError_visible` : ""}`}
				>
					{errors.email}
				</span>
				<input
					type="password"
					name="password"
					className="login__input"
					placeholder="Пароль"
					minLength="4"
					required
					value={values.password || ''}
					onChange={handleChange}
					ref={passwordInputRef}
				/>
				<span
					id="error-password"
					className={`inputError ${errors.password ? `inputError_visible` : ""}`}
				>
					{errors.password}
				</span>
				<button
					type="submit"
					className={`login__submit-button ${!isFormValid ? "login__submit-button_disabled" : ""}`}
					disabled={!isFormValid}
				>
					Войти
				</button>
			</form>
		</section>
	);
}
