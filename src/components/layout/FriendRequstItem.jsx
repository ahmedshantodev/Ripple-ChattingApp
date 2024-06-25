import React, { useEffect, useState } from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";
import Button from "./Button";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequstItem = ({
  className,
  userId,
  userName,
  userProfile,
  friendRequstConfirm,
  friendRequstDelete,
}) => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state.user.information);
  const [userFriendList, setUserFriendList] = useState([]);
  const [myFriendList, setMyFriendList] = useState([]);

  const mergeEqualItems = (userFriendList, myFriendList) => {
    const mergedSet = new Set(userFriendList);
    return myFriendList.filter((item) => mergedSet.has(item));
  };

  const mutualFriend = mergeEqualItems(userFriendList, myFriendList);

  useEffect(() => {
    let friendRequstRef = ref(db, "friends");
    onValue(friendRequstRef, (snapshot) => {
      let friendListArray = [];
      snapshot.forEach((item) => {
        if (userId == item.val().senderuid || userId == item.val().reciveruid) {
          const friendId =
            userId == item.val().senderuid
              ? item.val().reciveruid
              : item.val().senderuid;
          friendListArray.push(friendId);
        }
      });
      setUserFriendList(friendListArray);
    });
  }, []);

  useEffect(() => {
    let friendRequstRef = ref(db, "friends");
    onValue(friendRequstRef, (snapshot) => {
      let friendListArray = [];
      snapshot.forEach((item) => {
        if (
          activeUserData.uid == item.val().senderuid ||
          activeUserData.uid == item.val().reciveruid
        ) {
          const friendId =
            activeUserData.uid == item.val().senderuid
              ? item.val().reciveruid
              : item.val().senderuid;
          friendListArray.push(friendId);
        }
      });
      setMyFriendList(friendListArray);
    });
  }, []);

  return (
    <Box
      className={`${className} border border-primaryBorder rounded-md overflow-hidden`}
    >
      <Image
        src={userProfile}
        alt={userName}
        className={"w-full aspect-square object-cover"}
      />
      <Box className={"pt-2.5 pb-2 px-2"}>
        <Typography
          variant="h3"
          className="font-inter font-semibold text-[18px] mt-2.5 mb-[2px] ml-1 w-[98%] whitespace-nowrap overflow-hidden text-ellipsis capitalize"
        >
          {userName}
        </Typography>
        <Typography
          variant="h3"
          className=" font-open-sans text-[14px] ml-1 text-secoundaryText"
        >
          {mutualFriend.length} Mutual Friends
        </Typography>
        <Button
          onClick={friendRequstConfirm}
          className={
            "bg-[#0861f2] w-full py-2 text-white font-semibold rounded-lg mt-1 active:scale-[0.97]"
          }
        >
          Confirm
        </Button>
        <Button
          onClick={friendRequstDelete}
          className={
            "bg-[#4e4f50] w-full py-2 text-white font-semibold rounded-lg mt-1 active:scale-[0.97]"
          }
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default FriendRequstItem;
