import { useRef, useEffect } from 'react';
import { PopupWithForm } from "./PopupWithForm";
import { FormValidator } from "../utils/FormValidator";

export const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoad }) => {
	const avatarInputRef = useRef();
	const { values, errors, isFormValid, handleChange, resetForm } = FormValidator();

	useEffect(() => {
		resetForm();
	}, [isOpen]);

	const handleSubmit = (evt) => {
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
			isFormValid={!isFormValid}
		>
			<input
				type="url"
				id="avatar"
				name="avatar"
				placeholder="Ссылка на аватар"
				className="popup__input"
				onChange={handleChange}
				required
				value={values.avatar || ''}
				ref={avatarInputRef}
			/>
			<span
				id="error-avatar"
				className={`inputError ${errors.avatar ? `inputError_visible` : ""}`}
			>
				{errors.avatar}
			</span>
		</PopupWithForm>
	)
}

