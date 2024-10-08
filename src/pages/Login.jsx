import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../slices/activeUserSlice";
import { toast } from "react-toastify";
import { getDatabase, ref, set } from "firebase/database";

const Login = () => {
  const auth = getAuth();
  const db = getDatabase();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeUserData = useSelector((state) => state.user.information);
  const [passwordShow, setPasswordShow] = useState(false);
  const [loginLodingBtnShow, setLoginLodingBtnShow] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
    userCredential: "",
  });

  useEffect(() => {
    if (activeUserData?.emailVerified == true) {
      navigate("/pages/chat/chat-with-friend");
    } else {
      navigate("/");
    }
  }, []);

  const handleLoginData = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLoginError((prev) => ({
      ...prev,
      [name]: "",
      userCredential: "",
    }));
  };

  const handleSignUp = () => {
    let email =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (!loginData.email) {
      setLoginError((prev) => ({
        ...prev,
        email: "Plase enter your email",
      }));
    } else if (!email.test(loginData.email)) {
      setLoginError((prev) => ({
        ...prev,
        email: "Plase enter a valid email",
      }));
    } else if (!loginData.password) {
      setLoginError((prev) => ({
        ...prev,
        password: "Please enter your Password",
      }));
    } else {
      signInWithEmailAndPassword(auth, loginData.email, loginData.password)
        .then((userCredential) => {
          if (userCredential.user.emailVerified == false) {
            toast.error(
              "To access your account, please verify your email address.",
              {
                position: "bottom-center",
                autoClose: 2500,
              }
            );
          } else {
            setLoginLodingBtnShow(!loginLodingBtnShow);
            const userInformation = userCredential?.user;
            localStorage.setItem("user", JSON.stringify(userInformation));
            dispatch(activeUser(userInformation));
            toast.success(
              "You've successfully logged in. Enjoy your experience!",
              {
                position: "bottom-center",
                autoClose: 2500,
              }
            );
            setLoginData({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            });
            navigate("/pages/chat/chat-with-friend");
            setLoginLodingBtnShow(false);
          }
        })
        .catch((error) => {
          setLoginLodingBtnShow(false);
          const errorMessage = error.message;
          if (errorMessage.includes("auth/invalid-credential")) {
            setLoginError((prev) => ({
              ...prev,
              userCredential: "Invalid email or password. Please try again",
            }));
          }
        });
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userInformation = result.user;
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userInformation,
            photoURL:
              "https://firebasestorage.googleapis.com/v0/b/ripple-6421f.appspot.com/o/default%20profile%2Fdefault-profile-picture1.jpg?alt=media&token=257626d5-45bb-45ac-b367-7addff57e779",
          })
        );
        dispatch(
          activeUser({
            ...userInformation,
            photoURL:
              "https://firebasestorage.googleapis.com/v0/b/ripple-6421f.appspot.com/o/default%20profile%2Fdefault-profile-picture1.jpg?alt=media&token=257626d5-45bb-45ac-b367-7addff57e779",
          })
        );
        set(ref(db, "users/" + userInformation.uid), {
          userid: userInformation.uid,
          username: userInformation.displayName,
          useremail: userInformation.email,
          userprofile:
            "https://firebasestorage.googleapis.com/v0/b/ripple-6421f.appspot.com/o/default%20profile%2Fdefault-profile-picture1.jpg?alt=media&token=257626d5-45bb-45ac-b367-7addff57e779",
        });
        navigate("/pages/chat/chat-with-friend");
      })
      .catch((error) => {});
  };

  return (
    <section className=" h-[100dvh] w-full bg-sign-up bg-no-repeat bg-cover flex justify-center md:items-center">
      <Box
        className={
          "w-full md:w-[95%] lg:w-[95%] xl:w-[90%] 2xl:w-[85%] bg-white p-3 sm:p-4 md:p-10 md:rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:flex md:items-center overflow-y-auto"
        }
      >
        <Box className={"w-full md:w-[45%] md:border-r-2 border-primaryBorder"}>
          <Typography
            className={
              "font-inter font-semibold text-[14px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[25px] text-center md:text-start md:pr-4 lg:pr-0"
            }
            variant={"h3"}
          >
            Ripple - Where Connections Make Waves
          </Typography>
          <Image
            src={loginSideImamge}
            alt={"sign up panel image"}
            className={"w-[60%] md:w-[90%] lg:w-[80%] mx-auto"}
          />
          <Typography
            className={
              "font-poppins font-semibold text-[9px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] text-center md:text-start text-secoundaryText px-5 sm:px-8 md:px-0 md:w-[88%]"
            }
            variant={"h3"}
          >
            We've saved your spot in the ripple, friend! ✨ Login and reconnect
            with the conversations that sparked your mind. Dive back into the
            heart of Ripple, where whispers turn into waves of connection. Let's
            keep the good vibes flowing!
          </Typography>
        </Box>
        <Box className={"w-full md:w-[65%] text-center"}>
          <Typography className="font-inter text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px] mt-4 sm:mt-6 md:mt-1 font-semibold text-center pb-3 sm:pb-5 md:pb-6 xl:pb-7 2xl:pb-8">
            Missed you! Login to reconnect with your crew.
          </Typography>
          <Flex
            justifyContent="center"
            alignItems="center"
            className={"gap-x-2 sm:gap-x-3 md:gap-x-2 lg:gap-x-5 2xl:gap-x-7"}
          >
            <Button
              onClick={handleGoogleLogin}
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
                className="absolute top-2/4 -translate-y-2/4 left-2/5 -translate-x-2/4 text-[10px] sm:text-[12px] md:text-[13px]
                lg:text-[14px] xl:text-[15px] 2xl:text-[16px] font-open-sans text-lg bg-white px-3"
              >
                OR
              </Typography>
            </Box>
            <Box className={"relative w-full mb-4 sm:mb-6 md:mb-8"}>
              <Input
                value={loginData.email}
                type={"email"}
                name={"email"}
                onChange={handleLoginData}
                placeholder={"Enter Your Email"}
                className={`w-full border ${
                  loginError.email ? "border-red-600" : "border-primaryBorder"
                } ${
                  loginError.email
                    ? "focus:outline-red-600"
                    : "focus:outline-[#141975]"
                } ${
                  loginError.email
                    ? "placeholder:text-red-600"
                    : "placeholder:text-secoundaryText"
                } placeholder:text-[13px]  sm:placeholder:text-[14px] lg:placeholder:text-[15px] xl:placeholder:text-[16px] py-[6px] sm:py-2.5 md:py-3 lg:py-4 px-2.5 sm:px-4 md:px-5 rounded-[40px]`}
              />
              {loginError.email && (
                <Typography className="absolute -bottom-[12px] sm:-bottom-[17px] ;md:-bottom-[15px] lg:-bottom-[20px] xl:-bottom-[22px] left-[12px] sm:left-[16px] md:left-[20px] text-red-600 text-[8px] sm:text-[11px] md:text-[10px] lg:text-[14px]">
                  {loginError.email}
                </Typography>
              )}
            </Box>
            <Box className={"relative mb-3 sm:mb-5 md:mb-5"}>
              <Input
                value={loginData.password}
                type={passwordShow ? "text" : "password"}
                name={"password"}
                onChange={handleLoginData}
                placeholder={"Enter Your Password ( 6+ characters )"}
                className={`w-full border ${
                  loginError.password
                    ? "border-red-600"
                    : "border-primaryBorder"
                } ${
                  loginError.password
                    ? "focus:outline-red-600"
                    : "focus:outline-[#141975]"
                } ${
                  loginError.password
                    ? "placeholder:text-red-600"
                    : "placeholder:text-secoundaryText"
                } placeholder:text-[13px]  sm:placeholder:text-[14px] lg:placeholder:text-[15px] xl:placeholder:text-[16px] py-[6px] sm:py-2.5 md:py-3 lg:py-4 px-2.5 sm:px-4 md:px-5 rounded-[40px]`}
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
              {loginError.password && (
                <Typography className="absolute -bottom-[12px] sm:-bottom-[17px] ;md:-bottom-[15px] lg:-bottom-[20px] xl:-bottom-[22px] left-[12px] sm:left-[16px] md:left-[20px] text-red-600 text-[8px] sm:text-[11px] md:text-[10px] lg:text-[14px]">
                  {loginError.password}
                </Typography>
              )}
              {loginError.userCredential && (
                <Typography className="absolute -bottom-[12px] sm:-bottom-[17px] ;md:-bottom-[15px] lg:-bottom-[20px] xl:-bottom-[22px] left-[12px] sm:left-[16px] md:left-[20px] text-red-600 text-[8px] sm:text-[11px] md:text-[10px] lg:text-[14px]">
                  {loginError.userCredential}
                </Typography>
              )}
            </Box>
            <Link
              to={"/forgot-password"}
              className="text-start font-poppins text-[12px] text-[#32375C] hover:underline block mb-1 sm:mb-2 md:mb-2 ml-5"
            >
              Forgotten Password?
            </Link>
            {loginLodingBtnShow ? (
              <Button
                onClick={handleSignUp}
                className={
                  "w-full mt-1 text-white font-poppins py-[7px] sm:py-[12px] md:py-[14px] lg:py-2 rounded-[30px] flex justify-center cursor-default bg-gray-300"
                }
              >
                <ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#ffffff",
                    "#ffffff",
                    "#ffffff",
                    "#ffffff",
                    "#ffffff",
                  ]}
                />
              </Button>
            ) : (
              <Button
                onClick={handleSignUp}
                className={
                  "w-full bg-[#141975] text-white font-poppins py-[7px] sm:py-[12px] md:py-[14px] lg:py-4 rounded-[30px]"
                }
              >
                Login
              </Button>
            )}

            <Link
              to={"/registration"}
              className="cursor-pointer hover:text-red-400 inline-block mt-3 sm:mt-4 md:mt-6 lg:mt-7 xl:mt-8 2xl:mt-10 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px]"
            >
              Don't have an account yet? Sign up for free to get started!
            </Link>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default Login;
