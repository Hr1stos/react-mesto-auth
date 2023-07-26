import { useEffect } from 'react'

export const PopupWithForm = ({ name, title, form, children, buttonText, isOpen, onClose, onSubmit, isFormValid }) => {
	useEffect(() => {
		if (!isOpen) return

		const handleESC = (evt) => {
			if (evt.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', handleESC)

		return () => document.removeEventListener('keydown', handleESC)
	}, [isOpen, onClose])

	return (
		<div
			className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`}
			onClick={onClose}
		>
			<div className="popup__container" onClick={(evt) => evt.stopPropagation()}>
				<button
					aria-label="Закрыть"
					type="button"
					className="popup__close-button"
					onClick={onClose}
				/>
				<h2 className="popup__title">
					{title}
				</h2>
				<form
					name={name}
					className={`popup__form form popup__form_type_${form}`}
					noValidate
					onSubmit={onSubmit}
				>
					{children}
					<button
						type="submit"
						className={`popup__submit-button ${isFormValid ? "popup__submit-button_disabled" : ""}`}
						onSubmit={onSubmit}
						disabled={isFormValid}
					>
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	)
}