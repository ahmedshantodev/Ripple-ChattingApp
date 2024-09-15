import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import MessageForwardListItem from "../layout/MessageForwardListItem";
import Box from "../layout/Box";
import SearchBox from "../layout/SearchBox";
import Typography from "../layout/Typography";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const MessageForwardModal = ({ modalShow, modalClose, forwardMessegeInfo }) => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state.user.information);
  const [blockList, setBlockList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  let friendAndGroupList = [...friendList, ...groupList];
  friendAndGroupList.sort((a, b) => b.lastmessagesent - a.lastmessagesent);
  const [forwardSearch, setForwardSearch] = useState("");
  const [messageForwardList, setMessageForwardList] = useState([]);

  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const modalRef = useRef();
  const boxRef = useRef();

  useEffect(() => {
    setMessageForwardList([...friendAndGroupList]);
  }, [modalShow]);


  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (
        modalRef.current?.contains(e.target) &&
        !boxRef.current?.contains(e.target)
      ) {
        modalClose(false);
      }
    });
  }, []);

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
          FriendListArray.push({ ...item.val(), friendid: item.key });
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
          groupListArray.push({ ...item.val(), gid: item.key });
        }
      });
      setGroupList(groupListArray);
    });
  }, []);

  const filteredForwardListItem = messageForwardList.filter((item) => {
    const uid = activeUserData.uid == item.reciveruid ? item.senderuid : item.reciveruid;
    let name = activeUserData?.uid == item.senderuid ? item.recivername : item.sendername;

    return (
      !blockList.includes(uid + activeUserData.uid) &&
      !blockList.includes(activeUserData.uid + uid) &&
      (forwardSearch == ""
        ? item
        : item.friendid
        ? name.toLowerCase().includes(forwardSearch.toLowerCase())
        : item.groupname.toLowerCase().includes(forwardSearch.toLowerCase()))
    );
  });

  const handleMssageForwardToGroup  = (info) => {
    if (forwardMessegeInfo.type.includes("text")) {
      set(push(ref(db, "groupmessege/")), {
        type: "text/forwarded",
        text: forwardMessegeInfo.text,
        groupuid: info.groupuid,
        groupname: info.groupname,
        groupphoto: info.groupphoto,
        senderuid: activeUserData.uid,
        sendername: activeUserData.displayName,
        senderprofile: activeUserData.photoURL,
        senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      });
    } else if (forwardMessegeInfo.type.includes("voice")) {
      set(push(ref(db, "groupmessege/")), {
        type: "voice/forwarded",
        voice: forwardMessegeInfo.voice,
        groupuid: info.groupuid,
        groupname: info.groupname,
        groupphoto: info.groupphoto,
        senderuid: activeUserData.uid,
        sendername: activeUserData.displayName,
        senderprofile: activeUserData.photoURL,
        senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      });
    } else if (forwardMessegeInfo.type.includes("image")) {
      set(push(ref(db, "groupmessege/")), {
        type: "image/forwarded",
        image: forwardMessegeInfo.image,
        groupuid: info.groupuid,
        groupname: info.groupname,
        groupphoto: info.groupphoto,
        senderuid: activeUserData.uid,
        sendername: activeUserData.displayName,
        senderprofile: activeUserData.photoURL,
        senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      });
    } else if (forwardMessegeInfo.type.includes("video")) {
      set(push(ref(db, "groupmessege/")), {
        type: "video/forwarded",
        video: forwardMessegeInfo.video,
        groupuid: info.groupuid,
        groupname: info.groupname,
        groupphoto: info.groupphoto,
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
        groupuid: info.groupuid,
        groupname: info.groupname,
        groupphoto: info.groupphoto,
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
        groupuid: info.groupuid,
        groupname: info.groupname,
        groupphoto: info.groupphoto,
        senderuid: activeUserData.uid,
        sendername: activeUserData.displayName,
        senderprofile: activeUserData.photoURL,
        senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      });
    }

    var groupMemberList = []
    let groupMemberListRef = ref(db, "groupmembers");
    onValue(groupMemberListRef, (snapshot) => {
      let groupMemberListArray = [];
      snapshot.forEach((item) => {
        if (info.groupuid == item.val().groupuid) {
          groupMemberListArray.push({...item.val() , groupmemberid: item.key});
        }
      });
      groupMemberList = groupMemberListArray
    })
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
    var groupMemberList = []
  }

  const handleForwardMessegeToFriend = (item) => {
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
    } else if (forwardMessegeInfo.type.includes("voice")) {
      set(push(ref(db, "singlemessege/")), {
        type: "voice/forwarded",
        voice: forwardMessegeInfo.voice,
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
    set(ref(db, "friends/" + item.friendid), {
      reciveruid: reciveruid,
      recivername: recivername,
      reciverprofile: reciverprofile,
      senderuid: activeUserData.uid,
      sendername: activeUserData.displayName,
      senderprofile: activeUserData.photoURL,
      lastmessagesent: Date.now(),
    });
  };

  return (
    <section
      ref={modalRef}
      className={`${
        modalShow ? "flex" : "hidden"
      } w-full h-dvh bg-white/70 fixed top-0 left-0 justify-center items-center z-50`}
    >
      <div
        ref={boxRef}
        className={`w-[600px] h-[500px] px-7 py-5 bg-white rounded-lg border border-primaryBorder shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] relative`}
      >
        <RxCross2
          onClick={() => modalClose(false)}
          className="absolute top-3 right-3 bg-primaryBgColor box-content p-2 text-lg rounded-full cursor-pointer"
        />
        <Box className={"h-[22%]"}>
          <Typography className="text-lg font-bold mb-3">
            Forward messege
          </Typography>
          <SearchBox
            onChange={(e) => setForwardSearch(e.target.value)}
            placeholder={"Search friend or groups"}
          />
        </Box>
        <Box className={"h-[78%] overflow-y-auto"}>
          {filteredForwardListItem.map((item) =>
            item.friendid ? (
              <MessageForwardListItem
                profile={activeUserData?.uid == item.senderuid ? item.reciverprofile : item.senderprofile}
                name={activeUserData?.uid == item.senderuid ? item.recivername : item.sendername}
                sendButton={() => handleForwardMessegeToFriend(item)}
              />
            ) : (
              <MessageForwardListItem
                name={item.groupname}
                profile={item.groupphoto}
                sendButton={() => handleMssageForwardToGroup(item)}
              />
            )
          )}
        </Box>
      </div>
    </section>
  );
};

export default MessageForwardModal;
