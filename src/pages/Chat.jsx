import React, { useEffect, useRef, useState } from "react";
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
import Modal from "../components/layout/Modal";
import MessageForwardListItem from "../components/layout/MessageForwardListItem";
import SenderVideo from "../components/layout/SenderVideo";
import ReciverVideo from "../components/layout/ReciverVideo";
import SenderFile from "../components/layout/SenderFile";
import ReciverFile from "../components/layout/ReciverFile";
import SenderGif from "../components/layout/SenderGif";
import SenderNormalMessage from "../components/layout/SenderNormalMessage";
import ReciverNormalMessege from "../components/layout/ReciverNormalMessege";
// React Icons
import { IoCall, IoVideocam } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus, FaRegImage } from "react-icons/fa6";
import { BsEmojiSmileFill, BsThreeDotsVertical } from "react-icons/bs";
import {
  MdBlock,
  MdThumbUpAlt,
  MdVideoLibrary,
  MdOutlineNotificationsNone,
  MdOutlineNotificationsOff,
  MdOutlinePrivacyTip,
} from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { HiMiniGif } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { RiPhoneFill, RiMovieLine } from "react-icons/ri";
import { LuFileSpreadsheet } from "react-icons/lu";
import { AiTwotoneVideoCamera } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { MdCancel } from "react-icons/md";
import { TbTriangleInvertedFilled } from "react-icons/tb";
// Firebase
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
// Redux slices
import { useDispatch, useSelector } from "react-redux";
import { activeChat } from "./../slices/activeChatSlice";
// Images
import noGroupPHoto from "/public/images/no chat image.jpg";
// react emoji picker
import EmojiPicker from "emoji-picker-react";
import GifPicker from "gif-picker-react";
import SenderForwardMessage from "./../components/layout/SenderForwardMessage";
import ReciverGif from "./../components/layout/ReciverGif";
import ReciverForwardMessege from "./../components/layout/ReciverForwardMessege";

