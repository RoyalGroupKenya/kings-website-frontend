import SingleBlog from "@/components/Blog/projectSingle";
import Breadcrumb from "@/components/Common/Breadcrumb";
import supabase from "@/db/supabase";

 

import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
interface Props {
  params : {slug:string}
}
export async function generateStaticParams() {
  const { data:blog, error } = await supabase
  .from("projects")
  .select("location")
 
  if (error) {
    console.error("Error fetching locations:", error.message);
    return [];
  }
  console.log(blog)
  return blog?.map((post) => ({
    slug: `${post.location.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "-").toLowerCase().replace(/^-+|-+$/g, "")}`, // Ensure consistent slug format
  })) || [];
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
return {
  metadataBase: new URL('https://kingsdevelopers.com'),
  alternates: {
    canonical:`/location/${params.slug}`,
  },
  title: "Projects By Kings Developers Ltd, Kenya",
  description: 'Explore Kings Developers prestigious developments  in Kenya. Contact us today to find your perfect property.',
  openGraph: {
    title: "Projects By Kings Developers Ltd, Kenya",
    description: 'Explore Kings Developers prestigious developments  in Kenya. Contact us today to find your perfect property.',
    url: `https://kingsdevelopers.com/location/${params.slug}`,
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
  const location = params.slug.replace(/-/g, " ");

  const {data,error} = await supabase
  .from("projects")
  .select("*")
  .ilike("location",`%${location}%`)
  .order('created_at', { ascending: true })
  return (
    <>
      <Breadcrumb
        pageName={`Projects ${params.slug} By Kings Developers Ltd, Kenya`}
        description="Are you ready to find your Kenya property? Browse through our project portfolio for your perfect fit."
      />

      <section className="pb-[120px] pt-[80px]">
        <div className="container">
        <div className="text-start  py-6">
                <ul className="flex flex-wrap items-start">
                 <li className="text-base flex items-center font-medium text-primary">
                    Filter By
                    <span className="mx-2 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-body-color"></span>
                  </li>
                 
                  <li className="flex items-center">
                    <Link
                      href="/projects/Under-Construction"
                      className="pr-1 text-base font-medium text-body-color hover:text-primary"
                    >
                     Ongoing Projects
                    </Link>
                    <span className="mx-2 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-body-color"></span>
                  </li>
                  <li className="flex items-center">
                    <Link
                      href="/projects/Completed"
                      className="pr-1 text-base font-medium text-body-color hover:text-primary"
                    >
                     Completed Projects
                    </Link>
                   
                  </li>
                
                </ul>
              </div>
          <div className="-mx-4 flex flex-wrap justify-center">
          {data.length !== 0 && data.map((blog) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
