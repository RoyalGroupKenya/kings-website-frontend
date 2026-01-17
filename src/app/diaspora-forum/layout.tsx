import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://kingsdevelopers.com"),
  alternates: {
    canonical: "/diaspora-forum",
  },
  title: "Diaspora Investor Forum | Kings Developers Kenya",
  description:
    "Connect with fellow Kenyan diaspora investors, share experiences, and get insights about real estate opportunities in Kenya with Kings Developers.",
  openGraph: {
    title: "Diaspora Investor Forum | Kings Developers Kenya",
    description:
      "Connect with fellow Kenyan diaspora investors, share experiences, and get insights about real estate opportunities in Kenya.",
    url: "https://kingsdevelopers.com/diaspora-forum",
    siteName: "Kings Developers",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Kings Developers Diaspora Forum - Connect with fellow Kenyan investors",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diaspora Investor Forum | Kings Developers Kenya",
    description:
      "Connect with fellow Kenyan diaspora investors and explore real estate opportunities with Kenya's trusted developer.",
    creator: "@kingsdevelopers",
    images: [
      {
        url: "/logo.png",
        width: 900,
        height: 475,
        alt: "Kings Developers Diaspora Forum - Connect with fellow Kenyan investors",
      },
    ],
  },
}


export default function DiasporaForumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
}

