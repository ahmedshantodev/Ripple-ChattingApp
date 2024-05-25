import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Typography from "./Typography";
import Input from "./Input";
import Flex from "./Flex";
import { IoMdSearch } from "react-icons/io";
import GroupItem from "./GroupItem";
import Box from "./Box";
import GroupInviteListItem from "./GroupInviteListItem";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const GroupMemberInviteModal = ({modalClose , modalRef}) => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state?.user?.information);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    let friendListRef = ref(db, "friends");
    onValue(friendListRef, (snapshot) => {
      let friendListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().reciveruid || activeUserData.uid == item.val().senderuid ) {
          friendListArray.push(item.val());
        }
      });
      setFriendList(friendListArray);
    });
  }, []);

  return (
    <section className={"w-full h-dvh bg-white/70 absolute top-0 left-0 flex justify-center items-center "}>
      <div 
        ref={modalRef}
        className={"w-[600px] h-[600px] bg-white py-8 px-[40px] rounded-lg border border-primaryBorder shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] relative"}
      >
        <RxCross2
          onClick={() => modalClose(false)}
          className="absolute top-3 right-3 bg-primaryBgColor box-content p-2 text-lg rounded-full cursor-pointer"
        />
        <Box className={"h-[21%]"}>
          <Typography className="text-lg text-start font-bold mb-3">
            Add people
          </Typography>
          <Flex
            alignItems={"center"}
            className={"border border-[#dedede] rounded-3xl overflow-hidden mt-4 bg-[#f4f4f4]"}
          >
            <IoMdSearch className="box-content text-2xl pl-[15px] text-[#514f4f]" />
            <Input
              placeholder={"search messenger"}
              className={"bg-[#f4f4f4] py-3 pr-5 pl-[8px] w-full outline-none"}
            />
          </Flex>
        </Box>
        <Box className={"overflow-y-auto h-[79%] text-start"}>
          {friendList.map((item) => (
            <GroupInviteListItem
              profile={activeUserData.uid == item.reciveruid ? item.senderprofile : item.reciverprofile}
              profileAlt={activeUserData.uid == item.reciveruid ? item.sendername : item.recivername}
              name={activeUserData.uid == item.reciveruid ? item.sendername : item.recivername}
              button={"add"}
            />
          ))}
        </Box>
      </div>
    </section>
  );
};

export default GroupMemberInviteModal;
