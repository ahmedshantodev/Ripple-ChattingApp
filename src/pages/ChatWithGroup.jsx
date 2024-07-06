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
import { FaRegImage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { TbAlertCircle } from "react-icons/tb";
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
import GroupManagementMessage from "../components/layout/GroupManagementMessage";
import { activeGroup } from "../slices/activeGroupSlice";
import ReciverLike from "../components/layout/ReciverLike";
import SenderLike from "../components/layout/SenderLike";

import { AudioRecorder } from "react-audio-voice-recorder";
import SenderVoiceMessage from "../components/layout/SenderVoiceMessage";
import ReciverVoiceMessage from "../components/layout/ReciverVoiceMessage";
import MessageForwardModal from "../components/layout/MessageForwardModal";

const ChatWithGroup = () => {
  const db = getDatabase();
  const storage = getStorage();
  const dispatch = useDispatch();
  const activeUserData = useSelector((state) => state.user.information);
  const activeGroupData = useSelector((state) => state.activeGroup.information);
  const [voiceMessageUrl, setVoiceMessageUrl] = useState("");
  const [messege, setMessege] = useState("");
  const [messegeList, setMessegeList] = useState([]);
  const [groupProfileOpen, setGroupProfileOpen] = useState(true);
  const [groupNotificationOn, setGroupNotificationOn] = useState(true);
  const [groupMemberShow, setGroupMemberShow] = useState(false);
  const [membarRequstShow, setMembarRequstShow] = useState(false);
  const [groupMemberList, setGroupMemberList] = useState([]);
  const [forwardMessegeInfo, setForwardMessegeInfo] = useState("");
  const [messageForwardModalShow, setMessageForwardModalShow] = useState(false);
  const [replyMessegeInfo, setreplyMessegeInfo] = useState("");
  const [editedMessageInfo, setEditedMessageInfo] = useState("");
  const [messageRemoveModal, setMessageRemoveModal] = useState(false);
  const [restrictedActionModal, setRestrictedActionModal] = useState(false)
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
  const [groupLeaveModal, setGroupLeaveModal] = useState(false);
  const [adminRoleChangeModal, setAdminRoleChangeModal] = useState(false)
  const [newAdminInfo, setNewAdminInfo] = useState("")
  const [groupJoinRequstList, setGroupJoinRequstList] = useState([]);
  const [emojiPickerShow, setEmojiPickerShow] = useState(false);
  const [gifPickerShow, setGifPickerShow] = useState(false);
  const [fileSizeErrorShow, setFileSizeErrorShow] = useState(false);
  const anotherFileSelectButtonRef = useRef();
  const lastMessageRef = useRef();

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
    lastMessageRef.current?.scrollIntoView();
  }, [messegeList]);

  useEffect(() => {
    let groupMemberRef = ref(db, "groupmembers");
    onValue(groupMemberRef, (snapshot) => {
      let groupMemberArray = [];
      snapshot.forEach((item) => {
        if (activeGroupData.groupuid == item.val().groupuid) {
          groupMemberArray.push({ ...item.val(), groupmemberid: item.key });
        }
      });
      setGroupMemberList(groupMemberArray);
    });
  }, [activeGroupData]);

  const lastMessageSendTimeUpdate = () => {
    groupMemberList.map((item) => {
      set(ref(db, "groupmembers/" + item.groupmemberid), {
        groupuid: item.groupuid,
        groupname: item.groupname,
        groupphoto: item.groupphoto,
        groupadminuid: item.groupadminuid,
        groupadminname: item.groupadminname,
        groupadminprofile: item.groupadminprofile,
        memberuid: item.memberuid,
        membername: item.membername,
        memberprofile: item.memberprofile,
        addedbyuid: item.addedbyuid,
        addedbyname: item.addedbyname,
        addedbyprofile: item.addedbyprofile,
        lastmessagesent: Date.now(),
      });
    });
  }

  const [memberRemoveModal, setMemberRemoveModal] = useState(false)
  const [removedMemberInfo, setRemovedMemberInfo] = useState("")

  const handleMemberRemoveModalShow = (item) => {
    setRemovedMemberInfo(item)
    setMemberRemoveModal(true)
  }

  const handleMemberRemove = () => {
    if (activeUserData.uid == activeGroupData.groupadminuid) {
      remove(ref(db, "groupmembers/" + removedMemberInfo.groupmemberid)).then(() => {
        set(push(ref(db, "groupmessege/")), {
          type: "groupmanagment/member-remove",
          groupuid: removedMemberInfo.groupuid,
          whoremove: activeUserData.displayName,
          whoremoved: removedMemberInfo.membername,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        });
        lastMessageSendTimeUpdate()  
        setMemberRemoveModal(false)
      })
    } else {
      setRestrictedActionModal(true)
    }
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
    if (activeUserData.uid == activeGroupData.groupadminuid) {
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
        lastmessagesent: Date.now(),
      }).then(() => {
        set(push(ref(db, "groupmessege/")), {
          type: "groupmanagment/member-added",
          groupuid: item.groupuid,
          whoadded: activeUserData.displayName,
          whojoined: item.requstsendername,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        });
        remove(ref(db, "groupjoinrequst/" + item.joinrequstid));
      });
    } else {
      setRestrictedActionModal(true);
    }
  };

  const handleJoinRequstDelete = (item) => {
    if (activeUserData.uid == activeGroupData.groupadminuid) {
      remove(ref(db, "groupjoinrequst/" + item.joinrequstid));
    } else {
      setRestrictedActionModal(true);
    }
  };

  const handleSendLike = () => {
    set(push(ref(db, "groupmessege/")), {
      type: "like",
      groupuid: activeGroupData.groupuid,
      groupname: activeGroupData.groupname,
      groupphoto: activeGroupData.groupphoto,
      senderuid: activeUserData.uid,
      sendername: activeUserData.displayName,
      senderprofile: activeUserData.photoURL,
      senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
    });
    lastMessageSendTimeUpdate()
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
      } else if (replyMessegeInfo.type.includes("voice")) {
        set(push(ref(db, "groupmessege/")), {
          type: "text/reply-normal",
          text: messege,
          repliedType: "voice",
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
    lastMessageSendTimeUpdate()
  };

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setVoiceMessageUrl(url);
  };

  const handleSendVoiceMessage = () => {
    set(push(ref(db, "groupmessege/")), {
      type: "voice/normal",
      voice: voiceMessageUrl,
      groupuid: activeGroupData.groupuid,
      groupname: activeGroupData.groupname,
      groupphoto: activeGroupData.groupphoto,
      senderuid: activeUserData.uid,
      sendername: activeUserData.displayName,
      senderprofile: activeUserData.photoURL,
      senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
    }).then(() => {
      setVoiceMessageUrl("");
      lastMessageSendTimeUpdate()
    });
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
      lastMessageSendTimeUpdate()
      setRemovedMessageInfo("");
      setMessageRemoveModal(false);
    });
  };

  const handleMessageRemoveCancel = () => {
    setRemovedMessageInfo("");
    setMessageRemoveModal(false);
  };

  const handleMessegeForwardListShow = (item) => {
    setMessageForwardModalShow(true);
    setForwardMessegeInfo(item);
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
    lastMessageSendTimeUpdate()
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (anotherFileSelectButtonRef.current?.contains(e.target)) {
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
    lastMessageSendTimeUpdate()
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!gifBoxRef.current?.contains(e.target)) {
        setGifPickerShow(false);
      }
    });
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!emojiBoxRef.current?.contains(e.target)) {
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
        if (
          item.val().type.includes("image") &&
          activeGroupData.groupuid == item.val().groupuid
        ) {
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
        if (
          item.val().type.includes("video") &&
          activeGroupData.groupuid == item.val().groupuid
        ) {
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
        if (
          item.val().type.includes("file") &&
          activeGroupData.groupuid == item.val().groupuid
        ) {
          chatFileArray.push(item.val());
        }
      });
      setChatFileList(chatFileArray);
    });
  }, [activeGroupData]);

  const handleGroupLeave = () => {
    remove(ref(db, "groupmembers/" + activeGroupData.groupmemberid));
    set(push(ref(db, "groupmessege/")), {
      type: "groupmanagment/member-left",
      groupuid: activeGroupData.groupuid,
      wholeft: activeUserData.displayName,
      senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
    });
    lastMessageSendTimeUpdate()
    dispatch(activeGroup(null));
    localStorage.removeItem("activeGroup");
    setGroupLeaveModal(false);
  };

  const handleMakeAdminModalShow = (item) => {
    setNewAdminInfo(item)
    setAdminRoleChangeModal(true)
  }

  const handleMakeAdmin = () => {
    set(ref(db, "groups/" + activeGroupData.groupuid), {
      groupuid: activeGroupData.groupuid,
      groupname: activeGroupData.groupname,
      groupphoto: activeGroupData.groupphoto,
      groupadminuid: newAdminInfo.memberuid,
      groupadminname: newAdminInfo.membername,
      groupadminprofile: newAdminInfo.memberprofile,
      lastmessagesent: Date.now(),
    })
    groupMemberList.map((item) => {
      set(ref(db, "groupmembers/" + item.groupmemberid), {
        groupuid: item.groupuid,
        groupname: item.groupname,
        groupphoto: item.groupphoto,
        groupadminuid: newAdminInfo.memberuid,
        groupadminname: newAdminInfo.membername,
        groupadminprofile: newAdminInfo.memberprofile,
        memberuid: item.memberuid,
        membername: item.membername,
        memberprofile: item.memberprofile,
        addedbyuid: item.addedbyuid,
        addedbyname: item.addedbyname,
        addedbyprofile: item.addedbyprofile,
        lastmessagesent: Date.now(),
      });
    });
    set(push(ref(db , "groupmessege/")) , {
      type: "groupmanagment/groupadmin-change",
      groupuid: activeGroupData.groupuid,
      oldadmin: activeUserData.displayName,
      newadmin: newAdminInfo.membername,
      senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
    })
    localStorage.setItem("activeGroup", JSON.stringify({ 
      ...activeGroupData, 
      groupadminuid: newAdminInfo.memberuid,
      groupadminname: newAdminInfo.membername,
      groupadminprofile: newAdminInfo.memberprofile,
    }));
    dispatch(activeGroup({ 
      ...activeGroupData,
      groupadminuid: newAdminInfo.memberuid,
      groupadminname: newAdminInfo.membername,
      groupadminprofile: newAdminInfo.memberprofile,
    }));
    setAdminRoleChangeModal(false)
  }

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
              {activeGroupData.groupadminname} created this group
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
            ) : item.type.includes("groupmanagment") ? (
              item.type == "groupmanagment/member-added" ? (
                <GroupManagementMessage
                  type={item.type}
                  whoAdded={item.whoadded}
                  whoJoined={item.whojoined}
                />
              ) : item.type == "groupmanagment/member-remove" ? (
                <GroupManagementMessage
                  type={item.type}
                  whoRemove={item.whoremove}
                  whoRemoved={item.whoremoved}
                />
              ) : item.type == "groupmanagment/member-left" ? (
                <GroupManagementMessage
                  type={item.type}
                  whoLeft={item.wholeft}
                />
              ) : item.type == "groupmanagment/groupadmin-change" ? (
                <GroupManagementMessage
                  type={item.type}
                  oldadmin={item.oldadmin}
                  newadmin={item.newadmin}
                />
              ) : item.type == "groupmanagment/groupphoto-changed" ? (
                <GroupManagementMessage
                  type={item.type}
                  whoChanged={item.whochanged}
                />
              ) : (
                item.type == "groupmanagment/groupname-changed" && (
                  <GroupManagementMessage
                    type={item.type}
                    whoChanged={item.whochanged}
                    oldGroupName={item.oldgroupname}
                    newGroupName={item.newgroupname}
                  />
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
                    chatType={"group"}
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
                    chatType={"group"}
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
              item.type.includes("deleted") && (
                <ReciverDeletedMessage
                  senderName={item.sendername}
                  senderProfile={item.senderprofile}
                  sentTime={item.senttime}
                />
              )
            ) : (
              item.type == "like" && (
                <ReciverLike
                  name={item.sendername}
                  profile={item.senderprofile}
                  sentTime={item.senttime}
                />
              )
            )
          )}
          <div ref={lastMessageRef} />
          <MessageForwardModal
            modalShow={messageForwardModalShow}
            modalClose={setMessageForwardModalShow}
            forwardMessegeInfo={forwardMessegeInfo}
          />
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
              ) : replyMessegeInfo.type.includes("voice") ? (
                <Typography className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis w-[80%] text-[#65676b]">
                  voice
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
                    className={`box-content text-[#007bf5] text-[30px] p-2 rounded-[20%] cursor-pointer transition-all ease-in-out duration-300 ${
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
              {voiceMessageUrl == "" && (
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
              )}
            </Flex>
            {voiceMessageUrl ? (
              <Flex alignItems={"center"} className={"w-full"}>
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
            )}
          </Flex>
        </Box>
      </Box>
      <Box
        className={
          groupProfileOpen
            ? "w-[30%] ml-4 h-full bg-white rounded-2xl overflow-hidden text-center relative"
            : "w-0 ml-0 h-full bg-white rounded-2xl overflow-hidden text-center relative"
        }
      >
        <Box
          className={
            mediaShow
              ? "w-full h-full pt-14 pb-3 overflow-y-auto absolute left-0 top-0 transition-all duration-300 ease-in-out -translate-x-full"
              : "w-full h-full pt-14 pb-3 overflow-y-auto absolute left-0 top-0 transition-all duration-300 ease-in-out"
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
                    "px-2 py-2 border border-primaryBorder rounded-md mb-1"
                  }
                >
                  {groupMemberList.map((item) => (
                    <GroupMemberListItem
                      memberUid={item.memberuid}
                      memberName={item.membername}
                      memberProfile={item.memberprofile}
                      addedBy={item.addedbyname}
                      removeButton={() => handleMemberRemoveModalShow(item)}
                      makeAdminButton={() => handleMakeAdminModalShow(item)}
                    />
                  ))}
                </Box>
              )}
              <Modal
                modalShow={memberRemoveModal}
                modalClose={setMemberRemoveModal}
                className={"w-[600px] px-7 py-5"}
              >
                <Flex alignItems={"center"} className={"gap-x-2.5"}> 
                  <TbAlertCircle className="text-[32px] text-red-400"/>
                  <Typography
                    variant="h3"
                    className="text-3xl font-semibold font-open-sans"
                  >
                    Remove From Chat?
                  </Typography>
                </Flex>
                <Typography className="text-lg font-open-sans text-secoundaryText mt-3">
                  Are you sure you want to remove <span className="font-semibold text-black">{removedMemberInfo.membername}</span> from the conversation? They will no longer be able to send or receive new messages.
                </Typography>
                <Flex justifyContent={"between"}>
                  <Button
                    onClick={handleMemberRemove}
                    className={
                      "w-[49%] mt-4 py-2.5 rounded-md bg-[#2176ff] text-white font-semibold font-open-sans transition-all duration-200 active:scale-[0.98]"
                    }
                  >
                    Remove from group
                  </Button>
                  <Button
                    onClick={() => setMemberRemoveModal(false)}
                    className={
                      "w-[49%] mt-4 py-2.5 rounded-md bg-[#cacad8] font-semibold font-open-sans transition-all duration-200 active:scale-[0.98]"
                    }
                  >
                    Cancel
                  </Button>

                </Flex>
              </Modal>
              <Modal
                modalShow={adminRoleChangeModal}
                modalClose={setAdminRoleChangeModal}
                className={"w-[600px] px-7 py-5"}
              >
                <Flex alignItems={"center"} className={"gap-x-2.5"}> 
                  <TbAlertCircle className="text-[32px] text-red-400"/>
                  <Typography
                    variant="h3"
                    className="text-3xl font-semibold font-open-sans"
                  >
                    Warning: Admin Role Transfer
                  </Typography>
                </Flex>
                <Typography className="text-lg font-open-sans text-secoundaryText mt-3">
                  Are you sure you want to make <span className="font-semibold text-black">{newAdminInfo.membername}</span> an admin? This action cannot be undone.
                </Typography>
                <Flex justifyContent={"between"}>
                  <Button
                    onClick={handleMakeAdmin}
                    className={
                      "w-[49%] mt-4 py-2.5 rounded-md bg-[#2176ff] text-white font-semibold font-open-sans transition-all duration-200 active:scale-[0.98]"
                    }
                  >
                    Confirm
                  </Button>
                  <Button
                    onClick={() => setAdminRoleChangeModal(false)}
                    className={
                      "w-[49%] mt-4 py-2.5 rounded-md bg-[#cacad8] font-semibold font-open-sans transition-all duration-200 active:scale-[0.98]"
                    }
                  >
                    Cancel
                  </Button>

                </Flex>
              </Modal>
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
                    "px-2 py-2 border border-primaryBorder rounded-md mb-1"
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
            <Modal
              modalShow={restrictedActionModal}
              modalClose={setRestrictedActionModal}
              className={"w-[600px] px-8 py-5"}
            >
              <Flex alignItems={"center"} className={"gap-x-2.5"}>
                <MdOutlinePrivacyTip className="text-3xl text-red-400" />
                <Typography variant="h3" className="text-3xl">
                  Restricted Action
                </Typography>
              </Flex>
              <Typography className="text-lg mt-3 font-open-sans text-secoundaryText">
                This feature is restricted to admins only. To perform this
                action, please contact an administrator.
              </Typography>
              <Button
                onClick={() => setRestrictedActionModal(false)}
                className={
                  "w-full py-2.5 mt-3 bg-[#0861f2] text-white font-semibold font-open-sans rounded-md"
                }
              >
                Close
              </Button>
            </Modal>
            <Flex
              onClick={() => setGroupLeaveModal(true)}
              alignItems={"center"}
              justifyContent={"between"}
              className={
                "text-lg mb-2 px-2.5 py-2 rounded-md text-secoundaryText hover:bg-[#f5f5f5] cursor-pointer hover:text-black"
              }
            >
              <Typography>Leave Group</Typography>
              <CiLogout className={"rotate-180 text-black text-xl"} />
            </Flex>
            <Modal
              modalShow={groupLeaveModal}
              modalClose={setGroupLeaveModal}
              className={"py-5 px-7 w-[600px]"}
            >
              {activeUserData.uid == activeGroupData.groupadminuid ? (
                <Box>
                  <Typography
                    variant="h3"
                    className="text-3xl font-semibold font-open-sans"
                  >
                    You are Admin!
                  </Typography>
                  <Typography className="text-lg font-open-sans text-secoundaryText mt-3">
                    Heads Up! Before you leave this group, you'll need to assign
                    a new admin to keep things running smoothly.
                  </Typography>
                  <Button
                    onClick={() => setGroupLeaveModal(false)}
                    className={
                      "w-full mt-4 py-2.5 rounded-md bg-[#cacad8] font-semibold font-open-sans transition-all duration-200 active:scale-[0.98]"
                    }
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography
                    variant="h3"
                    className="text-2xl text-black font-semibold font-open-sans"
                  >
                    Are you sure you want to leave the group?
                  </Typography>
                  <Typography
                    variant="h3"
                    className="text-secoundaryText mt-3 font-open-sans"
                  >
                    You are about to leave the group. If you proceed, you will
                    no longer receive updates or participate in group
                    discussions. Are you sure you want to leave? This action
                    cannot be undone.
                  </Typography>
                  <Box className={"flex items-center justify-between mt-4"}>
                    <Button
                      onClick={handleGroupLeave}
                      className={
                        "w-[49%] py-2.5 font-semibold text-white rounded-md bg-[#2176ff] transition-all duration-200 ease-in-out active:scale-[0.98]"
                      }
                    >
                      Leave Group
                    </Button>
                    <Button
                      onClick={() => setGroupLeaveModal(false)}
                      className={
                        "w-[49%] py-2.5 font-semibold rounded-md bg-[#d8dadf] transition-all duration-200 ease-in-out active:scale-[0.98]"
                      }
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )}
            </Modal>
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
