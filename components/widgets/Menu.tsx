import Link from "next/link"
import { type FC } from "react"

interface Props {
	isOpen: boolean
	onClose: () => void
}

const Menu: FC<Props> = ({ isOpen, onClose }) => {
	if (!isOpen) return null

	return (
		<div className="md:hidden border-t border-border bg-card">
			<div className="wrapper py-8 flex flex-col gap-4">
				<Link
					className="px-4 py-2 rounded-full text-sm font-semibold transition-colors text-foreground hover:bg-muted text-center"
					href="/"
					onClick={onClose}
				>
					Главная
				</Link>
				<Link
					className="px-4 py-2 rounded-full text-sm font-semibold transition-colors bg-primary text-primary-foreground text-center"
					href="/add"
					onClick={onClose}
				>
					Добавить историю
				</Link>
			</div>
		</div>
	)
}

export default Menu
