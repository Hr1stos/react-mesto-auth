import { useState } from 'react';


export const Login = ({ onLogin }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onLogin({ email, password });
	}

	return (
		<section className="login">
			<h2 className="login__title">Вход</h2>
			<form
				className="login__form"
				onSubmit={handleSubmit}
				>
				<input
					type="email"
					className="login__input"
					placeholder="Email"
					required
					value={email || ''}
					onChange={({ target: { value } }) => setEmail(value)}
				/>
				<span id="error-login" className="popup__error"></span>
				<input
					type="password"
					className="login__input"
					placeholder="Пароль"
					minLength="4"
					required
					value={password || ''}
					onChange={({ target: { value } }) => setPassword(value)}
				/>
				<span id="error-login" className="popup__error"></span>
				<button
					type="submit"
					className="login__submit-button">
					Войти
				</button>
			</form>
		</section>
	);
}