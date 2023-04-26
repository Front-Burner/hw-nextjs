import {useState, useEffect, useContext} from 'react';
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FancyLink from '@/components/fancyLink'
import Sections from '@/components/sections';
import { fade, revealDelay, fadeDelay, reveal, revealDelayTop, revealDelayBottom, scaleDelay } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Seo from '@/components/seo';
import SanityPageService from '@/services/sanityPageService'

const query = `{
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
  "location": *[_id == 'locationsPage'] {
    title,
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
  },
  "locations": *[_type == 'location'] {
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
  }
}`

const pageService = new SanityPageService(query)

const Locations = (initialData) => {
  const { data: { global, location, header, locations } } = pageService.getPreviewHook(initialData)()

  return (
    <Layout>
      <Seo 
        pageSeo={location[0].seo} 
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
          <m.div className="m-auto text-center grid" variants={fade}>
          <h1 className="border-b-2 border-black">Pick a Location</h1>
          {locations.map((node) => {
            return(
              <FancyLink key={node._id} destination={`locations/${node.slug.current}`} a11yText="Navigate to the home page" label={node.title} extraClasses={`no-underline`} />
            )
          })}
            
          </m.div>
        </m.main>
      </LazyMotion>
      <Footer />
    </Layout>
  );
};

export async function getStaticProps(context) {
  const cms = await pageService.fetchQuery(context)

  return {
    props: { ...cms }
  }
}

export default Locations;