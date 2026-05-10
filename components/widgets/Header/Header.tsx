import Image from "next/image"
import Link from "next/link"
import { type FC } from "react"

const Header: FC = () => {
	return (
		<header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-40">
			<div className="wrapper flex items-center justify-between py-3 gap-3">
				<Link className="flex items-center gap-2 min-w-0" href="/">
					<Image
						className="h-10 w-10 object-contain shrink-0"
						src="/logo.png"
						alt="logo"
						width={40}
						height={40}
					/>

					<div className="min-w-0">
						<p className="text-base sm:text-lg font-bold leading-tight truncate">
							Истории Пушкино
						</p>
						<p className="text-[11px] sm:text-xs text-muted-foreground truncate">
							Рассказы дедушки внуку
						</p>
					</div>
				</Link>

				<nav className="hidden md:flex items-center gap-2">
					<Link
						className="px-4 py-2 rounded-full text-sm font-semibold transition-colors text-foreground hover:bg-muted"
						href="/"
					>
						Главная
					</Link>

					<Link
						className="px-4 py-2 rounded-full text-sm font-semibold transition-colors bg-primary text-primary-foreground"
						href="/add/"
					>
						Добавить историю
					</Link>
				</nav>

				<button
					className="md:hidden p-2 rounded-md hover:bg-muted"
					aria-label="Меню"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-menu h-5 w-5"
					>
						<line x1="4" x2="20" y1="12" y2="12" />
						<line x1="4" x2="20" y1="6" y2="6" />
						<line x1="4" x2="20" y1="18" y2="18" />
					</svg>
				</button>
			</div>
		</header>
	)
}

export default Header
