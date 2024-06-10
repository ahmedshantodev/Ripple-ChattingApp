import React, { useEffect, useRef, useState } from "react";
import MessageForwardListItem from "./MessageForwardListItem";
import Box from "./Box";
import Typography from "./Typography";
import SearchBox from "./SearchBox";
import { useSelector } from "react-redux";
import { getDatabase, onValue, ref } from "firebase/database";
import { RxCross2 } from "react-icons/rx";

const MessageForwardModal = ({ modalShow, modalClose}) => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state.user.information);
  const [friendList, setFriendList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const modalRef = useRef();
  const boxRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (
        modalRef.current.contains(e.target) &&
        !boxRef.current.contains(e.target)
      ) {
        modalClose(false);
      }
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
          friendListArray.push({ ...item.val(), friendId: item.key });
        }
      });
      setFriendList(friendListArray);
    });
  }, []);

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
    const uid = (activeUserData.uid == item.reciveruid ? item.senderuid : item.reciveruid)
    const name = (activeUserData.uid == item.reciveruid ? item.sendername : item.recivername)
    return (
      !blockList.includes(uid + activeUserData.uid)) &&
      (!blockList.includes(activeUserData.uid + uid)) &&
      (searchValue == "" ? item : name.toLowerCase().includes(searchValue.toLowerCase())
    )
  })

  const handleMessegeForward = (item) => { console.log(item) }

  return (
    <section
      ref={modalRef}
      className={`${
        modalShow ? "block" : "hidden"
      } w-full h-dvh bg-white/70 fixed top-0 left-0 flex justify-center items-center z-50`}
    >
      <div
        ref={boxRef}
        className={`w-[600px] h-[550px] bg-white py-8 px-[40px] rounded-lg border border-primaryBorder shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] relative`}
      >
        <RxCross2
          onClick={() => modalClose(false)}
          className="absolute top-3 right-3 bg-primaryBgColor box-content p-2 text-lg rounded-full cursor-pointer"
        />
        <Box className={"h-[21%]"}>
          <Typography className="text-lg font-bold mb-3">
            Forward messege
          </Typography>
          <SearchBox
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={"Search friends"}
          />
        </Box>
        <Box className={"h-[79%] overflow-y-auto"}>
          {filteredList.map((item) => (
            <MessageForwardListItem
              profile={activeUserData.uid == item.senderuid ? item.reciverprofile : item.senderprofile}
              name={activeUserData.uid == item.senderuid ? item.recivername : item.sendername}
              button={"send"}
              sendButton={() =>handleMessegeForward(item)}
            />
          ))}
        </Box>
      </div>
    </section>
  );
};

export default MessageForwardModal;
