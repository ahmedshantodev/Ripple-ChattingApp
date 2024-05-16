import React, { useState } from "react";
import Flex from "../components/layout/Flex";
import Box from "../components/layout/Box";
import Typography from "../components/layout/Typography";
import Image from "../components/layout/Image";
import Button from "../components/layout/Button";
import Input from "../components/layout/Input";
import signupSideImamge from "/public/images/signup image.png";
import googleIcon from "/public/images/google icon.png";
import facebookIcon from "/public/images/facebook icon.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";

const Registration = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  return (
    <section className=" h-[100dvh] w-full bg-sign-up bg-no-repeat bg-cover flex justify-center md:items-center">
      <Box
        className={
          "w-full md:w-[93%] lg:w-[95%] xl:w-[90%] 2xl:w-[85%] bg-white p-3 sm:p-4 md:p-10 md:rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:flex md:items-center overflow-y-auto"
        }
      >
        <Box className={"w-full md:w-[45%] md:border-r-2 border-primaryBorder"}>
          <Typography
            className={
              "font-inter font-semibold text-[14px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[25px] text-center md:text-start md:pr-4 lg:pr-0"
            }
            variant={"h3"}
            text="Ripple - Where Connections Make Waves"
          />
          <Image
            src={signupSideImamge}
            alt={"sign up panel image"}
            className={"w-[60%] md:w-[90%] lg:w-[80%] mx-auto"}
          />
          <Typography
            className={
              "font-poppins font-semibold text-[9px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] text-center md:text-start text-secoundaryText px-5 sm:px-8 md:px-0 md:w-[88%]"
            }
            variant={"h3"}
            text="On Ripple, whispers don't vanish on the breeze. They become ripples, expanding outward and connecting with others who share your curiosity, concerns, or passions. Witness the power of anonymous dialogue as conversations unfold, sparking new perspectives and fostering understanding."
          />
        </Box>
        <Box className={"w-full md:w-[65%] text-center"}>
          <Typography
            className="font-inter text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px] mt-4 sm:mt-6 md:mt-1 font-semibold text-center pb-3 sm:pb-5 md:pb-6 xl:pb-7 2xl:pb-8"
            text={"Create Your Free Ripple Account"}
          />
          <Flex
            justifyContent="center"
            alignItems="center"
            className={
              "gap-x-2 sm:gap-x-3 md:gap-x-2 lg:gap-x-5 2xl:gap-x-7"
            }
          >
            <Button
              className={
                "flex items-center gap-x-1 sm:gap-x-2 lg:gap-x-3 bg-[#4474f4] text-white text-[8px] sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[16px] font-poppins pl-2 sm:pl-2.5 pr-5 py-2 sm:py-2.5 md:py-2 lg:py-2.5 rounded-[30px] box-content"
              }
            >
              <Image
                src={googleIcon}
                alt={"google icon"}
                className={
                  "w-[10px] sm:w-[18px] md:w-[20px] lg:w-[24px] xl:w-[26] 2xl:w-[30px] bg-white p-1 rounded-full box-content"
                }
              />
              Continue with Google
            </Button>
            <Button
              className={
                "flex items-center gap-x-1 sm:gap-x-2 lg:gap-x-3  bg-[#4474f4] text-white text-[8px] sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[16px] font-poppins pl-2 sm:pl-2.5 pr-5 py-2 sm:py-2.5 md:py-2 lg:py-2.5 rounded-[30px] box-content "
              }
            >
              <Image
                src={facebookIcon}
                alt={"google icon"}
                className={
                  "w-[10px] sm:w-[18px] md:w-[20px] lg:w-[24px] xl:w-[26] 2xl:w-[30px] bg-white p-1 rounded-full box-content"
                }
              />
              Continue with Facebook
            </Button>
          </Flex>
          <Box className={"w-[84%] mx-auto"}>
            <Box
              className={
                "w-full bg-primaryBorder h-[1px] md:h-[2px] relative my-5 sm:my-8"
              }
            >
              <Typography
                variant={"span"}
                text="OR"
                className="absolute top-2/4 -translate-y-2/4 left-2/5 -translate-x-2/4 text-[10px] sm:text-[12px] md:text-[13px]
                lg:text-[14px] xl:text-[15px] 2xl:text-[16px] font-open-sans text-lg bg-white px-3"
              />
            </Box>
            <Flex justifyContent={"between"} className={"mb-4 sm:mb-6 lg:mb-8"}>
              <Box className={"relative w-[48%] sm:w-[49%]"}>
                <Input
                  type={"text"}
                  name={"name"}
                  placeholder={"First Name"}
                  className={
                    "w-full border border-primaryBorder placeholder:text-secoundaryText placeholder:text-[13px]  sm:placeholder:text-[14px] lg:placeholder:text-[15px] xl:placeholder:text-[16px] focus:outline-[#141975] py-[6px] sm:py-2.5 md:py-3 lg:py-4 px-2.5 sm:px-4 md:px-5 rounded-[40px]"
                  }
                />
                <Typography
                  text="Please Enter Your First Name"
                  className="absolute -bottom-[12px] sm:-bottom-[17px] ;md:-bottom-[15px] lg:-bottom-[20px] xl:-bottom-[22px] left-[12px] sm:left-[16px] md:left-[20px] text-red-600 text-[8px] sm:text-[11px] md:text-[10px] lg:text-[14px]"
                />
              </Box>
              <Box className={"relative w-[48%] sm:w-[49%]"}>
                <Input
                  type={"text"}
                  name={"name"}
                  placeholder={"Last Name"}
                  className={
                    "w-full border border-primaryBorder placeholder:text-secoundaryText placeholder:text-[13px]  sm:placeholder:text-[14px] lg:placeholder:text-[15px] xl:placeholder:text-[16px] focus:outline-[#141975] py-[6px] sm:py-2.5 md:py-3 lg:py-[15px] px-2.5 sm:px-4 md:px-5 rounded-[40px]"
                  }
                />
                <Typography
                  text="Please Enter Your Last Name"
                  className="absolute -bottom-[12px] sm:-bottom-[17px] ;md:-bottom-[15px] lg:-bottom-[20px] xl:-bottom-[22px] left-[12px] sm:left-[16px] md:left-[20px] text-red-600 text-[8px] sm:text-[11px] md:text-[10px] lg:text-[14px]"
                />
              </Box>
            </Flex>
            <Box className={"relative w-full mb-4 sm:mb-6 md:mb-8"}>
              <Input
                type={"email"}
                name={"email"}
                placeholder={"Enter Your Email"}
                className={
                  "w-full border border-primaryBorder placeholder:text-secoundaryText placeholder:text-[13px]  sm:placeholder:text-[14px] lg:placeholder:text-[15px] xl:placeholder:text-[16px] focus:outline-[#141975] py-[6px] sm:py-2.5 md:py-3 lg:py-[15px] px-2.5 sm:px-4 md:px-5 rounded-[40px]"
                }
              />
              <Typography
                text="Please Enter Your Email"
                className="absolute -bottom-[12px] sm:-bottom-[17px] ;md:-bottom-[15px] lg:-bottom-[20px] xl:-bottom-[22px] left-[12px] sm:left-[16px] md:left-[20px] text-red-600 text-[8px] sm:text-[11px] md:text-[10px] lg:text-[14px]"
              />
            </Box>
            <Box className={"relative mb-5 sm:mb-8 md:mb-8"}>
              <Input
                type={passwordShow ? "text" : "password"}
                name={"password"}
                placeholder={"Enter Your Password ( 6+ characters )"}
                className={
                  "w-full border border-primaryBorder placeholder:text-secoundaryText placeholder:text-[13px]  sm:placeholder:text-[14px] lg:placeholder:text-[15px] xl:placeholder:text-[16px] focus:outline-[#141975] py-[6px] sm:py-2.5 md:py-3 lg:py-[15px] px-2.5 sm:px-4 md:px-5 rounded-[40px]"
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
              <Typography
                text="Please Enter Your Password"
                className="absolute -bottom-[12px] sm:-bottom-[17px] ;md:-bottom-[15px] lg:-bottom-[20px] xl:-bottom-[22px] left-[12px] sm:left-[16px] md:left-[20px] text-red-600 text-[8px] sm:text-[11px] md:text-[10px] lg:text-[14px]"
              />
            </Box>
            <Button
              className={
                "w-full bg-[#141975] text-white font-poppins py-[7px] sm:py-[12px] md:py-[14px] lg:py-4 rounded-[30px]"
              }
            >
              Sign UP
            </Button>
            <Link
              to={"/login"}
              className="cursor-pointer hover:text-red-400 inline-block"
            >
              <Typography
                text="already have account? Login"
                className="mt-3 sm:mt-4 md:mt-6 lg:mt-7 xl:mt-8 2xl:mt-10 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px]"
              />
            </Link>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default Registration;
