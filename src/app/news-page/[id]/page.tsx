import LuxuryNewsDetailPage from "@/components/luxury-news-detail-page"
import supabase from "@/db/supabase"
import type { Metadata, ResolvingMetadata } from "next"

export async function generateStaticParams() {
  const { data: news, error } = await supabase.from("news").select("*")

  if (error || !news) {
    return []
  }

  return news.map((post) => ({
    id: `${post.name.replace(/,?\s+/g, "-").toLowerCase()}_${post.id}`,
  }))
}

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const array = params.id.split("_")
  const [one, two] = array

  const { data: news, error } = await supabase.from("news").select("*").eq("id", two)

  if (error || !news || news.length === 0) {
    return {
      title: "News Not Found | Kings Developers Ltd",
      description: "The requested news article could not be found.",
    }
  }

  const data = news[0]
  const title = `${data?.name} | Kings Developers Ltd`
  const description = data.metad
  const canonical = `/news-page/${data.name.replace(/,?\s+/g, "-").toLowerCase()}_${data.id}`

  return {
    metadataBase: new URL("https://kingsdevelopers.com"),
    alternates: {
      canonical: canonical,
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
          url: data.images?.[0] ? `https://kingsdevelopersapi.co.ke${data.images[0]}` : "/logo.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: data.created_at,
      authors: [data.author],
      tags: data.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      creator: "@kingsdevelopers",
      images: [
        {
          url: data.images?.[1] ? `https://kingsdevelopersapi.co.ke${data.images[1]}` : "/logo.png",
          width: 900,
          height: 475,
          alt: title,
        },
      ],
    },
    keywords: data.tags?.join(", "),
    authors: [{ name: data.author }],
    category: data.category,
  }
}

const NewsDetailPage = async ({ params }: Props) => {
  const array = params.id.split("_")
  const [one, two] = array

  const { data: news, error } = await supabase.from("news").select("*").eq("id", two)

  if (error || !news || news.length === 0) {
    return <LuxuryNewsDetailPage data={null} relatedNews={[]} />
  }

  const data = news[0]

  // Fetch related news/projects
  const { data: similar, error: err } = await supabase
    .from("projects")
    .select("*")
    .limit(6)
    .order("created_at", { ascending: false })

  const relatedNews = similar?.slice(0, 4) || []

  return <LuxuryNewsDetailPage data={data} relatedNews={relatedNews} />
}

export default NewsDetailPage
