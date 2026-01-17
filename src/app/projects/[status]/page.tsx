import SingleBlog from "@/components/Blog/projectSingle";
import Breadcrumb from "@/components/Common/Breadcrumb";
import LuxuryProjectsPage from "@/components/luxury-projects-page";
import supabase from "@/db/supabase";

 

import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
interface Props {
  params : {status:string}
}
export async function generateStaticParams() {
  const { data:blog, error } = await supabase
  .from("projects")
  .select("*")
 
  return blog?.map((post) => ({
    status:`${post.status}` ,
  }))
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
return {
  metadataBase: new URL('https://kingsdevelopers.com'),
  alternates: {
    canonical:`/${params.status}/`,
  },
  title: "Projects By Kings Developers Ltd, Kenya",
  description: 'Explore Kings Developers prestigious developments  in Kenya. Contact us today to find your perfect property.',
  openGraph: {
    title: "Projects By Kings Developers Ltd, Kenya",
    description: 'Explore Kings Developers prestigious developments  in Kenya. Contact us today to find your perfect property.',
    url: `https://kingsdevelopers.com/${params.status}`,
    siteName: 'Kings Developers',
    images: [
      {
        url:"/logo.png",
        width: 1200,
        height: 630,
        alt: "Projects By Kings Developers Ltd, Kenya"        }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects By Kings Developers Ltd, Kenya",
    description: "Explore Kings Developers prestigious developments  in Kenya. Contact us today to find your perfect property.",
    creator: "@kingsdevelopers",
    images: [{
      url:"/logo.png",
      width: 900,
      height: 475,
      alt: "Projects By Kings Developers Ltd, Kenya" }],
  }
}
}

const Blog = async ({params} :Props) => {
  const {data,error} = await supabase
  .from("projects")
  .select("*")
  .eq("status",params.status)
  .order('created_at', { ascending: false })
  return (
   <LuxuryProjectsPage projects={data || []} />
  );
};

export default Blog;
