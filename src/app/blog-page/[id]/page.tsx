import Link from "next/link"
import LuxuryBlogDetailPage from "@/components/luxury-blog-detail-page" 
import supabase from "@/db/supabase"
import type { Metadata, ResolvingMetadata } from "next"

export async function generateStaticParams() {
  const { data: blog, error } = await supabase.from("blogs").select("*")

  if (error || !blog) {
    return []
  }

  return blog.map((post) => ({
    id: `${post.name.replace(/,?\s+/g, "-").toLowerCase()}_${post.id}`,
  }))
}

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const array = params.id.split("_")
  const [one, two] = array

  const { data: blog, error } = await supabase.from("blogs").select("*").eq("id", two)

  if (error || !blog || blog.length === 0) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    }
  }

  const data = blog[0]
  const title = `${data?.title || data?.name}`
  const description = data.metad
  const canonical = `/blog-page/${data.name.replace(/,?\s+/g, "-").toLowerCase()}_${data.id}/`

  return {
    metadataBase: new URL("https://kingsdevelopers.com"),
    alternates: {
      canonical: `https://kingsdevelopers.com${canonical}`,
    },
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://kingsdevelopers.com${canonical}`,
      siteName: "Kings Developers",
      images: [
        {
          url: `https://kingsdevelopersapi.co.ke${data.images[0]}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      creator: "@kingsdevelopers",
      images: [
        {
          url: `https://kingsdevelopersapi.co.ke${data.images[0]}`,
          width: 900,
          height: 475,
          alt: title,
        },
      ],
    },
  }
}

const BlogSidebarPage = async ({ params }: Props) => {
  const array = params.id.split("_")
  const [one, two] = array

  const { data: blog, error } = await supabase.from("blogs").select("*").eq("id", two)

  if (error || !blog || blog.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="font-serif text-2xl font-light text-slate-800 mb-4">Article Not Found</h2>
          <p className="text-slate-600 mb-6 font-light">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded-full transition-colors duration-300"
          >
            Back to Articles
          </Link>
        </div>
      </div>
    )
  }

  const data = blog[0]

  const { data: similar, error: err } = await supabase.from("projects").select("*")

  const relatedPosts = similar?.slice(0, 3) || []

  return <LuxuryBlogDetailPage data={data} relatedPosts={relatedPosts} />
}

export default BlogSidebarPage
