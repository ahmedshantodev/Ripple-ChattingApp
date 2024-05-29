import React, { useState } from "react";
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

import { CiLogout } from "react-icons/ci";
import { getAuth, signOut } from "firebase/auth";
import { activeUser } from "../../slices/activeUserSlice";

const SidebarMenu = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeUserData = useSelector((state) => state?.user?.information);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        dispatch(activeUser(null));
        navigate("/login");
      })
      .catch((error) => {});
  };

  return (
    <section>
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

          <div
            onClick={handleLogOut}
            className={
              "w-[138px] py-3 px-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#32375c] hover:text-white cursor-pointer"
            }
          >
            <CiLogout className="text-[24px]" /> Log Out
          </div>
        </List>
      </nav>
      <NavLink
        to={"/pages/account-setting"}
        className={
          pathname.includes("/pages/account-setting")
            ? "flex items-center w-[180px] bg-[#dddcea] px-1 py-2 rounded-md absolute bottom-5 left-2/4 -translate-x-2/4"
            : "flex items-center w-[180px] px-1 py-2 rounded-md absolute bottom-5 left-2/4 -translate-x-2/4 transition-all duration-200 ease-linear hover:bg-[#dddcea] cursor-pointer"
        }
      >
        <Image
          src={activeUserData?.photoURL}
          alt={activeUserData?.displayName}
          className={"w-10 h-10 object-cover mr-2 rounded-full"}
        />
        <Box>
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
      </NavLink>
    </section>
  );
};

export default SidebarMenu;
