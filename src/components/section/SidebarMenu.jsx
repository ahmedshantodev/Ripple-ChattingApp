import React from "react";
import { NavLink } from "react-router-dom";
import Typography from "../layout/Typography";
import Image from "../layout/Image";
import Box from "../layout/Box";
import ListItem from "../layout/ListItem";
import List from "../layout/List";
import { TiHome } from "react-icons/ti";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { HiOutlineUser, HiOutlineUsers } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const SidebarMenu = () => {
  const activeUserData = useSelector((state) => state.user.information);

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
              className={({ isActive }) =>
                isActive
                  ? "w-[128px] bg-[#dddcea] p-4 rounded-[5px] flex items-center gap-x-2 text-[18px]"
                  : "w-[128px] p-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#dddcea]"
              }
            >
              <TiHome className="text-[24px] mb-[3px]" /> Home
            </NavLink>
          </ListItem>
          <ListItem className={"mb-4"}>
            <NavLink
              to={"/pages/chat"}
              className={({ isActive }) =>
                isActive
                  ? "w-[128px] bg-[#dddcea] p-4 rounded-[5px] flex items-center gap-x-2 text-[18px]"
                  : "w-[128px] p-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#dddcea]"
              }
            >
              <HiOutlineChatBubbleLeft className="text-[24px]" /> Chat
            </NavLink>
          </ListItem>
          <ListItem className={"mb-4"}>
            <NavLink
              to={"/pages/friends"}
              className={({ isActive }) =>
                isActive
                  ? "w-[128px] bg-[#dddcea] p-4 rounded-[5px] flex items-center gap-x-2 text-[18px]"
                  : "w-[128px] p-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#dddcea]"
              }
            >
              <HiOutlineUser className="text-[24px]" /> Friends
            </NavLink>
          </ListItem>
          <ListItem className={"mb-4"}>
            <NavLink
              to={"/pages/group"}
              className={({ isActive }) =>
                isActive
                  ? "w-[128px] bg-[#dddcea] p-4 rounded-[5px] flex items-center gap-x-2 text-[18px]"
                  : "w-[128px] p-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#dddcea]"
              }
            >
              <HiOutlineUsers className="text-[24px]" /> Group
            </NavLink>
          </ListItem>
          <ListItem className={"mb-4"}>
            <NavLink
              to={"/pages/feeds"}
              className={({ isActive }) =>
                isActive
                  ? "w-[128px] bg-[#dddcea] p-4 rounded-[5px] flex items-center gap-x-2 text-[18px]"
                  : "w-[128px] p-4 rounded-[5px] flex items-center gap-x-2 text-[18px] transition-all duration-200 ease-linear hover:bg-[#dddcea]"
              }
            >
              <IoNewspaperOutline className="text-[24px]" /> Feeds
            </NavLink>
          </ListItem>
        </List>
      </nav>
      <NavLink
        to={"/pages/account-setting"}
        className={({ isActive }) =>
          isActive
            ? "flex items-center w-[180px] bg-[#dddcea] px-1 py-2 rounded-md absolute bottom-5 left-2/4 -translate-x-2/4"
            : "flex items-center w-[180px] px-1 py-2 rounded-md absolute bottom-5 left-2/4 -translate-x-2/4 transition-all duration-200 ease-linear hover:bg-[#dddcea] cursor-pointer"
        }
      >
        <Image
          src={activeUserData.photoURL}
          alt={activeUserData.displayName}
          className={"w-[40px] mr-2 rounded-full"}
        />
        <Box>
          <Typography
            varient="h2"
            className=" font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-[130px] capitalize"
          >
            {activeUserData.displayName}
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
