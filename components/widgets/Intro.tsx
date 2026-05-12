import Image from "next/image"
import Link from "next/link"
import { type FC } from "react"

const Intro: FC = () => {
	return (
		<section className="rounded-3xl p-6 pb-0 sm:pb-0 sm:p-8 md:p-12 mb-8 sm:mb-12 grid md:grid-cols-2 gap-6 sm:gap-8 items-center gradient-hero relative">
			<div className="py-8">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-foreground">
					Истории нашего Пушкино
				</h1>
				<p className="text-base sm:text-lg text-foreground/80 mb-5 sm:mb-6">
					Дедушка рассказывает внуку удивительные истории родного города.
					Загляни в каждое место — посмотри 360° панорамы и поделись своей
					историей!
				</p>
				<Link
					className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-full w-full sm:w-auto"
					href="/add/"
				>
					Поделиться историей
				</Link>
			</div>

			<Image
				className="md:absolute relative bottom-0 left-1/2 md:right-24 lg:right-36 -translate-x-1/2 md:translate-0 md:left-auto"
				src="/intro.png"
				alt="error loading..."
				width={128 * 2.5}
				height={160 * 2.5}
			/>
		</section>
	)
}

export default Intro
