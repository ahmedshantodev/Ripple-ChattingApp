import React, { useEffect, useRef, useState } from "react";
// Reusble Components
import Box from "../components/layout/Box";
import Flex from "../components/layout/Flex";
import Image from "../components/layout/Image";
import Input from "../components/layout/Input";
import Typography from "../components/layout/Typography";
import JoinRequstItem from "../components/layout/GroupJoinRequstListItem";
import GroupMemberListItem from "../components/layout/GroupMemberListItem";
import GroupMemberInviteModal from "../components/layout/GroupMemberInviteModal";
import { IoSend } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoCall, IoVideocam } from "react-icons/io5";
import { FaPlus, FaRegImage } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import {
  MdThumbUpAlt,
  MdOutlineNotificationsOff,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiMovieLine } from "react-icons/ri";
import { TbPhotoPlus } from "react-icons/tb";
import { LuFileSpreadsheet } from "react-icons/lu";

import MediaImageItem from "../components/layout/MediaImageItem";
import MediaVideoItem from "../components/layout/MediaVideoItem";
import MediaFileItem from "../components/layout/MediaFileItem";
import {
  set,
  ref,
  push,
  remove,
  onValue,
  getDatabase,
} from "firebase/database";
import { FaArrowLeft } from "react-icons/fa6";
import {
  uploadBytes,
  getStorage,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
import { CiLogout } from "react-icons/ci";
import GroupPhotoUploadModal from "../components/layout/GroupPhotoUploadModal";
import noGroupPHoto from "/public/images/no chat image.jpg";
import { PiUserCirclePlus } from "react-icons/pi";
import Button from "../components/layout/Button";
import ModalImage from "react-modal-image";
import GroupNameChangeModal from "../components/layout/GroupNameChangeModal";
import { HiMiniGif } from "react-icons/hi2";
import { FaMicrophone } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import ReciverDeletedMessage from "../components/layout/ReciverDeletedMessage";
import ReciverGif from "../components/layout/ReciverGif";
import ReciverFile from "../components/layout/ReciverFile";
import ReciverVideo from "../components/layout/ReciverVideo";
import ReciverImage from "../components/layout/ReciverImage";
import ReciverRepliedMessege from "../components/layout/ReciverRepliedMessege";
import ReciverForwardMessege from "../components/layout/ReciverForwardMessege";
import ReciverEditedMessage from "../components/layout/ReciverEditedMessage";
import ReciverNormalMessege from "../components/layout/ReciverNormalMessege";
import SenderDeletedMessage from "../components/layout/SenderDeletedMessage";
import SenderGif from "../components/layout/SenderGif";
import SenderFile from "../components/layout/SenderFile";
import SenderVideo from "../components/layout/SenderVideo";
import SenderImage from "../components/layout/SenderImage";
import SenderRepliedMessage from "../components/layout/SenderRepliedMessage";
import SenderEditedMessage from "../components/layout/SenderEditedMessage";
import SenderForwardMessage from "../components/layout/SenderForwardMessage";
import SenderNormalMessage from "../components/layout/SenderNormalMessage";
import EmojiPicker from "emoji-picker-react";
import GifPicker from "gif-picker-react";
import Modal from "../components/layout/Modal";
import SearchBox from "../components/layout/SearchBox";
import MessageForwardListItem from "../components/layout/MessageForwardListItem";

const ChatWithGroup = () => {
  const db = getDatabase();
  const storage = getStorage();
  const activeUserData = useSelector((state) => state.user.information);
  const activeGroupData = useSelector((state) => state.activeGroup.information);

  const [messege, setMessege] = useState("");
  const [messegeList, setMessegeList] = useState([]);

  const [groupProfileOpen, setGroupProfileOpen] = useState(false);
  const [groupNotificationOn, setGroupNotificationOn] = useState(true);
  const [groupMemberShow, setGroupMemberShow] = useState(false);
  const [membarRequstShow, setMembarRequstShow] = useState(false);
  const [groupMemberLlist, setGroupMemberLlist] = useState([]);

  const [blockList, setBlockList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [forwardMessegeInfo, setForwardMessegeInfo] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [forwardSearchFriend, setForwardSearchFriend] = useState("");
  const [forwardSearchGroup, setForwardSearchGroup] = useState("");
  const [messageForwardModalShow, setMessageForwardModalShow] = useState(false);
  const [messageForwardListOpen, setMessageForwardListOpen] = useState("group");

  const [replyMessegeInfo, setreplyMessegeInfo] = useState("");
  const [editedMessageInfo, setEditedMessageInfo] = useState("");
  const [messageRemoveModal, setMessageRemoveModal] = useState(false);
  const [removedMessageInfo, setRemovedMessageInfo] = useState("");

  const [memberInviteModal, setMemberInviteModal] = useState(false);
  const [groupNameChangeModal, setGroupNameChangeModal] = useState(false);
  const [groupPhotoUploadModalShow, setGroupPhotoUploadModalShow] = useState(false);

  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);
  const [chatInfoShow, setChatInfoShow] = useState(false);
  const [chatImageList, setChatImageList] = useState([]);
  const [chatVideoList, setChatVideoList] = useState([]);
  const [chatFileList, setChatFileList] = useState([]);
  const [mediaShow, setMediaShow] = useState(false);
  const [mediaItemOpen, setMediaItemOpen] = useState("");


  const [groupJoinRequstList, setGroupJoinRequstList] = useState([]);
  const [emojiPickerShow, setEmojiPickerShow] = useState(false);
  const [gifPickerShow, setGifPickerShow] = useState(false);
  const [fileSizeErrorShow, setFileSizeErrorShow] = useState(false);
  const anotherFileSelectButtonRef = useRef();

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
    let messageREf = ref(db, "groupmessege");
    onValue(messageREf, (snapshot) => {
      const messageArray = [];
      snapshot.forEach((item) => {
        if (activeGroupData.groupuid == item.val().groupuid) {
          messageArray.push({ ...item.val(), messageId: item.key });
        }
      });
      setMessegeList(messageArray);
    });
  }, [activeGroupData]);

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

  const handleMessegeSend = () => {
    if (replyMessegeInfo) {
      if (replyMessegeInfo.type.includes("text")) {
        set(push(ref(db, "groupmessege/")), {
          type: "text/reply-normal",
          text: messege,
          repliedType: "text",
          repliedmessegeid: replyMessegeInfo.messageId,
          repliedto: replyMessegeInfo.sendername,
          groupuid: activeGroupData.groupuid,
          groupname: activeGroupData.groupname,
          groupphoto: activeGroupData.groupphoto,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        }).then(() => {
          setMessege("");
          setreplyMessegeInfo("");
        });
      } else if (replyMessegeInfo.type.includes("image")) {
        set(push(ref(db, "groupmessege/")), {
          type: "text/reply-normal",
          text: messege,
          repliedType: "image",
          repliedmessegeid: replyMessegeInfo.messageId,
          repliedto: replyMessegeInfo.sendername,
          groupuid: activeGroupData.groupuid,
          groupname: activeGroupData.groupname,
          groupphoto: activeGroupData.groupphoto,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        }).then(() => {
          setMessege("");
          setreplyMessegeInfo("");
        });
      } else if (replyMessegeInfo.type.includes("video")) {
        set(push(ref(db, "groupmessege/")), {
          type: "text/reply-normal",
          text: messege,
          repliedType: "video",
          repliedmessegeid: replyMessegeInfo.messageId,
          repliedto: replyMessegeInfo.sendername,
          groupuid: activeGroupData.groupuid,
          groupname: activeGroupData.groupname,
          groupphoto: activeGroupData.groupphoto,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        }).then(() => {
          setMessege("");
          setreplyMessegeInfo("");
        });
      } else if (replyMessegeInfo.type.includes("file")) {
        set(push(ref(db, "groupmessege/")), {
          type: "text/reply-normal",
          text: messege,
          repliedType: "file",
          repliedmessegeid: replyMessegeInfo.messageId,
          repliedto: replyMessegeInfo.sendername,
          groupuid: activeGroupData.groupuid,
          groupname: activeGroupData.groupname,
          groupphoto: activeGroupData.groupphoto,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        }).then(() => {
          setMessege("");
          setreplyMessegeInfo("");
        });
      } else if (replyMessegeInfo.type.includes("gif")) {
        set(push(ref(db, "groupmessege/")), {
          type: "text/reply-normal",
          text: messege,
          repliedType: "gif",
          repliedmessegeid: replyMessegeInfo.messageId,
          repliedto: replyMessegeInfo.sendername,
          groupuid: activeGroupData.groupuid,
          groupname: activeGroupData.groupname,
          groupphoto: activeGroupData.groupphoto,
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
        set(ref(db, "groupmessege/" + editedMessageInfo.messageId), {
          type: "text/edited",
          text: messege,
          groupuid: activeGroupData.groupuid,
          groupname: activeGroupData.groupname,
          groupphoto: activeGroupData.groupphoto,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        }).then(() => {
          setMessege("");
          setEditedMessageInfo("");
        });
      } else if (editedMessageInfo.type == "text/reply-normal") {
        set(ref(db, "groupmessege/" + editedMessageInfo.messageId), {
          type: "text/reply-edited",
          text: messege,
          repliedType: editedMessageInfo.repliedType,
          repliedmessegeid: editedMessageInfo.repliedmessegeid,
          repliedto: editedMessageInfo.repliedto,
          groupuid: activeGroupData.groupuid,
          groupname: activeGroupData.groupname,
          groupphoto: activeGroupData.groupphoto,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        }).then(() => {
          setMessege("");
          setEditedMessageInfo("");
        });
      }
    } else {
      set(push(ref(db, "groupmessege/")), {
        type: "text/normal",
        text: messege,
        groupuid: activeGroupData.groupuid,
        groupname: activeGroupData.groupname,
        groupphoto: activeGroupData.groupphoto,
        senderuid: activeUserData.uid,
        sendername: activeUserData.displayName,
        senderprofile: activeUserData.photoURL,
        senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      }).then(() => {
        setMessege("");
      });
    }
  };

  useEffect(() => {
    setMessege("");
  }, [activeGroupData]);

  const handleMessageEdit = (item) => {
    setreplyMessegeInfo("");
    inputRef.current.focus();
    setEditedMessageInfo(item);
    setMessege(item.text);
  };

  const handleReply = (item) => {
    setEditedMessageInfo("");
    setreplyMessegeInfo(item);
    inputRef.current.focus();
  };

  const handleEditCancel = () => {
    setEditedMessageInfo("");
    setMessege("");
  };

  const handleMessageRemoveModalShow = (item) => {
    setRemovedMessageInfo(item);
    setMessageRemoveModal(true);
  };

  const handleMessageRemove = () => {
    set(ref(db, "groupmessege/" + removedMessageInfo.messageId), {
      type: "deleted",
      groupuid: activeGroupData.groupuid,
      groupname: activeGroupData.groupname,
      groupphoto: activeGroupData.groupphoto,
      senderuid: activeUserData.uid,
      sendername: activeUserData.displayName,
      senderprofile: activeUserData.photoURL,
      senttime: removedMessageInfo.senttime,
    }).then(() => {
      setRemovedMessageInfo("");
      setMessageRemoveModal(false);
    });
  };

  const handleMessageRemoveCancel = () => {
    setRemovedMessageInfo("");
    setMessageRemoveModal(false);
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

  useEffect(() => {
    const friendListRef = ref(db, "friends");
    onValue(friendListRef, (snapshot) => {
      const FriendListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData?.uid == item.val().reciveruid || activeUserData?.uid == item.val().senderuid) {
          FriendListArray.push(item.val());
        }
      });
      setFriendList(FriendListArray);
    });
  }, []);

  useEffect(() => {
    let groupRef = ref(db, "groupmembers");
    onValue(groupRef, (snapshot) => {
      let groupListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData?.uid == item.val().memberuid) {
          groupListArray.push(item.val());
        }
      });
      setGroupList(groupListArray);
    });
  }, []);

  const filteredFriendForwardList = friendList.filter((item) => {
    const uid = activeUserData.uid == item.reciveruid ? item.senderuid : item.reciveruid;
    const name = activeUserData.uid == item.reciveruid ? item.sendername : item.recivername;
    return (
      !blockList.includes(uid + activeUserData.uid) &&
      !blockList.includes(activeUserData.uid + uid) &&
      (forwardSearchFriend == "" ? item : name.toLowerCase().includes(forwardSearchFriend.toLowerCase()))
    );
  });

  const filteredGroupForwardList = groupList.filter((item) => {
    return forwardSearchGroup == "" ? item : item.groupname.toLowerCase().includes(forwardSearchGroup.toLowerCase());
  });

  const handleMessegeForwardListShow = (item) => {
    setMessageForwardModalShow(true);
    setForwardMessegeInfo(item);
  };

  const handleForwardMessegeSend = (item) => {
    if (messageForwardListOpen == "friend") {
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
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        });
      } else if (forwardMessegeInfo.type.includes("video")) {
        set(push(ref(db, "singlemessege/")), {
          type: "video/forwarded",
          video: forwardMessegeInfo.video,
          reciveruid: reciveruid,
          recivername: recivername,
          reciverprofile: reciverprofile,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
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
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
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
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        });
      }
    } else if (messageForwardListOpen == "group") {
      if (forwardMessegeInfo.type.includes("text")) {
        set(push(ref(db, "groupmessege/")), {
          type: "text/forwarded",
          text: forwardMessegeInfo.text,
          groupuid: item.groupuid,
          groupname: item.groupname,
          groupphoto: item.groupphoto,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        });
      } else if (forwardMessegeInfo.type.includes("image")) {
        set(push(ref(db, "groupmessege/")), {
          type: "image/forwarded",
          image: forwardMessegeInfo.image,
          groupuid: item.groupuid,
          groupname: item.groupname,
          groupphoto: item.groupphoto,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        });
      } else if (forwardMessegeInfo.type.includes("video")) {
        set(push(ref(db, "groupmessege/")), {
          type: "video/forwarded",
          video: forwardMessegeInfo.video,
          groupuid: item.groupuid,
          groupname: item.groupname,
          groupphoto: item.groupphoto,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        });
      } else if (forwardMessegeInfo.type.includes("file")) {
        set(push(ref(db, "groupmessege/")), {
          type: "file/forwarded",
          file: forwardMessegeInfo.file,
          filename: forwardMessegeInfo.filename,
          groupuid: item.groupuid,
          groupname: item.groupname,
          groupphoto: item.groupphoto,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        });
      } else if (forwardMessegeInfo.type.includes("gif")) {
        set(push(ref(db, "groupmessege/")), {
          type: "gif/forwarded",
          gif: forwardMessegeInfo.gif,
          gifname: forwardMessegeInfo.gifname,
          groupuid: item.groupuid,
          groupname: item.groupname,
          groupphoto: item.groupphoto,
          senderuid: activeUserData.uid,
          sendername: activeUserData.displayName,
          senderprofile: activeUserData.photoURL,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        });
      }
    }
  };

  const handleFileClick = (e) => {
    let file = e.target.files[0];

    if (file.size > 15000000) {
      setFileSizeErrorShow(true);
    } else if (file.type.includes("image")) {
      const fileRef = storageRef(storage, "image as a messege/" + Date.now());
      uploadBytes(fileRef, file).then((snapshot) => {
        getDownloadURL(fileRef).then((downloadURL) => {
          set(push(ref(db, "groupmessege/")), {
            type: "image/normal",
            image: downloadURL,
            groupuid: activeGroupData.groupuid,
            groupname: activeGroupData.groupname,
            groupphoto: activeGroupData.groupphoto,
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
          set(push(ref(db, "groupmessege/")), {
            type: "video/normal",
            video: downloadURL,
            groupuid: activeGroupData.groupuid,
            groupname: activeGroupData.groupname,
            groupphoto: activeGroupData.groupphoto,
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
          set(push(ref(db, "groupmessege/")), {
            type: "file/normal",
            file: downloadURL,
            filename: file.name,
            groupuid: activeGroupData.groupuid,
            groupname: activeGroupData.groupname,
            groupphoto: activeGroupData.groupphoto,
            senderuid: activeUserData.uid,
            sendername: activeUserData.displayName,
            senderprofile: activeUserData.photoURL,
            senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
          });
        });
      });
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (anotherFileSelectButtonRef.current.contains(e.target)) {
        setFileSizeErrorShow(false);
      }
    });
  }, []);

  const handleEmojiClick = (e) => {
    setMessege(messege + e.emoji);
  };

  const handleGifClick = (e) => {
    set(push(ref(db, "groupmessege/")), {
      type: "gif/normal",
      gif: e.url,
      gifname: e.description,
      groupuid: activeGroupData.groupuid,
      groupname: activeGroupData.groupname,
      groupphoto: activeGroupData.groupphoto,
      senderuid: activeUserData.uid,
      sendername: activeUserData.displayName,
      senderprofile: activeUserData.photoURL,
      senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
    });
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!gifBoxRef.current.contains(e.target)) {
        setGifPickerShow(false);
      }
    });
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!emojiBoxRef.current.contains(e.target)) {
        setEmojiPickerShow(false);
      }
    });
  }, []);

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
    let chatImageRef = ref(db, "groupmessege/");
    onValue(chatImageRef, (snapshot) => {
      let chatImageArray = [];
      snapshot.forEach((item) => {
        if (item.val().type.includes("image") && activeGroupData.groupuid == item.val().groupuid) {
          chatImageArray.push(item.val());
        }
      });
      setChatImageList(chatImageArray);
    });
  }, [activeGroupData]);

  useEffect(() => {
    let chatVideoRef = ref(db, "groupmessege/");
    onValue(chatVideoRef, (snapshot) => {
      let chatVideoArray = [];
      snapshot.forEach((item) => {
        if (item.val().type.includes("video") && activeGroupData.groupuid == item.val().groupuid) {
          chatVideoArray.push(item.val());
        }
      });
      setChatVideoList(chatVideoArray);
    });
  }, [activeGroupData]);

  useEffect(() => {
    let chatFileRef = ref(db, "groupmessege/");
    onValue(chatFileRef, (snapshot) => {
      let chatFileArray = [];
      snapshot.forEach((item) => {
        if (item.val().type.includes("file") && activeGroupData.groupuid == item.val().groupuid) {
          chatFileArray.push(item.val());
        }
      });
      setChatFileList(chatFileArray);
    });
  }, [activeGroupData]);

  return activeGroupData == null ? (
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
            replyMessegeInfo || editedMessageInfo
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
                      chatType={"group"}
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
              ) : (
                item.type.includes("deleted") && (
                  <SenderDeletedMessage sentTime={item.senttime} />
                )
              )
            ) : item.type.includes("text") ? (
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
            ) : (
              item.type.includes("deleted") && (
                <ReciverDeletedMessage
                  senderName={item.sendername}
                  senderProfile={item.senderprofile}
                  sentTime={item.senttime}
                />
              )
            )
          )}
          <Modal
            modalShow={messageForwardModalShow}
            modalClose={setMessageForwardModalShow}
            className={"w-[600px] h-[550px] py-6 px-[40px]"}
          >
            <RxCross2
              onClick={() => setMessageForwardModalShow(false)}
              className="absolute top-3 right-3 bg-primaryBgColor box-content p-2 text-lg rounded-full cursor-pointer"
            />
            <Box className={"h-[31%]"}>
              <Typography className="text-lg font-bold mb-3">
                Forward messege
              </Typography>
              <Box
                className={"w-full border border-[#f2f2f2] rounded-3xl mb-2"}
              >
                <Button
                  onClick={() => setMessageForwardListOpen("friend")}
                  className={
                    messageForwardListOpen == "friend"
                      ? "w-2/4 bg-[#dddcea] text-black rounded-3xl py-2.5 font-open-sans"
                      : "w-2/4 hover:bg-[#f0f0f0] rounded-3xl py-2.5 font-open-sans text-secoundaryText"
                  }
                >
                  Friends
                </Button>
                <Button
                  onClick={() => setMessageForwardListOpen("group")}
                  className={
                    messageForwardListOpen == "group"
                      ? "w-2/4 bg-[#dddcea] text-black rounded-3xl py-2.5 font-open-sans"
                      : "w-2/4 hover:bg-[#f0f0f0] rounded-3xl py-2.5 font-open-sans text-secoundaryText"
                  }
                >
                  Groups
                </Button>
              </Box>
              {messageForwardListOpen == "friend" ? (
                <SearchBox
                  onChange={(e) => setForwardSearchFriend(e.target.value)}
                  placeholder={"Search friend"}
                />
              ) : (
                <SearchBox
                  onChange={(e) => setForwardSearchGroup(e.target.value)}
                  placeholder={"Search group"}
                />
              )}
            </Box>
            <Box className={"h-[69%] overflow-y-auto"}>
              {messageForwardListOpen == "friend"
                ? filteredFriendForwardList.map((item) => (
                    <MessageForwardListItem
                      profile={activeUserData?.uid == item.senderuid ? item.reciverprofile : item.senderprofile }
                      name={activeUserData?.uid == item.senderuid ? item.recivername : item.sendername }
                      sendButton={() => handleForwardMessegeSend(item)}
                    />
                  ))
                : filteredGroupForwardList.map((item) => (
                    <MessageForwardListItem
                      name={item.groupname}
                      profile={item.groupphoto}
                      sendButton={() => handleForwardMessegeSend(item)}
                    />
                  ))}
            </Box>
          </Modal>
        </Box>
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
                  className="w-[110px] text-center bg-[#323436] text-white py-[6px] px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[55px] hidden group-hover/tooltip:block"
                >
                  Attach a file
                  <Box
                    className={
                      "w-[13px] h-[13px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-[80%] "
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
                    The file you have selected is too large. The maximum size is
                    15MB.
                  </Typography>
                  <Box className={"flex justify-between items-center"}>
                    <label
                      ref={anotherFileSelectButtonRef}
                      for="file"
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
                      tenorApiKey={"AIzaSyAW7la2woNuMnvq7z-KCOavIuaKyeQX_jg"}
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
      </Box>
      <Box
        className={
          groupProfileOpen
            ? "w-[30%] ml-4 h-full bg-white rounded-2xl overflow-hidden text-center overflow-y-auto relative"
            : "w-0 ml-0 h-full bg-white rounded-2xl overflow-hidden text-center overflow-y-auto relative"
        }
      >
        <Box
          className={
            mediaShow
              ? "w-full h-full pt-14 absolute left-0 top-0 transition-all duration-300 ease-in-out -translate-x-full"
              : "w-full h-full pt-14 absolute left-0 top-0 transition-all duration-300 ease-in-out"
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
                onClick={() => setMediaDropdownOpen(!mediaDropdownOpen)}
                alignItems={"center"}
                justifyContent={"between"}
                className={
                  mediaDropdownOpen
                    ? "text-lg mb-1 px-2.5 py-2 rounded-md  bg-[#f5f5f5] cursor-pointer text-black"
                    : "text-lg mb-1 px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
                }
              >
                <Typography>View Media</Typography>
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
                    <Typography className="text-secoundaryText text-lg  px-10">
                      Image that you exchange with this group will appear here.
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
                    <Typography className="text-secoundaryText text-lg px-10">
                      Video that you exchange with this group will appear here.
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
                    <Typography className="text-secoundaryText text-lg  px-10">
                      Files that you exchange with this group will appear here.
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

export default ChatWithGroup;