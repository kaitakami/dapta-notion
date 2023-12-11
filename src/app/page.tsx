import Link from "next/link"
import { formatRetrieveBlogs } from "@/utils/formatRetrieveBlogs"

export default async function Home() {
  const data = await fetch(`https://api.dapta.ai/api/kai-workspace-170-199-8/retrieve_blogs?x-api-key=${process.env.DAPTA_API_KEY}`).catch((error) => console.error(error))

  if (!data) return <div>There was an error fetching the blogs</div>

  const { response } = await data.json()

  const blogs = formatRetrieveBlogs(response.notion_api.data.response)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-24">
      <section className="max-w-3xl w-full">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Blog</h1>
        <section className="flex flex-col space-y-8 py-8">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`}>
              <article key={blog.id} className="border flex flex-col space-y-2 p-2 rounded-lg shadow">
                <h3 className="text-base font-medium">{blog.title}</h3>
                <section className="flex flex-row space-x-4">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="text-sm font-medium text-gray-500">
                      {tag}
                    </span>
                  ))}
                </section>
                <section className="flex flex-row space-x-4">
                  <span className="text-sm font-medium text-gray-500">
                    {new Date(blog.published_at!).toLocaleDateString()}
                  </span>
                </section>
              </article>
            </Link>
          ))}
        </section>
      </section>
    </main>
  )
}
