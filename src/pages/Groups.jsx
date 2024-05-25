import React, { useEffect, useRef, useState } from "react";
import Box from "../components/layout/Box";
import Flex from "../components/layout/Flex";
import Typography from "../components/layout/Typography";
import Image from "../components/layout/Image";
import Input from "../components/layout/Input";
import GroupItem from "../components/layout/GroupItem";
import GroupCreateModal from "../components/layout/GroupCreateModal";
import JoinRequstItem from "../components/layout/GroupJoinRequstListItem";
import GroupMemberListItem from "../components/layout/GroupMemberListItem";
import GroupMemberInviteModal from "../components/layout/GroupMemberInviteModal";
import { useSelector } from "react-redux";
import { IoMdSearch } from "react-icons/io";
import { FcInvite } from "react-icons/fc";
import { IoIosArrowDown } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus, FaRegImage, FaFile } from "react-icons/fa6";
import { BsEmojiSmileFill } from "react-icons/bs";
import { MdThumbUpAlt } from "react-icons/md";
import { getDatabase, onValue, ref } from "firebase/database";
import { BiSolidUserPlus } from "react-icons/bi";
import { FiBell } from "react-icons/fi";
import { FiBellOff } from "react-icons/fi";
import GroupInviteListItem from "../components/layout/GroupInviteListItem";
import { RxCross2 } from "react-icons/rx";
import { LuCheck } from "react-icons/lu";

