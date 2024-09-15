import React, { useEffect, useRef, useState } from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";
import Button from "./Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const FriendListItem = ({
  key,
  className,
  uid,
  name,
  profile,
  unfriendButton,
  blockButton,
}) => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state.user.information);
  const [userFriendList, setUserFriendList] = useState([]);
  const [myFriendList, setMyFriendList] = useState([]);
  const [dropdownShow, setDropdownShow] = useState(false);
  const menuRef = useRef();
  const buttonRef = useRef();

  const mergeEqualItems = (userFriendList, myFriendList) => {
    const mergedSet = new Set(userFriendList);
    return myFriendList.filter((item) => mergedSet.has(item));
  };

  const mutualFriend = mergeEqualItems(userFriendList, myFriendList);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (menuRef.current?.contains(e.target)) {
        setDropdownShow(false);
      } else if (buttonRef.current?.contains(e.target)) {
        setDropdownShow(true);
      } else if (!menuRef.current?.contains(e.target)) {
        setDropdownShow(false);
      }
    });
  }, []);

  useEffect(() => {
    let friendRequstRef = ref(db, "friends");
    onValue(friendRequstRef, (snapshot) => {
      let friendListArray = [];
      snapshot.forEach((item) => {
        if (uid == item.val().senderuid || uid == item.val().reciveruid) {
          const friendId = uid == item.val().senderuid ? item.val().reciveruid : item.val().senderuid;
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
      key={key}
      className={`${className} border border-[#dedede] rounded-md flex justify-between items-center p-2.5 transition-all ease-in-out duration-200`}
    >
      <Box className={"flex items-center"}>
        <Image
          src={profile}
          alt={name}
          className={"w-[100px] aspect-square object-cover rounded-lg"}
        />
        <Box className={""}>
          <Typography
            variant="h3"
            className="font-inter font-semibold text-[20px] ml-3"
          >
            {name}
          </Typography>
          {mutualFriend.length >= 1 && (
            <Typography
              variant="h3"
              className="font-inter text-[15px] ml-3 text-secoundaryText"
            >
              {mutualFriend.length} Mutual Friends
            </Typography>
          )}
        </Box>
      </Box>
      <Box className={"relative"}>
        <div ref={buttonRef}>
          <BsThreeDotsVertical
            onClick={() => setDropdownShow(!dropdownShow)}
            className="box-content text-[20px] bg-[#dddcea] p-2 rounded-full cursor-pointer"
          />
        </div>
        {dropdownShow && (
          <div
            ref={menuRef}
            className={
              "w-[150px] bg-white rounded-md p-1 absolute right-[140%] top-[0px] z-50 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] border border-primaryBorder after:content-[''] after:bg-white after:w-5 after:h-5 after:absolute after:right-0 after:translate-x-2/4 after:top-0 after:translate-y-2/4 after:rotate-45 after:z-[-1] after:border-t after:border-r after:border-primaryBorder"
            }
          >
            <Button
              onClick={blockButton}
              className={
                "w-full py-2.5 font-semibold rounded-lg hover:bg-[#f2f2f2] text-[#6a6b6d]"
              }
            >
              Block
            </Button>
            <Button
              onClick={unfriendButton}
              className={
                "w-full py-2.5 font-semibold rounded-lg hover:bg-[#f2f2f2] text-[#6a6b6d]"
              }
            >
              Unfriend
            </Button>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default FriendListItem;
