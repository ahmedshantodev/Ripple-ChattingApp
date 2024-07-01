import React, { useEffect, useRef, useState } from "react";
// Components
import Box from "../components/layout/Box";
import Typography from "../components/layout/Typography";
import Flex from "../components/layout/Flex";
import ChatItem from "../components/layout/ChatItem";
import SearchBox from "../components/layout/SearchBox";
import { BsThreeDotsVertical } from "react-icons/bs";
// Firebase
import { ref, onValue, getDatabase } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { activeChat } from "./../slices/activeChatSlice";
import GroupItem from "../components/layout/GroupItem";
import { activeGroup } from "../slices/activeGroupSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from "../components/layout/Button";
import GroupCreateModal from "../components/layout/GroupCreateModal";

const Chat = () => {
  const db = getDatabase();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeUserData = useSelector((state) => state.user.information);
  const [friendList, setFriendList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [friendListSearch, setFriendListSearch] = useState("");
  const [groupListSearch, setGroupListSearch] = useState("");
  const [chatListOpen, setChatListOpen] = useState("friends");
  const [threeDotsMenuShow, setThreeDotsMenuShow] = useState(false)
  const [groupCreateModal, setGroupCreateModal] = useState(false);
  const threDotsMenuRef = useRef()

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
          groupListArray.push({...item.val(), groupmemberid: item.key});
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
    navigate("/pages/chat/chat-with-friend");
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
    navigate("/pages/chat/chat-with-group");
    dispatch(
      activeGroup({
        groupmemberid:item.groupmemberid,
        groupuid: item.groupuid,
        groupname: item.groupname,
        groupphoto: item.groupphoto,
        groupadminuid: item.groupadminuid,
        groupadminname: item.groupadminname,
        groupadminprofile: item.groupadminprofile,
      })
    );
    localStorage.setItem(
      "activeGroup",
      JSON.stringify({
        groupmemberid:item.groupmemberid,
        groupuid: item.groupuid,
        groupname: item.groupname,
        groupphoto: item.groupphoto,
        groupadminuid: item.groupadminuid,
        groupadminname: item.groupadminname,
        groupadminprofile: item.groupadminprofile,
      })
    );
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!threDotsMenuRef.current?.contains(e.target)) {
        setThreeDotsMenuShow(false)
      }
    });
  }, []);

  return (
    <section className="w-full h-dvh bg-[#dddcea] p-4 flex">
      <Box
        className={
          "w-1/4 h-full bg-white rounded-2xl pt-6 pb-5 overflow-hidden"
        }
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
            <div
              ref={threDotsMenuRef}
              className={"relative"}
            >
              <BsThreeDotsVertical
                onClick={() => setThreeDotsMenuShow(!threeDotsMenuShow)}
                className=" box-content bg-[#dedede] text-xl p-2 rounded-full cursor-pointer"
              />
              {threeDotsMenuShow && 
                <Box
                  className="absolute top-0 right-[110%] w-[130px] z-20 bg-white p-2 rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]" 
                >
                  <Link
                    to={"/pages/friends/add-friends"}
                    className={"block text-center w-full py-2 hover:bg-[#dedede] text-secoundaryText rounded-md"}
                  >
                    Add friend
                  </Link>
                  <Button
                    onClick={() => setGroupCreateModal(!groupCreateModal)}
                    className={"w-full py-2 hover:bg-[#dedede] text-secoundaryText rounded-md"}>
                    Create group
                  </Button>
                  <GroupCreateModal
                    modalShow={groupCreateModal}
                    modalClose={setGroupCreateModal}
                  />
                </Box>
              }
            </div>
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
              {filteredFriendChatItem.length == 0 && friendListSearch ? (
                <Box
                  className={
                    "w-full h-full flex justify-center items-center text-center"
                  }
                >
                  <Typography className="font-mono text-xl text-secoundaryText">
                    No results found.
                  </Typography>
                </Box>
              ) : filteredFriendChatItem.length == 0 ? (
                <Box
                  className={"w-full h-full flex justify-center items-center"}
                >
                  <Box className={"text-center"}>
                    <Typography className="font-mono text-[22px] mb-1">
                      No friends messages
                    </Typography>
                    <Typography className="font-mono text-lg text-secoundaryText">
                      Friends messages will appear here.
                    </Typography>
                  </Box>
                </Box>
              ) : (
                filteredFriendChatItem.map((item) => (
                  <ChatItem
                    friendname={activeUserData?.uid == item.senderuid ? item.recivername : item.sendername}
                    frienduid={activeUserData?.uid == item.senderuid ? item.reciveruid : item.senderuid}
                    friendprofile={activeUserData?.uid == item.senderuid ? item.reciverprofile : item.senderprofile}
                    onClick={() => handleFriendChatOpen(item)}
                  />
                ))
              )}
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
              {filteredGroupsChatItem.length == 0 && groupListSearch ? (
                <Box
                  className={
                    "w-full h-full flex justify-center items-center text-center"
                  }
                >
                  <Typography className="font-mono text-xl text-secoundaryText">
                    No results found.
                  </Typography>
                </Box>
              ) : filteredGroupsChatItem.length == 0 ? (
                <Box
                  className={"w-full h-full flex justify-center items-center"}
                >
                  <Box className={"text-center"}>
                    <Typography className="font-mono text-[22px] mb-1">
                      No groups messages
                    </Typography>
                    <Typography className="font-mono text-lg text-secoundaryText">
                      Groups messages will appear here.
                    </Typography>
                  </Box>
                </Box>
              ) : (
                filteredGroupsChatItem.map((item) => (
                  <GroupItem
                    groupId={item.groupuid}
                    groupName={item.groupname}
                    groupPhoto={item.groupphoto}
                    onClick={() => handleGroupChatOpen(item)}
                  />
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Outlet />
    </section>
  );
};

export default Chat;
