import { type FC } from "react"
import { AddStoryForm } from "@/components/forms"

const Page: FC = () => {
	return (
		<main className="wrapper py-8 sm:py-10 max-w-2xl px-4">
			<h1 className="text-2xl sm:text-3xl font-bold mb-2">
				Поделись своей историей
			</h1>
			<p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
				Расскажи о любимом месте в Пушкино и добавь 360° панораму.
			</p>

			<AddStoryForm />
		</main>
	)
}

export default Page
