import React, { useEffect } from "react";
import Box from "../components/layout/Box";
import Image from "../components/layout/Image";
import emailVerification from "/public/images/email verification image.jpg";
import Typography from "../components/layout/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { activeUser } from "../slices/activeUserSlice";
import Button from "../components/layout/Button";

const EmailVerification = () => {

  // import { getAuth } from "firebase/auth";

  // const auth = getAuth();
  // const user = auth.currentUser;
  // if (user !== null) {
  //   // The user object has basic properties such as display name, email, etc.
  //   const displayName = user.displayName;
  //   const email = user.email;
  //   const photoURL = user.photoURL;
  //   const emailVerified = user.emailVerified;
  
  //   // The user's ID, unique to the Firebase project. Do NOT use
  //   // this value to authenticate with your backend server, if
  //   // you have one. Use User.getToken() instead.
  //   const uid = user.uid;
  // }





  const activeUserData = useSelector((state) => state.user.information);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleClick = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user.emailVerified == true) {
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(activeUser(user));
        navigate("/pages/chat");
        toast.success("Your email has been verified, Enjoy your experience!", {
          position: "bottom-center",
          autoClose: 2500,
        });
      } else if (user.emailVerified == false) {
        toast.error("Please Varify Your Email First", {
          position: "bottom-center",
          autoClose: 2500,
        });
      }
    });
  };

  return (
    <section className="w-full h-[100dvh] bg-[#dddcea] bg-no-repeat bg-cover flex justify-center items-center">
      <Box
        className={
          "bg-white py-6 px-7 rounded-[10px] w-[700px] text-center box-content"
        }
      >
        <Image
          src={emailVerification}
          alt={"email verification image"}
          className={"w-[80%] mx-auto"}
        />
        <Typography
          variant="h3"
          className="text-[20px] font-semibold font-mono"
        >
          Verify your email address
        </Typography>
        <Typography className="font-inter px-2">
          A verification link has been sent by Email to{" "}
          <Typography variant="span" className="font-bold">
            {activeUserData.email}
          </Typography>
        </Typography>
        <Typography>
          Please Check Your Email & click the link to verify your email
        </Typography>
        <Button
          onClick={handleClick}
          className={
            "inline-block bg-[#85ca4c] px-10 py-2 text-[20px] font-mono text-white mt-5 mb-3 rounded-[30px] transition-all ease-in-out duration-200 active:-translate-y-[3px]"
          }
        >
          Let's Go!
        </Button>
      </Box>
    </section>
  );
};

export default EmailVerification;
