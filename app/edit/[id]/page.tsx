// app/edit/[id]/page.tsx
"use client"

import { useRouter } from "next/navigation"
import { use, useState, FC } from "react"
import { useForm } from "react-hook-form"
import { useStory, useUpdateStory } from "@/hooks/useStories"

interface EditPageProps {
	params: Promise<{ id: string }>
}

interface StoryFormData {
	title: string
	author: string
	description: string
	story?: string
	panoramaURL: string
	panoramaExtraURL?: string
}

const EditStoryPage: FC<EditPageProps> = ({ params }) => {
	const router = useRouter()
	const { id } = use(params)
	const { data: story, isLoading } = useStory(id)
	const updateStory = useUpdateStory()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<StoryFormData>({
		values: story
			? {
					title: story.title,
					author: story.author,
					description: story.description,
					story: story.story || "",
					panoramaURL: story.panoramaURL,
					panoramaExtraURL: story.panoramaExtraURL || ""
				}
			: undefined
	})

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
					<p className="text-muted-foreground">Загрузка истории...</p>
				</div>
			</div>
		)
	}

	if (!story) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px] text-center">
				<div className="text-6xl mb-4">😢</div>
				<h1 className="text-2xl font-bold mb-2">История не найдена</h1>
				<p className="text-muted-foreground mb-6">
					Такой истории не существует
				</p>
				<button
					onClick={() => router.push("/")}
					className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
				>
					Вернуться на главную
				</button>
			</div>
		)
	}

	const onSubmit = async (data: StoryFormData) => {
		setIsSubmitting(true)
		try {
			await updateStory.mutateAsync({ id, ...data })
			router.push(`/story/${id}`)
		} catch (error) {
			console.error("Ошибка при обновлении:", error)
			alert("Не удалось обновить историю")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-3xl">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Редактирование истории</h1>
				<button
					onClick={() => router.back()}
					className="text-muted-foreground hover:text-foreground transition"
				>
					← Назад
				</button>
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-5 bg-card p-6 rounded-2xl shadow-card"
			>
				{/* Название */}
				<div>
					<label className="text-sm font-medium mb-2 block">Название *</label>
					<input
						{...register("title", { required: "Название обязательно" })}
						className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
					/>
					{errors.title && (
						<p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
					)}
				</div>

				{/* Автор */}
				<div>
					<label className="text-sm font-medium mb-2 block">Автор *</label>
					<input
						{...register("author", { required: "Автор обязателен" })}
						className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
					/>
					{errors.author && (
						<p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
					)}
				</div>

				{/* Краткое описание */}
				<div>
					<label className="text-sm font-medium mb-2 block">
						Краткое описание *
					</label>
					<textarea
						{...register("description", { required: "Описание обязательно" })}
						rows={3}
						className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
					/>
					{errors.description && (
						<p className="text-red-500 text-sm mt-1">
							{errors.description.message}
						</p>
					)}
				</div>

				{/* Полный рассказ */}
				<div>
					<label className="text-sm font-medium mb-2 block">
						Полный рассказ (необязательно)
					</label>
					<textarea
						{...register("story")}
						rows={5}
						className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder="Расскажите историю подробно..."
					/>
				</div>

				{/* Ссылка на панораму */}
				<div>
					<label className="text-sm font-medium mb-2 block">
						Ссылка на 360° панораму *
					</label>
					<input
						{...register("panoramaURL", {
							required: "Ссылка на панораму обязательна"
						})}
						type="url"
						className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
					/>
					{errors.panoramaURL && (
						<p className="text-red-500 text-sm mt-1">
							{errors.panoramaURL.message}
						</p>
					)}
				</div>

				{/* Дополнительная панорама */}
				<div>
					<label className="text-sm font-medium mb-2 block">
						Дополнительная панорама (необязательно)
					</label>
					<input
						{...register("panoramaExtraURL")}
						type="url"
						className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>

				{/* Кнопки */}
				<div className="flex gap-3 pt-4">
					<button
						type="submit"
						disabled={isSubmitting}
						className="flex-1 bg-primary text-primary-foreground py-2 rounded-full font-semibold hover:bg-primary/90 transition disabled:opacity-50"
					>
						{isSubmitting ? "Сохранение..." : "Сохранить изменения"}
					</button>
					<button
						type="button"
						onClick={() => router.back()}
						className="px-6 py-2 rounded-full border border-input hover:bg-accent transition"
					>
						Отмена
					</button>
				</div>
			</form>
		</div>
	)
}

export default EditStoryPage
