"use client"
import { useRouter } from "next/navigation"
import { type FC } from "react"
import { useForm } from "react-hook-form"
import { useAddStory } from "@/hooks/useStories"

interface AddStoryFormInputs {
	title: string
	author: string
	description: string
	story?: string
	panoramaURL: string
	panoramaExtraURL?: string
}

interface AddStoryFormProps {
	onSuccess?: () => void
}

const AddStoryForm: FC<AddStoryFormProps> = ({ onSuccess }) => {
	const router = useRouter()
	const addStory = useAddStory()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
		reset
	} = useForm<AddStoryFormInputs>({
		mode: "onChange",
		defaultValues: {
			title: "",
			author: "",
			description: "",
			story: "",
			panoramaURL: "",
			panoramaExtraURL: ""
		}
	})

	const onSubmit = async (data: AddStoryFormInputs) => {
		try {
			const newStory = await addStory.mutateAsync({
				...data
			})
			reset()

			onSuccess?.()

			router.push(`/story/${newStory.id}`)
		} catch (error) {
			console.error("Ошибка при добавлении истории:", error)
		}
	}

	return (
		<form
			className="space-y-5 bg-card p-5 sm:p-6 rounded-2xl shadow-card"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="mb-5">
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

			<button
				className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 w-full rounded-full"
				type="submit"
				disabled={isSubmitting || !isValid}
			>
				{isSubmitting ? "Публикация..." : "Опубликовать"}
			</button>
		</form>
	)
}

export default AddStoryForm
