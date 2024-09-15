import React, { useEffect, useState } from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";
import Button from "./Button";
import { FaUserCheck, FaUserPlus } from "react-icons/fa6";
import { FaUserTimes } from "react-icons/fa";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
const UserListItem = ({
  key,
  className,
  userId,
  userName,
  userProfile,
  sendRequstBtn,
  button,
  cencelRequstBtn,
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
          const friendId = userId == item.val().senderuid ? item.val().reciveruid : item.val().senderuid;
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
        if (activeUserData.uid == item.val().senderuid || activeUserData.uid == item.val().reciveruid) {
          const friendId = activeUserData.uid == item.val().senderuid ? item.val().reciveruid : item.val().senderuid;
          friendListArray.push(friendId);
        }
      });
      setMyFriendList(friendListArray);
    });
  }, []);

  return (
    <Box
      key={index}
      className={`${className} border border-primaryBorder rounded-md overflow-hidden`}
    >
      <Image src={userProfile} alt={userName} className={"w-full"} />
      <Box className={"pb-2 px-2"}>
        <Box className={"h-[54px] flex items-end mt-[2px]"}>
          <Typography
            variant="h3"
            className="font-inter font-semibold text-[18px] ml-1 w-full text-ellipsis overflow-hidden line-clamp-2 capitalize"
          >
            {userName}
          </Typography>
        </Box>
        {mutualFriend.length >= 1 ? (
          <Typography
            variant="h3"
            className=" font-open-sans text-[14px] ml-1 text-secoundaryText"
          >
            {mutualFriend.length} Mutual Friends
          </Typography>
        ) : (
          <Typography
            variant="h3"
            className=" font-open-sans text-[14px] ml-1 text-secoundaryText"
          >
            no Mutual Friends
          </Typography>
        )}
        {button == "pending" ? (
          <Button
            onClick={cencelRequstBtn}
            className={
              "bg-[#d8dadf] text-[#26282c] w-full py-2.5 font-semibold rounded-lg mt-1 active:scale-[0.97] flex justify-center items-center gap-x-2.5"
            }
          >
            <FaUserTimes className="text-lg" /> Cancel Requst
          </Button>
        ) : button == "friends" ? (
          <Button
            className={
              "bg-[#d8dadf] text-[#26282c] w-full py-2.5 font-bold rounded-lg mt-1 active:scale-[0.97] flex items-center justify-center gap-x-2.5"
            }
          >
            <FaUserCheck className="text-lg" /> Friends
          </Button>
        ) : (
          <Button
            onClick={sendRequstBtn}
            className={
              "bg-[#2176ff] w-full py-2.5 text-white font-semibold rounded-lg mt-1 active:scale-[0.97] flex justify-center items-center gap-x-2.5"
            }
          >
            <FaUserPlus className="text-lg" /> Send Requsts
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserListItem;
