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
    <section className=" h-[100dvh] w-full bg-sign-up bg-no-repeat bg-cover flex justify-center sm:items-center">
      <Box
        className={
          "w-full sm:w-[85%] bg-white p-3 sm:p-4 md:p-10 sm:rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] sm:flex sm:items-center overflow-y-auto"
        }
      >
        <Box
          className={
            "w-full sm:w-[45%] sm:border-r-2 border-primaryBorder "
          }
        >
          <Typography
            className={
              "font-inter font-semibold text-[14px] sm:text-[25px] text-center sm:text-start"
            }
            variant={"h3"}
            text="Ripple - Where Connections Make Waves"
          />
          <Image
            src={signupSideImamge}
            alt={"sign up panel image"}
            className={"w-[60%] sm:w-[80%] mx-auto"}
          />
          <Typography
            className={
              "font-poppins font-semibold text-[9px] sm:text-[15px] text-center sm:text-start text-secoundaryText px-5 sm:px-0 sm:w-[88%]"
            }
            variant={"h3"}
            text="On Ripple, whispers don't vanish on the breeze. They become ripples, expanding outward and connecting with others who share your curiosity, concerns, or passions. Witness the power of anonymous dialogue as conversations unfold, sparking new perspectives and fostering understanding."
          />
        </Box>
        <Box className={"w-full sm:w-[65%] bg-s-100 text-center"}>
          <Typography
            className=" font-inter text-[16px] sm:text-[26px] mt-4 sm:mt-1 font-semibold text-center pb-3 sm:pb-8"
            text={"Create Your Free Ripple Account"}
          />
          <Flex
            justifyContent="center"
            alignItems="center"
            className={"gap-x-2 sm:gap-x-7"}
          >
            <Button
              className={
                "flex items-center gap-x-1 sm:gap-x-3 sm:w-[35%] bg-[#4474f4] text-white text-[8px] sm:text-[16px] font-poppins pl-2 sm:pl-2.5 pr-5 py-2 sm:py-2.5 rounded-[30px] box-content sm:box-border"
              }
            >
              <Image
                src={googleIcon}
                alt={"google icon"}
                className={
                  "w-[10px] sm:w-[30px] bg-white p-1 rounded-full box-content"
                }
              />
              Continue with Google
            </Button>
            <Button
              className={
                "flex items-center gap-x-1 sm:gap-x-3 sm:w-[35%] bg-[#4474f4] text-white text-[8px] sm:text-[16px] font-poppins pl-2 sm:pl-2.5 pr-5 py-2 sm:py-2.5 rounded-[30px] box-content sm:box-border"
              }
            >
              <Image
                src={facebookIcon}
                alt={"google icon"}
                className={
                  "w-[10px] sm:w-[30px] bg-white p-1 rounded-full box-content"
                }
              />
              Continue with Facebook
            </Button>
          </Flex>
          <Box className={"w-[84%] mx-auto"}>
            <Box
              className={
                "w-full bg-primaryBorder h-[1px] sm:h-[2px] relative my-5 sm:my-8"
              }
            >
              <Typography
                variant={"span"}
                text="OR"
                className="absolute top-2/4 -translate-y-2/4 left-2/5 -translate-x-2/4 text-[10px] sm:text-[16px] font-open-sans text-lg bg-white px-3"
              />
            </Box>
            <Flex justifyContent={"between"} className={"mb-4 sm:mb-8"}>
              <Box className={"relative w-[48%] sm:w-[49%]"}>
                <Input
                  type={"text"}
                  name={"name"}
                  placeholder={"First Name"}
                  className={
                    "w-full border border-primaryBorder placeholder:text-secoundaryText placeholder:text-[13px] sm:placeholder:text-[16px] focus:outline-[#141975] py-[6px] sm:py-4 px-2.5 sm:px-5 rounded-[40px]"
                  }
                />
                <Typography
                  text="Please Enter Your First Name"
                  className="absolute -bottom-[12px] left-[12px] text-red-600 text-[8px] sm:text-[14px]"
                />
              </Box>
              <Box className={"relative w-[48%] sm:w-[49%]"}>
                <Input
                  type={"text"}
                  name={"name"}
                  placeholder={"Last Name"}
                  className={
                    "w-full border border-primaryBorder placeholder:text-secoundaryText placeholder:text-[13px] sm:placeholder:text-[16px] focus:outline-[#141975] py-[6px] sm:py-4 px-2.5 sm:px-5 rounded-[40px]"
                  }
                />
                <Typography
                  text="Please Enter Your Last Name"
                  className="absolute -bottom-[12px] left-[12px] text-red-600 text-[8px] sm:text-[14px]"
                />
              </Box>
            </Flex>
            <Box className={"relative w-full mb-4 sm:mb-8"}>
              <Input
                type={"email"}
                name={"email"}
                placeholder={"Enter Your Email"}
                className={
                  "w-[100%] border border-primaryBorder placeholder:text-secoundaryText placeholder:text-[13px] sm:placeholder:text-[16px] focus:outline-[#141975] py-[6px] sm:py-4 px-2.5 sm:px-5 rounded-[40px]"
                }
              />
               <Typography text="Please Enter Your Email" className=" absolute -bottom-[12px] left-[12px] text-red-600 text-[8px] sm:text-[14px]"/>
            </Box>
            <Box className={"relative mb-5 sm:mb-8"}>
              <Input
                type={passwordShow ? "text" : "password"}
                name={"password"}
                placeholder={"Enter Your Password ( 6+ characters )"}
                className={
                  "w-[100%] border border-primaryBorder placeholder:text-secoundaryText placeholder:text-[13px] sm:placeholder:text-[16px] focus:outline-[#141975] py-[6px] sm:py-4 px-2.5 sm:px-5 rounded-[40px]"
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
                className="absolute -bottom-[12px] left-[12px] text-red-600 text-[8px] sm:text-[14px]"
              />
            </Box>
            <Button
              className={
                "w-full bg-[#141975] text-white font-poppins py-[7px] sm:py-4 rounded-[30px]"
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
                className="mt-3 sm:mt-10 text-[12px] sm:text-[16px]"
              />
            </Link>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default Registration;