const Chat = () => {
  const db = getDatabase();
  const storage = getStorage();
  const dispatch = useDispatch();
  const activeUserData = useSelector((state) => state.user.information);
  const activeChatData = useSelector((state) => state.activeChat.information);
  const [friendsProfileOpen, setFriendsProfileOpen] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [forwardSearchValue, setForwardSearchValue] = useState("");
  const [messege, setMessege] = useState("");
  const [forwardMessegeInfo, setForwardMessegeInfo] = useState("");
  const [replyMessegeInfo, setreplyMessegeInfo] = useState("");
  const [messegeList, setMessegeList] = useState([]);
  const [messegeNotification, setMessegeNotification] = useState(false);
  const [mediaShow, setMediaShow] = useState(true);
  const [privacyShow, setPrivacyShow] = useState(true);
  const [blockList, setBlockList] = useState([]);
  const [blockModalShow, setBlockModalShow] = useState(false);
  const [unblockModalShow, setUnblockModalShow] = useState(false);
  const [messageForwardModalShow, setMessageForwardModalShow] = useState(false);
  const [emojiPickerShow, setEmojiPickerShow] = useState(false);
  const [gifPickerShow, setGifPickerShow] = useState(false);
  const [image, setImage] = useState("");

  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const inputRef = useRef();
  const emojiBoxRef = useRef();
  const gifBoxRef = useRef();

  useEffect(() => {
    const friendListRef = ref(db, "friends");
    onValue(friendListRef, (snapshot) => {
      const FriendListArray = [];
      snapshot.forEach((item) => {
        if (
          activeUserData.uid == item.val().reciveruid ||
          activeUserData.uid == item.val().senderuid
        ) {
          FriendListArray.push(item.val());
        }
      });
      setFriendList(FriendListArray);
    });
  }, []);

  const filteredChatItem = friendList.filter((item) => {
    let name =
      activeUserData.uid == item.senderuid ? item.recivername : item.sendername;
    return searchValue == ""
      ? item
      : name.toLowerCase().includes(searchValue.toLowerCase());
  });

  useEffect(() => {
    let messegeRef = ref(db, "singlemessege/");
    onValue(messegeRef, (snapshot) => {
      let messegeArray = [];
      snapshot.forEach((item) => {
        if (
          (activeUserData?.uid == item.val().senderuid && activeChatData?.uid == item.val().reciveruid) ||
          (activeUserData?.uid == item.val().reciveruid && activeChatData?.uid == item.val().senderuid)
        ) {
          messegeArray.push({ ...item.val(), messegeid: item.key });
        }
      });
      setMessegeList(messegeArray);
    });
  }, [activeChatData]);

  const handleActiveChatOpen = (item) => {
    dispatch(activeChat({
      uid: activeUserData.uid == item.senderuid ? item.reciveruid : item.senderuid,
      name: activeUserData.uid == item.senderuid ? item.recivername : item.sendername,
      profile: activeUserData.uid == item.senderuid ? item.reciverprofile : item.senderprofile,
    }));
    localStorage.setItem("activeChat", JSON.stringify({
      uid: activeUserData.uid == item.senderuid ? item.reciveruid : item.senderuid,
      name: activeUserData.uid == item.senderuid ? item.recivername : item.sendername,
      profile: activeUserData.uid == item.senderuid ? item.reciverprofile : item.senderprofile,
    }));
  };

  useEffect(() => {
    setMessege("");
  }, [activeChatData]);

  const handleMessegeSend = () => {
    if (replyMessegeInfo) {
      set(push(ref(db, "singlemessege/")), {
        type: "text/reply",
        text: messege,
        repliedto: replyMessegeInfo.sendername,
        repliedmessege: replyMessegeInfo.text,
        reciveruid: activeChatData?.uid,
        recivername: activeChatData?.name,
        reciverrofile: activeChatData?.profile,
        senderuid: activeUserData?.uid,
        sendername: activeUserData?.displayName,
        senderprofile: activeUserData?.photoURL,
        senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      }).then(() => {
        setMessege("");
        setreplyMessegeInfo("");
      });
    } else {
      set(push(ref(db, "singlemessege/")), {
        type: "text/normal",
        text: messege,
        reciveruid: activeChatData?.uid,
        recivername: activeChatData?.name,
        reciverprofile: activeChatData?.profile,
        senderuid: activeUserData?.uid,
        sendername: activeUserData?.displayName,
        senderprofile: activeUserData?.photoURL,
        senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      }).then(() => {
        setMessege("");
      });
    }
  };

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

  const handleBlock = () => {
    set(ref(db, "block/" + (activeUserData?.uid + activeChatData?.uid)), {
      blockbyuid: activeUserData?.uid,
      blockbyname: activeUserData?.displayName,
      blockbyprofile: activeUserData?.photoURL,
      blockeduserid: activeChatData?.uid,
      blockedusername: activeChatData?.name,
      blockeduserprofile: activeChatData?.profile,
    }).then(() => {
      setBlockModalShow(false);
    });
  };

  const handleUnBlock = () => {
    remove(ref(db, "block/" + (activeUserData?.uid + activeChatData?.uid)));
    setUnblockModalShow(false);
  };

  const filteredForwardList = friendList.filter((item) => {
    const uid = activeUserData?.uid == item.reciveruid ? item.senderuid : item.reciveruid;
    const name = activeUserData?.uid == item.reciveruid ? item.sendername : item.recivername;
    return (
      !blockList.includes(uid + activeUserData.uid) &&
      !blockList.includes(activeUserData.uid + uid) &&
      (forwardSearchValue == "" ? item : name.toLowerCase().includes(forwardSearchValue.toLowerCase()))
    );
  });

  const handleMessegeForwardListShow = (item) => {
    setMessageForwardModalShow(true);
    setForwardMessegeInfo(item);
  };

  const handleForwardMessegeSend = (item) => {
    const reciveruid = activeUserData.uid == item.reciveruid ? item.senderuid : item.reciveruid;
    const recivername = activeUserData.uid == item.reciveruid ? item.sendername : item.recivername;
    const reciverprofile = activeUserData.uid == item.reciveruid ? item.senderprofile : item.reciverprofile;

    if (forwardMessegeInfo.type.includes("text")) {
      set(push(ref(db, "singlemessege/")), {
        type: "text/forwarded",
        text: forwardMessegeInfo.text,
        reciveruid: reciveruid,
        recivername: recivername,
        reciverprofile: reciverprofile,
        senderuid: activeUserData.uid,
        sendername: activeUserData.displayName,
        senderprofile: activeUserData.photoURL,
        senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      });
    } else if (forwardMessegeInfo.type.includes("image")) {
      set(push(ref(db, "singlemessege/")), {
        type: "image/forwarded",
        image: forwardMessegeInfo.image,
        reciveruid: reciveruid,
        recivername: recivername,
        reciverprofile: reciverprofile,
        senderuid: activeUserData?.uid,
        sendername: activeUserData?.displayName,
        senderprofile: activeUserData?.photoURL,
        senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      });
    } else if (forwardMessegeInfo.type.includes("video")) {
      set(push(ref(db, "singlemessege/")), {
        type: "video/forwarded",
        video: forwardMessegeInfo.video,
        reciveruid: reciveruid,
        recivername: recivername,
        reciverprofile: reciverprofile,
        senderuid: activeUserData?.uid,
        sendername: activeUserData?.displayName,
        senderprofile: activeUserData?.photoURL,
        senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      });
    } else if (forwardMessegeInfo.type.includes("file")) {
      set(push(ref(db, "singlemessege/")), {
        type: "file/forwarded",
        file: forwardMessegeInfo.file,
        filename: forwardMessegeInfo.filename,
        reciveruid: reciveruid,
        recivername: recivername,
        reciverprofile: reciverprofile,
        senderuid: activeUserData?.uid,
        sendername: activeUserData?.displayName,
        senderprofile: activeUserData?.photoURL,
        senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      });
    } else if (forwardMessegeInfo.type.includes("gif")) {
      set(push(ref(db, "singlemessege/")), {
        type: "gif/forwarded",
        gif: forwardMessegeInfo.gif,
        gifname: forwardMessegeInfo.gifname,
        reciveruid: reciveruid,
        recivername: recivername,
        reciverprofile: reciverprofile,
        senderuid: activeUserData?.uid,
        sendername: activeUserData?.displayName,
        senderprofile: activeUserData?.photoURL,
        senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      });
    }
  };

  const handleReply = (item) => {
    setreplyMessegeInfo(item);
    inputRef.current.focus();
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!emojiBoxRef.current.contains(e.target)) {
        setEmojiPickerShow(false);
      }
    });
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!gifBoxRef.current.contains(e.target)) {
        setGifPickerShow(false);
      }
    });
  }, []);

  const handleEmojiClick = (e) => {
    setMessege(messege + e.emoji);
  };

  const handleGifClick = (e) => {
    set(push(ref(db, "singlemessege/")), {
      type: "gif/normal",
      gif: e.url,
      gifname: e.description,
      reciveruid: activeChatData.uid,
      recivername: activeChatData.name,
      reciverrofile: activeChatData.profile,
      senderuid: activeUserData.uid,
      sendername: activeUserData.displayName,
      senderprofile: activeUserData.photoURL,
      senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
    });
  };

  const handleFileClick = (e) => {
    let file = e.target.files[0];

    if (file.type.includes("image")) {
      const fileRef = storageRef(storage, "image as a messege/" + Date.now());
      uploadBytes(fileRef, file).then((snapshot) => {
        getDownloadURL(fileRef).then((downloadURL) => {
          set(push(ref(db, "singlemessege/")), {
            type: "image/normal",
            image: downloadURL,
            reciveruid: activeChatData?.uid,
            recivername: activeChatData?.name,
            reciverprofile: activeChatData?.profile,
            senderuid: activeUserData?.uid,
            sendername: activeUserData?.displayName,
            senderprofile: activeUserData?.photoURL,
            senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
          });
        });
      });
    } else if (file.type.includes("video")) {
      const fileRef = storageRef(storage, "video as a messege/" + Date.now());
      uploadBytes(fileRef, file).then((snapshot) => {
        getDownloadURL(fileRef).then((downloadURL) => {
          set(push(ref(db, "singlemessege/")), {
            type: "video/normal",
            video: downloadURL,
            reciveruid: activeChatData?.uid,
            recivername: activeChatData?.name,
            reciverprofile: activeChatData?.profile,
            senderuid: activeUserData?.uid,
            sendername: activeUserData?.displayName,
            senderprofile: activeUserData?.photoURL,
            senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
          });
        });
      });
    } else if (file.type.includes("application/pdf")) {
      const fileRef = storageRef(storage, "file as a messege/" + Date.now());
      uploadBytes(fileRef, file).then((snapshot) => {
        getDownloadURL(fileRef).then((downloadURL) => {
          set(push(ref(db, "singlemessege/")), {
            type: "file/normal",
            file: downloadURL,
            filename: file.name,
            reciveruid: activeChatData?.uid,
            recivername: activeChatData?.name,
            reciverprofile: activeChatData?.profile,
            senderuid: activeUserData?.uid,
            sendername: activeUserData?.displayName,
            senderprofile: activeUserData?.photoURL,
            senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
          });
        });
      });
    }
  };

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
          {filteredChatItem.map((item) => (
            <ChatItem
              activeItem={activeChatData?.name}
              onClick={() => handleActiveChatOpen(item)}
              profile={activeUserData?.uid == item.senderuid ? item.reciverprofile : item.senderprofile}
              userName={activeUserData?.uid == item.senderuid ? item.recivername : item.sendername}
              userid={activeUserData?.uid == item.senderuid ? item.reciveruid : item.senderuid}
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
            className={
              friendsProfileOpen
                ? "w-[70%] h-full bg-white rounded-2xl relative overflow-hidden transition-all ease-in-out duration-100"
                : "w-full h-full bg-white rounded-2xl relative overflow-hidden transition-all ease-in-out duration-100"
            }
          >
            <Flex
              justifyContent={"between"}
              alignItems={"center"}
              className={" h-[70px] py-3 px-3 border-b border-b-[#dedede]"}
            >
              <Box
                onClick={() => setFriendsProfileOpen(!friendsProfileOpen)}
                className={
                  "flex items-center px-2.5 py-[5px]  rounded-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#f5f5f5]"
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
                  className={
                    friendsProfileOpen 
                    ? "bg-[#dedede] box-content text-[25px] ml-2.5 p-2.5 rounded-full cursor-pointer text-[#007bf5] transition-all ease-in-out duration-300"
                    : "hover:bg-[#dedede] box-content text-[25px] ml-2.5 p-2.5 rounded-full cursor-pointer text-[#007bf5] transition-all ease-in-out duration-300"
                  }
                />
              </Flex>
            </Flex>
            <Box
              className={
                blockList.includes(activeChatData?.uid + activeUserData?.uid)
                  ? "h-[calc(100%-(70px+133px))] bg-white px-6 overflow-y-scroll pb-2"
                  : blockList.includes(activeUserData?.uid + activeChatData?.uid)
                  ? "h-[calc(100%-(70px+93px))] bg-white px-6 overflow-y-scroll pb-2"
                  : replyMessegeInfo
                  ? "h-[calc(100%-(70px+127px))] bg-white px-6 overflow-y-scroll pb-2"
                  : "h-[calc(100%-(70px+73px))] bg-white px-6 overflow-y-scroll pb-2"
              }
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
                activeUserData.uid == item.senderuid ? (
                  item.type.includes("text") ? (
                    item.type == "text/normal" ? (
                      <SenderNormalMessage
                        message={item.text}
                        sentTime={item.senttime}
                        replyButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    ) : (
                      <SenderForwardMessage
                        message={item.text}
                        sentTime={item.senttime}
                        replyButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    )
                  ) : item.type.includes("image") ? (
                    item.type == "image/normal" ? (
                      <SenderImage
                        image={item.image}
                        imageType={"normal"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    ) : (
                      <SenderImage
                        image={item.image}
                        imageType={"forward"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    )
                  ) : item.type.includes("video") ? (
                    item.type == "video/normal" ? (
                      <SenderVideo
                        video={item.video}
                        videoType={"normal"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    ) : (
                      <SenderVideo
                        video={item.video}
                        videoType={"forward"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    )
                  ) : item.type.includes("file") ? (
                    item.type == "file/normal" ? (
                      <SenderFile
                        file={item.file}
                        fileName={item.filename}
                        fileType={"normal"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    ) : (
                      <SenderFile
                        file={item.file}
                        fileName={item.filename}
                        fileType={"forward"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    )
                  ) : (
                    item.type.includes("gif") &&
                    (item.type == "image/normal" ? (
                      <SenderGif
                        gif={item.gif}
                        gifName={item.gifname}
                        gifType={"normal"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    ) : (
                      <SenderGif
                        gif={item.gif}
                        gifName={item.gifname}
                        gifType={"forward"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    ))
                  )
                ) : (
                  activeChatData.uid == item.senderuid &&
                  (item.type.includes("text") ? (
                    item.type == "text/normal" ? (
                      <ReciverNormalMessege
                        name={item.sendername}
                        profile={item.senderprofile}
                        message={item.text}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    ) : (
                      <ReciverForwardMessege
                        name={item.sendername}
                        profile={item.senderprofile}
                        message={item.text}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    )
                  ) : item.type.includes("image") ? (
                    item.type == "image/normal" ? (
                      <ReciverImage
                        name={item.sendername}
                        profile={item.senderprofile}
                        image={item.image}
                        imageType={"normal"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    ) : (
                      <ReciverImage
                        name={item.sendername}
                        profile={item.senderprofile}
                        image={item.image}
                        imageType={"forward"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    )
                  ) : item.type.includes("video") ? (
                    item.type == "video/normal" ? (
                      <ReciverVideo
                        name={item.sendername}
                        profile={item.senderprofile}
                        video={item.video}
                        videoType={"normal"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    ) : (
                      <ReciverVideo
                        name={item.sendername}
                        profile={item.senderprofile}
                        video={item.video}
                        videoType={"forward"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    )
                  ) : item.type.includes("file") ? (
                    item.type == "file/forwarded" ? (
                      <ReciverFile
                        name={item.sendername}
                        profile={item.senderprofile}
                        file={item.file}
                        fileName={item.filename}
                        fileType={"forward"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    ) : (
                      <ReciverFile
                        name={item.sendername}
                        profile={item.senderprofile}
                        file={item.file}
                        fileName={item.filename}
                        fileType={"normal"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    )
                  ) : (
                    item.type.includes("gif") &&
                    (item.type == "gif/normal" ? (
                      <ReciverGif
                        name={item.sendername}
                        profile={item.senderprofile}
                        gif={item.gif}
                        gifName={item.gifname}
                        gifType={"normal"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    ) : (
                      <ReciverGif
                        name={item.sendername}
                        profile={item.senderprofile}
                        gif={item.gif}
                        gifName={item.gifname}
                        gifType={"forward"}
                        sentTime={item.senttime}
                        replayButton={() => handleReply(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    ))
                  ))
                )
              )}
              {/* {messegeList.map((item) =>
                activeChatData.uid == item.senderuid ? (
                  item.type == "image/normal" ? (
                    <ReciverImage
                      name={activeChatData?.name}
                      profile={activeChatData?.profile}
                      src={item.image}
                      alt={"open image"}
                      time={item.senttime}
                    />
                  ) : item.type == "video/normal" ? (
                    <ReciverVideo
                      name={activeChatData?.name}
                      profile={activeChatData?.profile}
                      src={item.video}
                      time={item.senttime}
                      replayButton={() => handleReply(item)}
                    />
                  ) : item.type == "file/normal" ? (
                    <ReciverFile
                      name={activeChatData?.name}
                      profile={activeChatData?.profile}
                      src={item.file}
                      fileName={item.filename}
                      time={item.senttime}
                      replayButton={() => handleReply(item)}
                    />
                  ) : item.type == "gif/normal" ? (
                    <ReciverImage
                      name={activeChatData?.name}
                      profile={activeChatData?.profile}
                      src={item.gif}
                      gifName={item.gifname}
                      time={item.senttime}
                      replyButton={() => handleReply(item)}
                    />
                  ) : item.type == "text/reply" ? (
                    <ReciverMessege
                      name={activeChatData?.name}
                      profile={activeChatData?.profile}
                      messege={item.text}
                      messegeType={item.type}
                      repliedtomessege={item.repliedmessege}
                      repliedbyname={item.sendername}
                      repliedtoname={item.repliedto}
                      time={item.senttime}
                      replyButton={() => handleReply(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  ) : (
                    <ReciverMessege
                      name={activeChatData?.name}
                      profile={activeChatData?.profile}
                      messege={item.text}
                      messegeType={item.type}
                      time={item.senttime}
                      replayButton={() => handleReply(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  )
                ) : item.type == "image/normal" ? (
                  <SenderImage
                    src={item.image}
                    alt={"open image"}
                    time={item.senttime}
                    replyButton={() => handleReply(item)}
                  />
                ) : item.type == "video/normal" ? (
                  <SenderVideo
                    src={item.video}
                    time={item.senttime}
                    replayButton={() => handleReply(item)}
                  />
                ) : item.type == "file/normal" ? (
                  <SenderFile
                    src={item.file}
                    fileName={item.filename}
                    time={item.senttime}
                    replayButton={() => handleReply(item)}
                  />
                ) : item.type == "gif/normal" ? (
                  <SenderGif
                    src={item.gif}
                    gifName={item.gifname}
                    time={item.senttime}
                    replayButton={() => handleReply(item)}
                  />
                ) : item.type == "text/reply" ? (
                  <SenderMessege
                    messege={item.text}
                    messegeType={item.type}
                    repliedbyname={item.sendername}
                    repliedtoname={item.repliedto}
                    repliedtomessege={item.repliedmessege}
                    time={item.senttime}
                    replyButton={() => handleReply(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : (
                  <SenderMessege
                    messege={item.text}
                    messegeType={item.type}
                    time={item.senttime}
                    replayButton={() => handleReply(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                )
              )} */}
              <Modal
                modalShow={messageForwardModalShow}
                modalClose={setMessageForwardModalShow}
                className={"w-[600px] h-[550px] py-8 px-[40px]"}
              >
                <RxCross2
                  onClick={() => setMessageForwardModalShow(false)}
                  className="absolute top-3 right-3 bg-primaryBgColor box-content p-2 text-lg rounded-full cursor-pointer"
                />
                <Box className={"h-[21%]"}>
                  <Typography className="text-lg font-bold mb-3">
                    Forward messege
                  </Typography>
                  <SearchBox
                    onChange={(e) => setForwardSearchValue(e.target.value)}
                    placeholder={"Search friends"}
                  />
                </Box>
                <Box className={"h-[79%] overflow-y-auto"}>
                  {filteredForwardList.map((item) => (
                    <MessageForwardListItem
                      profile={activeUserData.uid == item.senderuid ? item.reciverprofile : item.senderprofile}
                      name={activeUserData.uid == item.senderuid ? item.recivername : item.sendername}
                      button={"send"}
                      sendButton={() => handleForwardMessegeSend(item)}
                    />
                  ))}
                </Box>
              </Modal>
            </Box>
            {blockList.includes(activeChatData?.uid + activeUserData?.uid) ? (
              <Box
                className={
                  "text-center bg-white absolute bottom-0 left-0 w-full h-[133px] py-2.5 pr-[5px] pl-5 border-t border-[#dedede]"
                }
              >
                <Typography className="text-lg font-semibold mb-1">
                  You've blocked messages and calls from {activeChatData?.name}
                </Typography>
                <Typography className="text-secoundaryText mb-3">
                  You can't message or call {activeChatData?.name} in this chat,
                  and you won't receive their messages or calls.
                </Typography>
                <Button
                  onClick={() => setUnblockModalShow(true)}
                  className={
                    "w-full bg-[#e9e9e9] py-2 font-bold text-lg rounded-md transition-all duration-200 active:scale-[0.99]"
                  }
                >
                  Unblock
                </Button>
                <Modal
                  modalShow={unblockModalShow}
                  modalClose={setUnblockModalShow}
                  className={"text-center py-7 px-10 w-[550px]"}
                >
                  <Typography className=" font-open-sans text-3xl font-semibold mb-5">
                    Unblock {activeChatData?.name}?
                  </Typography>
                  <Typography className="text-lg font-semibold text-secoundaryText w-[360px] mx-auto mb-4 ">
                    Your will start receiving messages or calls from{" "}
                    {activeChatData?.name}'s account.
                  </Typography>
                  <Flex justifyContent={"between"}>
                    <Button
                      onClick={handleUnBlock}
                      className={
                        "bg-[#4e4f50] w-[48%] rounded-lg text-lg py-3 text-white font-semibold"
                      }
                    >
                      Yes, Unblock
                    </Button>
                    <Button
                      onClick={() => setUnblockModalShow(false)}
                      className={
                        "bg-[#c7f1db] text-[#4e4f50] w-[48%] rounded-lg text-lg py-3 font-semibold"
                      }
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Modal>
              </Box>
            ) : blockList.includes(
                activeUserData?.uid + activeChatData?.uid
              ) ? (
              <Box
                className={
                  "text-center bg-white absolute bottom-0 left-0 w-full h-[93px] py-2.5 pr-[5px] pl-5 border-t border-[#dedede]"
                }
              >
                <Typography className="text-lg font-semibold mb-1">
                  {activeChatData?.name} has blocked you from messaging and
                  calling
                </Typography>
                <Typography className="text-secoundaryText mb-4">
                  You can't message or call {activeChatData?.name} in this chat,
                  and you won't receive their messages or calls.
                </Typography>
              </Box>
            ) : (
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
                      {activeUserData.uid == replyMessegeInfo.senderuid
                        ? "yourself"
                        : replyMessegeInfo.sendername}
                    </Typography>
                    <Typography className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis w-[80%] text-[#65676b]">
                      {replyMessegeInfo.type.includes("text")
                        ? replyMessegeInfo.text
                        : replyMessegeInfo.type.includes("image")
                        ? "image"
                        : replyMessegeInfo.type.includes("video")
                        ? "video"
                        : "file"}
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
                      <Input
                        onChange={handleFileClick}
                        id={"file"}
                        type={"file"}
                        className={"hidden"}
                      />
                      <label for="file">
                        <FaRegImage className="box-content text-[#007bf5] text-[25px] p-2.5 rounded-[20%] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                      </label>
                      <Typography
                        variant="span"
                        className="w-[110px] text-center bg-[#323436] text-white py-[6px] px-3 rounded-lg absolute z-30 left-2/4 -translate-x-2/4 bottom-[55px] hidden group-hover/tooltip:block"
                      >
                        Attach a file
                        <Box
                          className={
                            "w-[13px] h-[13px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-[80%] "
                          }
                        ></Box>
                      </Typography>
                    </Box>
                    <div ref={gifBoxRef} className="relative">
                      <Box className={"relative group/tooltip mr-[5px]"}>
                        <HiMiniGif
                          onClick={() => setGifPickerShow(!gifPickerShow)}
                          className={`box-content text-[#007bf5] text-[25px] p-2.5 rounded-[20%] cursor-pointer transition-all ease-in-out duration-300 ${
                            gifPickerShow && "bg-[#dedede]"
                          } hover:bg-[#dedede]`}
                        />
                        {!gifPickerShow && (
                          <Typography
                            variant="span"
                            className="w-[115px] text-center bg-[#323436] text-white py-[6px] px-3 rounded-lg absolute z-10 left-2/4 -translate-x-2/4 bottom-[55px] hidden group-hover/tooltip:block"
                          >
                            Choose a gif
                            <Box
                              className={
                                "w-[13px] h-[13px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-[80%] "
                              }
                            ></Box>
                          </Typography>
                        )}
                      </Box>
                      {gifPickerShow && (
                        <Box
                          className={
                            "absolute z-20 bottom-[133%] right-0 translate-x-[55%] bg-white pb-5 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-[10px]"
                          }
                        >
                          <GifPicker
                            tenorApiKey={
                              "AIzaSyAW7la2woNuMnvq7z-KCOavIuaKyeQX_jg"
                            }
                            onGifClick={handleGifClick}
                          />
                          <Box
                            className={
                              "w-[20px] h-[20px] bg-white absolute left-[120px] -translate-y-2/4 top-full rotate-45"
                            }
                          ></Box>
                        </Box>
                      )}
                    </div>
                    <Box className={"relative group/tooltip mr-[5px]"}>
                      <FaMicrophone className="box-content text-[#007bf5] text-[25px] p-2.5 rounded-[20%] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                      <Typography
                        variant="span"
                        className="w-[170px] text-center bg-[#323436] text-white py-[6px] px-3 rounded-lg absolute z-30 left-2/4 -translate-x-2/4 bottom-[55px] hidden group-hover/tooltip:block"
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
                      <input
                        value={messege}
                        ref={inputRef}
                        onChange={(e) => setMessege(e.target.value)}
                        placeholder={"Enter your messege"}
                        className={
                          "bg-[#f3f3f3] py-3 pr-12 pl-5 w-full outline-[#dddcea] rounded-[25px]"
                        }
                      />
                      <div ref={emojiBoxRef}>
                        <Box
                          className={
                            " absolute right-0 top-2/4 -translate-y-2/4 group/tooltip"
                          }
                        >
                          <BsEmojiSmileFill
                            onClick={() => setEmojiPickerShow(!emojiPickerShow)}
                            className={`box-content text-[#007bf5] ${
                              emojiPickerShow && "bg-[#dedede]"
                            } text-[20px] p-3 rounded-[50%] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]`}
                          />
                          {!emojiPickerShow && (
                            <Typography
                              variant="span"
                              className="w-[150px] text-center bg-[#323436] text-white py-[6px] px-3 rounded-lg absolute z-10 left-2/4 -translate-x-2/4 bottom-[55px] hidden group-hover/tooltip:block"
                            >
                              Choose an emoji
                              <Box
                                className={
                                  "w-[13px] h-[13px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-[80%] "
                                }
                              ></Box>
                            </Typography>
                          )}
                        </Box>
                        {emojiPickerShow && (
                          <Box
                            className={
                              "absolute bottom-[130%] -right-[8px] rounded-[10px] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
                            }
                          >
                            <EmojiPicker
                              onEmojiClick={handleEmojiClick}
                              emojiStyle="facebook"
                            />
                            <Box
                              className={
                                "w-[20px] h-[20px] bg-white absolute right-5 -translate-y-2/4 top-full rotate-45"
                              }
                            ></Box>
                          </Box>
                        )}
                      </div>
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
                    {blockList.includes(
                      activeChatData?.uid + activeUserData?.uid
                    ) ? (
                      <Button
                        onClick={() => setUnblockModalShow(true)}
                        className={
                          "flex items-center gap-x-3 w-full text-lg px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                        }
                      >
                        <MdBlock className="text-xl" />
                        <Typography>Unblock</Typography>
                      </Button>
                    ) : blockList.includes(
                        activeUserData?.uid + activeChatData?.uid
                      ) ? (
                      <></>
                    ) : (
                      <Button
                        onClick={() => setBlockModalShow(true)}
                        className={
                          "flex items-center gap-x-3 w-full text-lg px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                        }
                      >
                        <MdBlock className="text-xl" />
                        <Typography>Block</Typography>
                      </Button>
                    )}
                    <Modal
                      modalShow={blockModalShow}
                      modalClose={setBlockModalShow}
                      className={"text-center py-7 px-10 w-[550px]"}
                    >
                      <Typography className=" font-open-sans text-3xl font-semibold mb-5">
                        Block {activeChatData?.name}?
                      </Typography>
                      <Typography className="text-lg font-semibold text-secoundaryText mx-auto mb-4 px-[10px]">
                        You can't message or call {activeChatData?.name} in this
                        chat, and you won't receive their messages or calls.
                      </Typography>
                      <Flex justifyContent={"between"}>
                        <Button
                          onClick={handleBlock}
                          className={
                            "bg-[#f87171] w-[48%] rounded-lg text-lg py-3 text-white font-semibold"
                          }
                        >
                          Yes, Block
                        </Button>
                        <Button
                          onClick={() => setBlockModalShow(false)}
                          className={
                            "bg-[#c7f1db] text-[#4e4f50] w-[48%] rounded-lg text-lg py-3 font-semibold"
                          }
                        >
                          Cancel
                        </Button>
                      </Flex>
                    </Modal>
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
