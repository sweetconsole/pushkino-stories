import Image from "next/image";
import {getStories} from "@/api.service"
import {prisma} from "@/prisma.client"

export default async function Home() {
  const stories = await prisma.story.findMany({})

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
