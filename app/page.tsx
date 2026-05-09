import Stories from "./Stories"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Stories</h1>

      <Stories />
    </div>
  );
}
