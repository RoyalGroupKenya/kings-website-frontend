import type { Metadata, ResolvingMetadata } from "next"
import supabase from "@/db/supabase"
import LuxuryPropertyDetailsPage from "@/components/laxury-property-details-page"

export async function generateStaticParams() {
  const { data: blog, error } = await supabase.from("projects").select("*")

  return blog?.map((post) => ({
    id: `${post.name.replace(/,?\s+/g, "-").toLowerCase()}_${post.id}`,
  }))
}

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const array = params.id.split("_")
  const [one, two] = array

  const { data: blog, error } = await supabase.from("projects").select("*").eq("id", two)

  const data = blog[0]

  const title = `${data?.name} | Kings Developers`
  const description = data?.metad || data?.description?.substring(0, 160)
  const canonical = `/project/${data.name.replace(/,?\s+/g, "-").toLowerCase()}_${data.id}/`

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
      url: canonical,
      siteName: "Kings Developers",
      images: [
        {
          url: data.images[0],
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      creator: "@kingsdevelopers",
      images: [
        {
          url: data.images[1],
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

  const { data: blog, error } = await supabase.from("projects").select("*").eq("id", two)

  const data = blog[0]

  const { data: similar, error: err } = await supabase.from("projects").select("*").eq("type", data.type)

  const relatedProperties = similar?.slice(0, 3) || []

  // Transform data to match the new component structure
  const propertyData = {
    id: data.id,
    name: data.name,
    location: {
      address: data.location,
      coordinates: { lat: -1.2921, lng: 36.8219 },
      nearby: [
        { name: "Shopping Mall", distance: "2.5 km", type: "Shopping", time: "5 min drive" },
        { name: "Primary School", distance: "800 m", type: "Education", time: "10 min walk" },
        { name: "Hospital", distance: "3.2 km", type: "Healthcare", time: "8 min drive" },
        { name: "Recreation Center", distance: "1.5 km", type: "Recreation", time: "15 min walk" },
      ],
    },
    price: data.price,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    size: data.size,
    type: data.type,
    status: data.status,
    images: data.images || [],
    amenities:
      data.amenities?.map((amenity) => ({
        icon: "Shield", // You can map specific icons based on amenity type
        name: amenity,
        description: `Premium ${amenity.toLowerCase()} facilities`,
      })) || [],
    description: data.description,
    features: data.amenities || [],
    floorPlans: [
      {
        name: `${data.bedrooms} Bedroom ${data.type}`,
        size: data.size,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        price: data.price,
        image: data.images?.[0] || "/placeholder.svg",
        features: ["Premium finishes", "Modern appliances", "Spacious layout", "Natural lighting"],
      },
    ],
    developer: {
      name: "Kings Developers",
      experience: "21+ years",
      projects: "45+ completed",
      rating: 4.9,
      logo: "/images/luxury-exterior.png",
    },
    agent: {
      name: "Property Consultant",
      title: "Senior Sales Executive",
      phone: "+254 700 090 060",
      email: "info@kingsdevelopers.co.ke",
      image: "/images/luxury-interior.png",
      experience: "8 years",
    },
    tags: data.tags || [],
    kitchen: data.kitchen,
  }

  return <LuxuryPropertyDetailsPage propertyData={propertyData} relatedProperties={relatedProperties} />
}

export default BlogSidebarPage
