import LuxuryProjectsPage from "@/components/luxury-projects-page"
import supabase from "@/db/supabase"

export const metadata = {
  metadataBase: new URL("https://kingsdevelopers.com"),
  alternates: {
    canonical: "/projects/",
  },
  title: "Projects By Kings Developers Ltd, Kenya",
  description:
    "Explore Kings Developers prestigious developments in Kenya. Contact us today to find your perfect property.",
  openGraph: {
    title: "Projects By Kings Developers Ltd, Kenya",
    description:
      "Explore Kings Developers prestigious developments in Kenya. Contact us today to find your perfect property.",
    url: "https://kingsdevelopers.com/projects/",
    siteName: "Kings Developers",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Projects By Kings Developers Ltd, Kenya",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects By Kings Developers Ltd, Kenya",
    description:
      "Explore Kings Developers prestigious developments in Kenya. Contact us today to find your perfect property.",
    creator: "@kingsdevelopers",
    images: [
      {
        url: "/logo.png",
        width: 900,
        height: 475,
        alt: "Projects By Kings Developers Ltd, Kenya",
      },
    ],
  },
}

const ProjectsPage = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .neq("category", "rent")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
    return <LuxuryProjectsPage projects={[]} />
  }

  return <LuxuryProjectsPage projects={data || []} />
}

export default ProjectsPage
