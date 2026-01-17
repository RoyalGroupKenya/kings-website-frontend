
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://kingsdevelopers.com"),
  alternates: {
    canonical: "/diaspora-investment",
  },
  title: "Invest in Kenya from Abroad | Kings Developers",
  description:"Invest in Kenya with ease. Whether you re a Kenyan in the diaspora or an international buyer, Kings Developers offers secure,transparent property investment solutions.",
  openGraph: {
    title: "Invest in Kenya from Abroad | Kings Developers",
    description:"Invest in Kenya with ease. Whether you re a Kenyan in the diaspora or an international buyer, Kings Developers offers secure,transparent property investment solutions.",
    url: "https://kingsdevelopers.com/diaspora-investment",
    siteName: "Kings Developers",
    images: [
      {
        url: "/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Diaspora Investment Opportunities with Kings Developers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invest in Kenya from Abroad | Kings Developers",
    description:
"",
    creator: "@kingsdevelopers",
    images: [
      {
        url: "/hero.jpeg",
        width: 900,
        height: 475,
        alt: "Diaspora Investment Opportunities with Kings Developers",
      },
    ],
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div>
    {children}
   </div>
  );
}


