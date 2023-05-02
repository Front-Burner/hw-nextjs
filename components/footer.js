import FancyLink from "@/components/fancyLink";
import { useLocationContext } from "@/context/location";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useCycle,
  AnimatePresence,
} from "framer-motion";
import { NearestLocation } from "@/helpers/location";

export default function Footer({ contact, locations }) {
  const [sharedState, setShareState] = useLocationContext();
  const [isActive, setIsActive] = useCycle(false, true);
  const [cookies, setCookie] = useCookies(["cookie-name"]);
  const [isReserveView, setIsReserveView] = useCycle(false, true);
  const [position, setPosition] = useState({});
  const store = useLocationContext();
  const [error, setError] = useState(true);
  const locationFilter = locations.filter((node) => node._id === store[0].id);

  const location = locationFilter[0];

  //Sets coordinates
  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setError(false);
  };

  //Get location
  const getLocation = () => {
    const geo = navigator.geolocation;
    if (!geo) {
      return;
    }
    let watcher = geo.getCurrentPosition(onChange);
    setError(false);
    return () => geo.clearWatch(watcher);
  };

  const handleLocationChange = (item, locations) => {
    const location = locations.filter((node) => node.title === item);
    let expDate = new Date();
    expDate.setMinutes(expDate.getMinutes() + 5);
    setShareState({
      id: location[0]._id,
      title: location[0].title,
      slug: location[0].slug.current,
      address: location[0].address,
      lat: location[0].map.lat,
      lng: location[0].map.lng,
    });
    setCookie(
      "nearestLocation",
      {
        id: location[0]._id,
        title: location[0].title,
        slug: location[0].slug.current,
        address: location[0].address,
        lat: location[0].map.lat,
        lng: location[0].map.lng,
      },
      {
        path: "/",
        expires: expDate,
      }
    );
  };

  //Pass user location to find closest store location and stores it as a cookie
  useEffect(() => {
    if (error === false) {
      const nearest = NearestLocation(locations, position, error);
      let expDate = new Date();
      expDate.setMinutes(expDate.getMinutes() + 5);
      if (sharedState.id === 0 && position) {
        setCookie(
          "nearestLocation",
          {
            id: nearest.id,
            title: nearest.title,
            slug: nearest.slug,
            address: nearest.address,
            lat: nearest.lat,
            lng: nearest.lng,
            openTable: nearest.openTable,
            publishOpenTable: nearest.publishOpenTable,
          },
          {
            path: "/",
            expires: expDate,
          }
        );
        setShareState({
          id: nearest.id,
          title: nearest.title,
          slug: nearest.slug,
          address: nearest.address,
          lat: nearest.lat,
          lng: nearest.lng,
          openTable: nearest.openTable,
          publishOpenTable: nearest.publishOpenTable,
        });
      }
    }
  }, [position]);

  useEffect(() => {
    if (cookies.nearestLocation) {
      setShareState({
        id: cookies.nearestLocation.id,
        title: cookies.nearestLocation.title,
        slug: cookies.nearestLocation.slug,
        address: cookies.nearestLocation.address,
        lat: cookies.nearestLocation.lat,
        lng: cookies.nearestLocation.lng,
      });
    } else {
      getLocation();
    }
  }, []);

  return (
    <footer className="flex flex-wrap sticky h-16 border-t-2 border-sv-light-gray bottom-0 z-30 bg-sv-white items-center bg-slate text-washed-creme uppercase font-cast text-4xl">
      <LazyMotion features={domAnimation}>
        <m.div className="flex text-center w-full">
          <m.div className="flex w-1/2 justify-center">
            <m.div
              className="flex justify-center items-center z-40 relative h-full"
              onClick={() => {
                setIsActive();
              }}
            >
              <div className="flex justify-center bg-slate text-washed-creme text-4xl">
                {sharedState.title}
                <div className=" w-[2rem] pr-4 lg:pl-8 pl-4  flex h-full justify-center items-center z-40">
                  <m.div
                    animate={isActive ? "open" : "closed"}
                    transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
                    variants={{
                      closed: { rotate: 0 },
                      open: { rotate: "-90deg" },
                    }}
                    className={`font-body text-sv-teal`}
                  >
                    {`>`}
                  </m.div>
                </div>
              </div>
            </m.div>
            <div className="relative lg:w-full  w-screen ">
              <AnimatePresence initial={false}>
                {isActive && (
                  <m.div
                    key="content"
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
                    className="absolute text-white left-0 bg-slate   w-[50vw] z-50 bottom-14 text-center translate-y-[3px] border-t-2 border-r-2  border-sv-grey"
                  >
                    {locations.map((location) => {
                      return (
                        <div
                          onClick={() => {
                            handleLocationChange(location.title, locations);
                            setIsActive();
                          }}
                          key={location.title}
                        >
                          {location.title}
                        </div>
                      );
                    })}
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </m.div>

          <m.div className="flex w-1/2 justify-center">Test</m.div>
        </m.div>
      </LazyMotion>
    </footer>
  );
}
