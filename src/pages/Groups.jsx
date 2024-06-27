import React, { useEffect, useState } from "react";
// Reusble Components
import Box from "../components/layout/Box";
import Flex from "../components/layout/Flex";
import Image from "../components/layout/Image";
import Input from "../components/layout/Input";
import GroupItem from "../components/layout/GroupItem";
import Typography from "../components/layout/Typography";
import GroupCreateModal from "../components/layout/GroupCreateModal";
import JoinRequstItem from "../components/layout/GroupJoinRequstListItem";
import GroupMemberListItem from "../components/layout/GroupMemberListItem";
import GroupMemberInviteModal from "../components/layout/GroupMemberInviteModal";
import { IoSend } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoCall, IoVideocam } from "react-icons/io5";
import { FaPlus, FaRegImage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux"
import {
  MdThumbUpAlt,
  MdOutlineNotificationsOff,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiMovieLine } from "react-icons/ri";
import { TbPhotoPlus } from "react-icons/tb";
import { LuFileSpreadsheet } from "react-icons/lu";
import {
  set,
  ref,
  push,
  remove,
  onValue,
  getDatabase,
} from "firebase/database";
import { CiLogout } from "react-icons/ci";
import SearchBox from "../components/layout/SearchBox";
import { activeGroup } from "../slices/activeGroupSlice";
import GroupPhotoUploadModal from "../components/layout/GroupPhotoUploadModal";
import noGroupPHoto from "/public/images/no chat image.jpg";
import { PiUserCirclePlus } from "react-icons/pi";
import Button from "../components/layout/Button";
import ModalImage from "react-modal-image";
import GroupNameChangeModal from "../components/layout/GroupNameChangeModal";
import { HiMiniGif } from "react-icons/hi2";
import { FaMicrophone } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Group = () => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const activeUserData = useSelector((state) => state.user.information);
  const activeGroupData = useSelector((state) => state.activeGroup.information);
  const [groupList, setGroupList] = useState([])
  const [groupProfileOpen, setGroupProfileOpen] = useState(false);
  const [groupNotificationOn, setGroupNotificationOn] = useState(true);
  const [groupMemberShow, setGroupMemberShow] = useState(false);
  const [membarRequstShow, setMembarRequstShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [groupMemberLlist, setGroupMemberLlist] = useState([]);
  const [mediaShow, setMediaShow] = useState(false);
  const [chatInfoShow, setChatInfoShow] = useState(false);
  const [groupNameChangeModal, setGroupNameChangeModal] = useState(false);
  const [messege, setMessege] = useState("");
  const [groupMessegeList, setGroupMessegeList] = useState([]);
  const [groupPhotoUploadModalShow, setGroupPhotoUploadModalShow] = useState(false);
  const [groupCreateModal, setGroupCreateModal] = useState(false);
  const [memberInviteModal, setMemberInviteModal] = useState(false);
  const [groupJoinRequstList, setGroupJoinRequstList] = useState([]);
  const [replyMessegeInfo, setreplyMessegeInfo] = useState("");

  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();

  useEffect(() => {
    setMessege("");
  }, [activeGroupData]);

  useEffect(() => {
    let groupRef = ref(db, "groupmembers");
    onValue(groupRef, (snapshot) => {
      let groupListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().memberuid) {
          groupListArray.push(item.val());
        }
      });
      setGroupList(groupListArray);
    });
  }, []);

  const handleGroupChatOpen = (item) => {
    dispatch(activeGroup(item));
    localStorage.setItem("activeGroup", JSON.stringify(item));
  };

  useEffect(() => {
    let groupMemberRef = ref(db, "groupmembers");
    onValue(groupMemberRef, (snapshot) => {
      let groupMemberArray = [];
      snapshot.forEach((item) => {
        if (activeGroupData.groupuid == item.val().groupuid) {
          groupMemberArray.push({ ...item.val(), groupmemberid: item.key });
        }
      });
      setGroupMemberLlist(groupMemberArray);
    });
  }, [activeGroupData]);

  const handleMemberRemove = (item) => {
    remove(ref(db, "groupmembers/" + item.groupmemberid));
  };

  const handleMessegeSend = () => {
    if (replyMessegeInfo) {
      set(push(ref(db, "gorupmessege/")), {
        messege: messege,
        messegetype: "reply",
        repliedtoname: replyMessegeInfo.messegesendername,
        repliedtomessege: replyMessegeInfo.messege,
        groupuid: activeGroupData.groupuid,
        groupname: activeGroupData.groupname,
        groupphoto: activeGroupData.groupphoto,
        messegesenderuid: activeUserData?.uid,
        messegesendername: activeUserData?.displayName,
        messegesenderprofile: activeUserData?.photoURL,
        messegesenttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      }).then(() => {
        setMessege("");
        setreplyMessegeInfo("");
      });
    } else {
      set(push(ref(db, "gorupmessege/")), {
        messege: messege,
        messegetype: "normal",
        groupuid: activeGroupData.groupuid,
        groupname: activeGroupData.groupname,
        groupphoto: activeGroupData.groupphoto,
        messegesenderuid: activeUserData?.uid,
        messegesendername: activeUserData?.displayName,
        messegesenderprofile: activeUserData?.photoURL,
        messegesenttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      }).then(() => {
        setMessege("");
        setreplyMessegeInfo("");
      });
    }
  };

  useEffect(() => {
    let messageREf = ref(db, "gorupmessege");
    onValue(messageREf, (snapshot) => {
      const messageArray = [];
      snapshot.forEach((item) => {
        if (activeGroupData.groupuid == item.val().groupuid) {
          messageArray.push({ ...item.val(), messageId: item.key });
        }
      });
      setGroupMessegeList(messageArray);
    });
  }, [activeGroupData]);

  useEffect(() => {
    let groupJoinRequstRef = ref(db, "groupjoinrequst");
    onValue(groupJoinRequstRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (activeGroupData.groupuid == item.val().groupuid) {
          array.push({ ...item.val(), joinrequstid: item.key });
        }
      });
      setGroupJoinRequstList(array);
    });
  }, [activeGroupData]);

  const handleJoinRequstAccept = (item) => {
    set(push(ref(db, "groupmembers/")), {
      groupuid: item.groupuid,
      groupname: item.groupname,
      groupphoto: item.groupphoto,
      groupadminuid: item.groupadminuid,
      groupadminname: item.groupadminname,
      groupadminprofile: item.groupadminprofile,
      memberuid: item.requstsenderuid,
      membername: item.requstsendername,
      memberprofile: item.requstsenderprofile,
      addedbyuid: activeUserData.uid,
      addedbyname: activeUserData.displayName,
      addedbyprofile: activeUserData.photoURL,
    }).then(() => {
      remove(ref(db, "groupjoinrequst/" + item.joinrequstid));
    });
  };
  const handleJoinRequstDelete = (item) => {
    remove(ref(db, "groupjoinrequst/" + item.joinrequstid));
  };

  const handleReply = (item) => {
    setreplyMessegeInfo(item);
  };

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
          <SearchBox
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={"Search group"}
            className={"mt-4"}
          />
        </Box>
        <Box className={"h-[84%] relative overflow-y-auto"}>
          {groupList.filter((item) => {
              return searchValue == "" ? item : item.groupname.toLowerCase().includes(searchValue.toLowerCase());
            }).map((item) => (
              <GroupItem
                groupId={item.groupuid}
                groupName={item?.groupname}
                groupPhoto={item?.groupphoto}
                onClick={() => handleGroupChatOpen(item)}
              />
            ))}
        </Box>
      </Box>
      {activeGroupData == null ? (
        <Box
          className={
            "w-[75%] ml-4 h-full bg-white rounded-2xl flex justify-center items-center"
          }
        >
          <Box>
            <Image
              src={noGroupPHoto}
              alt={"no chat image"}
              className={"w-[400px]"}
            />
            <Typography
              variant="h3"
              className="font-mono text-3xl text-center mt-1"
            >
              No Chat Selected
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box className={"w-[75%] ml-4 flex"}>
          <Box
            className={
              groupProfileOpen
               ? "w-[70%] h-full bg-white rounded-2xl relative overflow-hidden transition-all ease-in-out duration-100"
               : "w-full h-full bg-white rounded-2xl relative overflow-hidden transition-all ease-in-out duration-100"
            }
          >
            <Flex
              justifyContent={"between"}
              alignItems={"center"}
              className={"py-2 px-3 border-b border-b-[#dedede]"}
            >
              <Box
                className={
                  "flex items-center px-2 py-[5px]  rounded-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#f0f0f0]"
                }
              >
                <Image
                  src={activeGroupData.groupphoto}
                  alt={"random image"}
                  className={"w-11 aspect-square object-cover rounded-full"}
                />
                <Typography variant="h3" className="ml-3 text-lg font-semibold">
                  {activeGroupData.groupname}
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
            <Box
              className={
                replyMessegeInfo
                  ? "h-[calc(100%-(71px+127px))] bg-white px-6 overflow-y-scroll pb-2"
                  : "h-[calc(100%-(71px+73px))] bg-white px-6 overflow-y-scroll pb-2"
              }
            >
              <Box className={"mt-10 mb-10 text-center"}>
                <Image
                  src={activeGroupData.groupphoto}
                  alt={activeGroupData.groupname}
                  className={
                    "w-[120px] aspect-square object-cover rounded-full mx-auto"
                  }
                />
                <Typography
                  variant="h3"
                  className=" font-poppins text-lg font-semibold mt-2"
                >
                  {activeGroupData.groupname}
                </Typography>
                <Typography className="text-sm text-secoundaryText">
                  You're a Member of {activeGroupData.groupname}
                </Typography>
              </Box>
              
            </Box>
            <Box
              className={
                "bg-white absolute bottom-0 left-0 w-full border-t border-[#dedede]"
              }
            >
              {replyMessegeInfo && (
                <Box className={"pt-2 px-5 relative"}>
                  <MdCancel
                    onClick={() => setreplyMessegeInfo("")}
                    className="absolute top-2.5 right-2.5 text-[22px] text-secoundaryText cursor-pointer"
                  />
                  <Typography className="font-inter font-semibold">
                    Replying to{" "}
                    {activeUserData.uid == replyMessegeInfo.messegesenderuid
                      ? "yourself"
                      : replyMessegeInfo.messegesendername}
                  </Typography>
                  <Typography className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis w-[80%] text-[#65676b]">
                    {replyMessegeInfo.messege}
                  </Typography>
                </Box>
              )}
              <Flex
                justifyContent={"between"}
                alignItems={"center"}
                className={"py-3 pr-[5px] pl-5"}
              >
                <Flex>
                  <FaPlus className="box-content text-[#007bf5] text-[25px] p-2.5 rounded-[20%] mr-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                  <Box className={"relative group/tooltip mr-[5px]"}>
                    <FaRegImage className="box-content text-[#007bf5] text-[25px] p-2.5 rounded-[20%] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                    <Typography
                      variant="span"
                      className="w-[110px] text-center bg-[#323436] text-white py-[6px] px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[55px] hidden group-hover/tooltip:block"
                    >
                      Attach a file
                      <Box
                        className={
                          "w-[13px] h-[13px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-[80%] "
                        }
                      ></Box>
                    </Typography>
                  </Box>
                  <Box className={"relative group/tooltip mr-[5px]"}>
                    <HiMiniGif className="box-content text-[#007bf5] text-[25px] p-2.5 rounded-[20%] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                    <Typography
                      variant="span"
                      className="w-[115px] text-center bg-[#323436] text-white py-[6px] px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[55px] hidden group-hover/tooltip:block"
                    >
                      Choose a gif
                      <Box
                        className={
                          "w-[13px] h-[13px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-[80%] "
                        }
                      ></Box>
                    </Typography>
                  </Box>
                  <Box className={"relative group/tooltip mr-[5px]"}>
                    <FaMicrophone className="box-content text-[#007bf5] text-[25px] p-2.5 rounded-[20%] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                    <Typography
                      variant="span"
                      className="w-[170px] text-center bg-[#323436] text-white py-[6px] px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[55px] hidden group-hover/tooltip:block"
                    >
                      Sent voice messege
                      <Box
                        className={
                          "w-[13px] h-[13px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-[80%] "
                        }
                      ></Box>
                    </Typography>
                  </Box>
                </Flex>
                <Flex alignItems={"center"} className={"w-[80%]"}>
                  <Box className={"relative w-full"}>
                    <Input
                      value={messege}
                      onChange={(e) => setMessege(e.target.value)}
                      placeholder={"enter your messege"}
                      className={
                        "bg-[#f3f3f3] py-3 pr-12 pl-5 w-full outline-[#dddcea] rounded-[25px]"
                      }
                    />
                    <Box
                      className={
                        " absolute right-0 top-2/4 -translate-y-2/4 group/tooltip mr-[5px]"
                      }
                    >
                      <BsEmojiSmileFill className="box-content text-[#007bf5] text-[20px] p-3 rounded-[50%] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                      <Typography
                        variant="span"
                        className="w-[150px] text-center bg-[#323436] text-white py-[6px] px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[55px] hidden group-hover/tooltip:block"
                      >
                        Choose an emoji
                        <Box
                          className={
                            "w-[13px] h-[13px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-[80%] "
                          }
                        ></Box>
                      </Typography>
                    </Box>
                  </Box>
                  {messege == "" ? (
                    <Box className={"relative group/tooltip mr-[5px]"}>
                      <MdThumbUpAlt className="box-content text-[#007bf5] text-[24px] p-2.5 rounded-[20%] mb-[2px] ml-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                      <Typography
                        variant="span"
                        className="w-[100px] text-center bg-[#323436] text-white py-[6px] px-3 rounded-lg absolute right-0 bottom-[55px] hidden group-hover/tooltip:block"
                      >
                        send a like
                        <Box
                          className={
                            "w-[13px] h-[13px] bg-[#323436] rotate-45 absolute left-3/4 -translate-x-1/4 top-[80%] "
                          }
                        ></Box>
                      </Typography>
                    </Box>
                  ) : (
                    <Box className={"relative group/tooltip mr-[5px]"}>
                      <IoSend
                        onClick={handleMessegeSend}
                        className="box-content text-[#007bf5] text-[24px] p-2.5 rounded-[20%] mb-[2px] ml-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]"
                      />
                      <Typography
                        variant="span"
                        className="w-[120px] text-center bg-[#323436] text-white py-[6px] px-3 rounded-lg absolute right-0 bottom-[55px] hidden group-hover/tooltip:block"
                      >
                        Click to Send
                        <Box
                          className={
                            "w-[13px] h-[13px] bg-[#323436] rotate-45 absolute left-3/4 top-[80%] "
                          }
                        ></Box>
                      </Typography>
                    </Box>
                  )}
                </Flex>
              </Flex>
            </Box>
          </Box>
          <Box
            className={
              groupProfileOpen
                ? "w-[30%] ml-4 h-full bg-white rounded-2xl overflow-hidden text-center overflow-y-auto"
                : "w-0 ml-0 h-full bg-white rounded-2xl overflow-hidden text-center overflow-y-auto"
            }
          >
            <Box className={"mx-auto w-[120px]"}>
              <ModalImage
                small={activeGroupData.groupphoto}
                large={activeGroupData.groupphoto}
                alt={activeGroupData.groupname}
                className={
                  "w-[120px] h-[120px] rounded-full object-cover border border-[#dedede] mt-10 cursor-pointer"
                }
              />
            </Box>
            <GroupPhotoUploadModal
              modalShow={groupPhotoUploadModalShow}
              modalClose={setGroupPhotoUploadModalShow}
            />
            <Typography
              variant="h3"
              className="font-poppins font-semibold text-[20px] mt-[15px]"
            >
              {activeGroupData.groupname}
            </Typography>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              className={"mt-5"}
            >
              <Box
                className="relative mr-6 group"
                onClick={() => setMemberInviteModal(true)}
              >
                <PiUserCirclePlus className="box-content text-[28px] p-2 rounded-full cursor-pointer text-[#252b2f] bg-[#f5f5f5]" />
                <Box
                  className={
                    "absolute top-full left-2/4 -translate-x-2/4 hidden group-hover:block"
                  }
                >
                  <Typography className="w-[110px] mt-1 py-1 rounded-md bg-[#dedede]">
                    Add People
                  </Typography>
                </Box>
              </Box>
              <GroupMemberInviteModal
                modalShow={memberInviteModal}
                modalClose={setMemberInviteModal}
              />
              {groupNotificationOn ? (
                <Box className={"relative group"}>
                  <MdOutlineNotificationsNone
                    onClick={() => setGroupNotificationOn(!groupNotificationOn)}
                    className="box-content text-[22px] p-2.5 rounded-full cursor-pointer text-[#252b2f] bg-[#f5f5f5] transition-all ease-in-out duration-300"
                  />
                  <Box
                    className={
                      "absolute top-full left-2/4 -translate-x-2/4 hidden group-hover:block"
                    }
                  >
                    <Typography className="w-[65px] mt-1 py-1 rounded-md bg-[#dedede]">
                      Mute
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box className={"relative group"}>
                  <MdOutlineNotificationsOff
                    onClick={() => setGroupNotificationOn(!groupNotificationOn)}
                    className={`box-content text-[22px] p-2.5 rounded-full cursor-pointer text-[#252b2f] bg-[#dedede]`}
                  />
                  <Box
                    className={
                      "absolute top-full left-2/4 -translate-x-2/4 hidden group-hover:block"
                    }
                  >
                    <Typography className="w-[70px] mt-1 py-1 rounded-md bg-[#dedede]">
                      unmute
                    </Typography>
                  </Box>
                </Box>
              )}
            </Flex>
            <Box className={"mt-7 text-start px-5"}>
              <Box>
                <Flex
                  onClick={() => setChatInfoShow(!chatInfoShow)}
                  alignItems={"center"}
                  justifyContent={"between"}
                  className={
                    chatInfoShow
                      ? "text-lg mb-1 px-2.5 py-2 rounded-md  bg-[#f5f5f5] cursor-pointer text-black"
                      : "text-lg mb-1 px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                  }
                >
                  <Typography>Customize Group</Typography>

                  <IoIosArrowDown
                    className={chatInfoShow ? "rotate-180" : "rotate-0"}
                  />
                </Flex>
                {chatInfoShow && (
                  <Box className={"ml-2"}>
                    <Button
                      onClick={() => setGroupPhotoUploadModalShow(true)}
                      className={
                        "flex items-center gap-x-3 w-full text-lg px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                      }
                    >
                      <TbPhotoPlus className="text-xl" />
                      <Typography>Change group photo</Typography>
                    </Button>
                    <Button
                      onClick={() => setGroupNameChangeModal(true)}
                      className={
                        "flex items-center gap-x-3 w-full text-lg px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                      }
                    >
                      <FiEdit className="text-xl" />
                      <Typography>Change group name</Typography>
                    </Button>
                    <GroupNameChangeModal
                      modalShow={groupNameChangeModal}
                      modalClose={setGroupNameChangeModal}
                    />
                  </Box>
                )}
              </Box>
              <Box className={"mt-1"}>
                <Flex
                  onClick={() => setMediaShow(!mediaShow)}
                  alignItems={"center"}
                  justifyContent={"between"}
                  className={
                    mediaShow
                      ? "text-lg mb-1 px-2.5 py-2 rounded-md  bg-[#f5f5f5] cursor-pointer text-black"
                      : "text-lg mb-1 px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                  }
                >
                  <Typography>View Media</Typography>
                  <IoIosArrowDown
                    className={mediaShow ? "rotate-180" : "rotate-0"}
                  />
                </Flex>
                {mediaShow && (
                  <Box className={"ml-2"}>
                    <Button
                      className={
                        "flex items-center gap-x-3 w-full text-lg px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                      }
                    >
                      <FaRegImage className="text-xl" />
                      <Typography>Images</Typography>
                    </Button>
                    <Button
                      className={
                        "flex items-center gap-x-3 w-full text-lg px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                      }
                    >
                      <RiMovieLine className="text-xl" />
                      <Typography>Videos</Typography>
                    </Button>
                    <Button
                      className={
                        "flex items-center gap-x-3 w-full text-lg px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                      }
                    >
                      <LuFileSpreadsheet className="text-xl" />
                      <Typography>Files</Typography>
                    </Button>
                  </Box>
                )}
              </Box>
              <Box>
                <Flex
                  onClick={() => setGroupMemberShow(!groupMemberShow)}
                  alignItems={"center"}
                  justifyContent={"between"}
                  className={
                    groupMemberShow
                      ? "text-lg mb-1 px-2.5 py-2 rounded-md  bg-[#f5f5f5] cursor-pointer text-black"
                      : "text-lg mb-1 px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                  }
                >
                  <Typography>Group Members</Typography>
                  <IoIosArrowDown
                    className={groupMemberShow ? "rotate-180" : "rotate-0"}
                  />
                </Flex>
                {groupMemberShow && (
                  <Box
                    className={
                      "px-2.5 py-2 border border-primaryBorder rounded-md mb-1"
                    }
                  >
                    {groupMemberLlist.length > 0 ? (
                      groupMemberLlist.map((item) => (
                        <GroupMemberListItem
                          memberUid={item.memberuid}
                          memberName={item.membername}
                          memberProfile={item.memberprofile}
                          addedBy={item.addedbyname}
                          removeButton={() => handleMemberRemove(item)}
                        />
                      ))
                    ) : (
                      <Typography className="text-center">
                        There are no member in this group
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
              <Box>
                <Flex
                  onClick={() => setMembarRequstShow(!membarRequstShow)}
                  alignItems={"center"}
                  justifyContent={"between"}
                  className={
                    membarRequstShow
                      ? "text-lg mb-1 px-2.5 py-2 rounded-md  bg-[#f5f5f5] cursor-pointer text-black"
                      : "text-lg mb-1 px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                  }
                >
                  <Typography>Members Requst</Typography>
                  <IoIosArrowDown
                    className={membarRequstShow ? "rotate-180" : "rotate-0"}
                  />
                </Flex>
                {membarRequstShow && (
                  <Box
                    className={
                      "px-2.5 py-2 border border-primaryBorder rounded-md mb-1"
                    }
                  >
                    {groupJoinRequstList.length > 0 ? (
                      groupJoinRequstList.map((item) => (
                        <JoinRequstItem
                          profile={item.requstsenderprofile}
                          name={item.requstsendername}
                          deleteButton={() => handleJoinRequstDelete(item)}
                          acceptButton={() => handleJoinRequstAccept(item)}
                        />
                      ))
                    ) : (
                      <Typography className="text-center">
                        No join requst
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
              <Flex
                alignItems={"center"}
                justifyContent={"between"}
                className={
                  "text-lg mb-1 px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                }
              >
                <Typography>Leave Group</Typography>
                <CiLogout className={"rotate-180 text-black text-xl"} />
              </Flex>
            </Box>
          </Box>
        </Box>
      )}
    </section>
  );
};

export default Group;
