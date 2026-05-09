
import {Story} from "@/app/generated/prisma/client"
import {prisma} from "@/prisma.client"
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {

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
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Stories</h1>

      <ul>
        {stories.map((story, index) => (
          <li key={index}>
            <h2>{story.title}</h2>
            <p>{story.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
