import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import NewsLatterBox from "@/components/Contact/NewsLatterBox";
import Image from "next/image";

import { Metadata, ResolvingMetadata } from "next";
import supabase from "@/db/supabase";
import Link from "next/link";

export async function generateStaticParams() {
  const { data:blog, error } = await supabase
  .from("blogs")
  .select("*")
 
  return blog.map((post) => ({
     id:`${post.name.replace(/,?\s+/g, '-').toLowerCase()}_${post.id}`
  }))
}

interface Props {
    params : {id:string}
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const array = params.id.split('_');
  const [one,two] = array

  const { data:blog, error } = await supabase
  .from("blogs")
  .select("*")
  .eq("id",two)

  const data = blog[0]

  const title = `${data?.title}`
  const description = data.metad
  const canonical = `/blog-page/${data.name.replace(/,?\s+/g, '-').toLowerCase()}_${data.id}`

  return {
    metadataBase: new URL('https://www.kingsdevelopers.com'),
    alternates: {
      canonical:canonical,
    },
    title:title,
    description:description,
    openGraph: {
      title: title,
      description:description,
      url: canonical,
      siteName: 'Kings Developers',
      images: [
        {
          url:data.images[0],
          width: 1200,
          height: 630,
          alt:title
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      creator: "@kingsdevelopers",
      images: [{
        url:data.images[1],
        width: 900,
        height: 475,
        alt:title
      }],
    }
  }
}

const BlogSidebarPage = async ({params}: Props) => {
  const array = params.id.split('_');
  const [one,two] = array
  const { data:blog, error } = await supabase
  .from("blogs")
  .select("*")
  .eq("id",two)
  const data = blog[0]
  const { data:similar, error:err } = await supabase
  .from("projects")
  .select("*")
  const sm = similar.slice(0,3)
  return (
    <>
      <section className="overflow-hidden pb-[120px] pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                 {data.name}
                </h1>
                <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                  <div className="flex flex-wrap items-center">
                    <div className="mb-5 mr-10 flex items-center">
                      
                      <div className="w-full">
                        <span className="mb-1 text-base font-medium text-body-color">
                          By <span>{data.author}</span>
                        </span>
                      </div>
                    </div>
                    
                  </div>
                  <div className="mb-5">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
                <div>
                <div className="prose-sm" dangerouslySetInnerHTML={{__html:data.description}}>
        
        </div>
                  
                  
              
                  <div className="items-center justify-between sm:flex">
                    <div className="mb-5">
                      <h4 className="mb-3 text-sm font-medium text-body-color">
                        Popular Tags :
                      </h4>
                      <div className="flex flex-wrap items-center">
                        {data.tags.map((tag :any) => (
                         <TagButton key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className="mb-5">
                      <h5 className="mb-3 text-sm font-medium text-body-color sm:text-right">
                        Share this post :
                      </h5>
                      <div className="flex items-center sm:justify-end">
                        <SharePost text={`/blog-page/${data.name.replace(/,?\s+/g, '-').toLowerCase()}_${data.id}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-4/12">
             
              <div className="shadow-three dark:bg-gray-dark mb-10 rounded-sm bg-white dark:shadow-none">
                <h3 className="border-b border-body-color border-opacity-10 px-8 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Related Posts
                </h3>
                <ul className="p-8">
                 
               {sm.map((item:any) =>(
                    <li key={item.id} className="mb-6 border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
                    <RelatedPost
                      title={item.name}
                      image={`https://kingsdevelopersapi.co.ke${item.images[0]}`}
                      slug={`${item.name.replace(/,?\s+/g, '-').toLowerCase()}_${item.id}`}
                      date={item.type}
                    />
                  </li>
                  ))
                }
                </ul>
              </div>
            
              <div className="shadow-three dark:bg-gray-dark mb-10 rounded-sm bg-white dark:shadow-none">
                <h3 className="border-b border-body-color border-opacity-10 px-8 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap px-8 py-6">
                {data.tags.map((tag :any) => (
                         <TagButton key={tag} text={tag} />
                        ))}
                </div>
              </div>

              <NewsLatterBox />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSidebarPage;
