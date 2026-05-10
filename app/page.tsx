import { Intro, Stories } from "@/components/widgets"

export default async function Home() {
	return (
		<main className="wrapper py-6 sm:py-10 px-4">
			<Intro />

			<h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
				Все истории
			</h2>

			<Stories />
		</main>
	)
}
