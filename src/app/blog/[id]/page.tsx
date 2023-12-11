import { formatSingleBlog } from "@/utils/formatRetrieveBlogs"

interface Props {
  params: {
    id: string
  }
}

const page = async ({ params }: Props) => {
  const data = await fetch(` https://api.notion.com/v1/pages/${params.id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
    }
  })

  const blog = formatSingleBlog(await data.json())
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-24">
      <section className="max-w-3xl w-full space-y-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{blog.title}</h1>
        <div>
          {blog.tags.map((tag) => (
            <span key={tag} className="text-sm font-medium text-gray-500 border-2 rounded p-1">
              {tag}
            </span>
          ))}
        </div>
        <span className="block text-sm font-medium text-gray-500">
          {new Date(blog.date!).toLocaleDateString()}
        </span>
        <p>{blog.content}</p>
      </section>
    </main>
  )
}

export default page
