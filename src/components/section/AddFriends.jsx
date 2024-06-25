import React, { useEffect, useState } from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import UserListItem from "../layout/UserListItem";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
import Flex from "./../layout/Flex";
import SearchBox from './../layout/SearchBox';

const AddFriends = () => {
  const db = getDatabase();
  const [userlist, setUserlist] = useState([]);
  const activeUserData = useSelector((state) => state?.user?.information);
  const [pendingButtonList, setPendingButtonList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [friendRequstList, setFriendRequstList] = useState([]);
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    let userref = ref(db, "users");
    onValue(userref, (snapshot) => {
      let userArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid != item.val().userid) {
          userArray.push(item.val());
        }
      });
      setUserlist(userArray);
    });
  }, []);

  const handleSendFriendRequst = (item) => {
    set(ref(db, "friendrequsts/" + (activeUserData?.uid + item.userid)), {
      senderuid: activeUserData?.uid,
      sendername: activeUserData?.displayName,
      senderprofile: activeUserData?.photoURL,
      reciveruid: item.userid,
      recivername: item.username,
      reciverprofile: item.userprofile,
    });
  };

  useEffect(() => {
    let pendingButtonRef = ref(db, "friendrequsts/");
    onValue(pendingButtonRef, (snapshot) => {
      let pendingButtonListArray = [];
      snapshot.forEach((item) => {
        pendingButtonListArray.push(
          item.val().senderuid + item.val().reciveruid
        );
      });
      setPendingButtonList(pendingButtonListArray);
    });
  }, []);

  useEffect(() => {
    let friendRequstRef = ref(db, "friends");
    onValue(friendRequstRef, (snapshot) => {
      let friendListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().senderuid || activeUserData.uid == item.val().reciveruid) {
          friendListArray.push(
            activeUserData.uid == item.val().senderuid ? item.val().reciveruid : item.val().senderuid
          );
        }
      });
      setFriendList(friendListArray);
    });
  }, []);

  const handleCencelRequstBtn = (item) => {
    remove(ref(db , "friendrequsts/" + (activeUserData?.uid + item.userid)))
  }

  useEffect(() => {
    let friendRequstRef = ref(db, "friendrequsts");
    onValue(friendRequstRef, (snapshot) => {
      let friendRequstListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().reciveruid) {
          friendRequstListArray.push(item.val().senderuid);
        }
      });
      setFriendRequstList(friendRequstListArray);
    });
  }, []);

  const filteredList = userlist.filter((item) => {
    return (
      !friendList.includes(item.userid) &&
      !friendRequstList.includes(item.userid)  &&
      (searchValue == "" ? item : item.username.toLowerCase().includes(searchValue.toLowerCase()))
    );
  });

  return (
    <Box className={"h-full"}>
      <Box className="h-[14%]">
        <Typography
          variant="h4"
          className="font-inter text-[28px] font-semibold ml-2"
        >
          User Lists
        </Typography>
        <SearchBox
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={"Search user"}
          className={"mt-2"}
        />
      </Box>
      <Box className={"h-[86%] overflow-y-auto"}>
      {filteredList.length == 0 ? (
          <Box className={"flex h-full justify-center items-center"}>
            <Typography className="font-mono text-3xl text-secoundaryText">
              There are no users
            </Typography>
          </Box>
        ) : (
          <Flex className={"gap-x-[22px] flex-wrap"}>
            {filteredList.map((item) => (
              <UserListItem
                className={"w-[18.50%] mb-[15px]"}
                userId={item.userid}
                userName={item.username}
                userProfile={item.userprofile}
                sendRequstBtn={() => handleSendFriendRequst(item)}
                cencelRequstBtn={() => handleCencelRequstBtn(item)}
                button={
                  pendingButtonList.includes(activeUserData.uid + item.userid) ||
                  pendingButtonList.includes(item.userid + activeUserData.uid)
                    ? "pending"
                    : "sendrequst"
                }
              />
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default AddFriends;
