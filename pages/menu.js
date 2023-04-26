import {useState, useEffect, useContext} from 'react';
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FancyLink from '@/components/fancyLink'
import Sections from '@/components/sections';
import { fade, revealDelay, fadeDelay, reveal, revealDelayTop, revealDelayBottom, scaleDelay } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { useLocationContext } from '@/context/location'
import MenuList from '@/components/menuList';
import MenuSectionList from '@/components/menuSectionList';
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
  "menu": *[_id == 'menuPage'] {
    title,
    seo {
      ...,
      shareGraphic {
        asset->
      }
    },
  },
  "locations": *[_type == 'location'] {
    ...,
    "menu": *[_type=='menu' && references(^._id)]{ 
      ...,
      categories->,
    },
  }
}`

const pageService = new SanityPageService(query)

const Menu = (initialData) => {
  const { data: { global, menu, header, locations } } = pageService.getPreviewHook(initialData)()

  const store = useLocationContext();

  const locationFilter = locations.filter(node => node._id === store[0].id)

  const location = locationFilter[0]
  

  return (
    <Layout>
      <Seo 
        pageSeo={menu[0].seo} 
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
            <h1 className="border-b-2 border-black">{`${location === undefined ? 'Pick a location' : location.title}`}</h1>
            { location && location.publishMenu ? (
              <MenuList 
                menu={location.menu} 
                locationId={location._id}
                publishPrices={location.publishPrices}
              />
            ) : (
              <div>No food for you</div>
            )}
            {/* { location && (
              <MenuSectionList location={location} />
            )} */}
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

export default Menu;