import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { EditProfilePopup } from "./EditProfilePopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { ImagePopup } from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from '../utils/Api';
import * as authApi from "../utils/authApi";
import { Login } from "./Login";
import { Register } from "./Register";
import { ProtectedRoute } from "./ProtectedRoute";
import { InfoTooltip } from "../components/InfoTooltip";


const App = () => {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({})
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	const [isLoading, setIsLoading] = useState('')
	const [loggedIn, setLoggedIn] = useState(false);
	const [userData, setUserData] = useState('');
	const [isInfoTooltipStatus, setIsInfoTooltipStatus] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		Promise.all([api.getDataUser(), api.getDataCards()])
			.then(([data, cards]) => {
				setCurrentUser(data);
				setCards(cards);
			})
			.catch((err) => {
				console.log(`Promise.all - ошибка: ${err}`);
			});
	}, [])

	useEffect(() => {
		handleTokenCheck();
	}, [])

	const handleCardClick = (card) => {
		setSelectedCard(card);
		setIsImagePopupOpen(true)
	}

	const closeAllPopups = () => {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsImagePopupOpen(false);
		setIsInfoTooltipOpen(false);
		setSelectedCard({});
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some((i) => i._id === currentUser._id);
		api
			.changeLikeCardStatus(card._id, isLiked)
			.then((newCard) => {
				setCards((state) =>
					state.map((c) => (c._id === card._id ? newCard : c))
				);
			})
			.catch((err) => {
				console.log(`handleCardLike - ошибка: ${err}`);
			});
	}

	function handleCardDelete(card) {
		const isOwn = card._id === currentUser._id;
		api
			.deleteCard(card._id, !isOwn)
			.then(() => {
				setCards((state) => state.filter((res) => res._id !== card._id));
			})
			.catch((err) => {
				console.log(`handleCardDelete - ошибка: ${err}`);
			});
	}

	function handleUpdateUser({ name, about }) {
		setIsLoading(true)
		api
			.setDataUser({ name, about })
			.then((userData) => {
				setCurrentUser(userData);
				closeAllPopups();
				setIsLoading(false)
			})
			.catch((err) => {
				console.log(`handleUpdateUser - ошибка: ${err}`);
			});
	}

	function handleUpdateAvatar({ avatar }) {
		setIsLoading(true)
		api
			.setUserAvatar({ avatar })
			.then((userAvatar) => {
				setCurrentUser(userAvatar);
				closeAllPopups();
				setIsLoading(false)
			})
			.catch((err) => {
				console.log(`handleUpdateAvatar - ошибка: ${err}`);
			});
	}

	function handleAddPlaceSubmit({ name, link }) {
		setIsLoading(true)
		api
			.addNewCard({ name, link })
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
				setIsLoading(false)
			})
			.catch((err) => {
				console.log(`handleAddPlaceSubmit - ошибка: ${err}`);
			});
	}

	const handleTokenCheck = () => {
		const jwt = localStorage.getItem('jwt');
		if (!jwt) {
			return;
		}
		authApi
			.getContent(jwt)
			.then((data) => {
				setUserData(data.data.email);
				setLoggedIn(true);
				navigate("/");
			})
			.catch((err) => {
				console.log(`handleTokenCheck - ошибка: ${err}`)
			});
	};

	const onRegister = ({ email, password }) => {
		authApi
			.registration({ email, password })
			.then((data) => {
				if (data) {
					setIsInfoTooltipStatus(true);
					navigate('/sign-in');
				}
			})
			.catch((err) => {
				console.log(`onRegister - ошибка: ${err}`);
			})
			.finally(setIsInfoTooltipOpen(true))
	}
	const onLogin = ({ email, password }) => {
		authApi
			.authorization({ email, password })
			.then((data) => {
				if (data.token) {
					localStorage.setItem('jwt', data.token);
					setLoggedIn(true);
					setUserData(email);
					navigate('/');
				}
			})
			.catch((err) => {
				setIsInfoTooltipStatus(false);
				setIsInfoTooltipOpen(true);
				console.log(`onRegister - ошибка: ${err}`);
			})
	}

	const onExit = () => {
		localStorage.removeItem('jwt');
		setLoggedIn(false);
		navigate('/sign-in');
		setUserData('');
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="App">
				<div className="page">
					<div className="page__container">
						<Header
							onExit={onExit}
							userEmail={userData}
						/>

						<Routes>
							<Route
								path="/"
								element={
									<ProtectedRoute
										element={Main}
										loggedIn={loggedIn}
										onEditProfile={setIsEditProfilePopupOpen}
										onAddPlace={setIsAddPlacePopupOpen}
										onEditAvatar={setIsEditAvatarPopupOpen}
										onCardClick={handleCardClick}
										onCardLike={handleCardLike}
										onCardDelete={handleCardDelete}
										cards={cards}
									/>
								}
							/>

							<Route
								path="/sign-in"
								element={
									<Login
										onLogin={onLogin}
									/>
								}
							/>

							<Route
								path="/sign-up"
								element={
									<Register
										onRegister={onRegister}
									/>
								}
							/>

							<Route
								path="*"
								element={
									<Navigate
										to="/"
										replace
									/>
								}
							/>

						</Routes>

						<Footer />

						{/****PopupProfile****/}
						<EditProfilePopup
							isOpen={isEditProfilePopupOpen}
							onClose={closeAllPopups}
							onUpdateUser={handleUpdateUser}
							isLoad={isLoading}
						/>

						{/****PopupAdd****/}
						<AddPlacePopup
							isOpen={isAddPlacePopupOpen}
							onClose={closeAllPopups}
							onAddPlace={handleAddPlaceSubmit}
							isLoad={isLoading}
						/>

						{/****PopupAvatar****/}
						<EditAvatarPopup
							isOpen={isEditAvatarPopupOpen}
							onClose={closeAllPopups}
							onUpdateAvatar={handleUpdateAvatar}
							isLoad={isLoading}
						/>

						{/****PopupImage****/}
						<ImagePopup
							card={selectedCard}
							isOpen={isImagePopupOpen}
							onClose={closeAllPopups}
						/>

						{/****PopupInfoTooltip****/}
						<InfoTooltip
							isOpen={isInfoTooltipOpen}
							onClose={closeAllPopups}
							isSuccess={isInfoTooltipStatus}
						/>

						{/*<div class="popup popup_type_delete">
						<div class="popup__container">
							<button aria-label="Закрыть" type="button"
								class="popup__close-button"></button>
							<h2 class="popup__title popup__title_type_delete">Вы уверены?</h2>
							<form name="popup-form" class="popup__form popup__form_type_delete">
								<button type="submit" class="popup__submit-button popup__submit-button_type_delete">Да</button>
							</form>
						</div>
					</div>*/}
					</div>
				</div>
			</div >
		</CurrentUserContext.Provider>
	);
}

export default App;