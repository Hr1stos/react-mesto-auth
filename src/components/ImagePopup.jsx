import { useEffect } from 'react'

export const ImagePopup = ({ card, isOpen, onClose }) => {
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
			className={`popup popup_type_image
		${isOpen ? "popup_opened" : ""}`}
			onClick={onClose}
		>
			<figure className="popup__container-image" onClick={(e) => e.stopPropagation()}>
				<button
					aria-label="Закрыть"
					type="button"
					className="popup__close-button"
					onClick={onClose}
				></button>
				<img
					src={card.link}
					alt={card.name}
					className="popup__img"
				/>
				<figcaption className="popup__caption">
					{card.name}
				</figcaption>
			</figure>
		</div>
	)
}