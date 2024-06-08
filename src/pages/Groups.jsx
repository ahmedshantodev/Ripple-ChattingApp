import React, { useEffect, useRef, useState } from "react";
// Reusble Components
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
import { useDispatch, useSelector } from "react-redux";
import { FcInvite } from "react-icons/fc";
import { IoIosArrowDown } from "react-icons/io";
import { IoCall, IoVideocam } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus, FaRegImage, FaFile } from "react-icons/fa6";
import { BsEmojiSmileFill } from "react-icons/bs";
import {
  MdOutlineNotificationsNone,
  MdOutlineNotificationsOff,
  MdThumbUpAlt,
} from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";
import { RiMovieLine } from "react-icons/ri";
import { TbPhotoPlus } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { CiLogout } from "react-icons/ci";
import SearchBox from "../components/layout/SearchBox";
import { activeGroup } from "../slices/activeGroupSlice";
import GroupPhotoUploadModal from "../components/layout/GroupPhotoUploadModal";
import GroupInvitationListItem from "../components/layout/GroupInvitationListItem";
import noGroupPHoto from "/public/images/no chat image.jpg";
import { PiUserCirclePlus } from "react-icons/pi";
import Button from "../components/layout/Button";
import ReciverMessege from "../components/layout/ReciverMessege";
import SenderMessege from "../components/layout/SenderMessege";
import ModalImage from "react-modal-image";
import GroupNameChangeModal from "../components/layout/GroupNameChangeModal";

