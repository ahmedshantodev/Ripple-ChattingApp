import Box from "../components/layout/Box";
import Flex from "../components/layout/Flex";
import Modal from "../components/layout/Modal";
import Input from "../components/layout/Input";
import Image from "../components/layout/Image";
import Button from "../components/layout/Button";
import SenderImage from "../components/layout/SenderImage";
import React, { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Typography from "../components/layout/Typography";
import ReciverImage from "../components/layout/ReciverImage";
import SenderVideo from "../components/layout/SenderVideo";
import ReciverVideo from "../components/layout/ReciverVideo";
import SenderFile from "../components/layout/SenderFile";
import ReciverFile from "../components/layout/ReciverFile";
import SenderGif from "../components/layout/SenderGif";
import SenderNormalMessage from "../components/layout/SenderNormalMessage";
import ReciverNormalMessege from "../components/layout/ReciverNormalMessege";
import { IoCall, IoVideocam } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { BsEmojiSmileFill } from "react-icons/bs";
import {
  MdBlock,
  MdThumbUpAlt,
  MdVideoLibrary,
  MdOutlineNotificationsNone,
  MdOutlineNotificationsOff,
  MdOutlinePrivacyTip,
} from "react-icons/md";
import { HiMiniGif } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { RiPhoneFill, RiMovieLine } from "react-icons/ri";
import { LuFileSpreadsheet } from "react-icons/lu";
import { AiTwotoneVideoCamera } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import {
  set,
  ref,
  push,
  remove,
  onValue,
  getDatabase,
} from "firebase/database";
import {
  uploadBytes,
  getStorage,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
import { useSelector } from "react-redux";
import noGroupPHoto from "/public/images/no chat image.jpg";
import EmojiPicker from "emoji-picker-react";
import GifPicker from "gif-picker-react";
import SenderForwardMessage from "./../components/layout/SenderForwardMessage";
import ReciverGif from "./../components/layout/ReciverGif";
import ReciverForwardMessege from "./../components/layout/ReciverForwardMessege";
import SenderRepliedMessage from "../components/layout/SenderRepliedMessage";
import ReciverRepliedMessege from "../components/layout/ReciverRepliedMessege";
import MediaImageItem from "../components/layout/MediaImageItem";
import MediaVideoItem from "../components/layout/MediaVideoItem";
import MediaFileItem from "../components/layout/MediaFileItem";
import ModalImage from "react-modal-image";
import SenderDeletedMessage from "../components/layout/SenderDeletedMessage";
import ReciverDeletedMessage from "../components/layout/ReciverDeletedMessage";
import SenderEditedMessage from "../components/layout/SenderEditedMessage";
import ReciverEditedMessage from "../components/layout/ReciverEditedMessage";
import ReciverLike from "../components/layout/ReciverLike";
import SenderLike from "../components/layout/SenderLike";

import { AudioRecorder } from 'react-audio-voice-recorder';
import SenderVoiceMessage from "../components/layout/SenderVoiceMessage";
import ReciverVoiceMessage from "../components/layout/ReciverVoiceMessage";
import MessageForwardModal from "../components/layout/MessageForwardModal";

const ChatWithFriend = () => {
  const db = getDatabase();
  const storage = getStorage();
  const activeUserData = useSelector((state) => state.user.information);
  const activeChatData = useSelector((state) => state.activeChat.information);
  const [messegeList, setMessegeList] = useState([]);
  const [messege, setMessege] = useState("");
  const [voiceMessageUrl, setVoiceMessageUrl] = useState("")
  const [blockList, setBlockList] = useState([]);
  const [blockModalShow, setBlockModalShow] = useState(false);
  const [unblockModalShow, setUnblockModalShow] = useState(false);
  const lastMessageRef = useRef();
  const [editedMessageInfo, setEditedMessageInfo] = useState("");
  const [messageRemoveModal, setMessageRemoveModal] = useState(false);
  const [removedMessageInfo, setRemovedMessageInfo] = useState("");
  const [replyMessegeInfo, setreplyMessegeInfo] = useState("");
  const [forwardMessegeInfo, setForwardMessegeInfo] = useState("");
  const [emojiPickerShow, setEmojiPickerShow] = useState(false);
  const [gifPickerShow, setGifPickerShow] = useState(false);
  const anotherFileSelectButtonRef = useRef();
  const [fileSizeErrorShow, setFileSizeErrorShow] = useState(false);
  const [messageForwardModalShow, setMessageForwardModalShow] = useState(false);  
  const [friendsProfileOpen, setFriendsProfileOpen] = useState(true);
  const [messegeNotification, setMessegeNotification] = useState(true);
  const [mediaDropdownOpen, setMediaDropdwonOpen] = useState(true);
  const [privacyDropdownOpen, setPrivacyDropdwonOpen] = useState(true);
  const [mediaShow, setMediaShow] = useState(false);
  const [mediaItemOpen, setMediaItemOpen] = useState("");
  const [chatImageList, setChatImageList] = useState([]);
  const [chatVideoList, setChatVideoList] = useState([]);
  const [chatFileList, setChatFileList] = useState([]);

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

  const lastMessageSendTimeUpdate = () => {
    set(ref(db, "friends/" + activeChatData.friendid), {
      reciveruid: activeChatData.uid,
      recivername: activeChatData.name,
      reciverprofile: activeChatData.profile,
      senderuid: activeUserData.uid,
      sendername: activeUserData.displayName,
      senderprofile: activeUserData.photoURL,
      lastmessagesent: Date.now(),
    })
  }
  
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView()
  } , [messegeList])

  useEffect(() => {
    setMessege("");
  }, [activeChatData]);

  const handleSendLike = () => {
    set(push(ref(db, "singlemessege/")), {
      type: "like",
      reciveruid: activeChatData?.uid,
      recivername: activeChatData?.name,
      reciverprofile: activeChatData?.profile,
      senderuid: activeUserData.uid,
      sendername: activeUserData.displayName,
      senderprofile: activeUserData.photoURL,
      senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
    })
    lastMessageSendTimeUpdate()
  }

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!emojiBoxRef.current?.contains(e.target)) {
        setEmojiPickerShow(false);
      }
    });
  }, []);
  
  const handleEmojiClick = (e) => {
    setMessege(messege + e.emoji);
  };

  const handleMessegeSend = () => {
    if (replyMessegeInfo) {
      if (replyMessegeInfo.type.includes("text")) {
        set(push(ref(db, "singlemessege/")), {
          type: "text/reply-normal",
          text: messege,
          repliedType: "text",
          repliedmessegeid: replyMessegeInfo.messegeid,
          repliedto: replyMessegeInfo.sendername,
          reciveruid: activeChatData?.uid,
          recivername: activeChatData.name,
          reciverrofile: activeChatData.profile,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        }).then(() => {
          setMessege("");
          setreplyMessegeInfo("");
        });
      } else if (replyMessegeInfo.type.includes("voice")) {
        set(push(ref(db, "singlemessege/")), {
          type: "text/reply-normal",
          text: messege,
          repliedType: "voice",
          repliedmessegeid: replyMessegeInfo.messegeid,
          repliedto: replyMessegeInfo.sendername,
          reciveruid: activeChatData?.uid,
          recivername: activeChatData.name,
          reciverrofile: activeChatData.profile,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        }).then(() => {
          setMessege("");
          setreplyMessegeInfo("");
        });
      }else if (replyMessegeInfo.type.includes("image")) {
        set(push(ref(db, "singlemessege/")), {
          type: "text/reply-normal",
          text: messege,
          repliedType: "image",
          repliedmessegeid: replyMessegeInfo.messegeid,
          repliedto: replyMessegeInfo.sendername,
          reciveruid: activeChatData?.uid,
          recivername: activeChatData.name,
          reciverrofile: activeChatData.profile,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        }).then(() => {
          setMessege("");
          setreplyMessegeInfo("");
        });
      } else if (replyMessegeInfo.type.includes("video")) {
        set(push(ref(db, "singlemessege/")), {
          type: "text/reply-normal",
          text: messege,
          repliedType: "video",
          repliedmessegeid: replyMessegeInfo.messegeid,
          repliedto: replyMessegeInfo.sendername,
          reciveruid: activeChatData?.uid,
          recivername: activeChatData.name,
          reciverrofile: activeChatData.profile,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        }).then(() => {
          setMessege("");
          setreplyMessegeInfo("");
        });
      } else if (replyMessegeInfo.type.includes("file")) {
        set(push(ref(db, "singlemessege/")), {
          type: "text/reply-normal",
          text: messege,
          repliedType: "file",
          repliedmessegeid: replyMessegeInfo.messegeid,
          repliedto: replyMessegeInfo.sendername,
          reciveruid: activeChatData?.uid,
          recivername: activeChatData.name,
          reciverrofile: activeChatData.profile,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        }).then(() => {
          setMessege("");
          setreplyMessegeInfo("");
        });
      } else if (replyMessegeInfo.type.includes("gif")) {
        set(push(ref(db, "singlemessege/")), {
          type: "text/reply-normal",
          text: messege,
          repliedType: "gif",
          repliedmessegeid: replyMessegeInfo.messegeid,
          repliedto: replyMessegeInfo.sendername,
          reciveruid: activeChatData?.uid,
          recivername: activeChatData.name,
          reciverrofile: activeChatData.profile,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        }).then(() => {
          setMessege("");
          setreplyMessegeInfo("");
        });
      }
    } else if (editedMessageInfo) {
      if (editedMessageInfo.type == "text/normal" || editedMessageInfo.type == "text/edited") {
        set(ref(db, "singlemessege/" + editedMessageInfo.messegeid), {
          type: "text/edited",
          text: messege,
          reciveruid: editedMessageInfo.reciveruid,
          recivername: editedMessageInfo.recivername,
          reciverprofile: editedMessageInfo.reciverprofile,
          senderuid: editedMessageInfo.senderuid,
          sendername: editedMessageInfo.sendername,
          senderprofile: editedMessageInfo.senderprofile,
          senttime: editedMessageInfo.senttime,
        }).then(() => {
          setMessege("");
          setEditedMessageInfo("");
        });
      } else if (editedMessageInfo.type == "text/reply-normal") {
        set(ref(db, "singlemessege/" + editedMessageInfo.messegeid), {
          type: "text/reply-edited",
          text: messege,
          repliedType: editedMessageInfo.repliedType,
          repliedmessegeid: editedMessageInfo.repliedmessegeid,
          repliedto: editedMessageInfo.repliedto,
          reciveruid: editedMessageInfo.reciveruid,
          recivername: editedMessageInfo.recivername,
          reciverrofile: editedMessageInfo.reciverrofile,
          senderuid: editedMessageInfo.senderuid,
          sendername: editedMessageInfo.sendername,
          senderprofile: editedMessageInfo.senderprofile,
          senttime: editedMessageInfo.senttime,
        }).then(() => {
          setMessege("");
          setEditedMessageInfo("");
        });
      }
    } else {
      set(push(ref(db, "singlemessege/")), {
        type: "text/normal",
        text: messege,
        reciveruid: activeChatData.uid,
        recivername: activeChatData.name,
        reciverprofile: activeChatData.profile,
        senderuid: activeUserData.uid,
        sendername: activeUserData.displayName,
        senderprofile: activeUserData.photoURL,
        senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      }).then(() => {
        setMessege("");
      });
    }
    lastMessageSendTimeUpdate()
  };

  const handleMessageEdit = (item) => {
    setreplyMessegeInfo("");
    inputRef.current?.focus();
    setEditedMessageInfo(item);
    setMessege(item.text);
  };

  const handleEditCancel = () => {
    setEditedMessageInfo("");
    setMessege("");
  };

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setVoiceMessageUrl(url)
  };

  const handleSendVoiceMessage = () => {
    set(push(ref(db, "singlemessege/")), {
      type: "voice/normal",
      voice: voiceMessageUrl,
      reciveruid: activeChatData?.uid,
      recivername: activeChatData?.name,
      reciverprofile: activeChatData?.profile,
      senderuid: activeUserData.uid,
      sendername: activeUserData.displayName,
      senderprofile: activeUserData.photoURL,
      senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
    }).then(() => {
      setVoiceMessageUrl("");
      set(ref(db, "friends/" + activeChatData.friendid), {
        reciveruid: activeChatData.uid,
        recivername: activeChatData.name,
        reciverprofile: activeChatData.profile,
        senderuid: activeUserData.uid,
        sendername: activeUserData.displayName,
        senderprofile: activeUserData.photoURL,
        lastmessagesent: Date.now(),
      })
    });
  }

  const handleFileClick = (e) => {
    let file = e.target.files[0];

    if (file.size > 15000000) {
      setFileSizeErrorShow(true);
    } else if (file.type.includes("image")) {
      const fileRef = storageRef(storage, "image as a messege/" + Date.now());
      uploadBytes(fileRef, file).then((snapshot) => {
        getDownloadURL(fileRef).then((downloadURL) => {
          set(push(ref(db, "singlemessege/")), {
            type: "image/normal",
            image: downloadURL,
            reciveruid: activeChatData?.uid,
            recivername: activeChatData?.name,
            reciverprofile: activeChatData?.profile,
            senderuid: activeUserData.uid,
            sendername: activeUserData.displayName,
            senderprofile: activeUserData.photoURL,
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
            senderuid: activeUserData.uid,
            sendername: activeUserData.displayName,
            senderprofile: activeUserData.photoURL,
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
            senderuid: activeUserData.uid,
            sendername: activeUserData.displayName,
            senderprofile: activeUserData.photoURL,
            senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
          });
        });
      });
    }
    lastMessageSendTimeUpdate()
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (anotherFileSelectButtonRef.current?.contains(e.target)) {
        setFileSizeErrorShow(false);
      }
    });
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!gifBoxRef.current?.contains(e.target)) {
        setGifPickerShow(false);
      }
    });
  }, []);

  const handleGifClick = (e) => {
    set(push(ref(db, "singlemessege/")), {
      type: "gif/normal",
      gif: e.url,
      gifname: e.description,
      reciveruid: activeChatData?.uid,
      recivername: activeChatData.name,
      reciverrofile: activeChatData.profile,
      senderuid: activeUserData.uid,
      sendername: activeUserData.displayName,
      senderprofile: activeUserData.photoURL,
      senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
    });
    lastMessageSendTimeUpdate()
  };

  const handleReply = (item) => {
    setEditedMessageInfo("");
    setreplyMessegeInfo(item);
    inputRef.current?.focus();
  };

  const handleMessegeForwardListShow = (item) => {
    setMessageForwardModalShow(true);
    setForwardMessegeInfo(item);
  };

  const handleMessageRemoveModalShow = (item) => {
    setRemovedMessageInfo(item);
    setMessageRemoveModal(true);
  };

  const handleMessageRemove = () => {
    set(ref(db, "singlemessege/" + removedMessageInfo.messegeid), {
      type: "deleted",
      reciveruid: activeChatData?.uid,
      recivername: activeChatData?.name,
      reciverprofile: activeChatData?.profile,
      senderuid: activeUserData.uid,
      sendername: activeUserData.displayName,
      senderprofile: activeUserData.photoURL,
      senttime: removedMessageInfo.senttime,
    }).then(() => {
      setRemovedMessageInfo("");
      setMessageRemoveModal(false);
      set(ref(db, "friends/" + activeChatData.friendid), {
        reciveruid: activeChatData.uid,
        recivername: activeChatData.name,
        reciverprofile: activeChatData.profile,
        senderuid: activeUserData.uid,
        sendername: activeUserData.displayName,
        senderprofile: activeUserData.photoURL,
        lastmessagesent: Date.now(),
      })
    });
  };

  const handleMessageRemoveCancel = () => {
    setRemovedMessageInfo("");
    setMessageRemoveModal(false);
  };

  const handleMediaImageShow = () => {
    setMediaShow(true);
    setMediaItemOpen("image");
  };

  const handleMediaVideoShow = () => {
    setMediaShow(true);
    setMediaItemOpen("video");
  };

  const handleMediaFilesShow = () => {
    setMediaShow(true);
    setMediaItemOpen("files");
  };

  useEffect(() => {
    let chatImageRef = ref(db, "singlemessege/");
    onValue(chatImageRef, (snapshot) => {
      let chatImageArray = [];
      snapshot.forEach((item) => {
        if (
          item.val().type.includes("image") &&
          ((activeUserData?.uid == item.val().senderuid && activeChatData?.uid == item.val().reciveruid) ||
          (activeUserData?.uid == item.val().reciveruid && activeChatData?.uid == item.val().senderuid))
        ) {
          chatImageArray.push(item.val());
        }
      });
      setChatImageList(chatImageArray);
    });
  }, [activeChatData]);

  useEffect(() => {
    let chatVideoRef = ref(db, "singlemessege/");
    onValue(chatVideoRef, (snapshot) => {
      let chatVideoArray = [];
      snapshot.forEach((item) => {
        if (
          item.val().type.includes("video") &&
          ((activeUserData?.uid == item.val().senderuid && activeChatData?.uid == item.val().reciveruid) ||
          (activeUserData?.uid == item.val().reciveruid && activeChatData?.uid == item.val().senderuid))
        ) {
          chatVideoArray.push(item.val());
        }
      });
      setChatVideoList(chatVideoArray);
    });
  }, [activeChatData]);

  useEffect(() => {
    let chatFileRef = ref(db, "singlemessege/");
    onValue(chatFileRef, (snapshot) => {
      let chatFileArray = [];
      snapshot.forEach((item) => {
        if (
          item.val().type.includes("file") &&
          ((activeUserData?.uid == item.val().senderuid && activeChatData?.uid == item.val().reciveruid) ||
          (activeUserData?.uid == item.val().reciveruid && activeChatData?.uid == item.val().senderuid))
        ) {
          chatFileArray.push(item.val());
        }
      });
      setChatFileList(chatFileArray);
    });
  }, [activeChatData]);

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
    set(ref(db, "block/" + (activeUserData.uid + activeChatData?.uid)), {
      blockbyuid: activeUserData.uid,
      blockbyname: activeUserData.displayName,
      blockbyprofile: activeUserData.photoURL,
      blockeduserid: activeChatData.uid,
      blockedusername: activeChatData.name,
      blockeduserprofile: activeChatData?.profile,
    }).then(() => {
      setBlockModalShow(false);
    });
  };

  const handleUnBlock = () => {
    remove(ref(db, "block/" + (activeUserData.uid + activeChatData?.uid)));
    setUnblockModalShow(false);
  };

  return activeChatData == null ? (
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
              : replyMessegeInfo || editedMessageInfo
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
          <Modal
            modalShow={messageRemoveModal}
            modalClose={setMessageRemoveModal}
            className={"py-5 px-7 w-[600px]"}
          >
            <Typography className="text-xl font-semibold font-inter">
              Are you sure?
            </Typography>
            <Typography className="text-lg mt-2 text-secoundaryText leading-[25px]">
              This message will be unsent for everyone in the chat. Others may
              have already seen or forwarded it.
            </Typography>
            <Box className={"flex justify-between items-center mt-4"}>
              <Button
                onClick={handleMessageRemoveCancel}
                className={
                  "w-[49%] py-2.5 bg-[#e9e9e9] font-semibold font-open-sans rounded-md transition-all duration-200 ease-in-out active:scale-[0.98]"
                }
              >
                Cancel
              </Button>
              <Button
                onClick={handleMessageRemove}
                className={
                  "w-[49%] py-2.5 bg-[#0976f2] text-white font-semibold font-open-sans rounded-md  transition-all duration-200 ease-in-out active:scale-[0.98]"
                }
              >
                Remove
              </Button>
            </Box>
          </Modal>
          {messegeList.map((item) =>
            activeUserData?.uid == item.senderuid ? (
              item.type.includes("text") ? (
                item.type == "text/normal" ? (
                  <SenderNormalMessage
                    message={item.text}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    editButton={() => handleMessageEdit(item)}
                    removeButton={() => handleMessageRemoveModalShow(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : item.type == "text/forwarded" ? (
                  <SenderForwardMessage
                    message={item.text}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    removeButton={() => handleMessageRemoveModalShow(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : item.type == "text/edited" ? (
                  <SenderEditedMessage
                    message={item.text}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    editButton={() => handleMessageEdit(item)}
                    removeButton={() => handleMessageRemoveModalShow(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : (
                  item.type.includes("text/reply") &&
                  (item.type == "text/reply-normal" ? (
                    <SenderRepliedMessage
                      chatType={"friend"}
                      edited={false}
                      message={item.text}
                      repliedType={item.repliedType}
                      repliedMessageId={item.repliedmessegeid}
                      repliedTo={item.repliedto}
                      repliedBy={item.sendername}
                      sentTime={item.senttime}
                      replyButton={() => handleReply(item)}
                      editButton={() => handleMessageEdit(item)}
                      removeButton={() => handleMessageRemoveModalShow(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  ) : (
                    item.type == "text/reply-edited" && (
                      <SenderRepliedMessage
                        edited={true}
                        message={item.text}
                        repliedType={item.repliedType}
                        repliedMessageId={item.repliedmessegeid}
                        repliedTo={item.repliedto}
                        sentTime={item.senttime}
                        replyButton={() => handleReply(item)}
                        editButton={() => handleMessageEdit(item)}
                        removeButton={() => handleMessageRemoveModalShow(item)}
                        forwardButton={() => handleMessegeForwardListShow(item)}
                      />
                    )
                  ))
                )
              ) : item.type.includes("voice") ? (
                item.type == "voice/normal" ? (
                  <SenderVoiceMessage
                    voiceType={"normal"}
                    voice={item.voice}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    removeButton={() => handleMessageRemoveModalShow(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : (
                  item.type == "voice/forwarded" && (
                    <SenderVoiceMessage
                      voiceType={"forward"}
                      voice={item.voice}
                      sentTime={item.senttime}
                      replyButton={() => handleReply(item)}
                      removeButton={() => handleMessageRemoveModalShow(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  )
                )
              ) : item.type.includes("image") ? (
                item.type == "image/normal" ? (
                  <SenderImage
                    image={item.image}
                    imageType={"normal"}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    removeButton={() => handleMessageRemoveModalShow(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : (
                  item.type == "image/forwarded" && (
                    <SenderImage
                      image={item.image}
                      imageType={"forward"}
                      sentTime={item.senttime}
                      replyButton={() => handleReply(item)}
                      removeButton={() => handleMessageRemoveModalShow(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  )
                )
              ) : item.type.includes("video") ? (
                item.type == "video/normal" ? (
                  <SenderVideo
                    video={item.video}
                    videoType={"normal"}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    removeButton={() => handleMessageRemoveModalShow(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : (
                  item.type == "video/forwarded" && (
                    <SenderVideo
                      video={item.video}
                      videoType={"forward"}
                      sentTime={item.senttime}
                      replyButton={() => handleReply(item)}
                      removeButton={() => handleMessageRemoveModalShow(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  )
                )
              ) : item.type.includes("file") ? (
                item.type == "file/normal" ? (
                  <SenderFile
                    file={item.file}
                    fileName={item.filename}
                    fileType={"normal"}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    removeButton={() => handleMessageRemoveModalShow(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : (
                  item.type == "file/forwarded" && (
                    <SenderFile
                      file={item.file}
                      fileName={item.filename}
                      fileType={"forward"}
                      sentTime={item.senttime}
                      replyButton={() => handleReply(item)}
                      removeButton={() => handleMessageRemoveModalShow(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  )
                )
              ) : item.type.includes("gif") ? (
                item.type == "gif/normal" ? (
                  <SenderGif
                    gif={item.gif}
                    gifName={item.gifname}
                    gifType={"normal"}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    removeButton={() => handleMessageRemoveModalShow(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : (
                  item.type == "gif/forwarded" && (
                    <SenderGif
                      gif={item.gif}
                      gifName={item.gifname}
                      gifType={"forward"}
                      sentTime={item.senttime}
                      replyButton={() => handleReply(item)}
                      removeButton={() => handleMessageRemoveModalShow(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  )
                )
              ) : item.type.includes("deleted") ? (
                <SenderDeletedMessage sentTime={item.senttime} />
              ) : (
                item.type == "like" && <SenderLike sentTime={item.senttime} />
              )
            ) : (
              activeChatData?.uid == item.senderuid &&
              (item.type.includes("text") ? (
                item.type == "text/normal" ? (
                  <ReciverNormalMessege
                    name={item.sendername}
                    profile={item.senderprofile}
                    message={item.text}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : item.type == "text/edited" ? (
                  <ReciverEditedMessage
                    name={item.sendername}
                    profile={item.senderprofile}
                    message={item.text}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : item.type == "text/forwarded" ? (
                  <ReciverForwardMessege
                    name={item.sendername}
                    profile={item.senderprofile}
                    message={item.text}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : (
                  item.type.includes("text/reply") &&
                  (item.type == "text/reply-normal" ? (
                    <ReciverRepliedMessege
                      chatType={"friend"}
                      edited={false}
                      senderuid={item.senderuid}
                      sendername={item.sendername}
                      senderprofile={item.senderprofile}
                      message={item.text}
                      repliedType={item.repliedType}
                      repliedMessageId={item.repliedmessegeid}
                      repliedTo={item.repliedto}
                      repliedBy={item.sendername}
                      sentTime={item.senttime}
                      replyButton={() => handleReply(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  ) : (
                    <ReciverRepliedMessege
                      chatType={"friend"}
                      edited={true}
                      senderuid={item.senderuid}
                      sendername={item.sendername}
                      senderprofile={item.senderprofile}
                      message={item.text}
                      repliedType={item.repliedType}
                      repliedMessageId={item.repliedmessegeid}
                      repliedTo={item.repliedto}
                      repliedBy={item.sendername}
                      sentTime={item.senttime}
                      replyButton={() => handleReply(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  ))
                )
              ) : item.type.includes("voice") ? (
                item.type == "voice/normal" ? (
                  <ReciverVoiceMessage
                    voiceType={"normal"}
                    name={item.sendername}
                    profile={item.senderprofile}
                    voice={item.voice}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : (
                  item.type == "voice/forwarded" && (
                    <ReciverVoiceMessage
                      voiceType={"forward"}
                      name={item.sendername}
                      profile={item.senderprofile}
                      voice={item.voice}
                      sentTime={item.senttime}
                      replyButton={() => handleReply(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  )
                )
              ) : item.type.includes("image") ? (
                item.type == "image/normal" ? (
                  <ReciverImage
                    name={item.sendername}
                    profile={item.senderprofile}
                    image={item.image}
                    imageType={"normal"}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : (
                  item.type == "image/forwarded" && (
                    <ReciverImage
                      name={item.sendername}
                      profile={item.senderprofile}
                      image={item.image}
                      imageType={"forward"}
                      sentTime={item.senttime}
                      replyButton={() => handleReply(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  )
                )
              ) : item.type.includes("video") ? (
                item.type == "video/normal" ? (
                  <ReciverVideo
                    name={item.sendername}
                    profile={item.senderprofile}
                    video={item.video}
                    videoType={"normal"}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : (
                  item.type == "video/forwarded" && (
                    <ReciverVideo
                      name={item.sendername}
                      profile={item.senderprofile}
                      video={item.video}
                      videoType={"forward"}
                      sentTime={item.senttime}
                      replyButton={() => handleReply(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  )
                )
              ) : item.type.includes("file") ? (
                item.type == "file/normal" ? (
                  <ReciverFile
                    name={item.sendername}
                    profile={item.senderprofile}
                    file={item.file}
                    fileName={item.filename}
                    fileType={"normal"}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : (
                  item.type == "file/forwarded" && (
                    <ReciverFile
                      name={item.sendername}
                      profile={item.senderprofile}
                      file={item.file}
                      fileName={item.filename}
                      fileType={"forward"}
                      sentTime={item.senttime}
                      replyButton={() => handleReply(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  )
                )
              ) : item.type.includes("gif") ? (
                item.type == "gif/normal" ? (
                  <ReciverGif
                    name={item.sendername}
                    profile={item.senderprofile}
                    gif={item.gif}
                    gifName={item.gifname}
                    gifType={"normal"}
                    sentTime={item.senttime}
                    replyButton={() => handleReply(item)}
                    forwardButton={() => handleMessegeForwardListShow(item)}
                  />
                ) : (
                  item.type == "gif/forwarded" && (
                    <ReciverGif
                      name={item.sendername}
                      profile={item.senderprofile}
                      gif={item.gif}
                      gifName={item.gifname}
                      gifType={"forward"}
                      sentTime={item.senttime}
                      replyButton={() => handleReply(item)}
                      forwardButton={() => handleMessegeForwardListShow(item)}
                    />
                  )
                )
              ) : item.type.includes("deleted") ? (
                <ReciverDeletedMessage
                  senderName={item.sendername}
                  senderProfile={item.senderprofile}
                  sentTime={item.senttime}
                />
              ) : (
                item.type == "like" && (
                  <ReciverLike
                    name={item.sendername}
                    profile={item.senderprofile}
                    sentTime={item.senttime}
                  />
                )
              ))
            )
          )}
          <div ref={lastMessageRef} />
          <MessageForwardModal
            modalShow={messageForwardModalShow}
            modalClose={setMessageForwardModalShow}
            forwardMessegeInfo={forwardMessegeInfo}
          />
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
              You can't message or call {activeChatData?.name} in this chat, and
              you won't receive their messages or calls.
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
        ) : blockList.includes(activeUserData?.uid + activeChatData?.uid) ? (
          <Box
            className={
              "text-center bg-white absolute bottom-0 left-0 w-full h-[93px] py-2.5 pr-[5px] pl-5 border-t border-[#dedede]"
            }
          >
            <Typography className="text-lg font-semibold mb-1">
              {activeChatData?.name} has blocked you from messaging and calling
            </Typography>
            <Typography className="text-secoundaryText mb-4">
              You can't message or call {activeChatData?.name} in this chat, and
              you won't receive their messages or calls.
            </Typography>
          </Box>
        ) : (
          <Box
            className={
              "bg-white absolute bottom-0 left-0 w-full border-t border-[#dedede]"
            }
          >
            {replyMessegeInfo ? (
              <Box className={"pt-2 px-5 relative"}>
                <MdCancel
                  onClick={() => setreplyMessegeInfo("")}
                  className="absolute top-2.5 right-2.5 text-[22px] text-secoundaryText cursor-pointer"
                />
                {activeUserData?.uid == replyMessegeInfo.senderuid ? (
                  <Typography className="font-inter font-semibold">
                    Replying to yourself
                  </Typography>
                ) : (
                  <Typography className="font-inter font-semibold">
                    Replying to {replyMessegeInfo.sendername}
                  </Typography>
                )}

                {replyMessegeInfo.type.includes("text") ? (
                  <Typography className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis w-[80%] text-[#65676b]">
                    {replyMessegeInfo.text}
                  </Typography>
                ) : replyMessegeInfo.type.includes("image") ? (
                  <Typography className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis w-[80%] text-[#65676b]">
                    image
                  </Typography>
                ) : replyMessegeInfo.type.includes("voice") ? (
                  <Typography className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis w-[80%] text-[#65676b]">
                    voice
                  </Typography>
                ) : replyMessegeInfo.type.includes("video") ? (
                  <Typography className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis w-[80%] text-[#65676b]">
                    video
                  </Typography>
                ) : replyMessegeInfo.type.includes("file") ? (
                  <Typography className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis w-[80%] text-[#65676b]">
                    file
                  </Typography>
                ) : (
                  <Typography className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis w-[80%] text-[#65676b]">
                    gif
                  </Typography>
                )}
              </Box>
            ) : (
              editedMessageInfo && (
                <Box className={"pt-2 px-5 relative"}>
                  <MdCancel
                    onClick={handleEditCancel}
                    className="absolute top-2.5 right-2.5 text-[22px] text-secoundaryText cursor-pointer"
                  />
                  <Typography className="font-inter font-semibold">
                    Edit message
                  </Typography>
                  <Typography className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis w-[80%] text-[#65676b]">
                    {editedMessageInfo.text}
                  </Typography>
                </Box>
              )
            )}
            <Flex
              justifyContent={"between"}
              alignItems={"center"}
              className={"py-3 pr-[5px] pl-5"}
            >
              <Flex alignItems={"center"}>
                <Box className={"relative group/tooltip"}>
                  <Input
                    onChange={handleFileClick}
                    id={"file"}
                    type={"file"}
                    className={"hidden"}
                  />
                  <label htmlFor="file">
                    <FaRegImage className="box-content text-[#007bf5] text-[25px] p-2.5 rounded-[20%] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                  </label>
                  <Typography
                    variant="span"
                    className="w-[110px] text-center bg-[#323436] text-white py-[6px] px-3 rounded-lg absolute z-30 left-full -translate-x-2/4 bottom-[55px] hidden group-hover/tooltip:block"
                  >
                    Attach a file
                    <Box
                      className={
                        "w-[13px] h-[13px] bg-[#323436] rotate-45 absolute left-[29%] -translate-x-2/4 top-[80%] "
                      }
                    ></Box>
                  </Typography>
                  <Modal
                    modalShow={fileSizeErrorShow}
                    modalClose={setFileSizeErrorShow}
                    className={"w-[615px] py-5 px-7"}
                  >
                    <Typography className="text-[22px] font-semibold font-open-sans mb-1">
                      Failed to upload files
                    </Typography>
                    <Typography className="text-lg font-open-sans text-secoundaryText mb-4">
                      The file you have selected is too large. The maximum size
                      is 15MB.
                    </Typography>
                    <Box className={"flex justify-between items-center"}>
                      <label
                        ref={anotherFileSelectButtonRef}
                        htmlFor="file"
                        className={
                          "w-[49%] text-center py-2.5 font-open-sans bg-[#2176ff] text-white rounded-md cursor-pointer transition-all duration-200 active:scale-[0.98]"
                        }
                      >
                        Select another file
                      </label>
                      <Button
                        onClick={() => setFileSizeErrorShow(false)}
                        className={
                          "w-[49%] py-2.5 font-open-sans bg-[#d8dadf] rounded-md transition-all duration-200 active:scale-[0.98]"
                        }
                      >
                        Close
                      </Button>
                    </Box>
                  </Modal>
                </Box>
                <div ref={gifBoxRef} className="relative">
                  <Box className={"relative group/tooltip mr-[5px]"}>
                    <HiMiniGif
                      onClick={() => setGifPickerShow(!gifPickerShow)}
                      className={`box-content text-[#007bf5] text-[30px] p-[8px] rounded-[20%] cursor-pointer transition-all ease-in-out duration-300 ${
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
                        "absolute z-20 bottom-[134%] left-0 -translate-x-[15%] bg-white pb-5 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-[10px]"
                      }
                    >
                      <GifPicker
                        tenorApiKey={"AIzaSyAW7la2woNuMnvq7z-KCOavIuaKyeQX_jg"}
                        onGifClick={handleGifClick}
                      />
                      <Box
                        className={
                          "w-[20px] h-[20px] bg-white absolute left-[19%] -translate-y-2/4 top-full rotate-45"
                        }
                      ></Box>
                    </Box>
                  )}
                </div>
                {voiceMessageUrl == "" && 
                  <Box className={"relative group/tooltip"}>
                    <Box>
                      <AudioRecorder
                        onRecordingComplete={addAudioElement}
                        audioTrackConstraints={{
                          noiseSuppression: true,
                          echoCancellation: true,
                        }}
                      />
                    </Box>
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
                }
              </Flex>
              {voiceMessageUrl ? (
                <Flex 
                  alignItems={"center"}
                  className={"w-full"}
                >
                  <Box className={"relative group/tooltip mr-[5px]"}>
                    <MdCancel
                      onClick={() => setVoiceMessageUrl("")}
                      className="box-content text-[#007bf5] text-[30px] p-2 rounded-[20%] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]"
                    />
                    <Typography
                      variant="span"
                      className="w-[130px] text-center bg-[#323436] text-white py-[6px] px-3 rounded-lg absolute right-2/4 translate-x-2/4 bottom-[55px] hidden group-hover/tooltip:block"
                    >
                      Click to Cancel
                      <Box
                        className={
                          "w-[13px] h-[13px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-1/4 top-[80%] "
                        }
                      ></Box>
                    </Typography>
                  </Box>
                  <audio
                    src={voiceMessageUrl}
                    controls
                    className="w-full max-h-[48px]"
                  />
                  <Box className={"relative group/tooltip"}>
                    <IoSend
                      onClick={handleSendVoiceMessage}
                      className="box-content text-[#007bf5] text-[24px] p-2.5 rounded-[20%] ml-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]"
                    />
                    <Typography
                      variant="span"
                      className="w-[120px] text-center bg-[#323436] text-white py-[6px] px-3 rounded-lg absolute right-full translate-x-2/4 bottom-[55px] hidden group-hover/tooltip:block"
                    >
                      Click to Send
                      <Box
                        className={
                          "w-[13px] h-[13px] bg-[#323436] rotate-45 absolute left-3/4 -translate-x-3/4 top-[80%] "
                        }
                      ></Box>
                    </Typography>
                  </Box>
                </Flex>
              ) : (
                <Flex alignItems={"center"} className={"w-full ml-4"}>
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
                      <MdThumbUpAlt
                        onClick={handleSendLike}
                        className="box-content text-[#007bf5] text-[24px] p-2.5 rounded-[20%] mb-[2px] ml-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]"
                      />
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
                        className="box-content text-[#007bf5] text-[24px] p-2.5 rounded-[20%] ml-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]"
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
              )}
            </Flex>
          </Box>
        )}
      </Box>
      <Box
        className={
          friendsProfileOpen
            ? "w-[30%] ml-4 h-full bg-white rounded-2xl overflow-hidden text-center relative"
            : "w-0 ml-0 h-full bg-white rounded-2xl overflow-hidden text-center relative"
        }
      >
        <Box
          className={
            mediaShow
              ? "w-full h-full pt-14 absolute left-0 top-0 transition-all duration-300 ease-in-out -translate-x-full"
              : "w-full h-full pt-14 absolute left-0 top-0 transition-all duration-300 ease-in-out"
          }
        >
          <ModalImage
            small={activeChatData?.profile}
            large={activeChatData?.profile}
            alt={activeChatData?.name}
            className={
              "w-[130px] h-[130px] rounded-full object-cover mx-auto border border-[#dedede]"
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
                onClick={() => setMediaDropdwonOpen(!mediaDropdownOpen)}
                alignItems={"center"}
                justifyContent={"between"}
                className={
                  mediaDropdownOpen
                    ? "text-lg mb-1 px-2.5 py-2 rounded-md  bg-[#f5f5f5] cursor-pointer text-black"
                    : "text-lg mb-1 px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                }
              >
                <Flex alignItems={"center"} className={"gap-x-3"}>
                  <MdVideoLibrary className="text-xl" />
                  <Typography>View media</Typography>
                </Flex>
                <IoIosArrowDown
                  className={mediaDropdownOpen ? "rotate-180" : "rotate-0"}
                />
              </Flex>
              {mediaDropdownOpen && (
                <Box className={"ml-2"}>
                  <Button
                    onClick={handleMediaImageShow}
                    className={
                      "flex items-center gap-x-3 w-full text-lg px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                    }
                  >
                    <FaRegImage className="text-xl" />
                    <Typography>Images</Typography>
                  </Button>
                  <Button
                    onClick={handleMediaVideoShow}
                    className={
                      "flex items-center gap-x-3 w-full text-lg px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                    }
                  >
                    <RiMovieLine className="text-xl" />
                    <Typography>Videos</Typography>
                  </Button>
                  <Button
                    onClick={handleMediaFilesShow}
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
                onClick={() => setPrivacyDropdwonOpen(!privacyDropdownOpen)}
                alignItems={"center"}
                justifyContent={"between"}
                className={
                  privacyDropdownOpen
                    ? "text-lg mb-1 px-2.5 py-2 rounded-md  bg-[#f5f5f5] cursor-pointer text-black"
                    : "text-lg mb-1 px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                }
              >
                <Flex alignItems={"center"} className={"gap-x-3"}>
                  <MdOutlinePrivacyTip className="text-xl" />
                  <Typography>Privacy</Typography>
                </Flex>
                <IoIosArrowDown
                  className={privacyDropdownOpen ? "rotate-180" : "rotate-0"}
                />
              </Flex>
              {privacyDropdownOpen && (
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
        <Box
          className={
            mediaShow
              ? "w-full h-full px-5 py-5 absolute left-0 top-0 transition-all duration-300 ease-in-out text-start"
              : "w-full h-full px-5 py-5 absolute left-0 top-0 transition-all duration-300 ease-in-out translate-x-full text-start"
          }
        >
          <Flex alignItems={"center"} className={"gap-x-3"}>
            <FaArrowLeft
              onClick={() => setMediaShow(false)}
              className="box-content text-lg p-2.5 rounded-full hover:bg-[#f2f2f2] cursor-pointer"
            />
            <Typography className="text-lg font-semibold font-open-sans">
              Media, files and links
            </Typography>
          </Flex>
          <Flex
            alignItems={"center"}
            className={
              "w-full border border-[#f2f2f2] rounded-[50px] overflow-hidden mt-3"
            }
          >
            <Button
              onClick={() => setMediaItemOpen("image")}
              className={
                mediaItemOpen == "image"
                  ? "w-1/3 py-2 text-[15px] font-open-sans font-semibold rounded-[50px] bg-[#dcdcdc]"
                  : "w-1/3 py-2 text-[15px] font-open-sans font-semibold text-secoundaryText rounded-[50px] hover:bg-[#f5f5f5]"
              }
            >
              Image
            </Button>
            <Button
              onClick={() => setMediaItemOpen("video")}
              className={
                mediaItemOpen == "video"
                  ? "w-1/3 py-2 text-[15px] font-open-sans font-semibold rounded-[50px] bg-[#dcdcdc]"
                  : "w-1/3 py-2 text-[15px] font-open-sans font-semibold text-secoundaryText rounded-[50px] hover:bg-[#f5f5f5]"
              }
            >
              Video
            </Button>
            <Button
              onClick={() => setMediaItemOpen("files")}
              className={
                mediaItemOpen == "files"
                  ? "w-1/3 py-2 text-[15px] font-open-sans font-semibold rounded-[50px] bg-[#dcdcdc]"
                  : "w-1/3 py-2 text-[15px] font-open-sans font-semibold text-secoundaryText rounded-[50px] hover:bg-[#f5f5f5]"
              }
            >
              Files
            </Button>
          </Flex>
          <Box className={"h-[calc(100%-100px)] overflow-y-auto mt-4"}>
            {mediaItemOpen == "image" ? (
              chatImageList.length >= 1 ? (
                <Flex
                  justifyContent={"between"}
                  className={"gap-y-[7px] flex-wrap"}
                >
                  {chatImageList.map((item) => (
                    <MediaImageItem image={item.image} className={"w-[49%]"} />
                  ))}
                </Flex>
              ) : (
                <Box
                  className={
                    "w-full h-full flex items-center justify-center text-center"
                  }
                >
                  <Box>
                    <Typography className="text-[22px] text-secoundaryText">
                      No Image
                    </Typography>
                    <Typography className="text-secoundaryText text-lg">
                      Image that you exchange with {activeChatData.name} will
                      appear here.
                    </Typography>
                  </Box>
                </Box>
              )
            ) : mediaItemOpen == "video" ? (
              chatVideoList.length >= 1 ? (
                <Flex
                  justifyContent={"between"}
                  className={"gap-y-[7px] flex-wrap"}
                >
                  {chatVideoList.map((item) => (
                    <MediaVideoItem video={item.video} className={"w-[49%]"} />
                  ))}
                </Flex>
              ) : (
                <Box
                  className={
                    "w-full h-full flex items-center justify-center text-center"
                  }
                >
                  <Box>
                    <Typography className="text-[22px] text-secoundaryText">
                      No video
                    </Typography>
                    <Typography className="text-secoundaryText text-lg">
                      Video that you exchange with {activeChatData.name} will
                      appear here.
                    </Typography>
                  </Box>
                </Box>
              )
            ) : (
              mediaItemOpen == "files" &&
              (chatFileList.length >= 1 ? (
                <Box>
                  {chatFileList.map((item) => (
                    <MediaFileItem
                      file={item.file}
                      fileName={item.filename}
                      className={"w-full"}
                    />
                  ))}
                </Box>
              ) : (
                <Box
                  className={
                    "w-full h-full flex items-center justify-center text-center"
                  }
                >
                  <Box>
                    <Typography className="text-[22px] text-secoundaryText">
                      No files
                    </Typography>
                    <Typography className="text-secoundaryText text-lg">
                      Files that you exchange with {activeChatData.name} will
                      appear here.
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatWithFriend;
