"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Lora, Nunito_Sans } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Lora({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head >
    <Script dangerouslySetInnerHTML={{
      __html:`
      !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '447424304542716');
    fbq('track', 'PageView');
      `
    }}>
    
    </Script>
    <meta name="google-site-verification" content="jVorcpTfBCC07vn_n4wrQlhswC1TsCLdZ6FfJ4QnCqc" />
    <noscript><img height="1" width="1" style={{display:"none"}}
src="https://www.facebook.com/tr?id=447424304542716&ev=PageView&noscript=1"
/></noscript>
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-KYLNGDY0RL"></Script>
<Script dangerouslySetInnerHTML={{__html:`
 window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KYLNGDY0RL');
  `}}>
 
</Script>

<Script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/144835175.js"></Script>
      </head>

      <body className={`bg-[#FCFCFC] dark:bg-black `}>
        <Providers>
          <Header />
          <Toaster position="bottom-left" className="bg-neutral-900"/>
          {children}
          <Footer />
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}

import { Providers } from "./providers";import Script from "next/script";
import { Toaster } from "@/components/ui/sooner";