const Group = () => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state?.user?.information);
  const [groupList, setGroupList] = useState([]);
  const [dropDownShow, setDropDownShow] = useState(false);
  const [groupProfileOpen, setGroupProfileOpen] = useState(false);
  const [groupNotificationOn, setGroupNotificationOn] = useState(true);
  const [groupMemberShow, setGroupMemberShow] = useState(false);
  const [membarRequstShow, setMembarRequstShow] = useState(false);

  const [memberInviteModal, setMemberInviteModal] = useState(false);
  const memberInviteModalRef = useRef();
  const memberInviteButtonRef = useRef();

  const [groupCreateModa, setGroupCreateModal] = useState(false);
  const groupCreateModalRef = useRef();
  const groupCreateButtonRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (groupCreateButtonRef.current.contains(e.target)) {
        setGroupCreateModal(true);
      } else if (!groupCreateModalRef.current.contains(e.target)) {
        setGroupCreateModal(false);
      }
    });
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (memberInviteButtonRef.current.contains(e.target)) {
        setMemberInviteModal(true);
      } else if (!memberInviteModalRef.current.contains(e.target)) {
        setMemberInviteModal(false);
      }
    });
  }, []);

  useEffect(() => {
    let groupRef = ref(db, "groups");
    onValue(groupRef, (snapshot) => {
      let groupListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().groupcreatoruid) {
          groupListArray.push({ ...item.val(), groupuid: item.key });
        }
      });
      setGroupList(groupListArray);
    });
  }, []);

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
            <div ref={groupCreateButtonRef}>
              <FaPlus
                onClick={() => setGroupCreateModal(true)}
                className=" box-content bg-[#dedede] text-lg p-2 rounded-full transition-all ease duration-300 cursor-pointer hover:bg-[#32375c] hover:text-white"
              />
            </div>
            {groupCreateModa && (
              <GroupCreateModal
                modalRef={groupCreateModalRef}
                modalClose={setGroupCreateModal}
              />
            )}
          </Flex>
          <Flex
            alignItems={"center"}
            className={
              "border border-[#dedede] rounded-3xl overflow-hidden mt-4 bg-[#f4f4f4]"
            }
          >
            <IoMdSearch className="box-content text-2xl pl-[15px] text-[#514f4f]" />
            <Input
              placeholder={"search messenger"}
              className={"bg-[#f4f4f4] py-3 pr-5 pl-[8px] w-full outline-none"}
            />
          </Flex>
        </Box>
        <Box className={"h-[84%] relative overflow-y-auto"}>
          <Box
            onClick={() => setDropDownShow(!dropDownShow)}
            className={`mb-2 bg-[#ededf9] rounded-md ${
              dropDownShow && "border-b-[10px] border-[#dddcea]"
            }`}
          >
            <Box
              className={`bg-primaryBgColor py-3 px-3 rounded-md flex items-center justify-between cursor-pointer`}
            >
              <Box className={"flex items-center gap-x-2.5"}>
                <FcInvite
                  className={`box-content text-[25px] p-2 rounded-full text-black bg-white`}
                />
                <Typography
                  className={`font-inter font-semibold text-black text-lg`}
                >
                  Group Invitation
                </Typography>
              </Box>
              <Box className={"flex"}>
                <Box className="w-[22px] h-[22px] text-[12px] bg-[#cb112d] text-white flex justify-center items-center rounded-full mr-2">
                  20
                </Box>
                {/* <IoIosArrowDown
                  className={`text-[22px] text-black mr-2 transition-all ease duration-300 ${
                    dropDownShow ? "rotate-180" : "rotate-0"
                  }`}
                /> */}
                <IoIosArrowDown
                  className={`text-[22px] text-black mr-2 ${
                    dropDownShow ? "rotate-180" : "rotate-0"
                  }`}
                />
              </Box>
            </Box>
            {dropDownShow && 
            <Box
              className={`transition-all ease-in-out duration-300 h-[250px] py-2 px-2.5  overflow-y-auto `}
            >
            {/* <Box
              className={`transition-all ease-in-out duration-300 ${
                dropDownShow ? "visible h-[250px] py-2 px-2.5" : "invisible h-0"
              } overflow-y-auto `}
            > */}
              <Box
                className={"py-1 rounded-md flex justify-between items-center"}
              >
                <Flex alignItems={"center"} className={"gap-x-2"}>
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                    }
                    alt={"name"}
                    className={"w-[40px] h-[40px] object-cover rounded-full"}
                  />
                  <Box>
                    <Typography className="text-[15px]">
                      JAVASCRIPT
                    </Typography>
                    <Typography className="text-[13px] text-secoundaryText">
                      Invited by Siam Ahmed
                    </Typography>
                  </Box>
                </Flex>
                <Flex alignItems={"center"} className={""}>
                  <RxCross2 className=" box-content bg-[#f2f2f2] hover:bg-primaryBgColor p-[6px] rounded-full cursor-pointer mr-2 hover:text-red-600" />
                  <LuCheck className=" box-content bg-[#f2f2f2] hover:bg-primaryBgColor p-[6px] rounded-full cursor-pointer hover:text-green-600" />
                </Flex>
              </Box>
              <Box
                className={"py-1 rounded-md flex justify-between items-center"}
              >
                <Flex alignItems={"center"} className={"gap-x-2"}>
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                    }
                    alt={"name"}
                    className={"w-[40px] h-[40px] object-cover rounded-full"}
                  />
                  <Box>
                    <Typography className="text-[15px]">
                      JAVASCRIPT
                    </Typography>
                    <Typography className="text-[13px] text-secoundaryText">
                      Invited by Siam Ahmed
                    </Typography>
                  </Box>
                </Flex>
                <Flex alignItems={"center"} className={""}>
                  <RxCross2 className=" box-content bg-[#f2f2f2] hover:bg-primaryBgColor p-[6px] rounded-full cursor-pointer mr-2 hover:text-red-600" />
                  <LuCheck className=" box-content bg-[#f2f2f2] hover:bg-primaryBgColor p-[6px] rounded-full cursor-pointer hover:text-green-600" />
                </Flex>
              </Box>
              <Box
                className={"py-1 rounded-md flex justify-between items-center"}
              >
                <Flex alignItems={"center"} className={"gap-x-2"}>
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                    }
                    alt={"name"}
                    className={"w-[40px] h-[40px] object-cover rounded-full"}
                  />
                  <Box>
                    <Typography className="text-[15px]">
                      JAVASCRIPT
                    </Typography>
                    <Typography className="text-[13px] text-secoundaryText">
                      Invited by Siam Ahmed
                    </Typography>
                  </Box>
                </Flex>
                <Flex alignItems={"center"} className={""}>
                  <RxCross2 className=" box-content bg-[#f2f2f2] hover:bg-primaryBgColor p-[6px] rounded-full cursor-pointer mr-2 hover:text-red-600" />
                  <LuCheck className=" box-content bg-[#f2f2f2] hover:bg-primaryBgColor p-[6px] rounded-full cursor-pointer hover:text-green-600" />
                </Flex>
              </Box>
              <Box
                className={"py-1 rounded-md flex justify-between items-center"}
              >
                <Flex alignItems={"center"} className={"gap-x-2"}>
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                    }
                    alt={"name"}
                    className={"w-[40px] h-[40px] object-cover rounded-full"}
                  />
                  <Box>
                    <Typography className="text-[15px]">
                      JAVASCRIPT
                    </Typography>
                    <Typography className="text-[13px] text-secoundaryText">
                      Invited by Siam Ahmed
                    </Typography>
                  </Box>
                </Flex>
                <Flex alignItems={"center"} className={""}>
                  <RxCross2 className=" box-content bg-[#f2f2f2] hover:bg-primaryBgColor p-[6px] rounded-full cursor-pointer mr-2 hover:text-red-600" />
                  <LuCheck className=" box-content bg-[#f2f2f2] hover:bg-primaryBgColor p-[6px] rounded-full cursor-pointer hover:text-green-600" />
                </Flex>
              </Box>
            </Box>
            }
          </Box>
          {groupList.map((item) => (
            <GroupItem
              // profile={item.groupphoto}
              profile={
                "https://img.freepik.com/premium-vector/people-working-discussing-with-programming-code-programmer-coding-engineer-work-group_258153-637.jpg"
              }
              profileAltText={item.groupname}
              userName={item.groupname}
              lastMessege={"random messege...."}
              lastMessegeSentTime={"30 min"}
            />
          ))}
        </Box>
      </Box>
      <Box className={"w-[75%] ml-4 flex"}>
        <Box
          className={`${
            groupProfileOpen ? "w-[70%]" : "w-full"
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
                  "https://img.freepik.com/premium-vector/people-working-discussing-with-programming-code-programmer-coding-engineer-work-group_258153-637.jpg"
                }
                alt={"random image"}
                className={"w-12 h-12 rounded-full"}
              />
              <Typography variant="h3" className="ml-3 text-lg font-semibold">
                MERN STACK DEVELOPMENT
              </Typography>
            </Box>
            <Flex alignItems={"center"}>
              <IoCall className="box-content text-[25px] ml-2.5 p-2.5 rounded-full cursor-pointer text-[#007bf5] transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
              <IoVideocam className="box-content text-[25px] ml-2.5 p-2.5 rounded-full cursor-pointer text-[#007bf5] transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
              <HiDotsVertical
                onClick={() => setGroupProfileOpen(!groupProfileOpen)}
                className={`box-content text-[25px] ml-2.5 p-2.5 rounded-full cursor-pointer text-[#007bf5] transition-all ease-in-out duration-300 ${
                  groupProfileOpen ? "bg-[#dedede]" : "hover:bg-[#dedede]"
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
            groupProfileOpen ? "w-[30%]" : "w-0"
          } h-full bg-white rounded-2xl overflow-hidden text-center overflow-y-auto ${
            groupProfileOpen ? "ml-4" : "ml-0"
          }`}
        >
          <Box className={"text-center"}>
            <Image
              src={
                "https://img.freepik.com/premium-vector/people-working-discussing-with-programming-code-programmer-coding-engineer-work-group_258153-637.jpg"
              }
              alt={"random image"}
              className={
                "w-[120px] h-[120px] mx-auto rounded-full object-cover border border-[#dedede] mt-10"
              }
            />
          </Box>
          <Typography
            variant="h3"
            className="font-poppins font-semibold text-[20px] mt-[15px]"
          >
            MERN STACK DEVELOPMENT
          </Typography>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            className={"mt-5"}
          >
            <div
              ref={memberInviteButtonRef}
              onclick={() => setMemberInviteModal(true)}
            >
              <BiSolidUserPlus className="box-content text-[25px] mr-6 p-2 rounded-full cursor-pointer text-[#252b2f] transition-all ease-in-out duration-300 bg-[#dedede]" />
            </div>
            {memberInviteModal && (
              <GroupMemberInviteModal
                modalRef={memberInviteModalRef}
                modalClose={setMemberInviteModal}
              />
            )}
            {groupNotificationOn ? (
              <FiBell
                onClick={() => setGroupNotificationOn(!groupNotificationOn)}
                className="box-content text-[22px] p-2.5 rounded-full cursor-pointer text-[#252b2f] bg-[#dedede] transition-all ease-in-out duration-300"
              />
            ) : (
              <FiBellOff
                onClick={() => setGroupNotificationOn(!groupNotificationOn)}
                className={`box-content text-[22px] p-2.5 rounded-full cursor-pointer text-[#dedede] bg-[#252b2f]`}
              />
            )}
          </Flex>

          <Box className={"mt-7 text-start px-5"}>
            <Flex
              alignItems={"center"}
              justifyContent={"between"}
              className={
                "text-lg mb-1 px-2.5 py-2 rounded-md text-secoundaryText hover:bg-primaryBorder cursor-pointer hover:text-black"
              }
            >
              <Typography>Chat info</Typography>
              <IoIosArrowDown />
            </Flex>
            <Box onClick={() => setGroupMemberShow(!groupMemberShow)}>
              <Flex
                alignItems={"center"}
                justifyContent={"between"}
                className={
                  "text-lg mb-1 px-2.5 py-2 rounded-md text-secoundaryText hover:bg-primaryBorder cursor-pointer hover:text-black"
                }
              >
                <Typography>Group Members</Typography>
                <IoIosArrowDown />
              </Flex>
              {groupMemberShow && (
                <Box
                  className={
                    "px-2.5 py-2 border border-primaryBorder rounded-md mb-1"
                  }
                >
                  <GroupMemberListItem />
                  <GroupMemberListItem />
                  <GroupMemberListItem />
                </Box>
              )}
            </Box>
            <Box onClick={() => setMembarRequstShow(!membarRequstShow)}>
              <Flex
                alignItems={"center"}
                justifyContent={"between"}
                className={
                  "text-lg mb-1 px-2.5 py-2 rounded-md text-secoundaryText hover:bg-primaryBorder cursor-pointer hover:text-black"
                }
              >
                <Typography>Members Requst</Typography>
                <IoIosArrowDown />
              </Flex>
              {membarRequstShow && (
                <Box
                  className={
                    "px-2.5 py-2 border border-primaryBorder rounded-md mb-1"
                  }
                >
                  <JoinRequstItem />
                  <JoinRequstItem />
                  <JoinRequstItem />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default Group;
