import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Typography from "../layout/Typography";
import Image from "../layout/Image";
import Box from "../layout/Box";
import ListItem from "../layout/ListItem";
import List from "../layout/List";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { HiOutlineUser, HiOutlineUsers } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import coverphoto from "/public/images/1711471680698.jpg";
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
import Modal from "./../layout/Modal";
import { getAuth, signOut } from "firebase/auth";
import { activeUser } from "../../slices/activeUserSlice";
import { activeGroup } from "../../slices/activeGroupSlice";
import { activeChat } from "../../slices/activeChatSlice";
import Flex from "../layout/Flex";
import { IoMdNotificationsOutline } from "react-icons/io";

const SidebarMenu = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeUserData = useSelector((state) => state?.user?.information);
  const [accountSettingShow, setAccountSettingShow] = useState(false);
  const [logoutModalShow, setLogoutModalShow] = useState(false);
  const [profileUploadModal, setProfileUploadModal] = useState(false);
  const outerDivRef = useRef();
  const menuRef = useRef();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        dispatch(activeUser(null));
        localStorage.removeItem("activeGroup");
        dispatch(activeGroup(null));
        localStorage.removeItem("activeChat");
        dispatch(activeChat(null));
        navigate("/");
      })
      .catch((error) => {});
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (outerDivRef.current.contains(e.target) && !menuRef.current.contains(e.target)) {
        setAccountSettingShow(false);
      }
    });
  }, []);

  return (
    <>
      <section className=" relative h-full">
        <Typography className="font-open-sans font-bold text-[26px] ml-6">
          RIPPLE!
        </Typography>
        <nav className="mt-8">
          <List>
            <ListItem className={"mb-4"}>
              <NavLink
                to={"/pages/chat/chat-with-friend"}
                className={
                  pathname.includes("/pages/chat")
                    ? "w-[160px] mx-auto bg-[#32375c] text-white py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px]"
                    : "w-[160px] mx-auto py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#32375c] hover:text-white"
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
                    ? "w-[160px] mx-auto bg-[#32375c] text-white py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px]"
                    : "w-[160px] mx-auto py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#32375c] hover:text-white"
                }
              >
                <HiOutlineUser className="text-[24px]" /> Friends
              </NavLink>
            </ListItem>
            <ListItem className={"mb-4"}>
              <NavLink
                to={"/pages/groups/my-groups"}
                className={
                  pathname.includes("/pages/community")
                    ? "w-[160px] mx-auto bg-[#32375c] text-white py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px]"
                    : "w-[160px] mx-auto py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#32375c] hover:text-white"
                }
              >
                <IoNewspaperOutline className="text-[24px]" /> Group
              </NavLink>
            </ListItem>
            <ListItem className={"mb-4"}>
              <NavLink
                to={"/pages/notification"}
                className={
                  pathname.includes("/pages/notification")
                    ? "w-[160px] mx-auto bg-[#32375c] text-white py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px]"
                    : "w-[160px] mx-auto py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#32375c] hover:text-white"
                }
              >
                <IoMdNotificationsOutline className="text-[24px]" /> Notification
              </NavLink>
            </ListItem>
          </List>
        </nav>
        <Box>
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
              className={"w-10 aspect-square object-cover mr-2 rounded-full"}
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
          <div
            ref={outerDivRef}
            className={
              accountSettingShow
                ? "block fixed top-0 left-0 w-full h-dvh z-50 bg-white/60"
                : "hidden fixed top-0 left-0 w-full h-dvh z-50 bg-white/60"
            }
          >
            <div
              ref={menuRef}
              className={
                "absolute left-10 bottom-[100px] z-40 w-[530px] px-8 pt-8 rounded-lg bg-white border-[3px] border-[#f2f2f2]"
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
                  <PiNewspaperClipping className="text-black" /> Edit BIo
                </Button>
                <button
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
                  onClick={() => setLogoutModalShow(true)}
                  className={
                    "flex items-center gap-x-3 text-xl font-semibold text-secoundaryText hover:bg-[#f2f2f2] w-full py-3 px-4 rounded-md"
                  }
                >
                  <MdLogout className="text-black" /> Log Out
                </Button>
              </Box>
              <Box
                className={
                  "bg-white w-[25px] h-[25px] rotate-45 absolute bottom-0 translate-y-2/4 left-10 -z-50 border-b-2 border-r-[3px]  border-[#f2f2f2]"
                }
              ></Box>
            </div>
          </div>
        </Box>
      </section>
      <Modal
        modalShow={logoutModalShow}
        modalClose={setLogoutModalShow}
        className={"text-center py-7 px-10"}
      >
        <Typography className=" font-open-sans  text-3xl font-semibold mb-5">
          Are you sure?
        </Typography>
        <Typography className="text-lg font-semibold text-secoundaryText w-[360px] mb-4">
          You want to logout? Once you logout you need to login again. Are you
          Ok?
        </Typography>
        <Flex justifyContent={"between"}>
          <Button
            onClick={handleLogOut}
            className={"bg-[#d2201f] w-[48%] rounded-lg text-lg py-3 text-white font-semibold"}
          >
            Yes, Logout!
          </Button>
          <Button
            onClick={() => setLogoutModalShow(false)}
            className={"bg-[#c7f1db] w-[48%] rounded-lg text-lg py-3 font-semibold"}
          >
            Cancel
          </Button>
        </Flex>
      </Modal>
      {profileUploadModal &&
        <ProfileUploadModal
          modalShow={profileUploadModal}
          modalClose={setProfileUploadModal}
        />
      }
    </>
  );
};

export default SidebarMenu;
