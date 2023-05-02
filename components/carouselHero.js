import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "@/components/image";
import { isMobile } from "react-device-detect";
import { useState, useEffect } from "react";
import Arrow from "@/public/svg/arrow.svg";

export default function CarouselHero({ title, content, images, position }) {
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    if (isMobile) {
      setPercentage(50);
    }
  }, []);

  const arrowStyles = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 30,
    height: 30,
    cursor: "pointer",
  };

  return (
    <div
      style={{
        // backgroundImage: `url(${CarouselBg.src})`,
        backgroundSize: `${isMobile ? "contain" : "cover"}`,
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
      className="lg:pb-20"
    >
      <div
        className={`flex flex-col lg:items-center  ${
          position ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <Carousel
          centerMode
          centerSlidePercentage={percentage}
          infiniteLoop
          autoPlay
          interval={4000}
          showStatus={false}
          showIndicators={true}
          showThumbs={false}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...arrowStyles, left: 15 }}
              >
                <Arrow width={36} className="rotate-180 flip" />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...arrowStyles, right: 15 }}
              >
                <Arrow width={36} />
              </button>
            )
          }
          className="lg:w-1/2 "
        >
          {images.map((image, index) => {
            return (
              <div className="" key={index}>
                <Image
                  image={image}
                  focalPoint={image.hotspot}
                  className="h-[214px] lg:h-[500px] w-full"
                />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
