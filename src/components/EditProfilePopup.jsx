import { useContext, useState, useEffect } from 'react';
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoad }) => {
	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);

	function handleSubmit(evt) {
		evt.preventDefault();

		onUpdateUser({
			name,
			about: description,
		});
	}

	function handleNameChange(evt) {
		setName(evt.target.value);
	}

	function handleDescriptionChange(evt) {
		setDescription(evt.target.value);
	}

	return (
		<PopupWithForm
			name="profile"
			title="Редактировать профиль"
			buttonText={isLoad ? 'Сохранение...' : 'Сохранить'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				id="name"
				name="name"
				placeholder="Имя"
				className="popup__input popup__input_type_name"
				required
				minLength="2"
				maxLength="40"
				value={name || ""}
				onChange={handleNameChange}
			/>
			<span id="error-name" className="popup__error"></span>
			<input
				type="text"
				id="about"
				name="about"
				placeholder="О себе"
				className="popup__input popup__input_type_about"
				required
				minLength="2"
				maxLength="200"
				value={description || ""}
				onChange={handleDescriptionChange}
			/>
			<span id="error-about" className="popup__error"></span>
		</PopupWithForm>
	)
}