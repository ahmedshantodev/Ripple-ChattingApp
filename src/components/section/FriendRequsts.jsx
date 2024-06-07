import React, { useEffect, useState } from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import FriendRequstItem from "../layout/FriendRequstItem";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequsts = () => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state?.user?.information);
  const [friendRequstList, setFriendRequstList] = useState([]);

  useEffect(() => {
    let friendRequstRef = ref(db, "friendrequsts");
    onValue(friendRequstRef, (snapshot) => {
      let friendRequstListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().reciveruid) { 
          friendRequstListArray.push({ ...item.val(), friendRequstId: item.key });
        }
      });
      setFriendRequstList(friendRequstListArray);
    });
  }, []);

  const handleFriendRequstConfirm = (item) => {
    set(push(ref(db , "friends/")) , {
      reciveruid: item.reciveruid,
      recivername: item.recivername,
      reciverprofile: item.reciverprofile,
      sendername:item.sendername,
      senderprofile:item.senderprofile,
      senderuid:item.senderuid,
    }).then(() => {
      remove(ref(db , "friendrequsts/" + item.friendRequstId))
    })
  }
  
  const handleFriendRequstDelete = (item) => { 
    remove(ref(db , "friendrequsts/" + item.friendRequstId))
  }

  return (
    <Box className={"h-full"}>
      <Typography
        variant="h4"
        className="h-[7%] font-inter text-[28px] font-semibold"
      >
        Friend Requests
      </Typography>
      <Box
        className={
          "h-[93%] flex gap-x-[22px] items-start flex-wrap overflow-y-auto"
        }
      >
        {friendRequstList.map((item) => (
          <FriendRequstItem
            className={"w-[18.50%] mb-[15px]"}
            profile={activeUserData.uid == item.senderuid ? item.reciverprofile : item.senderprofile}
            userName={activeUserData.uid == item.senderuid ? item.recivername : item.sendername}
            friendRequstConfirm={() => handleFriendRequstConfirm(item)}
            friendRequstDelete={() => handleFriendRequstDelete(item)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FriendRequsts;
