import React, { useEffect, useState } from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import Flex from "../layout/Flex";
import FriendListItem from "../layout/FriendListItem";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";

const AllFriends = () => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state?.user?.information);

  const [friendList, setFriendList] = useState([]);
  const [blockList, setBlockList] = useState([]);

  useEffect(() => {
    let friendRequstRef = ref(db, "friends");
    onValue(friendRequstRef, (snapshot) => {
      let friendListArray = [];
      snapshot.forEach((item) => {
        // if ((activeUserData.uid == item.val().senderuid || activeUserData.uid == item.val().reciveruid) && !(blockList.includes(activeUserData.uid == item.val().reciveruid ? item.val().senderuid : item.val().reciveruid))) {
        if (activeUserData.uid == item.val().senderuid || activeUserData.uid == item.val().reciveruid) {
          friendListArray.push({ ...item.val(), friendId: item.key });
        }
      });
      setFriendList(friendListArray);
    });
  }, []);

  const handleBlock = (item) => {
    set(push(ref(db, "block/")), {
      blockbyuid: activeUserData.uid,
      blockbyname: activeUserData.displayName,
      blockbyprofile: activeUserData.photoURL,
      blockeduserid: activeUserData.uid == item.reciveruid ? item.senderuid : item.reciveruid,
      blockedusername: activeUserData.uid == item.reciveruid ? item.sendername : item.recivername,
      blockeduserprofile: activeUserData.uid == item.reciveruid ? item.senderprofile : item.reciverprofile,
    }).then(() => {
      // remove(ref( db , "friends/" + item.friendId))
    })
  };
  
  const handleUnfriend = (item) => {
    remove(ref( db , "friends/" + item.friendId))
  };

  useEffect(() => {
    const blockListRef = ref(db, "block/");
    onValue(blockListRef, (snapshot) => {
      let blockListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().blockbyuid) {
          blockListArray.push(item.val().blockeduserid);
        }
      });
      setBlockList(blockListArray);
    });
  }, []);

  // console.log(blockList)
  // if (blockList.includes("TZ7RNBpnJERDIOhVjI582XYTY7X2")) {
  //   console.log("kaj kortac")
  // }


  return (
    <Box className={"h-full"}>
      <Typography
        variant="h4"
        className="h-[7%] font-inter text-[28px] font-semibold"
      >
        Friend List
      </Typography>
      <Box className={"h-[93%] overflow-y-auto"}>
        <Flex className={"flex-wrap w-full gap-x-[12px]"}>
          {friendList.map((item) => (
            <FriendListItem
              className={"w-[49.5%] mb-[15px]"}
              profile={activeUserData.uid == item.senderuid ? item.reciverprofile : item.senderprofile}
              userName={activeUserData.uid == item.senderuid ? item.recivername : item.sendername}
              blockButton={() => handleBlock(item)}
              unfriendButton={() => handleUnfriend(item)}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default AllFriends;
