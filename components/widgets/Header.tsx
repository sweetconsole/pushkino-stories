"use client"
import Link from "next/link"
import { type FC, useState } from "react"
import { MenuIcon } from "@/components/icons"
import Menu from "./Menu"

const Header: FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
	const closeMenu = () => setIsMenuOpen(false)

	return (
		<header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-40">
			<div className="wrapper flex items-center justify-between py-3 gap-3">
				<Link
					className="flex flex-col gap-0.5 min-w-0"
					href="/"
					onClick={closeMenu}
				>
					<p className="text-base sm:text-lg font-bold leading-tight truncate">
						Истории Пушкино
					</p>
					<p className="text-[11px] sm:text-xs text-muted-foreground truncate">
						Рассказы дедушки внуку
					</p>
				</Link>

				<nav className="hidden md:flex items-center gap-2">
					<Link
						className="px-4 py-2 rounded-full text-sm font-semibold transition-colors text-foreground hover:bg-muted"
						href="/"
						onClick={closeMenu}
					>
						Главная
					</Link>

					<Link
						className="px-4 py-2 rounded-full text-sm font-semibold transition-colors bg-primary text-primary-foreground"
						href="/add/"
						onClick={closeMenu}
					>
						Добавить историю
					</Link>
				</nav>

				<button
					className="md:hidden p-2 rounded-md hover:bg-muted"
					aria-label="Меню"
					onClick={toggleMenu}
				>
					<MenuIcon isActive={isMenuOpen} />
				</button>
			</div>

			<Menu isOpen={isMenuOpen} onClose={closeMenu} />
		</header>
	)
}

export default Header
