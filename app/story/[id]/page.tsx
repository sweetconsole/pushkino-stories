"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FC, use } from "react"
import { OpenIcon } from "@/components/icons"
import { useStory } from "@/hooks/useStories"

interface Props {
	params: Promise<{
		id: string
	}>
}

const Page: FC<Props> = ({ params }) => {
	const router = useRouter()
	const { id } = use(params)
	const { data: story, isLoading, isFetching, error } = useStory(id)

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-xl">Загрузка истории...</div>
			</div>
		)
	}

	if (error || !story) {
		return (
			<div className="flex flex-col justify-center items-center min-h-90">
				<div className="text-base sm:text-lg font-bold leading-tight truncate mb-4">
					История не найдена
				</div>
				<button
					onClick={() => router.back()}
					className="px-4 py-2 rounded-full text-sm font-semibold transition-colors bg-primary text-primary-foreground"
				>
					Вернуться назад
				</button>
			</div>
		)
	}

	return (
		<article className="wrapper py-6 sm:py-10 max-w-4xl px-4">
			<div className="flex justify-between items-center mb-4 sm:mb-6">
				<Link
					className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-ring rounded-full"
					href="/"
				>
					← Назад ко всем историям
				</Link>

				<Link
					href={`/edit/${story.id}`}
					className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M17 3l4 4-7 7H10v-4l7-7z" />
						<path d="M4 20h16" />
					</svg>
					Редактировать
				</Link>
			</div>

			<div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
				<h1 className="text-3xl sm:text-4xl font-bold wrap-break-word">
					{story.title}
				</h1>
			</div>

			<p className="text-muted-foreground mb-6">Автор: {story.author}</p>

			<p className="text-base sm:text-lg leading-relaxed mb-8 whitespace-pre-line">
				{story.description}
			</p>

			{story.story ? (
				<p className="text-base sm:text-lg leading-relaxed mb-8 whitespace-pre-line">
					{story.story}
				</p>
			) : null}

			<div className="rounded-2xl overflow-hidden shadow-card bg-muted mb-6">
				<div className="flex items-center justify-between gap-2 p-3 bg-secondary text-secondary-foreground">
					<span className="text-sm font-semibold">
						{story.panoramaExtraURL
							? "Панорама 1 — оглянись вокруг!"
							: "Панорама — оглянись вокруг!"}
					</span>
					<Link
						href={story.panoramaURL}
						target="_blank"
						rel="noreferrer noopener"
						className="text-xs inline-flex items-center gap-1 underline"
					>
						Открыть
						<OpenIcon />
					</Link>
				</div>
				<iframe
					src={story.panoramaURL}
					title="Панорама 1"
					className="w-full aspect-video border-0"
					allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking"
				/>
			</div>

			{story.panoramaExtraURL ? (
				<div className="rounded-2xl overflow-hidden shadow-card bg-muted">
					<div className="flex items-center justify-between gap-2 p-3 bg-secondary text-secondary-foreground">
						<span className="text-sm font-semibold">
							Панорама 2 — оглянись вокруг!
						</span>
						<Link
							href={story.panoramaExtraURL}
							target="_blank"
							rel="noreferrer noopener"
							className="text-xs inline-flex items-center gap-1 underline"
						>
							Открыть
							<OpenIcon />
						</Link>
					</div>
					<iframe
						src={story.panoramaExtraURL}
						title="Панорама 2"
						className="w-full aspect-video border-0"
						allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking"
					/>
				</div>
			) : null}
		</article>
	)
}

export default Page
