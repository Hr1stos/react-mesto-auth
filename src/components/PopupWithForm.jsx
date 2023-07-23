import { useEffect } from 'react'

export const PopupWithForm = ({ name, title, form, children, buttonText, isOpen, onClose, onSubmit }) => {
	useEffect(() => {
		if (!isOpen) return

		function handleESC(e) {
			if (e.key === 'Escape') {
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
			<div className="popup__container" onClick={(e) => e.stopPropagation()}>
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
					className={`popup__form popup__form_type_${form}`}
					onSubmit={onSubmit}
				>
					{children}
					<button
						type="submit"
						className="popup__submit-button"
					>
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	)
}