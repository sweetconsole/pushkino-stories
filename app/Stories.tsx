
import { type FC } from "react"
import {Story} from "@/app/generated/prisma/client"
import {prisma} from "@/prisma.client"

const Stories: FC = async () => {
	let stories: Array<Story> = []

	try {
		stories = await prisma.story.findMany({})

		console.log("True")

	} catch (error) {
		console.error('Database connection failed:', error)
		// Во время сборки stories останется пустым массивом
	}

	console.log(stories)

	return (
		<ul>
			{stories.map((story, index) => (
					<li key={index}>
						<h2>{story.title}</h2>
						<p>{story.description}</p>
						</li>
				))}
		</ul>
	)
}

export default Stories