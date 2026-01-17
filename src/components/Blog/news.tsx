import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "why you need a property",
    paragraph:
      "Have you ever tried to do more than one task at a go? How did that go",
    image: "/images/blog-page/blog-01.jpg",
    author: {
      name: "Kings Developer",
      image: "/images/blog-page/author-01.png",
      designation: "Investment",
    },
    tags: ["Real Estate"],
    publishDate: "January 05, 2023",
  },
  {
    id: 2,
    title: "Tips On Saving For A Home",
    paragraph:
      "Back when we were kids, we were taught that shelter is a basic need. And as ",
    image: "/images/blog-page/blog-02.jpg",
    author: {
      name: "Kings Developers",
      image: "/images/blog-page/author-02.png",
      designation: "Content Writer",
    },
    tags: ["Commercial"],
    publishDate: "June 03, 2021",
  },
  {
    id: 3,
    title: "Benefits Of Investing",
    paragraph:
      "Investing in real estate might seem like the latest get-rich-quick scheme you’ve",
    image: "/images/blog-page/blog-03.jpg",
    author: {
      name: "Kings Developers",
      image: "/images/blog-page/author-03.png",
      designation: "Property Management",
    },
    tags: ["Real estate"],
    publishDate: "May 26, 2021",
  },
];
export default blogData;
