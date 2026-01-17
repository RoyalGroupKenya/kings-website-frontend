import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "why you need a property",
    paragraph:
      "Have you ever tried to do more than one task at a go? How did that go",
    image: "/blog-page/1.jpg",
    author: {
      name: "Kings Developer",
      image: "/menulogo.png",
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
    image: "/blog-page/2.jpg",
    author: {
      name: "Kings Developers",
      image: "/menulogo.png",
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
    image: "/blog-page/4.jpg",
    author: {
      name: "Kings Developers",
      image: "/menulogo.png",
      designation: "Property Management",
    },
    tags: ["Real estate"],
    publishDate: "May 26, 2021",
  },
];
export default blogData;
