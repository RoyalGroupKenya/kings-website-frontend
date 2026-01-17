import LuxuryNewsPage from "@/components/luxury-news-page"
import supabase from "@/db/supabase"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://kingsdevelopers.com"),
  alternates: {
    canonical: "/news",
  },
  title: "Latest Real Estate News In Kenya | Kings Developers Ltd",
  description:
    "Stay informed on Kenya's booming property market with Kings Developers. Get the latest real estate news and expert insights today.",
  openGraph: {
    title: "Latest Real Estate News In Kenya | Kings Developers Ltd",
    description:
      "Stay informed on Kenya's booming property market with Kings Developers. Get the latest real estate news and expert insights today.",
    url: "https://kingsdevelopers.com/news",
    siteName: "Kings Developers",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Latest Real Estate News In Kenya | Kings Developers Ltd",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Real Estate News In Kenya | Kings Developers Ltd",
    description:
      "Stay informed on Kenya's booming property market with Kings Developers. Get the latest real estate news and expert insights today.",
    creator: "@kingsdevelopers",
    images: [
      {
        url: "/logo.png",
        width: 900,
        height: 475,
        alt: "Latest Real Estate News In Kenya | Kings Developers Ltd",
      },
    ],
  },
}

const News = async () => {
  const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching news:", error)
    return <LuxuryNewsPage data={[]} />
  }

  return <LuxuryNewsPage data={data || []} />
}

export default News
