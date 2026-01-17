import SingleBlog from "@/components/Blog/projectSingle";
import Breadcrumb from "@/components/Common/Breadcrumb";
import supabase from "@/db/supabase";

import { Metadata } from "next";
 
export const metadata = {
  metadataBase: new URL('https://kingsdevelopers.com'),
  alternates: {
    canonical:"/to-let",
  },
  title: "Properties For Rent In Kenya | Kings Developers Ltd",
  description: ' Houses, apartments and commercial spaces for rent in Kenya! Find your perfect property with Kings Developers Ltd.',
  openGraph: {
    title: "Properties For Rent In Kenya | Kings Developers Ltd",
    description: ' Houses, apartments and commercial spaces for rent in Kenya! Find your perfect property with Kings Developers Ltd.',
    url: 'https://kingsdevelopers.com/to-let',
    siteName: 'Kings Developers',
    images: [
      {
        url:"/logo.png",
        width: 1200,
        height: 630,
        alt: "Properties For Rent In Kenya | Kings Developers Ltd"        }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Properties For Rent In Kenya | Kings Developers Ltd",
    description: " Houses, apartments and commercial spaces for rent in Kenya! Find your perfect property with Kings Developers Ltd.",
    creator: "@kingsdevelopers",
    images: [{
      url:"/logo.png",
      width: 900,
      height: 475,
      alt: "Properties For Rent In Kenya | Kings Developers Ltd" }],
  }
}

const Blog = async () => {
  const {data,error} = await supabase
  .from("projects")
  .select("*")
  .eq("category","rent")
  return (
    <>
      <Breadcrumb
        pageName="Properties For Rent In Kenya | Kings Developers Ltd"
        description="Find your perfect rental property in the most desirable neighbourhoods in Kenya with Kings Developers Ltd."
      />

      <section className="pb-[120px]">
        <div className="max-w-7xl mx-auto px-4">
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
