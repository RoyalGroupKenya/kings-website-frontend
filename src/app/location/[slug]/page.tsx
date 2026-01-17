import type { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import LuxuryLocationProjectsPage from "@/components/luxury-location-projects-page" 
import supabase from "@/db/supabase"

// Define the expected shape of your project data
interface Project {
  id: number | string
  location: string | null
  created_at: string
  name: string
  images: string[]
  status: string
  description: string
  slug: string
  type?: string
  price?: number
  featured?: boolean
}

// Define props for the page component
interface Props {
  params: { slug: string }
}

// Helper Function for Slug Generation
function generateLocationSlug(locationString: string | null): string {
  if (!locationString) return ""
  return locationString
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s,-]/g, "")
    .replace(/[\s,]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Generate Static Paths
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  console.log("Generating static params for locations...")
  const { data: projects, error } = await supabase.from("projects").select("location", { distinct: true })

  if (error) {
    console.error("Error fetching distinct locations for static params:", error.message)
    return []
  }

  if (!projects) {
    console.log("No projects found for static params generation.")
    return []
  }

  const validLocations = projects.filter((p) => p.location && p.location.trim() !== "")
  const uniqueSlugs = new Set(validLocations.map((proj) => generateLocationSlug(proj.location)))
  const params = Array.from(uniqueSlugs).map((slug) => ({ slug: slug }))

  console.log(`Generated ${params.length} unique location slugs for static paths.`)
  return params
}

// Generate Metadata
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const displayName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const title = `Projects in ${displayName} By Kings Developers Ltd, Kenya`
  const description = `Explore Kings Developers' prestigious developments in ${displayName}, Kenya. Contact us today to find your perfect property.`
  const pageUrl = `/location/${params.slug}`

  return {
    metadataBase: new URL("https://kingsdevelopers.com"),
    alternates: {
      canonical: pageUrl,
    },
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: pageUrl,
      siteName: "Kings Developers",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_KE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      creator: "@kingsdevelopers",
      images: [
        {
          url: "/logo.png",
          width: 900,
          height: 475,
          alt: title,
        },
      ],
    },
  }
}

// Page Component
const LocationPage = async ({ params }: Props) => {
  // 1. Fetch all distinct location strings from the database
  const { data: distinctLocationsData, error: locError } = await supabase
    .from("projects")
    .select("location", { distinct: true })

  if (locError) {
    console.error("Fatal Error: Could not fetch distinct locations:", locError.message)
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
          <h2 className="font-serif text-2xl font-light text-slate-800 mb-4">Error Loading Location Data</h2>
          <p className="text-slate-600 mb-6 font-light">
            Please try again later or contact support if the problem persists.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded-full transition-colors duration-300"
          >
            Browse All Projects
          </Link>
        </div>
      </div>
    )
  }

  // Filter out null/empty locations
  const distinctLocations = distinctLocationsData?.filter((p) => p.location && p.location.trim() !== "") || []

  // 2. Find the exact location string that matches the current URL slug
  const targetLocation = distinctLocations.find((loc) => generateLocationSlug(loc.location) === params.slug)

  // 3. If no matching location is found for the slug, render a 404 page
  if (!targetLocation || !targetLocation.location) {
    console.warn(`No matching database location found for slug: "${params.slug}". Rendering 404.`)
    notFound()
  }

  // 4. Fetch projects using an exact match on the found location string
  let projectsData: Project[] = []
  const { data, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("location", targetLocation.location)
    .order("created_at", { ascending: true })

  if (projectsError) {
    console.error(`Error fetching projects for location "${targetLocation.location}":`, projectsError.message)
  } else {
    projectsData = data || []
  }

  const displayLocationName = targetLocation.location.trim()

  return (
    <LuxuryLocationProjectsPage
      projectsData={projectsData}
      locationName={params.slug}
      displayLocationName={displayLocationName}
    />
  )
}

export default LocationPage
