import React, { useEffect, useState } from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import FriendRequstItem from "../layout/FriendRequstItem";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import SearchBox from "../layout/SearchBox";
import Flex from "../layout/Flex";

const FriendRequsts = () => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state.user.information);
  const [friendRequstList, setFriendRequstList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    let friendRequstRef = ref(db, "friendrequsts");
    onValue(friendRequstRef, (snapshot) => {
      let friendRequstListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().reciveruid) {
          friendRequstListArray.push({
            ...item.val(),
            friendRequstId: item.key,
          });
        }
      });
      setFriendRequstList(friendRequstListArray);
    });
  }, []);

  const handleFriendRequstConfirm = (item) => {
    set(push(ref(db, "friends/")), {
      reciveruid: item.reciveruid,
      recivername: item.recivername,
      reciverprofile: item.reciverprofile,
      sendername: item.sendername,
      senderprofile: item.senderprofile,
      senderuid: item.senderuid,
    }).then(() => {
      remove(ref(db, "friendrequsts/" + item.friendRequstId));
    });
  };

  const handleFriendRequstDelete = (item) => {
    remove(ref(db, "friendrequsts/" + item.friendRequstId));
  };

  const filteredList = friendRequstList.filter((item) => {
    const name = activeUserData.uid == item.reciveruid ? item.sendername : item.recivername;
    return searchValue == "" ? item : name.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <Box className={"h-full"}>
      <Box className={"h-[14%]"}>
        <Typography
          variant="h4"
          className="font-inter text-[28px] font-semibold ml-2"
        >
          Friend Requests
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
                No Friend requst
              </Typography>
              <Typography className="font-mono text-2xl text-secoundaryText">
                Friend requst will appear here.
              </Typography>
            </Box>
          </Box>
        ) : (
          <Flex className={"flex-wrap w-full gap-x-[22px]"}>
            {filteredList.map((item) => (
              <FriendRequstItem
                className={"w-[18.50%] mb-[15px]"}
                userId={
                  activeUserData.uid == item.senderuid
                    ? item.reciveruid
                    : item.senderuid
                }
                userName={
                  activeUserData.uid == item.senderuid
                    ? item.recivername
                    : item.sendername
                }
                userProfile={
                  activeUserData.uid == item.senderuid
                    ? item.reciverprofile
                    : item.senderprofile
                }
                friendRequstConfirm={() => handleFriendRequstConfirm(item)}
                friendRequstDelete={() => handleFriendRequstDelete(item)}
              />
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default FriendRequsts;
