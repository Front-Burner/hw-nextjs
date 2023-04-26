import { useLocationContext } from '@/context/location';
import { useIntroLocContext } from '@/context/introLoc';
import { useIntroContext } from '@/context/intro';
import { NearestLocation } from '@/helpers/location'
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { LazyMotion, domAnimation, m, AnimatePresence, useCycle } from "framer-motion"

const introSlide = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: "-100%" }
}

export default function Intro({ locations }) {
  const [sharedState, setShareState] = useLocationContext();
  const [introLocState, setIntroLocState] = useIntroLocContext();
  const [introContext, setIntroContext] = useIntroContext();
  const [isActive, setIsActive] = useCycle(false, true);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(true);
  const [cookies, setCookie] = useCookies(['cookie-name']);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter()



  //Sets coordinates
  const onChange = ({coords}) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setError(false)
  };

  //Get location
  const getLocation = () => {
    const geo = navigator.geolocation;
    if (!geo) {
      return;
    }
    let watcher = geo.getCurrentPosition(onChange);
    return () => geo.clearWatch(watcher);
  }

  //Pass user location to find closest store location and stores it as a cookie
  useEffect(() => {
    if (error === false) {
      const nearest = NearestLocation(locations, position, error);
      let expDate = new Date()
      expDate.setDate(expDate.getDate() + 30);
    
      if (sharedState.id === 0) {
        setCookie('nearestLocation', 
          {
            id: nearest.id,
            title: nearest.title,
            slug: nearest.slug
          }, 
          { 
            path: '/',
            expires: expDate
          }
        );
        setShareState({
          id: nearest.id,
          title: nearest.title,
          slug: nearest.slug
        });
        setIsOpen(!isOpen);
        setTimeout(() => {
          setIntroLocState(!introLocState);
          setIntroContext(true)
        }, 3500);
        
      }
      
    }  
  },[error])

  //Check Cookie First 
  useEffect(() => {
    if (cookies.nearestLocation) {
      if (sharedState.id === 0) {
        setShareState({
          id: cookies.nearestLocation.id,
          title: cookies.nearestLocation.title,
          slug: cookies.nearestLocation.slug
        })
        setIsOpen(!isOpen);
        setTimeout(() => {
          setIntroLocState(!introLocState);
          setIntroContext(true)
        }, 3500);
      }
    }
  }, [])
  
  

  //Changes Location manually
  const handleLocationChange = (item, locations) => {
    const location = locations.filter(node => node.attributes.title === item);
    let expDate = new Date()
    expDate.setDate(expDate.getDate() + 30);
    setShareState({
      id: location[0].id,
      title: location[0].attributes.title,
      slug: location[0].attributes.slug
    });
    setCookie('nearestLocation', 
      {
        id: location[0].id,
        title: location[0].attributes.title,
        slug: location[0].attributes.slug
      }, 
      { 
        path: '/',
        expires: expDate
      }
    );
    setIsOpen(!isOpen);
    setTimeout(() => {
      setIntroLocState(!introLocState);
      setIntroContext(true)
    }, 3500);
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {/* <m.div 
          initial={!introContext && router.asPath == '/' ? 'visible' : 'hidden'}
          animate="hidden"
          variants={introSlide}
          transition={{ delay: 1.5, duration: 1, ease: [0.83, 0, 0.17, 1] }}
          className="bg-black h-screen w-full fixed inset-0 z-[100] pointer-events-none flex flex-col p-[14px] md:p-[20px]"
          style={{ 
            backgroundImage: `url(${IntroBackground.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right'
          }}
        /> */}
        {!introLocState && !cookies.nearestLocation && (
          <m.div
            initial="visible"
            animate={isOpen ? "visible" : "hidden"}
            variants={introSlide}
            transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
            className="bg-red-500 fixed h-screen w-full inset-0 z-[70] flex flex-col p-[14px] md:p-[20px] items-center"
            // style={{ 
            //   backgroundImage: `url(${SelectLocationBackground.src})`,
            //   backgroundSize: 'cover',
            //   backgroundPosition: 'right'
            // }}
          >
            <div className='relative my-auto'>
              <div 
                style={{background: 'rgba(0, 0, 0, 0.6)'}}
                className='bg-black text-white rounded-3xl p-20 lg:p-10 max-w-[700px] font-body flex flex-wrap justify-center gap-y-5'
              > 
                <h1 className="text-[4rem]  pt-10 lg:pt-0 font-slant leading-[5rem] pb-10 lg:pb-0 -rotate-6 w-[50rem] mx-auto">
                  FIND A LOCATION NEAR ME
                </h1>
                <button 
                  onClick={() => getLocation()} 
                  className="w-full lg:w-[20rem] px-20 lg:px-10 py-10 lg:py-5 md:border-4 md:border-white block bg-transparent  hover:text-white uppercase text-[2rem] lg:text-lg no-underline"
                >
                  Use Current Location
                </button>
                {/* <div className='text-[2rem] lg:text-lg w-full text-center mx-auto'>OR</div>
                <m.button
                  onClick={setIsActive}
                  className="w-full lg:w-[20rem] cursor-pointer px-20 lg:px-10 py-10 lg:py-5 md:border-4 md:border-white block bg-transparent  hover:text-white uppercase text-[2rem] lg:text-lg no-underline"
                >
                  {sharedState.title}
                </m.button>
                {isActive && (
                  <m.div 
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="flex flex-col -mt-6"
                  >
                    {locations.map((location) => (
                      <div
                        className="w-full cursor-pointer hover:bg-black lg:w-[20rem] px-20 lg:px-10 py-10 lg:py-5 md:border-2 md:border-white block bg-transparent  hover:text-white uppercase text-[2rem] lg:text-lg no-underline"
                        onClick={() => {handleLocationChange(location.attributes.title, locations), setIsActive()}} 
                      >
                        {location.attributes.title}
                      </div>
                    ))}
                  </m.div>
                )} */}
              </div>
            </div>
          </m.div>
        )}
        
      </AnimatePresence>
    </LazyMotion>
   
  )
}