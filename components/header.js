import { useState, useEffect, useContext } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useCycle,
  AnimatePresence,
} from "framer-motion";
import FancyLink from "@/components/fancyLink";
import { useLocationContext } from "@/context/location";
import { NearestLocation } from "@/helpers/location";
import { ConsoleView } from "react-device-detect";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { noop } from "lodash";
import Navigation from "./navigation";
import TopBun from "@/public/svg/topBun.svg";
import Inside from "@/public/svg/inside.svg";
import BottomBun from "@/public/svg/bottomBun.svg";
import MenuButton from "./menuButton";
import MobileNavButton from "./mobileNavButton";

export default function Header({ locations, route, navigation, preview }) {
  const [sharedState, setShareState] = useLocationContext();
  const [position, setPosition] = useState({});
  const [error, setError] = useState(true);
  const [cookies, setCookie] = useCookies(["cookie-name"]);
  const [isOpen, toggleDropdown] = useCycle(false, true);
  const [isActive, setIsActive] = useCycle(false, true);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  //Get Window size
  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  let deviceHeight = `${windowSize.height}px`;

  //Changes Location manually
  const handleLocationChange = (item, locations) => {
    const location = locations.filter((node) => node.title === item);
    let expDate = new Date();
    expDate.setDate(expDate.getDate() + 30);
    setShareState({
      id: location[0]._id,
      title: location[0].title,
      slug: location[0].slug.current,
    });
    setCookie(
      "nearestLocation",
      {
        id: location[0]._id,
        title: location[0].title,
        slug: location[0].slug,
      },
      {
        path: "/",
        expires: expDate,
      }
    );
  };

  //locks scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <header
      className={`${
        isOpen ? "fixed" : "absolute"
      } pt-5 px-5 mb-5 absolute bg-[url('../public/images/2.png')] z-50 w-full font-bold text-base md:text-4xl `}
    >
      <LazyMotion features={domAnimation}>
        <div className="flex border-b border-black  py-2 items-end z-50">
          <FancyLink
            destination="/"
            a11yText="Navigate to the home page"
            label="Front Burner"
            extraClasses="text-[2rem] mb-1 no-underline md:mb-0 flex z-50"
          />

          <div className="hidden lg:flex flex-col  z-50 mx-auto ">
            <m.button
              onClick={setIsActive}
              className="w-full lg:w-[20rem] cursor-pointer bg-red-700 px-20 hover:text-gray-500 lg:px-10 py-2  block bg-transparent uppercase text-[2rem] lg:text-lg no-underline"
            >
              {sharedState.title}
            </m.button>
            <div className="relative w-full">
              <AnimatePresence initial={false}>
                {isActive && (
                  <m.div
                    key="nav"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="absolute bg-red-700"
                  >
                    {locations.map((location) => {
                      if (location.title !== sharedState.title) {
                        return (
                          <div
                            className="w-full cursor-pointer text-center lg:w-[20rem] px-20 lg:px-10 py-2  block bg-transparent hover:bg-red-900 hover:text-gray-500 uppercase text-[2rem] lg:text-lg no-underline"
                            onClick={() => {
                              handleLocationChange(location.title, locations),
                                setIsActive();
                            }}
                            key={location.title}
                          >
                            {location.title}
                          </div>
                        );
                      }
                    })}
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <nav className="lg:ml-auto">
            <div className="hidden lg:flex space-x-6">
              <Navigation navigation={navigation[0]} />
            </div>
            <m.div
              initial={"closed"}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
              variants={{
                closed: { y: "-100%" },
                open: { y: 0 },
              }}
              className="absolute bg-white left-0 top-0 w-full items-end overflow-scroll"
              style={{ height: deviceHeight }}
            >
              <m.div
                className="flex flex-col h-full justify-end p-5 text-[2rem] gap-y-5"
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
                variants={{
                  closed: { opacity: 0 },
                  open: { opacity: 1 },
                }}
              >
                <Navigation navigation={navigation[0]} />
              </m.div>
              <m.div
                className="flex flex-col p-5 text-[1rem] gap-y-5"
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
                variants={{
                  closed: { opacity: 0, backgroundColor: "white" },
                  open: { opacity: 1, backgroundColor: "lightgray" },
                }}
              >
                Test
              </m.div>
            </m.div>
          </nav>

          <div className={`lg:hidden ml-auto z-50`}>
            <MobileNavButton />
            {/* <MenuButton onClick={toggleDropdown} isOpen={isOpen} /> */}
          </div>
        </div>

        {preview && (
          <div className="w-full h-8 text-center text-xl bg-red-300">
            Preview Mode
          </div>
        )}
      </LazyMotion>
    </header>
  );
}
