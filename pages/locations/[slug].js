//import Moment from "react-moment";
//import ReactMarkdown from "react-markdown";


import Layout from "@/components/layout";
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade, revealDelay, fadeDelay, reveal, revealDelayTop, revealDelayBottom, scaleDelay } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { data } from "autoprefixer";
import MenuList from "@/components/menuList";
import Seo from "@/components/seo";
import Hours from "@/components/hours";
import Orders from "@/components/orders";
import Socials from "@/components/socials";
import FancyLink from "@/components/fancyLink";
import SanityPageService from '@/services/sanityPageService'
import Image from "@/components/image";
import { Context } from '../../context/state'

const query = `{
  "location": *[_type == "location" && slug.current == $slug][0] {
    ...,
    image {
      asset-> {
        ...
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      alt,
      caption
    },
    seo {
      ...,
      shareGraphic {
        asset->
      }
    },
    slug {
      current
    },
  },
  "locations": *[_type == 'location'] {
    _id,
    title,
    slug {
      current
    }
  },
  "global": *[_type == 'global'][0] {
    title,
    seo {
      ...,
      shareGraphic {
        asset->
      }
    }
  },
  "header": *[_type == 'navigationMenu' && title == 'Header'] {
    title,
    items[] {
      title,
      pageRoute-> {
        slug {
          current
        }
      }
    }
  },
}`

const pageService = new SanityPageService(query)

const Location = (initialData) => {
  const { data: { location, locations, global, header }  } = pageService.getPreviewHook(initialData)()

  return (
    <Layout>
      <Seo 
        pageSeo={location.seo} 
        defaultSeo={global.seo} 
        siteName={global.title}
      />
      <Header 
        locations={locations} 
        navigation={header} 
      /> 
      <LazyMotion features={domAnimation}>
        <m.main 
          initial="initial"
          animate="enter"
          exit="exit"
          className="pt-[5rem] px-5 min-h-[calc(100vh-3.5rem)] flex flex-wrap gap-y-4"
        >
          <m.div className="m-auto w-full text-center" variants={fade}>
            {location.image && (
              <div className="w-full mb-5 md:mb-0 relative overflow-hidden">
                <Image
                  image={location.image}
                  focalPoint={location.image.hotspot}
                  widthOverride={1920}
                  className="w-full h-[350px] grid items-center"
                />
              </div>
              
            )}
            <h1>{location.title}</h1>
          </m.div>
          <m.div className="mx-auto text-center" variants={fade}>
            <h2 className="border-b-2 border-black">Details</h2>
            {location.longTitle && (
              <p>{location.longTitle}</p>
            )}
          </m.div>
        </m.main>
      </LazyMotion>
      <Footer />
    </Layout>
  );
};

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return {
    props
  };
}

export async function getStaticPaths() {
  const paths = await pageService.fetchPaths('location')
  return {
    paths: paths,
    fallback: false,
  };
}

export default Location;