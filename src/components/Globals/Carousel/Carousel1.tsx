"use client";
import { Image } from "@nextui-org/react";
import AOS from "aos";
import "aos/dist/aos.css";
const Carousel1 = () => {
  AOS.init({
    duration: 500,
    easing: "ease-in-cubic",
  });
  return (
    <>
      <div className={` flax flex-col items-center py-20   w-12/12 `}>
        <div data-aos="fade-up" className="">
          <Image
            radius="none"
            src={
              "https://firebasestorage.googleapis.com/v0/b/cuota-admin-2e674.appspot.com/o/img%2FIMG_6557.JPG?alt=media&token=4c89fa78-9423-487e-ad8a-badf815cf176"
            }
            alt=""
            className=" "
          />
        </div>
        <div data-aos="fade-up">
          <Image
            radius="none"
            src={
              "https://firebasestorage.googleapis.com/v0/b/cuota-admin-2e674.appspot.com/o/img%2FIMG_6558.JPG?alt=media&token=cf6db3df-d05c-4e22-b8f5-ccda2aebfd55"
            }
            alt=""
            className=" "
          />
        </div>
        <div data-aos="fade-up" className="">
          <Image
            radius="none"
            src={
              "https://firebasestorage.googleapis.com/v0/b/cuota-admin-2e674.appspot.com/o/img%2FIMG_6578.JPG?alt=media&token=b2ec2547-220a-4459-92eb-1a90bcc79fc1"
            }
            alt=""
            className=""
          />
        </div>
      </div>
    </>
  );
};

export default Carousel1;
