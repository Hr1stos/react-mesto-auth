import { useRef, useEffect } from 'react';
import { PopupWithForm } from "./PopupWithForm";

export const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoad }) => {
	const avatarInputRef = useRef();

	useEffect(() => {
		avatarInputRef.current.value = "";
	}, [isOpen]);

	function handleSubmit(evt) {
		evt.preventDefault();

		onUpdateAvatar({
			avatar: avatarInputRef.current.value,
		});
	}

	return (
		<PopupWithForm
			name="avatar"
			title="Обновить аватар"
			buttonText={isLoad ? 'Сохранение...' : 'Сохранить'}
			form="avatar"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				type="url"
				id="avatar"
				name="avatar"
				placeholder="Ссылка на аватар"
				className="popup__input"
				required
				ref={avatarInputRef}
			/>
			<span id="error-avatar" className="popup__error"></span>
		</PopupWithForm>
	)
}

