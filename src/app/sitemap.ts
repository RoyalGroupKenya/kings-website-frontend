import supabase from "@/db/supabase";
export default async function sitemap() {
  const BASE_URL = 'https://kingsdevelopers.com';
  
  const getProducts = async () => {
    const { data: news, error: newsError } = await supabase
      .from("news")
      .select("name,id");
    
    if (newsError) {
      console.error("Error fetching news:", newsError);
      return { news: [], projects: [], blogs: [] };
    }

    const { data: blogs, error: blogsError } = await supabase
      .from("blogs")
      .select("name,id");

    if (blogsError) {
      console.error("Error fetching blogs:", blogsError);
      return { news, projects: [], blogs: [] };
    }

    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("name,id");

    if (projectsError) {
      console.error("Error fetching projects:", projectsError);
      return { news, projects: [], blogs };
    }

    return { news, projects, blogs };
  }

  const { news, projects, blogs } = await getProducts();

  const staticPaths = [
    `${BASE_URL}/aboutus`,
    `${BASE_URL}/frequently-asked-questions`,
    `${BASE_URL}/blogs`,
    `${BASE_URL}/projects`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/news`,
    `${BASE_URL}/diaspora-investment`,
    `${BASE_URL}/to-let`,
    `${BASE_URL}/diaspora-forum`,
    `${BASE_URL}/investment-calculator`,
    BASE_URL
  ];

  const newsPaths = news.map(singleProduct => {
    return `${BASE_URL}/news-page/${singleProduct.name.replace(/,?\s+/g, '-').toLowerCase()}_${singleProduct.id}`;
  });

  const blogPaths = blogs.map(singleProduct => {
    return `${BASE_URL}/blog-page/${singleProduct.name.replace(/,?\s+/g, '-').toLowerCase()}_${singleProduct.id}`;
  });

  const projectPaths = projects.map(singleProduct => {
    return `${BASE_URL}/project/${singleProduct.name.replace(/,?\s+/g, '-').toLowerCase()}_${singleProduct.id}`;
  });

  const allPaths = [...staticPaths, ...newsPaths, ...blogPaths, ...projectPaths];

  return allPaths.map((url) => {
    const cleanUrl = url.replace(/`/g, '');
    let priority = 0.8;
    let changeFrequency = 'weekly';

    // Set higher priority for important pages
    if (cleanUrl === BASE_URL) {
      priority = 1.0;
      changeFrequency = 'daily';
    } else if (cleanUrl.includes('/investment-calculator')) {
      priority = 0.9;
      changeFrequency = 'monthly';
    } else if (cleanUrl.includes('/projects') || cleanUrl.includes('/project/')) {
      priority = 0.9;
      changeFrequency = 'weekly';
    } else if (cleanUrl.includes('/blogs') || cleanUrl.includes('/blog-page/')) {
      priority = 0.8;
      changeFrequency = 'weekly';
    } else if (cleanUrl.includes('/news') || cleanUrl.includes('/news-page/')) {
      priority = 0.7;
      changeFrequency = 'daily';
    }

    return {
      url: cleanUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: changeFrequency as 'daily' | 'weekly' | 'monthly',
      priority: priority,
    };
  });
}

