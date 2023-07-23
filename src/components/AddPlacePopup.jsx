import { useRef, useEffect } from 'react';
import { PopupWithForm } from "./PopupWithForm";

export const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoad }) => {
	const nameInputRef = useRef();
	const linkInputRef = useRef();

	useEffect(() => {
		nameInputRef.current.value = "";
		linkInputRef.current.value = "";
	}, [isOpen]);

	function handleSubmit(evt) {
		evt.preventDefault();

		onAddPlace({
			name: nameInputRef.current.value,
			link: linkInputRef.current.value,
		});
	}

	return (
		<PopupWithForm
			name="add"
			title="Новое место"
			buttonText={isLoad ? 'Создание...' : 'Создать'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				id="text"
				name="name"
				placeholder="Название"
				className="popup__input"
				required
				minLength="2"
				maxLength="30"
				ref={nameInputRef}
			/>
			<span id="error-text" className="popup__error"></span>
			<input
				type="url"
				id="link"
				name="link"
				placeholder="Ссылка на картинку"
				className="popup__input"
				required
				ref={linkInputRef || ""}
			/>
			<span id="error-link" className="popup__error"></span>
		</PopupWithForm>
	)
}