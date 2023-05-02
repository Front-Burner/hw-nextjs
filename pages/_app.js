import "@/styles/main.css";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { LocationWrapper } from "../context/location";
import { IntroLocationWrapper } from "../context/introLoc";
import { IntroWrapper } from "@/context/intro";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://www.ohmni.tech/",
          site_name: "Ohmni",
          title: "Open Graph Title",
          description: "Open Graph Description",
          images: [
            {
              url: "https://www.example.ie/og-image.jpg",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
          ],
        }}
        twitter={{
          handle: "@jacobbyers",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <IntroWrapper>
        <LocationWrapper>
          <IntroLocationWrapper>
            <AnimatePresence exitBeforeEnter>
              <Component
                {...pageProps}
                key={router.asPath}
                route={router.asPath}
              />
            </AnimatePresence>
          </IntroLocationWrapper>
        </LocationWrapper>
      </IntroWrapper>
    </>
  );
}
