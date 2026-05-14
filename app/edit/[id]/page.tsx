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
				<div>
					<label
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						htmlFor="title"
					>
						Название
					</label>
					<input
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2"
						id="title"
						placeholder="Например: Старый парк"
						{...register("title", {
							required: "Поле обязательно для заполнения",
							minLength: { value: 3, message: "Минимум 3 символа" },
							maxLength: { value: 100, message: "Максимум 100 символов" }
						})}
					/>
					{errors.title && (
						<p className="text-destructive text-sm mt-1">
							{errors.title.message}
						</p>
					)}
				</div>

				<div className="mb-5">
					<label
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						htmlFor="author"
					>
						Имя автора *
					</label>
					<input
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2"
						id="author"
						placeholder="Твоё имя"
						{...register("author", {
							required: "Имя автора обязательно",
							minLength: { value: 2, message: "Минимум 2 символа" },
							maxLength: { value: 50, message: "Максимум 50 символов" }
						})}
					/>
					{errors.author && (
						<p className="text-destructive text-sm mt-1">
							{errors.author.message}
						</p>
					)}
				</div>

				<div className="mb-5">
					<label
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						htmlFor="description"
					>
						Краткое описание *
					</label>
					<textarea
						className="flex min-h-80px w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
						id="description"
						rows={2}
						aria-invalid={errors.description ? "true" : "false"}
						{...register("description", {
							required: "Описание обязательно",
							minLength: { value: 10, message: "Минимум 10 символов" },
							maxLength: { value: 500, message: "Максимум 500 символов" }
						})}
					/>
					{errors.description && (
						<p className="text-destructive text-sm mt-1">
							{errors.description.message}
						</p>
					)}
				</div>

				<div className="mb-5">
					<label
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						htmlFor="content"
					>
						Полный рассказ
					</label>
					<textarea
						className="flex min-h-80px w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
						id="content"
						rows={5}
						aria-invalid={errors.story ? "true" : "false"}
						placeholder="Расскажи историю подробно..."
						{...register("story", {
							maxLength: { value: 5000, message: "Максимум 5000 символов" }
						})}
					/>
					{errors.story && (
						<p className="text-destructive text-sm mt-1">
							{errors.story.message}
						</p>
					)}
				</div>

				<div className="mb-5">
					<label
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						htmlFor="p1"
					>
						Ссылка на 360° панораму *
					</label>
					<input
						type="url"
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2"
						placeholder="https://..."
						id="p1"
						aria-invalid={errors.panoramaURL ? "true" : "false"}
						{...register("panoramaURL", {
							required: "Ссылка на панораму обязательна",
							pattern: {
								value:
									/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
								message: "Введите корректный URL"
							}
						})}
					/>
					{errors.panoramaURL && (
						<p className="text-destructive text-sm mt-1">
							{errors.panoramaURL.message}
						</p>
					)}
				</div>

				<div className="mb-5">
					<label
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						htmlFor="p2"
					>
						Вторая панорама (необязательно)
					</label>
					<input
						type="url"
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2"
						id="p2"
						placeholder="https://..."
						aria-invalid={errors.panoramaExtraURL ? "true" : "false"}
						{...register("panoramaExtraURL", {
							pattern: {
								value:
									/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
								message: "Введите корректный URL"
							}
						})}
					/>
					{errors.panoramaExtraURL && (
						<p className="text-destructive text-sm mt-1">
							{errors.panoramaExtraURL.message}
						</p>
					)}
				</div>

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
