import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import AboutSectionThree from "@/components/About/AboutSectionThree";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Features from '@/components/Features'

import { Metadata } from "next";
import AboutUs from "@/components/about-us";


export const metadata = {
  metadataBase: new URL('https://kingsdevelopers.com'),
  alternates: {
    canonical:"/aboutus",
  },
  title: "Kings Developers | Kenya's Leading Real Estate Developer",
  description: 'Property  Developers in kenya. Learn about our expertise in crafting dream homes and high-yield properties.',
  openGraph: {
    title: "Kings Developers | Kenya's Leading Real Estate Developer",
    description: 'Property  Developers in kenya. Learn about our expertise in crafting dream homes and high-yield properties.',
    url: 'https://kingsdevelopers.com/aboutus',
    siteName: 'Kings Developers',
    images: [
      {
        url:"/logo.png",
        width: 1200,
        height: 630,
        alt: "Kings Developers | Kenya's Leading Real Estate Developer"        }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Kings Developers | Kenya's Leading Real Estate Developer",
    description: "Kenyas Trusted Developer. Learn about our expertise in crafting dream homes and high-yield properties.",
    creator: "@kingsdevelopers",
    images: [{
      url:"/logo.png",
      width: 900,
      height: 475,
      alt: "Kings Developers | Kenya's Leading Real Estate Developer" }],
  }
}

const AboutPage = () => {
  return (
    <>
     <AboutUs />
    </>
  );
};

export default AboutPage;
