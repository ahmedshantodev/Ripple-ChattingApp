import React, { useState } from "react";
import Box from "../components/layout/Box";
import Typography from "../components/layout/Typography";
import Input from "../components/layout/Input";
import Flex from "../components/layout/Flex";
import { MdOutlineMail } from "react-icons/md";
import Button from "../components/layout/Button";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState("");
  const [loadingButtonShow, setLoadingButtonShow] = useState(false);

  const handleSendButtonClick = () => {
    if (resetEmail) {
      setLoadingButtonShow(true);
      sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
          toast.success("Please check your email for reset your password", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "dark",
          });
          setLoadingButtonShow(false);
          navigate("/");
        })
        .catch((error) => {
          setLoadingButtonShow(false);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  return (
    <section className="w-full h-[100dvh] bg-[#dddcea] flex justify-center items-center">
      <Box className={"w-[600px] bg-white py-[30px] px-[50px] rounded-[10px]"}>
        <Typography
          varient="h4"
          className="font-poppins text-[30px] font-semibold mb-2.5"
        >
          Reset Password
        </Typography>
        <Typography className="font-poppins text-[16px] text-secoundaryText mb-[18px]">
          Forgot your password? No problem! Enter your email address and we'll
          send you a link. Click Link & Enter Your New Password
        </Typography>
        <label
          htmlFor="email"
          className="font-poppins font-semibold text-[20px] block mb-[5px]"
        >
          Enter Your Email
        </label>
        <Box
          className={
            "w-full flex items-center border border-[#dedede] px-[15px] rounded-md mb-[15px]"
          }
        >
          <MdOutlineMail className="text-[25px]" />
          <Input
            name={"email"}
            id={"email"}
            onChange={(e) => setResetEmail(e.target.value)}
            type={"text"}
            placeholder={"Enter Your Email"}
            className={
              " border-none outline-none py-[15px] pl-[15px] text-[16px] w-full placeholder:capitalize placeholder:text-[16px]"
            }
          />
        </Box>
        <Flex justifyContent={"between"}>
        {loadingButtonShow ? (
          <Button
            className={
              "bg-[#1565c0] w-[49%] rounded-md flex justify-center py-[4px]"
            }
          >
            <ColorRing
              visible={true}
              height="36"
              width="36"
              ariaLabel="color-ring-loading"
              wrapperClass="color-ring-wrapper"
              colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
            />
          </Button>
        ) : (
          <Button
            onClick={handleSendButtonClick}
            className={
              "rounded-md w-[49%] py-2.5 capitalize text-[16px] bg-[#1565c0] text-white font-semibold"
            }
          >
            Send reset Email
          </Button>
        )}
        <NavLink
          to={"/"}
          className={
            "rounded-md w-[49%] py-2.5 capitalize text-[16px] bg-[#dddcea] font-semibold text-center"
          }
        >
          back
        </NavLink>
        </Flex>
      </Box>
    </section>
  );
};

export default ForgotPassword;
