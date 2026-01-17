import LuxuryProjectsByTypePage from "@/components/luxury-projects-by-type-page" 
import supabase from "@/db/supabase"

interface Props {
  params: { status: string }
}

export async function generateStaticParams() {
  const { data: blog, error } = await supabase.from("projects").select("type")

  return blog?.map((post) => ({
    status: `${post.type}`,
  }))
}

export async function generateMetadata({ params }: Props) {
  return {
    metadataBase: new URL("https://kingsdevelopers.com"),
    alternates: {
      canonical: `/type/${params.status}`,
    },
    title: `${params.status} Projects By Kings Developers`,
    description:
      "Explore Kings Developers prestigious developments in Kenya. Contact us today to find your perfect property.",
    openGraph: {
      title: `${params.status} Projects By Kings Developers`,
      description:
        "Explore Kings Developers prestigious developments in Kenya. Contact us today to find your perfect property.",
      url: `https://kingsdevelopers.com/type/${params.status}`,
      siteName: "Kings Developers",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: `${params.status} Projects By Kings Developers`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${params.status} Projects By Kings Developers`,
      description:
        "Explore Kings Developers prestigious developments in Kenya. Contact us today to find your perfect property.",
      creator: "@kingsdevelopers",
      images: [
        {
          url: "/logo.png",
          width: 900,
          height: 475,
          alt: `${params.status} Projects By Kings Developers`,
        },
      ],
    },
  }
}

const ProjectsByTypePage = async ({ params }: Props) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("type", params.status)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching projects:", error)
    return <LuxuryProjectsByTypePage data={[]} projectType={params.status} />
  }

  return <LuxuryProjectsByTypePage data={data || []} projectType={params.status} />
}

export default ProjectsByTypePage
