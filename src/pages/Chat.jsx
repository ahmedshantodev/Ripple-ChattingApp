import React, { useEffect, useState } from "react";
// Components
import Box from "../components/layout/Box";
import Typography from "../components/layout/Typography";
import Flex from "../components/layout/Flex";
import Input from "../components/layout/Input";
import Image from "../components/layout/Image";
import ChatItem from "../components/layout/ChatItem";
import SearchBox from "../components/layout/SearchBox";
import ReciverMessege from "../components/layout/ReciverMessege";
import SenderMessege from "../components/layout/SenderMessege";
import SenderImage from "../components/layout/SenderImage";
import ReciverImage from "../components/layout/ReciverImage";
import Button from "../components/layout/Button";
// React Icons
import { IoCall , IoVideocam } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus, FaRegImage } from "react-icons/fa6";
import { BsEmojiSmileFill , BsThreeDotsVertical } from "react-icons/bs";
import { MdBlock, MdThumbUpAlt , MdVideoLibrary, MdOutlineNotificationsNone, MdOutlineNotificationsOff, MdOutlinePrivacyTip } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { HiMiniGif } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { RiPhoneFill, RiMovieLine } from "react-icons/ri";
import { LuFileSpreadsheet } from "react-icons/lu";
import { AiTwotoneVideoCamera } from "react-icons/ai";
// Firebase
import { getDatabase, onValue, push, ref, set } from "firebase/database";
// Redux slices
import { useDispatch, useSelector } from "react-redux";
import { activeChat } from "./../slices/activeChatSlice";
// Images
import noGroupPHoto from "/public/images/no chat image.jpg";

