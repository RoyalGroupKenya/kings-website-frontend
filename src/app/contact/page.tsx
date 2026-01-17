import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";


export const metadata = {
  metadataBase: new URL('https://kingsdevelopers.com'),
  alternates: {
    canonical:"/contact",
  },
  title: "Contact Kings Developers | Your Kenyan Real Estate Partner",
  description: 'Kenyas Trusted Developer. Learn about our expertise in crafting dream homes and high-yield properties.',
  openGraph: {
    title: "Contact Kings Developers | Your Kenyan Real Estate Partner",
    description: 'Kenyas Trusted Developer. Learn about our expertise in crafting dream homes and high-yield properties.',
    url: 'https://kingsdevelopers.com/contact',
    siteName: 'Kings Developers',
    images: [
      {
        url:"/logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Kings Developers | Your Kenyan Real Estate Partner"        }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Kings Developers | Your Kenyan Real Estate Partner",
    description: "Kenyas Trusted Developer. Learn about our expertise in crafting dream homes and high-yield properties.",
    creator: "@kingsdevelopers",
    images: [{
      url:"/logo.png",
      width: 900,
      height: 475,
      alt: "Contact Kings Developers | Your Kenyan Real Estate Partner" }],
  }
}

const ContactPage = () => {
  return (
    <>
    

      <Contact />
    </>
  );
};

export default ContactPage;
