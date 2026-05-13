"use client"
import Link from "next/link"
import { type FC } from "react"
import { useStories } from "@/hooks/useStories"

const Stories: FC = () => {
	const { data: stories, isLoading, error, isFetching } = useStories()

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[400]">
				<div className="text-xl">Загрузка историй...</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-[400] text-destructive">
				Ошибка: {error.message}
			</div>
		)
	}

	if (!stories || stories.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400] text-center px-4">
				<div className="text-2xl font-bold mb-2">Историй нет</div>
				<p className="text-muted-foreground mb-6 max-w-md">
					Будь первым, кто поделится своей 360° историей!
				</p>
				<Link
					className="px-9 py-3 rounded-full font-semibold transition-colors bg-primary text-primary-foreground"
					href="/add/"
				>
					Создать историю
				</Link>
			</div>
		)
	}

	return (
		<ul className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{stories.map((story, index) => (
				<li
					className="border bg-card text-card-foreground rounded-2xl shadow-card hover:shadow-soft transition-shadow flex flex-col"
					key={index}
				>
					<div className="flex flex-col space-y-1.5 p-6">
						<h3 className="text-2xl font-semibold leading-none tracking-tight wrap-break-word">
							{story.title}
						</h3>
						<p className="text-sm text-muted-foreground">
							Автор: {story.author}
						</p>
					</div>
					<div className="p-6 pt-0 flex flex-col gap-4 flex-1">
						<p className="text-sm text-muted-foreground line-clamp-4">
							{story.description}
						</p>
						<div className="flex flex-wrap gap-2 mt-auto">
							<Link
								className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-full"
								href={`/story/${story.id}`}
							>
								Смотреть
							</Link>
						</div>
					</div>
				</li>
			))}
		</ul>
	)
}

export default Stories
