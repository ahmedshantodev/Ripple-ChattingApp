import React from "react";
import Box from "../components/layout/Box";
import Flex from "../components/layout/Flex";
import Typography from "../components/layout/Typography";
import {
  RiUserAddLine,
  RiUserFollowLine,
  RiUserReceived2Line,
} from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, Outlet, useLocation } from "react-router-dom";

const Friends = () => {
  const { pathname } = useLocation();

  return (
    <section className="bg-primaryBgColor p-4 h-full flex">
      <Box className={"w-1/4 h-full bg-white rounded-2xl pt-6 px-2.5 pb-5 overflow-hidden"}>
        <Box className={"px-2.5 pb-4"}>
          <Flex
            justifyContent={"between"}
            alignItems={"center"}
            className={"px-2"}
          >
            <Typography variant="h4" className="font-bold text-[28px]">
              Friends
            </Typography>
            <BsThreeDotsVertical className=" box-content bg-[#dedede] text-xl p-2 rounded-full transition-all ease duration-300 cursor-pointer hover:bg-[#32375c] hover:text-white" />
          </Flex>
        </Box>
        <Box className={""}>
          <Link
            to={"/pages/friends/all-friends"}
           className={`group ${ pathname == "/pages/friends/all-friends" ? "bg-primaryBgColor" : "bg-[#ededf9]"} hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300`}>
            <Box className={"flex items-center gap-x-2.5"}>
              <RiUserFollowLine className={`box-content text-[25px] p-2 rounded-full group-hover:text-black ${ pathname == "/pages/friends/all-friends" ? "text-black" : "text-secoundaryText" } ${ pathname == "/pages/friends/all-friends" ? "bg-white" : "bg-primaryBgColor" } group-hover:bg-white transition-all ease duration-300`}/>
              <Typography className={`font-inter font-semibold ${ pathname == "/pages/friends/all-friends" ? "text-black" : "text-secoundaryText" } group-hover:text-black text-lg transition-all ease duration-300`}>
                All Friends
              </Typography>
            </Box>
            <IoIosArrowForward className={`text-[22px] ${ pathname == "/pages/friends/add-friends" ? "text-black" : "text-secoundaryText" } group-hover:text-black ${ pathname == "/pages/friends/all-friends" ? "mr-0" : "mr-2"} transition-all ease duration-300 group-hover:mr-0`}/>
          </Link>
          <Link 
            to={"/pages/friends/add-friends"}
           className={`group ${ pathname == "/pages/friends/add-friends" ? "bg-primaryBgColor" : "bg-[#ededf9]"} hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300`}>
            <Box className={"flex items-center gap-x-2.5"}>
              <RiUserAddLine className={`box-content text-[25px] p-2 rounded-full group-hover:text-black ${ pathname == "/pages/friends/add-friends" ? "text-black" : "text-secoundaryText" } ${ pathname == "/pages/friends/add-friends" ? "bg-white" : "bg-primaryBgColor" } group-hover:bg-white transition-all ease duration-300`}/>
              <Typography className={`font-inter font-semibold ${ pathname == "/pages/friends/add-friends" ? "text-black" : "text-secoundaryText" } group-hover:text-black text-lg transition-all ease duration-300`}>
                Add Friends
              </Typography>
            </Box>
            <IoIosArrowForward className={`text-[22px] ${ pathname == "/pages/friends/add-friends" ? "text-black" : "text-secoundaryText" } group-hover:text-black ${ pathname == "/pages/friends/add-friends" ? "mr-0" : "mr-2"} transition-all ease duration-300 group-hover:mr-0`}/>
          </Link>
          <Link 
            to={"/pages/friends/friend-requsts"}
           className={`group ${ pathname == "/pages/friends/friend-requsts" ? "bg-primaryBgColor" : "bg-[#ededf9]"} hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300`}>
            <Box className={"flex items-center gap-x-2.5"}>
              <RiUserReceived2Line className={`box-content text-[25px] p-2 rounded-full group-hover:text-black ${ pathname == "/pages/friends/friend-requsts" ? "text-black" : "text-secoundaryText" } ${ pathname == "/pages/friends/friend-requsts" ? "bg-white" : "bg-primaryBgColor" } group-hover:bg-white transition-all ease duration-300`}/>
              <Typography className={`font-inter font-semibold ${ pathname == "/pages/friends/friend-requsts" ? "text-black" : "text-secoundaryText" } group-hover:text-black text-lg transition-all ease duration-300`}>
                Friend Requsts
              </Typography>
            </Box>
            <IoIosArrowForward className={`text-[22px] ${ pathname == "/pages/friends/friend-requsts" ? "text-black" : "text-secoundaryText" } group-hover:text-black ${ pathname == "/pages/friends/friend-requsts" ? "mr-0" : "mr-2"} transition-all ease duration-300 group-hover:mr-0`}/>
          </Link>
          <Link 
            to={"/pages/friends/block-list"}
           className={`group ${ pathname == "/pages/friends/block-list" ? "bg-primaryBgColor" : "bg-[#ededf9]"} hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300`}>
            <Box className={"flex items-center gap-x-2.5"}>
              <MdBlock className={`box-content text-[25px] p-2 rounded-full text-red-400 ${ pathname == "/pages/friends/block-list" ? "bg-white" : "bg-primaryBgColor" } group-hover:bg-white transition-all ease duration-300`}/>
              <Typography className={`font-inter font-semibold ${ pathname == "/pages/friends/block-list" ? "text-black" : "text-secoundaryText" } group-hover:text-black text-lg transition-all ease duration-300`}>
                Block Lists
              </Typography>
            </Box>
            <IoIosArrowForward className={`text-[22px] ${ pathname == "/pages/friends/block-list" ? "text-black" : "text-secoundaryText" } group-hover:text-black ${ pathname == "/pages/friends/block-list" ? "mr-0" : "mr-2"} transition-all ease duration-300 group-hover:mr-0`}/>
          </Link>
        </Box>
      </Box>
      <Box className={"w-[75%] ml-4 h-full bg-white rounded-2xl p-5"}>
        <Outlet />
      </Box>
    </section>
  );
};

export default Friends;