const Chat = () => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const activeUserData = useSelector((state) => state.user.information);
  const activeChatData = useSelector((state) => state.activeChat.information);
  const [friendsProfileOpen, setFriendsProfileOpen] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [messege, setMessege] = useState("");
  const [messegeList, setMessegeList] = useState([]);
  const [messegeNotification, setMessegeNotification] = useState(false);
  const [mediaShow, setMediaShow] = useState(true);
  const [privacyShow, setPrivacyShow] = useState(true);

  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();

  useEffect(() => {
    const friendListRef = ref(db, "friends");
    onValue(friendListRef, (snapshot) => {
      const FriendListArray = [];
      snapshot.forEach((item) => {
        if ( activeUserData.uid == item.val().reciveruid || activeUserData.uid == item.val().senderuid) {
          FriendListArray.push(item.val());
        }
      });
      setFriendList(FriendListArray);
    });
  }, []);

  const handleActiveChatOpen = (item) => {
    dispatch(activeChat({
        uid: activeUserData.uid == item.senderuid ? item.reciveruid : item.senderuid,
        name: activeUserData.uid == item.senderuid ? item.recivername : item.sendername,
        profile: activeUserData.uid == item.senderuid ? item.reciverprofile : item.senderprofile,
      })
    );
    localStorage.setItem(
      "activeChat",
      JSON.stringify({
        uid: activeUserData.uid == item.senderuid ? item.reciveruid : item.senderuid,
        name: activeUserData.uid == item.senderuid ? item.recivername : item.sendername,
        profile: activeUserData.uid == item.senderuid ? item.reciverprofile : item.senderprofile,
      })
    );
  };

  useEffect(() => {
    setMessege("");
  }, [activeChatData]);

  const handleMessegeSend = () => {
    set(push(ref(db, "messege/")), {
      messege: messege,
      messegereciveruid: activeChatData?.uid,
      messegesreciverame: activeChatData?.name,
      messegesreciverrofile: activeChatData?.profile,
      messegesenderuid: activeUserData?.uid,
      messegesendername: activeUserData?.displayName,
      messegesenderprofile: activeUserData?.photoURL,
      messegesenttime: `${year}/${month}/${date}/${hours}:${minutes}`,
    }).then(() => {
      setMessege("");
    });
  };

  useEffect(() => {
    let messegeRef = ref(db, "messege/");
    onValue(messegeRef, (snapshot) => {
      let messegeArray = [];
      snapshot.forEach((item) => {
        if (
          (activeUserData.uid == item.val().messegesenderuid && activeChatData.uid == item.val().messegereciveruid) ||
          (activeUserData.uid == item.val().messegereciveruid && activeChatData.uid == item.val().messegesenderuid)
        ) {
          messegeArray.push({ ...item.val(), messegeid: item.key });
        }
      });
      setMessegeList(messegeArray);
    });
  }, [activeChatData]);

  const [blockList, setBlockList] = useState([]);

  useEffect(() => {
    const blockListRef = ref(db, "block/");
    onValue(blockListRef, (snapshot) => {
      let blockListArray = [];
      snapshot.forEach((item) => {
        blockListArray.push(item.val().blockeduserid + item.val().blockbyuid);
      });
      setBlockList(blockListArray);
    });
  }, []);

  return (
    <section className="w-full h-dvh bg-[#dddcea] p-4 flex">
      <Box
        className={"w-1/4 h-full bg-white rounded-2xl pt-6 pr-2.5 pb-5 pl-2.5"}
      >
        <Box className={"h-[15%] px-2.5"}>
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
          <SearchBox
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={"Search messenger"}
            className={"mt-4"}
          />
        </Box>
        <Box className={"h-[85%] overflow-y-auto"}>
          {friendList.filter((item) => {
              let name = activeUserData.uid == item.senderuid ? item.recivername : item.sendername;
              return searchValue == "" ? item : name.toLowerCase().includes(searchValue.toLowerCase());
            }).map((item) => (
              <ChatItem
                activeItem={activeChatData?.name}
                onClick={() => handleActiveChatOpen(item)}
                profile={activeUserData.uid == item.senderuid ? item.reciverprofile : item.senderprofile}
                userName={activeUserData.uid == item.senderuid ? item.recivername : item.sendername}
                lastMessege={"random messege...."}
                lastMessegeSentTime={"30 min"}
              />
            ))}
        </Box>
      </Box>
      {activeChatData == null ? (
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
            className={`${friendsProfileOpen ? "w-[70%]" : "w-full"} h-full bg-white rounded-2xl relative overflow-hidden transition-all ease-in-out duration-100`}
          >
            <Flex
              justifyContent={"between"}
              alignItems={"center"}
              className={" h-[10%] py-3 px-3 border-b border-b-[#dedede]"}
            >
              <Box
                className={
                  "flex items-center px-2.5 py-[5px]  rounded-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dddcea]"
                }
              >
                <Image
                  src={activeChatData?.profile}
                  alt={activeChatData?.name}
                  className={"w-12 h-12 rounded-full"}
                />
                <Typography variant="h3" className="ml-3 text-lg font-semibold">
                  {activeChatData?.name}
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
            <Box
              className={`${blockList.includes(activeChatData?.uid + activeUserData?.uid) ? "h-[74%]" : blockList.includes(activeUserData?.uid + activeChatData?.uid) ? "h-[79%]" : "h-[81%]"} bg-white px-6 overflow-y-scroll pb-2`}
            >
              <Box className={"mt-10 mb-10 text-center"}>
                <Image
                  src={activeChatData?.profile}
                  alt={activeChatData?.name}
                  className={
                    "w-[120px] aspect-square object-cover rounded-full mx-auto"
                  }
                />
                <Typography
                  variant="h3"
                  className=" font-poppins text-lg font-semibold mt-2"
                >
                  {activeChatData?.name}
                </Typography>
                <Typography className="text-sm text-secoundaryText">
                  You're friends on Ripple
                </Typography>
              </Box>
              {messegeList.map((item) =>
                activeChatData.uid == item.messegesenderuid ? (
                  <ReciverMessege
                    messege={item.messege}
                    time={item.messegesenttime}
                  />
                ) : (
                  <SenderMessege
                    messege={item.messege}
                    time={item.messegesenttime}
                  />
                )
              )}
            </Box>
            {blockList.includes(activeChatData?.uid + activeUserData?.uid) ? (
                <Box className={
                  "text-center bg-white absolute bottom-0 left-0 w-full py-2.5 pr-[5px] pl-5 border-t border-[#dedede]"
                }>
                  <Typography className="text-lg font-semibold mb-1">
                    You've blocked messages and calls from {activeChatData?.name}
                  </Typography>
                  <Typography className="text-secoundaryText mb-3">
                    You can't message or call {activeChatData?.name} in this chat, and you won't receive their messages or calls.
                  </Typography>
                  <Button className={"w-full bg-[#e9e9e9] py-2 font-bold text-lg rounded-md transition-all duration-200 active:scale-[0.99]"}>
                    Unblock
                  </Button>
                </Box>
            ) : blockList.includes(activeUserData?.uid + activeChatData?.uid) ? (
              <Box className={
                "text-center bg-white absolute bottom-0 left-0 w-full py-2.5 pr-[5px] pl-5 border-t border-[#dedede]"
              }>
                <Typography className="text-lg font-semibold mb-1">
                  {activeChatData?.name} has blocked you from messaging and calling
                </Typography>
                <Typography className="text-secoundaryText mb-4">
                  You can't message or call {activeChatData?.name} in this chat, and you won't receive their messages or calls.
                </Typography>
              </Box>
          ) : (
            <Flex
              justifyContent={"between"}
              alignItems={"center"}
              className={
                "h-[9%] bg-white absolute bottom-0 left-0 w-full py-2.5 pr-[5px] pl-5 border-t border-[#dedede]"
              }
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
                    <IoSend onClick={handleMessegeSend} className="box-content text-[#007bf5] text-[24px] p-2.5 rounded-[20%] mb-[2px] ml-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
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
            )}
          </Box>
          <Box
            className={
              friendsProfileOpen 
              ? "w-[30%] ml-4 h-full bg-white rounded-2xl overflow-hidden text-center"
              : "w-0 ml-0 h-full bg-white rounded-2xl overflow-hidden text-center"
            }
          >
            <Image
              src={activeChatData?.profile}
              alt={activeChatData?.name}
              className={
                "w-[130px] h-[130px] rounded-full object-cover mx-auto mt-14 border border-[#dedede]"
              }
            />
            <Typography
              variant="h3"
              className="font-poppins font-semibold text-[22px] mt-[15px]"
            >
              {activeChatData?.name}
            </Typography>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              className={"mt-5"}
            >
              <Box className="relative mr-6 group">
                <RiPhoneFill className="box-content text-[25px] p-2.5 rounded-full cursor-pointer text-[#252b2f] bg-[#f5f5f5]" />
                <Box
                  className={
                    "absolute top-full left-2/4 -translate-x-2/4 hidden group-hover:block"
                  }
                >
                  <Typography className="w-[90px] mt-1 py-1 rounded-md bg-[#dedede]">
                    Audio Call
                  </Typography>
                </Box>
              </Box>
              <Box className="relative mr-6 group">
                <AiTwotoneVideoCamera className="box-content text-[25px] p-2.5 rounded-full cursor-pointer text-[#252b2f] bg-[#f5f5f5]" />
                <Box
                  className={
                    "absolute top-full left-2/4 -translate-x-2/4 hidden group-hover:block"
                  }
                >
                  <Typography className="w-[90px] mt-1 py-1 rounded-md bg-[#dedede]">
                    Video Call
                  </Typography>
                </Box>
              </Box>
              {messegeNotification ? (
                <Box className={"relative group"}>
                  <MdOutlineNotificationsNone
                    onClick={() => setMessegeNotification(!messegeNotification)}
                    className="box-content text-[25px] p-2.5 rounded-full cursor-pointer text-[#252b2f] bg-[#f5f5f5] transition-all ease-in-out duration-300"
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
                    onClick={() => setMessegeNotification(!messegeNotification)}
                    className={`box-content text-[25px] p-2.5 rounded-full cursor-pointer text-[#252b2f] bg-[#f5f5f5]`}
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
            <Box className={"text-start px-5 mt-8"}>
              <Box>
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
                  <Flex alignItems={"center"} className={"gap-x-3"}>
                    <MdVideoLibrary className="text-xl" />
                    <Typography>View media</Typography>
                  </Flex>
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
              <Box className={"mt-1"}>
                <Flex
                  onClick={() => setPrivacyShow(!privacyShow)}
                  alignItems={"center"}
                  justifyContent={"between"}
                  className={
                    privacyShow
                      ? "text-lg mb-1 px-2.5 py-2 rounded-md  bg-[#f5f5f5] cursor-pointer text-black"
                      : "text-lg mb-1 px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                  }
                >
                  <Flex alignItems={"center"} className={"gap-x-3"}>
                    <MdOutlinePrivacyTip className="text-xl" />
                    <Typography>Privacy</Typography>
                  </Flex>
                  <IoIosArrowDown
                    className={privacyShow ? "rotate-180" : "rotate-0"}
                  />
                </Flex>
                {privacyShow && (
                  <Box className={"ml-2"}>
                    <Button
                      className={
                        "flex items-center gap-x-3 w-full text-lg px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                      }
                    >
                      <MdOutlineNotificationsOff className="text-xl" />
                      <Typography>Mute notifications</Typography>
                    </Button>
                    <Button
                      className={
                        "flex items-center gap-x-3 w-full text-lg px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                      }
                    >
                      <MdBlock className="text-xl" />
                      <Typography>Block</Typography>
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </section>
  );
};

export default Chat;
