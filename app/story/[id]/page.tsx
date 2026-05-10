"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FC, use } from "react"
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

	console.log(id)

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-xl">Загрузка истории...</div>
			</div>
		)
	}

	if (error || !story) {
		return (
			<div className="flex flex-col justify-center items-center min-h-screen">
				<div className="text-2xl text-red-600 mb-4">История не найдена</div>
				<button
					onClick={() => router.back()}
					className="bg-blue-600 text-white px-4 py-2 rounded-lg"
				>
					Вернуться назад
				</button>
			</div>
		)
	}

	return (
		<article className="wrapper py-6 sm:py-10 max-w-3xl px-4">
			<Link
				className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-ring h-10 mb-4 sm:mb-6 rounded-full"
				href="/"
			>
				← Назад ко всем историям
			</Link>

			<div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
				<h1 className="text-3xl sm:text-4xl font-bold break-words">
					{story.title}
				</h1>
			</div>

			<p className="text-muted-foreground mb-6">Автор: {story.author}</p>

			<p className="text-base sm:text-lg leading-relaxed mb-8 whitespace-pre-line">
				{story.description}
			</p>

			{story.story ? (
				<p className="text-base sm:text-lg leading-relaxed mb-8 whitespace-pre-line">
					{story.description}
				</p>
			) : null}

			<div className="rounded-2xl overflow-hidden shadow-card bg-muted mb-6">
				<div className="flex items-center justify-between gap-2 p-3 bg-secondary text-secondary-foreground">
					<span className="text-sm font-semibold">
						Панорама 1 — оглянись вокруг!
					</span>
					<Link
						href={story.panoramaURL}
						target="_blank"
						rel="noreferrer noopener"
						className="text-xs inline-flex items-center gap-1 underline"
					>
						Открыть{" "}
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
							className="lucide lucide-external-link h-3 w-3"
						>
							<path d="M15 3h6v6" />
							<path d="M10 14 21 3" />
							<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
						</svg>
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
							Открыть{" "}
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
								className="lucide lucide-external-link h-3 w-3"
							>
								<path d="M15 3h6v6" />
								<path d="M10 14 21 3" />
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
							</svg>
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