const Group = () => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const activeUserData = useSelector((state) => state.user.information);
  const activeGroupData = useSelector((state) => state.activeGroup.information);
  const [groupList, setGroupList] = useState([]);
  const [dropDownShow, setDropDownShow] = useState(false);
  const [groupProfileOpen, setGroupProfileOpen] = useState(false);
  const [groupNotificationOn, setGroupNotificationOn] = useState(true);
  const [groupMemberShow, setGroupMemberShow] = useState(false);
  const [membarRequstShow, setMembarRequstShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [groupInvitationList, setGroupInvitationList] = useState([]);
  const [groupMemberLlist, setGroupMemberLlist] = useState([]);
  const [mediaShow, setMediaShow] = useState(false);
  const [chatInfoShow, setChatInfoShow] = useState(false);
  const [groupNameChangeModal, setGroupNameChangeModal] = useState(false);

  const [memberInviteModal, setMemberInviteModal] = useState(false);
  const memberInviteModalRef = useRef();
  const memberInviteButtonRef = useRef();

  const [groupCreateModal, setGroupCreateModal] = useState(false);
  const groupCreateModalRef = useRef();
  const groupCreateButtonRef = useRef();

  const [groupPhotoUploadModalShow, setGroupPhotoUploadModalShow] =
    useState(false);

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

  const handleActiveGroupOpen = (item) => {
    dispatch(activeGroup(item));
    localStorage.setItem("activeGroup", JSON.stringify(item));
  };

  useEffect(() => {
    let invitationRef = ref(db, "groupinvitation");
    onValue(invitationRef, (snapshot) => {
      let invitationArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().invitationreciveruid) {
          invitationArray.push({ ...item.val(), invitationId: item.key });
        }
      });
      setGroupInvitationList(invitationArray);
    });
  }, []);

  const handleInvitationAccept = (item) => {
    set(push(ref(db, "groupmembers/")), {
      groupuid: item.groupuid,
      groupname: item.groupname,
      groupslogan: item.groupslogan,
      groupphoto: item.groupphoto,
      memberuid: item.invitationreciveruid,
      membername: item.invitationrecivername,
      memberprofile: item.invitationreciverprofile,
      addedbyuid: item.invitationsenderuid,
      addedbyname: item.invitationsendername,
      addedbyprofile: item.invitationsenderprofile,
    }).then(() => {
      remove(ref(db, "groupinvitation/" + item.invitationId));
    });
  };

  const handleInvitationReject = (item) => {
    remove(ref(db, "groupinvitation/" + item.invitationId));
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
            <div ref={groupCreateButtonRef} className="relative group">
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
            </div>
            {groupCreateModal && (
              <GroupCreateModal
                modalRef={groupCreateModalRef}
                modalClose={setGroupCreateModal}
              />
            )}
          </Flex>
          <SearchBox
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={"Search messenger"}
            className={"mt-4"}
          />
        </Box>
        <Box className={"h-[84%] relative overflow-y-auto"}>
          <Box
            className={`mb-2 bg-[#ededf9] rounded-md ${
              dropDownShow && "border-b-[5px] border-[#dddcea]"
            }`}
          >
            <Box
              onClick={() => setDropDownShow(!dropDownShow)}
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
                {groupInvitationList.length > 0 && (
                  <Typography className="w-[22px] h-[22px] text-[12px] bg-[#cb112d] text-white flex justify-center items-center rounded-full mr-2">
                    {groupInvitationList.length}
                  </Typography>
                )}
                <IoIosArrowDown
                  className={`text-[22px] text-black mr-2 ${
                    dropDownShow ? "rotate-180" : "rotate-0"
                  }`}
                />
              </Box>
            </Box>
            {dropDownShow && (
              <Box
                className={`min-h-[100px] transition-all ease-in-out duration-300 py-2 px-2.5`}
              >
                {groupInvitationList.map((item) => (
                  <GroupInvitationListItem
                    groupPhoto={item.groupphoto}
                    groupName={item.groupname}
                    invitedBy={item.invitationsendername}
                    acceptButton={() => handleInvitationAccept(item)}
                    rejectButton={() => handleInvitationReject(item)}
                  />
                ))}
              </Box>
            )}
          </Box>
          {groupList
            .filter((item) => {
              return searchValue == ""
                ? item
                : item.groupname
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            })
            .map((item) => (
              <GroupItem
                activeItem={activeGroupData?.groupname}
                onClick={() => handleActiveGroupOpen(item)}
                profile={item?.groupphoto}
                groupName={item?.groupname}
                lastMessege={"random messege...."}
                lastMessegeSentTime={"30 min"}
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
            className={`${
              groupProfileOpen ? "w-[70%]" : "w-full"
            } h-full bg-white rounded-2xl relative overflow-hidden transition-all ease-in-out duration-100`}
          >
            <Flex
              justifyContent={"between"}
              alignItems={"center"}
              className={"h-[10%] py-3 px-3 border-b border-b-[#dedede]"}
            >
              <Box
                className={
                  "flex items-center px-2 py-[5px]  rounded-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#f0f0f0]"
                }
              >
                <Image
                  src={activeGroupData?.groupphoto}
                  alt={"random image"}
                  className={"w-12 h-12 rounded-full"}
                />
                <Typography variant="h3" className="ml-3 text-lg font-semibold">
                  {activeGroupData?.groupname}
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
            <Box className={"h-[81%] bg-white px-6 overflow-y-scroll pb-2"}>
              <Box className={"mt-10 mb-10 text-center"}>
                <Image
                  src={activeGroupData?.groupphoto}
                  alt={activeGroupData?.groupname}
                  className={
                    "w-[120px] aspect-square object-cover rounded-full mx-auto"
                  }
                />
                <Typography
                  variant="h3"
                  className=" font-poppins text-lg font-semibold mt-2"
                >
                  {activeGroupData?.groupname}
                </Typography>
                <Typography className="text-sm text-secoundaryText">
                  You're a Member of {activeGroupData?.groupname}
                </Typography>
              </Box>

              <ReciverMessege
                messege={"hi"}
                messegeSentTime={"2024-06-08-10-11"}
              />
              <SenderMessege
                messege={"Hello"}
                messegeSentTime={"2024-06-08-10-11"}
              />
              <ReciverMessege
                messege={"hi"}
                messegeSentTime={"2024-06-08-10-11"}
              />
              <SenderMessege
                messege={"Hello"}
                messegeSentTime={"2024-06-08-10-11"}
              />
              <ReciverMessege
                messege={"hi"}
                messegeSentTime={"2024-06-08-10-11"}
              />
              <SenderMessege
                messege={
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut iste ullam earum accusamus repudiandae vero harum corporis labore distinctio at eum, reprehenderit facere delectus sint molestias consequatur voluptates. Suscipit quae aspernatur reiciendis doloribus, nisi molestiae ratione repellat dolor soluta debitis quas temporibus ex mollitia voluptates nemo, consectetur vitae animi. Doloremque, quaerat quod minima sint at, adipisci eius odio perferendis necessitatibus pariatur voluptatum facilis ipsum ducimus quae deleniti! Incidunt obcaecati itaque vitae necessitatibus dolorem culpa molestias. Libero esse dicta sapiente adipisci ut ducimus corporis maxime vitae, qui nemo fugit ipsa omnis tempore molestias id quisquam, cumque obcaecati eveniet quas commodi aliquam veritatis eos. Incidunt vero dignissimos, architecto nesciunt illo sequi"
                }
                messegeSentTime={"2024-06-08-10-11"}
              />
            </Box>
            <Flex
              justifyContent={"between"}
              alignItems={"center"}
              className={
                "h-[9%] bg-white absolute bottom-0 left-0 w-full py-2.5 pr-[5px] pl-5 border-t border-[#dedede]"
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
                    className={
                      "bg-[#f3f3f3] py-3 pr-0 pl-5 w-full outline-none"
                    }
                  />
                  <BsEmojiSmileFill className="box-content text-[#007bf5] text-[20px] p-3 rounded-[50%] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                </Flex>
                <MdThumbUpAlt className="box-content text-[#007bf5] text-[24px] p-2.5 rounded-[20%] mb-[2px] ml-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
              </Flex>
            </Flex>
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
                small={activeGroupData?.groupphoto}
                large={activeGroupData?.groupphoto}
                alt={activeGroupData?.groupname}
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
              {activeGroupData?.groupname}
            </Typography>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              className={"mt-5"}
            >
              <div
                className="relative mr-6 group"
                ref={memberInviteButtonRef}
                onclick={() => setMemberInviteModal(true)}
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
              </div>
              {memberInviteModal && (
                <GroupMemberInviteModal
                  modalRef={memberInviteModalRef}
                  modalClose={setMemberInviteModal}
                />
              )}
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
                  <Typography>Chat info</Typography>

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
                  <Typography>View media</Typography>
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
                          memberProfile={item.memberprofile}
                          memberName={item.membername}
                          addedBy={item.addedbyname}
                          removeButton={() => handleMemberRemove(item)}
                        />
                      ))
                    ) : (
                      <Typography>There are no member in this group</Typography>
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
                    <JoinRequstItem />
                    <JoinRequstItem />
                    <JoinRequstItem />
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
