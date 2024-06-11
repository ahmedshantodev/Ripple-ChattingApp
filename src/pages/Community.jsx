import React, { useState } from "react";
import Box from "../components/layout/Box";
import SearchBox from "../components/layout/SearchBox";
import Typography from "../components/layout/Typography";
import { FaPlus } from "react-icons/fa6";
import Flex from "../components/layout/Flex";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { PiUsersThree } from "react-icons/pi";
import { FcInvite } from "react-icons/fc";
import { FaDna } from "react-icons/fa";
import GroupCreateModal from "../components/layout/GroupCreateModal";

const Community = () => {
  const { pathname } = useLocation();
  const [groupCreateModal, setGroupCreateModal] = useState(false);

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
              Groups
            </Typography>
            <Box className="relative group">
              <FaPlus
                onClick={() => setGroupCreateModal(true)}
                className=" box-content bg-[#dedede] text-lg p-2 rounded-full cursor-pointer"
              />
              <Box
                className={
                  "absolute top-full left-2/4 -translate-x-2/4 hidden group-hover:block z-50"
                }
              >
                <Typography className="w-[155px] text-center mt-1 py-1 rounded-md bg-[#dedede] border border-white">
                  Create New Group
                </Typography>
              </Box>
            </Box>
            <GroupCreateModal
              modalShow={groupCreateModal}
              modalClose={setGroupCreateModal}
            />
          </Flex>
          <SearchBox placeholder={"Search group"} className={"mt-4"} />
        </Box>
        <Box className={"h-[84%] relative overflow-y-auto"}>
          <Box>
            <Link
              to={"/pages/community/my-groups"}
              className={
                pathname == "/pages/community/my-groups"
                  ? "group bg-primaryBgColor hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300"
                  : "group bg-[#ededf9] hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300"
              }
            >
              <Box className={"flex items-center gap-x-2.5"}>
                <PiUsersThree
                  className={
                    pathname == "/pages/community/my-groups"
                      ? "box-content text-[25px] p-2 rounded-full group-hover:text-black text-black bg-white group-hover:bg-white transition-all ease duration-300"
                      : "box-content text-[25px] p-2 rounded-full group-hover:text-black text-secoundaryText bg-primaryBgColor group-hover:bg-white transition-all ease duration-300"
                  }
                />
                <Typography
                  className={
                    pathname == "/pages/community/my-groups"
                      ? "font-inter font-semibold text-black group-hover:text-black text-lg transition-all ease duration-300"
                      : "font-inter font-semibold text-secoundaryText group-hover:text-black text-lg transition-all ease duration-300"
                  }
                >
                  My groups
                </Typography>
              </Box>
              <IoIosArrowForward
                className={
                  pathname == "/pages/community/my-groups"
                    ? "text-[22px] text-black group-hover:text-black mr-0  transition-all ease duration-300 group-hover:mr-0"
                    : "text-[22px] text-secoundaryText group-hover:text-black mr-2  transition-all ease duration-300 group-hover:mr-0"
                }
              />
            </Link>
            <Link
              to={"/pages/community/others-groups"}
              className={
                pathname == "/pages/community/others-groups"
                  ? "group bg-primaryBgColor hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300"
                  : "group bg-[#ededf9] hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300"
              }
            >
              <Box className={"flex items-center gap-x-2.5"}>
                <FaDna
                  className={
                    pathname == "/pages/community/others-groups"
                      ? "box-content text-[25px] p-2 rounded-full group-hover:text-black text-black bg-white group-hover:bg-white transition-all ease duration-300"
                      : "box-content text-[25px] p-2 rounded-full group-hover:text-black text-secoundaryText bg-primaryBgColor group-hover:bg-white transition-all ease duration-300"
                  }
                />
                <Typography
                  className={
                    pathname == "/pages/community/others-groups"
                      ? "font-inter font-semibold text-black group-hover:text-black text-lg transition-all ease duration-300"
                      : "font-inter font-semibold text-secoundaryText group-hover:text-black text-lg transition-all ease duration-300"
                  }
                >
                  Others groups
                </Typography>
              </Box>
              <IoIosArrowForward
                className={
                  pathname == "/pages/community/others-groups"
                    ? "text-[22px] text-black group-hover:text-black mr-0  transition-all ease duration-300 group-hover:mr-0"
                    : "text-[22px] text-secoundaryText group-hover:text-black mr-2  transition-all ease duration-300 group-hover:mr-0"
                }
              />
            </Link>
            <Link
              to={"/pages/community/group-invitation"}
              className={
                pathname == "/pages/community/group-invitation"
                  ? "group bg-primaryBgColor hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300"
                  : "group bg-[#ededf9] hover:bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between mb-2 cursor-pointer transition-all ease duration-300"
              }
            >
              <Box className={"flex items-center gap-x-2.5"}>
                <FcInvite
                  className={
                    pathname == "/pages/community/group-invitation"
                      ? "box-content text-[25px] p-2 rounded-full group-hover:text-black text-black bg-white group-hover:bg-white transition-all ease duration-300"
                      : "box-content text-[25px] p-2 rounded-full group-hover:text-black text-secoundaryText bg-primaryBgColor group-hover:bg-white transition-all ease duration-300"
                  }
                />
                <Typography
                  className={
                    pathname == "/pages/community/group-invitation"
                      ? "font-inter font-semibold text-black group-hover:text-black text-lg transition-all ease duration-300"
                      : "font-inter font-semibold text-secoundaryText group-hover:text-black text-lg transition-all ease duration-300"
                  }
                >
                  Group invitation
                </Typography>
              </Box>
              <IoIosArrowForward
                className={
                  pathname == "/pages/community/group-invitation"
                    ? "text-[22px] text-black group-hover:text-black mr-0  transition-all ease duration-300 group-hover:mr-0"
                    : "text-[22px] text-secoundaryText group-hover:text-black mr-2  transition-all ease duration-300 group-hover:mr-0"
                }
              />
            </Link>
          </Box>
        </Box>
      </Box>
      <Box className={"w-[75%] ml-4 h-full bg-white rounded-2xl p-5"}>
        <Outlet />
      </Box>
    </section>
  );
};

export default Community;
