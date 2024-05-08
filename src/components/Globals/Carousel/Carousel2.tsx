"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Logo from "../../../styles/images/gymcenter.jpg";
import ImageCarousel from "./images";
const Carousel2 = () => {
  // const handleCarouselLoad = () => {
  //   setIsCarouselLoaded(true);
  // };

  const img = ImageCarousel.allList();

  return (
    <>
      <div
        className={` flex flex-col items-center bg-image-center py-5    w-screen `}
      >
        <Carousel
          infiniteLoop
          autoPlay
          showArrows={true}
          showStatus={false}
          // onChange={onChange}
          // onClickItem={onClickItem}
          // onClickThumb={onClickThumb}
          showThumbs={false}
          className="w-screen max-w-5xl border-neutral-200 border-2"
        >
          {img.map((img, i) => (
            <div key={i}>
              <Image src={img} alt="" />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Carousel2;
