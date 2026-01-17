import LuxuryBlogsPage from "@/components/luxury-blogs-page"
import supabase from "@/db/supabase"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://kingsdevelopers.com"),
  alternates: {
    canonical: "/blogs",
  },
  title: "Kings Developers | Expert Tips In Real Estate Investing In Kenya",
  description:
    "Master the intricacies of Kenya's real estate market with expert insights from Kings Developers. Start your journey today.",
  openGraph: {
    title: "Kings Developers | Expert Tips In Real Estate Investing In Kenya",
    description:
      "Master the intricacies of Kenya's real estate market with expert insights from Kings Developers. Start your journey today.",
    url: "https://kingsdevelopers.com/blogs",
    siteName: "Kings Developers",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Kings Developers | Expert Tips In Real Estate Investing In Kenya",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kings Developers | Expert Tips In Real Estate Investing In Kenya",
    description:
      "Master the intricacies of Kenya's real estate market with expert insights from Kings Developers. Start your journey today.",
    creator: "@kingsdevelopers",
    images: [
      {
        url: "/logo.png",
        width: 900,
        height: 475,
        alt: "Kings Developers | Expert Tips In Real Estate Investing In Kenya",
      },
    ],
  },
}

const Blog = async () => {
  const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blogs:", error)
    return <LuxuryBlogsPage data={[]} />
  }

  return <LuxuryBlogsPage data={data || []} />
}

export default Blog
