import React, { useEffect, useState } from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import UserListItem from "../layout/UserListItem";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const AddFriends = () => {
  const db = getDatabase();
  const [userlist, setUserlist] = useState([]);
  const activeUserData = useSelector((state) => state?.user?.information);
  const [pendingButtonList, setPendingButtonList] = useState([]);
  const [friendsButtonLIst, setFriendsButtonLIst] = useState([]);

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
    set(push(ref(db, "friendrequsts/")), {
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
    let friendsButtonRef = ref(db, "friends/");
    onValue(friendsButtonRef, (snapshot) => {
      let friendsButtonArray = [];
      snapshot.forEach((item) => {
        friendsButtonArray.push(item.val().senderuid + item.val().reciveruid);
      });
      setFriendsButtonLIst(friendsButtonArray);
    });
  }, []);

  const handleCencelRequstBtn = (item) => {
    console.log(item);
  };

  return (
    <Box className={"h-full"}>
      <Typography
        variant="h4"
        className="h-[7%] font-inter text-[28px] font-semibold"
      >
        User Lists
      </Typography>
      <Box
        className={
          "h-[93%] flex gap-x-[15px] items-start flex-wrap overflow-y-auto"
        }
      >
        {userlist.map((item) => (
          <UserListItem
            className={"w-[24%] mb-[15px]"}
            profile={item.userprofile}
            profileAlt={item.username}
            userName={item.username}
            sendRequstBtn={() => handleSendFriendRequst(item)}
            cencelRequstBtn={() => handleCencelRequstBtn(item)}
            button={
              pendingButtonList.includes(activeUserData.uid + item.userid) ||
              pendingButtonList.includes(item.userid + activeUserData.uid)
                ? "pending"
                : friendsButtonLIst.includes(
                    activeUserData.uid + item.userid
                  ) ||
                  friendsButtonLIst.includes(item.userid + activeUserData.uid)
                ? "friends"
                : "sendrequst"
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default AddFriends;
