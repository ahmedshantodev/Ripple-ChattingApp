import React, { useEffect, useState } from "react";
// Components
import Box from "../components/layout/Box";
import Typography from "../components/layout/Typography";
import Flex from "../components/layout/Flex";
import ChatItem from "../components/layout/ChatItem";
import SearchBox from "../components/layout/SearchBox";
import { BsThreeDotsVertical } from "react-icons/bs";
// Firebase
import {
  ref,
  onValue,
  getDatabase,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { activeChat } from "./../slices/activeChatSlice";
import GroupItem from "../components/layout/GroupItem";
import { activeGroup } from "../slices/activeGroupSlice";
import { Outlet, useNavigate } from "react-router-dom";
import Button from "../components/layout/Button";

const Chat = () => {
  const db = getDatabase();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const activeUserData = useSelector((state) => state.user.information);
  const [friendList, setFriendList] = useState([]);
  const [groupList, setGroupList] = useState([])
  const [friendListSearch, setFriendListSearch] = useState("");
  const [groupListSearch, setGroupListSearch] = useState("")
  const [chatListOpen, setChatListOpen] = useState("friends")

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

  const filteredFriendChatItem = friendList.filter((item) => {
    let name = activeUserData?.uid == item.senderuid ? item.recivername : item.sendername;
    return friendListSearch == "" ? item : name.toLowerCase().includes(friendListSearch.toLowerCase());
  });

  const filteredGroupsChatItem = groupList.filter((item) => {
    return groupListSearch == "" ? item : item.groupname.toLowerCase().includes(groupListSearch.toLowerCase());
  });

  const handleFriendChatOpen = (item) => {
    navigate("/pages/chat/chat-with-friend")
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

  const handleGroupChatOpen = (item) => {
    navigate("/pages/chat/chat-with-group")
    dispatch(activeGroup({
      groupuid: item.groupuid,
      groupname: item.groupname,
      groupphoto: item.groupphoto,
      groupadminuid: item.groupadminuid,
      groupadminname: item.groupadminname,
      groupadminprofile: item.groupadminprofile,
    }));
    localStorage.setItem("activeGroup", JSON.stringify({
      groupuid: item.groupuid,
      groupname: item.groupname,
      groupphoto: item.groupphoto,
      groupadminuid: item.groupadminuid,
      groupadminname: item.groupadminname,
      groupadminprofile: item.groupadminprofile,
    }));
  };

  
  return (
    <section className="w-full h-dvh bg-[#dddcea] p-4 flex">
      <Box
        className={"w-1/4 h-full bg-white rounded-2xl pt-6 pb-5 overflow-hidden"}
      >
        <Box className={"pb-2.5 px-2.5"}>
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
          <Box
            className={
              "bg-white border border-[#f2f2f2] rounded-3xl mt-3 relative overflow-hidden"
            }
          >
            <Button
              onClick={() => setChatListOpen("friends")}
              className={
                "w-2/4 py-3 font-open-sans font-semibold text-secoundaryText  hover:bg-[#f0f0f0]s rounded-3xl relative z-10"
              }
            >
              Friends
            </Button>
            <Button
              onClick={() => setChatListOpen("groups")}
              className={
                "w-2/4 py-3 font-open-sans font-semibold text-secoundaryText  hover:bg-[#f0f0f0]s rounded-3xl relative z-10"
              }
            >
              Groups
            </Button>
            <Box
              className={
                chatListOpen == "friends"
                  ? "bg-[#f0f0f0] w-2/4 h-[50px] rounded-3xl absolute top-2/4 -translate-y-2/4 left-0 translate-x-0 z-0 transition-all duration-300"
                  : "bg-[#f0f0f0] w-2/4 h-[50px] rounded-3xl absolute top-2/4 -translate-y-2/4 left-0 translate-x-full z-0 transition-all duration-300"
              }
            ></Box>
          </Box>
        </Box>
        <Box className={"w-full h-[calc(100%-114px)] relative"}>
          <Box
            className={
              chatListOpen == "friends"
                ? "w-full h-full px-2.5 absolute top-0 left-0 translate-x-0 transition-all duration-300"
                : "w-full h-full px-2.5 absolute top-0 left-0 translate-x-full transition-all duration-300"
            }
          >
            <SearchBox
              onChange={(e) => setFriendListSearch(e.target.value)}
              placeholder={"Search friends"}
              className={"mb-3"}
            />
            <Box className={"w-full h-[calc(100%-60px)] overflow-y-auto"}>
              {filteredFriendChatItem.map((item) => (
                <ChatItem
                  friendname={activeUserData?.uid == item.senderuid ? item.recivername : item.sendername}
                  frienduid={activeUserData?.uid == item.senderuid ? item.reciveruid : item.senderuid}
                  friendprofile={activeUserData?.uid == item.senderuid ? item.reciverprofile : item.senderprofile}
                  onClick={() => handleFriendChatOpen(item)}
                />
              ))}
            </Box>
          </Box>
          <Box
            className={
              chatListOpen == "groups"
                ? "w-full h-full px-2.5 absolute top-0 left-0 translate-x-0 transition-all duration-300"
                : "w-full h-full px-2.5 absolute top-0 left-0 -translate-x-full transition-all duration-300"
            }
          >
            <SearchBox
              onChange={(e) => setGroupListSearch(e.target.value)}
              placeholder={"Search groups"}
              className={"mb-3"}
            />
            <Box className={"w-full h-[calc(100%-60px)] overflow-y-auto"}>
              {filteredGroupsChatItem.map((item) => (
                <GroupItem
                  groupId={item.groupuid}
                  groupName={item.groupname}
                  groupPhoto={item.groupphoto}
                  onClick={() => handleGroupChatOpen(item)}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Outlet />
    </section>
  );
};

export default Chat;