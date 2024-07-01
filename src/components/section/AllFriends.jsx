import React, { useEffect, useState } from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import Flex from "../layout/Flex";
import FriendListItem from "../layout/FriendListItem";
import {
  getDatabase,
  onValue,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import SearchBox from "./../layout/SearchBox";

const AllFriends = () => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state.user.information);
  const [friendList, setFriendList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    let friendRequstRef = ref(db, "friends");
    onValue(friendRequstRef, (snapshot) => {
      let friendListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().senderuid || activeUserData.uid == item.val().reciveruid) {
          friendListArray.push({ ...item.val(), friendId: item.key });
        }
      });
      setFriendList(friendListArray);
    });
  }, []);

  const handleBlock = (item) => {
    set(ref(db, "block/" + (activeUserData.uid + (activeUserData.uid == item.reciveruid ? item.senderuid : item.reciveruid))),{
        blockbyuid: activeUserData.uid,
        blockbyname: activeUserData.displayName,
        blockbyprofile: activeUserData.photoURL,
        blockeduserid: activeUserData.uid == item.reciveruid ? item.senderuid : item.reciveruid,
        blockedusername: activeUserData.uid == item.reciveruid ? item.sendername : item.recivername,
        blockeduserprofile: activeUserData.uid == item.reciveruid ? item.senderprofile : item.reciverprofile,
      }
    );
  };

  const handleUnfriend = (item) => {
    remove(ref(db, "friends/" + item.friendId));
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

  const filteredList = friendList.filter((item) => {
    const uid = activeUserData.uid == item.reciveruid ? item.senderuid : item.reciveruid;
    const name = activeUserData.uid == item.reciveruid ? item.sendername : item.recivername;
    return (
      !blockList.includes(uid + activeUserData.uid) &&
      !blockList.includes(activeUserData.uid + uid) &&
      (searchValue == "" ? item : name.toLowerCase().includes(searchValue.toLowerCase()))
    );
  });

  return (
    <Box className={"h-full"}>
      <Box className={"h-[14%]"}>
        <Typography
          variant="h4"
          className="font-inter text-[28px] font-semibold ml-2"
        >
          Friend List
        </Typography>
        <SearchBox
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={"Search friend"}
          className={"mt-2"}
        />
      </Box>
      <Box className={"h-[86%] overflow-y-auto"}>
        {filteredList.length == 0 && searchValue ? (
          <Box className={"flex h-full justify-center items-center"}>
            <Typography className="font-mono text-3xl text-secoundaryText">
              No results found.
            </Typography>
          </Box>
        ) : filteredList.length == 0 ? (
          <Box className={"flex h-full justify-center items-center"}>
            <Box className={"text-center"}>
              <Typography className="font-mono text-3xl mb-2">
                No Friends
              </Typography>
              <Typography className="font-mono text-2xl text-secoundaryText">
                friends will appear here.
              </Typography>
            </Box>
          </Box>
        ) : (
          <Flex className={"flex-wrap w-full gap-x-[12px]"}>
            {filteredList.map((item) => (
              <FriendListItem
                className={"w-[49.5%] mb-[15px]"}
                uid={activeUserData.uid == item.senderuid ? item.reciveruid : item.senderuid}
                name={activeUserData.uid == item.senderuid ? item.recivername : item.sendername}
                profile={activeUserData.uid == item.senderuid ? item.reciverprofile : item.senderprofile}
                blockButton={() => handleBlock(item)}
                unfriendButton={() => handleUnfriend(item)}
              />
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default AllFriends;
