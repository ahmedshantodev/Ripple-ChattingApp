import React, { useState } from "react";
import Box from "../components/layout/Box";
import Typography from "../components/layout/Typography";
import Flex from "../components/layout/Flex";
import Input from "../components/layout/Input";
import Image from "../components/layout/Image";
import { BiSolidEdit } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";
import profile from "/public/images/shanto.jpeg";
import profilephoto from "/public/images/shanto.jpeg";
import coverphoto from "/public/images/coverPhoto2.jpg";
import ChatItem from "../components/layout/ChatItem";
import { IoCall } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus, FaRegImage, FaFile } from "react-icons/fa6";
import { BsEmojiSmileFill } from "react-icons/bs";
import { MdThumbUpAlt } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

const Chat = () => {
  const [friendsProfileOpen, setFriendsProfileOpen] = useState(false);

  return (
    <section className="w-full h-dvh bg-[#dddcea] p-4 flex">
      <Box
        className={"w-1/4 h-full bg-white rounded-2xl pt-6 pr-2.5 pb-5 pl-2.5"}
      >
        <Box className={"px-2.5  h-[16%]"}>
          <Flex
            justifyContent={"between"}
            alignItems={"center"}
            className={"px-2"}
          >
            <Typography variant="h4" className="font-bold text-[28px]">
              Chats
            </Typography>
            <BsThreeDotsVertical className=" box-content bg-[#dedede] text-xl p-2 rounded-full transition-all ease duration-300 cursor-pointer hover:bg-[#32375c] hover:text-white" />
          </Flex>
          <Flex
            alignItems={"center"}
            className={
              "border border-[#dedede] rounded-3xl overflow-hidden mt-4 bg-[#f4f4f4]"
            }
          >
            <IoMdSearch className="box-content text-2xl pl-[15px] text-[#514f4f8e]" />
            <Input
              placeholder={"search messenger"}
              className={
                "bg-[#f4f4f4] py-3 pr-5 pl-[8px] w-full outline-none group-"
              }
            />
          </Flex>
        </Box>
        <Box className={"h-[84%] overflow-y-auto"}>
          <ChatItem
            profile={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
            profileAltText={"usr name"}
            userName={"Monsur Ahmed Shanto"}
            lastMessege={"random messege...."}
            lastMessegeSentTime={"30 min"}
          />
          <ChatItem
            profile={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
            profileAltText={"usr name"}
            userName={"Monsur Ahmed Shanto"}
            lastMessege={"random messege...."}
            lastMessegeSentTime={"30 min"}
          />
          <ChatItem
            profile={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
            profileAltText={"usr name"}
            userName={"Monsur Ahmed Shanto"}
            lastMessege={"random messege...."}
            lastMessegeSentTime={"30 min"}
          />
          <ChatItem
            profile={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
            profileAltText={"usr name"}
            userName={"Monsur Ahmed Shanto"}
            lastMessege={"random messege...."}
            lastMessegeSentTime={"30 min"}
          />
          <ChatItem
            profile={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
            profileAltText={"usr name"}
            userName={"Monsur Ahmed Shanto"}
            lastMessege={"random messege...."}
            lastMessegeSentTime={"30 min"}
          />
          <ChatItem
            profile={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
            profileAltText={"usr name"}
            userName={"Monsur Ahmed Shanto"}
            lastMessege={"random messege...."}
            lastMessegeSentTime={"30 min"}
          />
          <ChatItem
            profile={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
            profileAltText={"usr name"}
            userName={"Monsur Ahmed Shanto"}
            lastMessege={"random messege...."}
            lastMessegeSentTime={"30 min"}
          />
          <ChatItem
            profile={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
            profileAltText={"usr name"}
            userName={"Monsur Ahmed Shanto"}
            lastMessege={"random messege...."}
            lastMessegeSentTime={"30 min"}
          />
          <ChatItem
            profile={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
            profileAltText={"usr name"}
            userName={"Monsur Ahmed Shanto"}
            lastMessege={"random messege...."}
            lastMessegeSentTime={"30 min"}
          />
          <ChatItem
            profile={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
            profileAltText={"usr name"}
            userName={"Monsur Ahmed Shanto"}
            lastMessege={"random messege...."}
            lastMessegeSentTime={"30 min"}
          />
          <ChatItem
            profile={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
            profileAltText={"usr name"}
            userName={"Monsur Ahmed Shanto"}
            lastMessege={"random messege...."}
            lastMessegeSentTime={"30 min"}
          />
          <ChatItem
            profile={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
            profileAltText={"usr name"}
            userName={"Monsur Ahmed Shanto"}
            lastMessege={"random messege...."}
            lastMessegeSentTime={"30 min"}
          />
        </Box>
      </Box>
      <Box className={"w-[75%] ml-4 flex"}>
        <Box
          className={`${
            friendsProfileOpen ? "w-[70%]" : "w-full"
          } h-full bg-white rounded-2xl relative overflow-hidden transition-all ease-in-out duration-100`}
        >
          <Flex
            justifyContent={"between"}
            alignItems={"center"}
            className={"py-3 px-3 border-b-[2px] border-b-[#dedede]"}
          >
            <Box
              className={
                "flex items-center px-2.5 py-[5px]  rounded-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dddcea]"
              }
            >
              <Image
                src={
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                }
                alt={"random image"}
                className={"w-12 h-12 rounded-full"}
              />
              <Typography variant="h3" className="ml-3 text-lg font-semibold">
                Mohammad Abdullah 
              </Typography>
            </Box>
            <Flex alignItems={"center"}>
              <IoCall className="box-content text-[25px] ml-2.5 p-2.5 rounded-full cursor-pointer text-[#007bf5] transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
              <IoVideocam className="box-content text-[25px] ml-2.5 p-2.5 rounded-full cursor-pointer text-[#007bf5] transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
              <HiDotsVertical
                onClick={() => setFriendsProfileOpen(!friendsProfileOpen)}
                className={`box-content text-[25px] ml-2.5 p-2.5 rounded-full cursor-pointer text-[#007bf5] transition-all ease-in-out duration-300 ${
                  friendsProfileOpen ? "bg-[#dedede]" : "hover:bg-[#dedede]"
                }`}
              />
            </Flex>
          </Flex>
          <Box className={"bg-[#dedede] opacity-50 h-full"}>messege</Box>

          <Flex
            justifyContent={"between"}
            alignItems={"center"}
            className={
              "bg-white absolute bottom-0 left-0 w-full py-2.5 pr-[5px] pl-5"
            }
          >
            <Flex>
              <FaPlus className="box-content text-[#007bf5] text-[25px] p-2.5 rounded-[20%] mr-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
              <FaRegImage className="box-content text-[#007bf5] text-[25px] p-2.5 rounded-[20%] mr-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
              <FaFile className="box-content text-[#007bf5] text-[25px] p-2.5 rounded-[20%] mr-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
            </Flex>
            <Flex alignItems={"center"} className={"w-[80%]"}>
              <Flex
                alignItems={"center"}
                className={
                  "w-full bg-[#f3f3f3] overflow-hidden rounded-[25px] border border-[#dedede]"
                }
              >
                <Input
                  placeholder={"enter your messege"}
                  className={"bg-[#f3f3f3] py-3 pr-0 pl-5 w-full outline-none"}
                />
                <BsEmojiSmileFill className="box-content text-[#007bf5] text-[20px] p-3 rounded-[50%] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
              </Flex>
              <MdThumbUpAlt className="box-content text-[#007bf5] text-[24px] p-2.5 rounded-[20%] mb-[2px] ml-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
            </Flex>
          </Flex>
        </Box>
        <Box
          className={`${
            friendsProfileOpen ? "w-[30%]" : "w-0"
          } h-full bg-white rounded-2xl overflow-hidden text-center ${
            friendsProfileOpen ? "ml-4" : "ml-0"
          }`}
        >
          <Box className={"relative"}>
            <Image
              src={coverphoto}
              alt={"random image"}
              className={"w-full h-[180px] object-cover"}
            />
            <Image
              src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
              alt={"random image"}
              className={
                "w-[120px] h-[120px] rounded-full object-cover absolute bottom-0 translate-y-2/4 left-2/4 -translate-x-2/4 border border-[#dedede]"
              }
            />
          </Box>
          <Typography
            variant="h3"
            className="font-poppins font-semibold text-[20px] mt-[65px]"
          >
            Monsur Ahmed Shanto
          </Typography>
        </Box>
      </Box>
    </section>
  );
};

export default Chat;
