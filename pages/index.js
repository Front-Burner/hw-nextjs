import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Sections from '@/components/sections';
import { fade, revealDelay, fadeDelay, reveal, revealDelayTop, revealDelayBottom, scaleDelay } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useLocationContext } from '@/context/location'
import Seo from '@/components/seo';
import Intro from '@/components/intro';
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
  "home": *[_type == "homePage"][0] {
    title,
    seo {
      ...,
      shareGraphic {
        asset->
      }
    },
    sections[] {
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


const Home = (initialData) => {
  const { data: { global, home, header, locations } } = pageService.getPreviewHook(initialData)()

  
  
  //For testing
  const store = useLocationContext();

  return (
    <Layout>
      {/* <Intro locations={locations} /> */}
      <Seo 
        pageSeo={home?.seo} 
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
          className="pt-[5rem] px-5 min-h-[calc(100vh-3.5rem)] grid gap-y-4"
        >
          <div className="mx-auto">
            <code className="">
              nearest: {store[0].title} <br/>
              slug: {store[0].slug} <br/>
              id: {store[0].id} <br/> 
            </code>
          </div>
          <m.div variants={fade}>
            <Sections body={home.sections}/>
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


export default Home;