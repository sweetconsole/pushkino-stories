"use client"
import Link from "next/link"
import { type FC } from "react"
import { useStories } from "@/hooks/useStories"

const Stories: FC = () => {
	const { data: stories, isLoading, error, isFetching } = useStories()

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-xl">Загрузка историй...</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-screen text-red-600">
				Ошибка: {error.message}
			</div>
		)
	}

	if (!stories) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-xl">Историй нет</div>
			</div>
		)
	}

	return (
		<ul className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{stories.map((story, index) => (
				<li
					className="border bg-card text-card-foreground shadow-sm rounded-2xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow flex flex-col"
					key={index}
				>
					<div className="flex flex-col space-y-1.5 p-6">
						<h3 className="text-2xl font-semibold leading-none tracking-tight break-words">
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
