import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Typography from "../layout/Typography";
import Image from "../layout/Image";
import Box from "../layout/Box";
import ListItem from "../layout/ListItem";
import List from "../layout/List";
import { TiHome } from "react-icons/ti";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { HiOutlineUser, HiOutlineUsers } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import coverphoto from "/public/images/1711471680698.jpg";
import { CiLogout } from "react-icons/ci";
import { getAuth, signOut } from "firebase/auth";
import { activeUser } from "../../slices/activeUserSlice";
import { activeGroup } from "../../slices/activeGroupSlice";
import { GoKey } from "react-icons/go";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdPhotoCamera } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import Button from "../layout/Button";
import { CiEdit } from "react-icons/ci";
import { PiNewspaperClipping } from "react-icons/pi";
import { IoImagesSharp } from "react-icons/io5";
import ProfileUploadModal from "../layout/ProfileUploadModal";
import { MdLogout } from "react-icons/md";

const SidebarMenu = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeUserData = useSelector((state) => state?.user?.information);
  const [accountSettingShow, setAccountSettingShow] = useState(false);
  const [profileUploadModal, setProfileUploadModal] = useState(false);
  const profileUploadModalRef = useRef();
  const profileUploadModalButtonRef = useRef();
  const profileSettingModalRef = useRef();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        dispatch(activeUser(null));
        localStorage.removeItem("activeGroup");
        dispatch(activeGroup(null));
        navigate("/login");
      })
      .catch((error) => {});
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (profileUploadModalButtonRef.current.contains(e.target)) {
        setProfileUploadModal(true);
      } else if (!profileUploadModalRef.current.contains(e.target)) {
        setProfileUploadModal(false);
      }
    });
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!profileSettingModalRef.current.contains(e.target)) {
        setAccountSettingShow(false);
      }
    });
  }, []);

  return (
    <>
      <section className=" relative h-full pl-6">
        <Typography className="font-open-sans font-bold text-[26px]">
          RIPPLE!
        </Typography>
        <nav className="mt-8">
          <List>
            <ListItem className={"mb-4"}>
              <NavLink
                to={"/pages/home"}
                className={
                  pathname.includes("/pages/home")
                    ? "w-[138px] bg-[#32375c] text-white py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px]"
                    : "w-[138px] py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#32375c] hover:text-white"
                }
              >
                <TiHome className="text-[24px] mb-[3px]" /> Home
              </NavLink>
            </ListItem>
            <ListItem className={"mb-4"}>
              <NavLink
                to={"/pages/chat"}
                className={
                  pathname.includes("/pages/chat")
                    ? "w-[138px] bg-[#32375c] text-white py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px]"
                    : "w-[138px] py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#32375c] hover:text-white"
                }
              >
                <HiOutlineChatBubbleLeft className="text-[24px]" /> Chat
              </NavLink>
            </ListItem>

            <ListItem className={"mb-4"}>
              <NavLink
                to={"/pages/friends/all-friends"}
                className={
                  pathname.includes("/pages/friends")
                    ? "w-[138px] bg-[#32375c] text-white py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px]"
                    : "w-[138px] py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#32375c] hover:text-white"
                }
              >
                <HiOutlineUser className="text-[24px]" /> Friends
              </NavLink>
            </ListItem>
            <ListItem className={"mb-4"}>
              <NavLink
                to={"/pages/groups"}
                className={
                  pathname.includes("/pages/groups")
                    ? "w-[138px] bg-[#32375c] text-white py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px]"
                    : "w-[138px] py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#32375c] hover:text-white"
                }
              >
                <HiOutlineUsers className="text-[24px]" /> Group
              </NavLink>
            </ListItem>
            <ListItem className={"mb-4"}>
              <NavLink
                to={"/pages/feeds"}
                className={
                  pathname.includes("/pages/feeds")
                    ? "w-[138px] bg-[#32375c] text-white py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px]"
                    : "w-[138px] py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#32375c] hover:text-white"
                }
              >
                <IoNewspaperOutline className="text-[24px]" /> Feeds
              </NavLink>
            </ListItem>
          </List>
        </nav>
        <div ref={profileSettingModalRef}>
          <Button
            onClick={() => setAccountSettingShow(!accountSettingShow)}
            className={
              accountSettingShow
                ? "flex items-center w-[180px] bg-[#f0f0f0] px-1 py-2 rounded-md absolute bottom-5 left-2/4 -translate-x-2/4"
                : "flex items-center w-[180px] px-1 py-2 rounded-md absolute bottom-5 left-2/4 -translate-x-2/4 transition-all duration-200 ease-linear hover:bg-[#f0f0f0] cursor-pointer"
            }
          >
            <Image
              src={activeUserData?.photoURL}
              alt={activeUserData?.displayName}
              className={"w-10 h-10 object-cover mr-2 rounded-full"}
            />
            <Box className={"text-start"}>
              <Typography
                varient="h2"
                className=" font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-[130px] capitalize"
              >
                {activeUserData?.displayName}
              </Typography>
              <Typography varient="p" className="text-xs text-secoundaryText">
                Edit Profile
              </Typography>
            </Box>
          </Button>
          {accountSettingShow && (
            <Box
              className={
                "absolute left-10 bottom-[100px] z-40 w-[530px] px-8 pt-8 rounded-lg bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
              }
            >
              <Box className={"flex items-center gap-x-2.5"}>
                <RiUserSettingsLine className="text-3xl" />
                <Typography className="font-inter text-2xl font-semibold">
                  Profile Settings
                </Typography>
              </Box>
              <Box className={"mt-6"}>
                <Box className={"relative"}>
                  <Image
                    src={coverphoto}
                    alt={"random image"}
                    className={"w-full align-middle object-cover rounded-b-lg"}
                  />
                  <Image
                    src={activeUserData?.photoURL}
                    alt={activeUserData?.displayName}
                    className={
                      "w-[130px] aspect-square rounded-full align-middle object-cover border-[2px] border-white absolute top-3/4 left-5"
                    }
                  />
                </Box>
                <Box className={"ml-[160px] mt-4 mb-2"}>
                  <Typography
                    variant="h3"
                    className="font-poppins text-2xl font-semibold"
                  >
                    {activeUserData?.displayName}
                  </Typography>
                  <Typography className="font-poppins text-sm font-normal text-secoundaryText">
                    Stay Home Stay Safe
                  </Typography>
                </Box>
              </Box>
              <Box className={"pt-12 pb-8"}>
                <Button
                  className={
                    "flex items-center gap-x-3 text-xl font-semibold text-secoundaryText hover:bg-[#f2f2f2] w-full py-3 px-4 rounded-md"
                  }
                >
                  <CiEdit className="text-black" /> Edit Name
                </Button>
                <Button
                  className={
                    "flex items-center gap-x-3 text-xl font-semibold text-secoundaryText hover:bg-[#f2f2f2] w-full py-3 px-4 rounded-md"
                  }
                >
                  <PiNewspaperClipping className="text-black" /> Edit BIo
                </Button>
                <button
                  ref={profileUploadModalButtonRef}
                  onClick={() => setProfileUploadModal(!profileUploadModal)}
                  className={
                    "flex items-center gap-x-3 text-xl font-semibold text-secoundaryText hover:bg-[#f2f2f2] w-full py-3 px-4 rounded-md"
                  }
                >
                  <MdPhotoCamera className="text-black" /> Edit Profile picture
                </button>
                <Button
                  className={
                    "flex items-center gap-x-3 text-xl font-semibold text-secoundaryText hover:bg-[#f2f2f2] w-full py-3 px-4 rounded-md"
                  }
                >
                  <IoImagesSharp className="text-black" /> Edit Cover photo
                </Button>
                <Button
                  className={
                    "flex items-center gap-x-3 text-xl font-semibold text-secoundaryText hover:bg-[#f2f2f2] w-full py-3 px-4 rounded-md"
                  }
                >
                  <GoKey className="text-black" /> Change Password
                </Button>
                <Button
                  className={
                    "flex items-center gap-x-3 text-xl font-semibold text-secoundaryText hover:bg-[#f2f2f2] w-full py-3 px-4 rounded-md"
                  }
                >
                  <RiDeleteBin2Line className="text-black" /> Delete Account
                </Button>
                <Button
                  onClick={handleLogOut}
                  className={
                    "flex items-center gap-x-3 text-xl font-semibold text-secoundaryText hover:bg-[#f2f2f2] w-full py-3 px-4 rounded-md"
                  }
                >
                  <MdLogout className="text-black" /> Log Out
                </Button>
              </Box>
              <Box
                className={
                  "bg-white w-[25px] h-[25px] rotate-45 absolute bottom-0 translate-y-2/4 left-10 -z-50"
                }
              ></Box>
            </Box>
          )}
        </div>
      </section>
      {profileUploadModal && (
        <ProfileUploadModal
          profileUploadModalClose={setProfileUploadModal}
          profileUploadref={profileUploadModalRef}
        />
      )}
    </>
  );
};

export default SidebarMenu;
