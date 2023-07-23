import { Route, Routes, NavLink } from 'react-router-dom'
import headerLogo from "../images/header-logo.svg";


export const Header = ({ onExit, userEmail }) => {
	return (
		<header className="header page__header">
			<img
				src={headerLogo}
				alt="Логотип место"
				className="header__logo"
			/>
			<Routes>
				<Route path="/sign-in" element={
					<NavLink to="/sign-up" className="header__link">Регистрация</NavLink>
				}
				/>

				<Route path="/sign-up" element={
					<NavLink to="/sign-in" className="header__link">Войти</NavLink>
				}
				/>

				<Route
					path="/"
					element={
						<nav className="header__nav">
							<p className="header__email">{userEmail}</p>
							<NavLink
								to="/sign-in"
								className="header__link header__link_color_grey"
								onClick={onExit}
							>
								Выйти
							</NavLink>
						</nav>
					}
				/>
			</Routes>
		</header>
	)
}