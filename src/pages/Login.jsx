import React, { useState } from "react";
import Flex from "../components/layout/Flex";
import Box from "../components/layout/Box";
import Typography from "../components/layout/Typography";
import Image from "../components/layout/Image";
import Button from "../components/layout/Button";
import Input from "../components/layout/Input";
import loginSideImamge from "/public/images/login image.jpg";
import googleIcon from "/public/images/google icon.png";
import facebookIcon from "/public/images/facebook icon.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";

const Registration = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  return (
    <section className=" h-[100dvh] w-full bg-sign-up bg-no-repeat bg-cover flex justify-center items-center">
      <Box
        className={
          "w-[85%] bg-white p-10 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center"
        }
      >
        <Box className={"w-[45%] border-r-2 border-primaryBorder"}>
          <Typography
            className={"font-inter font-semibold text-[25px]"}
            variant={"h3"}
            text="Ripple - Where Connections Make Waves"
          />
          <Image
            src={loginSideImamge}
            alt={"sign up panel image"}
            className={"w-[78%] mx-auto"}
          />
          <Typography
            className={
              "font-poppins font-semibold text-[15px] text-secoundaryText w-[88%]"
            }
            variant={"h3"}
            text="We've saved your spot in the ripple, friend! ✨ Login and reconnect with the conversations that sparked your mind. Dive back into the heart of Ripple, where whispers turn into waves of connection. Let's keep the good vibes flowing! "
          />
        </Box>
        <Box className={"w-[65%] bg-s-100 text-center"}>
          <Typography
            className=" font-inter text-[26px] font-semibold text-center pb-8"
            text={"Missed you! Login to reconnect with your crew."}
          />
          <Flex justifyContent={"center"} className={"gap-x-7"}>
            <Button
              className={
                "flex items-center gap-x-3 w-[35%] bg-[#4474f4] text-white font-poppins pl-2.5 pr-5 py-2.5 rounded-[30px]"
              }
            >
              <Image
                src={googleIcon}
                alt={"google icon"}
                className={"w-[30px] bg-white p-1 rounded-full box-content"}
              />
              Continue with Google
            </Button>
            <Button
              className={
                "flex items-center gap-x-3 w-[35%] bg-[#4474f4] text-white font-poppins pl-2.5 pr-5 py-2.5 rounded-[30px]"
              }
            >
              <Image
                src={facebookIcon}
                alt={"google icon"}
                className={"w-[30px] bg-white p-1 rounded-full box-content"}
              />
              Continue with Facebook
            </Button>
          </Flex>
          <Box className={"w-[84%] mx-auto"}>
            <Box className={"w-full bg-primaryBorder h-[2px] relative my-8"}>
              <Typography
                variant={"span"}
                text="OR"
                className="absolute top-2/4 -translate-y-2/4 left-2/5 -translate-x-2/4 font-open-sans text-lg bg-white px-3"
              />
            </Box>
            <Input
              type={"email"}
              name={"email"}
              placeholder={"Enter Your Email"}
              className={
                "w-[100%] border border-primaryBorder placeholder:text-secoundaryText focus:outline-[#141975] py-4 px-5 rounded-[40px] mb-8"
              }
            />
            <Box className={"relative  mb-8"}>
              <Input
                type={passwordShow ? "text" : "password"}
                name={"password"}
                placeholder={"Enter Your Password ( 6+ characters )"}
                className={
                  "w-[100%] border border-primaryBorder placeholder:text-secoundaryText focus:outline-[#141975] py-4 px-5 rounded-[40px]"
                }
              />
              {passwordShow ? (
                <IoEye
                  onClick={() => setPasswordShow(!passwordShow)}
                  className="absolute right-6 top-2/4 -translate-y-2/4 text-[20px] text-secoundaryText cursor-pointer"
                />
              ) : (
                <IoEyeOff
                  onClick={() => setPasswordShow(!passwordShow)}
                  className="absolute right-6 top-2/4 -translate-y-2/4 text-[20px] text-secoundaryText cursor-pointer"
                />
              )}
            </Box>
            <Button
              className={
                "w-full bg-[#141975] text-white font-poppins pl-2.5 pr-5 py-4 rounded-[30px]"
              }
            >
              Login
            </Button>
            <Link
              to={"/registration"}
              className="cursor-pointer hover:text-[#a6c9ff] inline-block"
            >
              <Typography
                text="Don't have an account yet? Sign up for free to get started!"
                className="mt-10"
              />
            </Link>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default Registration;
