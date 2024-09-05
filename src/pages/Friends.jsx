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
      <Box
        className={
          "w-1/4 h-full bg-white rounded-2xl pt-6 px-2.5 pb-5 overflow-hidden"
        }
      >
        <Box className={"px-2.5 pb-4"}>
          <Typography variant="h4" className="font-bold text-[28px]">
            Friends
          </Typography>
        </Box>
        <Box>
          <Link
            to={"/pages/friends/all-friends"}
            className={
              pathname == "/pages/friends/all-friends"
                ? "group bg-primaryBgColor hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300"
                : "group bg-[#ededf9] hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300"
            }
          >
            <Box className={"flex items-center gap-x-2.5"}>
              <RiUserFollowLine
                className={
                  pathname == "/pages/friends/all-friends"
                    ? "box-content text-[25px] p-2 rounded-full group-hover:text-black text-black bg-white group-hover:bg-white transition-all ease duration-300"
                    : "box-content text-[25px] p-2 rounded-full group-hover:text-black text-secoundaryText bg-primaryBgColor group-hover:bg-white transition-all ease duration-300"
                }
              />
              <Typography
                className={
                  pathname == "/pages/friends/all-friends"
                    ? "font-inter font-semibold text-black group-hover:text-black text-lg transition-all ease duration-300"
                    : "font-inter font-semibold text-secoundaryText group-hover:text-black text-lg transition-all ease duration-300"
                }
              >
                All Friends
              </Typography>
            </Box>
            <IoIosArrowForward
              className={
                pathname == "/pages/friends/all-friends"
                  ? "text-[22px] text-black group-hover:text-black mr-0  transition-all ease duration-300 group-hover:mr-0"
                  : "text-[22px] text-secoundaryText group-hover:text-black mr-2  transition-all ease duration-300 group-hover:mr-0"
              }
            />
          </Link>
          <Link
            to={"/pages/friends/add-friends"}
            className={
              pathname == "/pages/friends/add-friends"
                ? "group bg-primaryBgColor hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300"
                : "group bg-[#ededf9] hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300"
            }
          >
            <Box className={"flex items-center gap-x-2.5"}>
              <RiUserAddLine
                className={
                  pathname == "/pages/friends/add-friends"
                    ? "box-content text-[25px] p-2 rounded-full group-hover:text-black text-black bg-white group-hover:bg-white transition-all ease duration-300"
                    : "box-content text-[25px] p-2 rounded-full group-hover:text-black text-secoundaryText bg-primaryBgColor group-hover:bg-white transition-all ease duration-300"
                }
              />
              <Typography
                className={
                  pathname == "/pages/friends/add-friends"
                    ? "font-inter font-semibold text-black group-hover:text-black text-lg transition-all ease duration-300"
                    : "font-inter font-semibold text-secoundaryText group-hover:text-black text-lg transition-all ease duration-300"
                }
              >
                Add Friends
              </Typography>
            </Box>
            <IoIosArrowForward
              className={
                pathname == "/pages/friends/add-friends"
                  ? "text-[22px] text-black group-hover:text-black mr-0  transition-all ease duration-300 group-hover:mr-0"
                  : "text-[22px] text-secoundaryText group-hover:text-black mr-2  transition-all ease duration-300 group-hover:mr-0"
              }
            />
          </Link>
          <Link
            to={"/pages/friends/friend-requsts"}
            className={
              pathname == "/pages/friends/friend-requsts"
                ? "group bg-primaryBgColor hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300"
                : "group bg-[#ededf9] hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300"
            }
          >
            <Box className={"flex items-center gap-x-2.5"}>
              <RiUserReceived2Line
                className={
                  pathname == "/pages/friends/friend-requsts"
                    ? "box-content text-[25px] p-2 rounded-full group-hover:text-black text-black bg-white group-hover:bg-white transition-all ease duration-300"
                    : "box-content text-[25px] p-2 rounded-full group-hover:text-black text-secoundaryText bg-primaryBgColor group-hover:bg-white transition-all ease duration-300"
                }
              />
              <Typography
                className={
                  pathname == "/pages/friends/friend-requsts"
                    ? "font-inter font-semibold text-black group-hover:text-black text-lg transition-all ease duration-300"
                    : "font-inter font-semibold text-secoundaryText group-hover:text-black text-lg transition-all ease duration-300"
                }
              >
                Friend Requsts
              </Typography>
            </Box>
            <IoIosArrowForward
              className={
                pathname == "/pages/friends/friend-requsts"
                  ? "text-[22px] text-black group-hover:text-black mr-0  transition-all ease duration-300 group-hover:mr-0"
                  : "text-[22px] text-secoundaryText group-hover:text-black mr-2  transition-all ease duration-300 group-hover:mr-0"
              }
            />
          </Link>
          <Link
            to={"/pages/friends/block-list"}
            className={
              pathname == "/pages/friends/block-list"
                ? "group bg-primaryBgColor hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300"
                : "group bg-[#ededf9] hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300"
            }
          >
            <Box className={"flex items-center gap-x-2.5"}>
              <MdBlock
                className={
                  pathname == "/pages/friends/block-list"
                    ? "box-content text-[25px] p-2 rounded-full text-red-400 bg-white group-hover:bg-white transition-all ease duration-300"
                    : "box-content text-[25px] p-2 rounded-full text-red-400 bg-primaryBgColor group-hover:bg-white transition-all ease duration-300"
                }
              />
              <Typography
                className={
                  pathname == "/pages/friends/block-list"
                    ? "font-inter font-semibold text-black group-hover:text-black text-lg transition-all ease duration-300"
                    : "font-inter font-semibold text-secoundaryText group-hover:text-black text-lg transition-all ease duration-300"
                }
              >
                Block Lists
              </Typography>
            </Box>
            <IoIosArrowForward
              className={
                pathname == "/pages/friends/block-list"
                  ? "text-[22px] text-black group-hover:text-black mr-0  transition-all ease duration-300 group-hover:mr-0"
                  : "text-[22px] text-secoundaryText group-hover:text-black mr-2  transition-all ease duration-300 group-hover:mr-0"
              }
            />
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
