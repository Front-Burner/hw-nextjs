import {useState, useEffect, useContext} from 'react';
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade, revealDelay, fadeDelay, reveal, revealDelayTop, revealDelayBottom, scaleDelay } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
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
  "contact": *[_type == "contactPage"][0] {
    ...,
    seo {
      ...,
      shareGraphic {
        asset->
      }
    },
  },
  "locations": *[_type == 'location'] {
    _id,
    title,
    slug {
      current
    }
  }
}`

const pageService = new SanityPageService(query)



const Contact = (initialData) => {
  const { data: { global, contact, header, locations } } = pageService.getPreviewHook(initialData)()

  return (
    <Layout>
      <Seo 
        pageSeo={contact.seo} 
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
          <h1 className="border-b-2 border-black">{contact.title}</h1>
            
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

export default Contact;