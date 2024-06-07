import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Typography from "./Typography";
import Input from "./Input";
import Flex from "./Flex";
import { IoMdSearch } from "react-icons/io";
import Box from "./Box";
import GroupInviteListItem from "./GroupInviteListItem";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import SearchBox from './SearchBox';

const GroupMemberInviteModal = ({modalClose , modalRef}) => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state.user.information);
  const activeGroupData = useSelector((state) => state.activeGroup.information)
  const [friendList, setFriendList] = useState([]);
  const [groupInvitePendingList, setGroupInvitePendingList] = useState([])
  const [searchValue, setSearchValue] = useState("")

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

  const handleInvite = (item) => {
    set(push(ref(db , "groupinvitation/")) , {
      groupuid: activeGroupData.groupuid,
      groupname: activeGroupData.groupname,
      groupslogan: activeGroupData.groupslogan,
      groupphoto:activeGroupData.groupphoto,
      invitationsenderuid: activeUserData.uid,
      invitationsendername: activeUserData.displayName,
      invitationsenderprofile: activeUserData.photoURL,
      invitationreciveruid: activeUserData.uid == item.senderuid ? item.reciveruid : item.senderuid,
      invitationrecivername: activeUserData.uid == item.senderuid ? item.recivername : item.sendername,
      invitationreciverprofile: activeUserData.uid == item.senderuid ? item.reciverprofile : item.senderprofile,
    })
  }

  useEffect(() => {
    const pendingListRef = ref(db , "groupinvitation")
    onValue(pendingListRef , (snapshot) => {
      let pendingListArray = []
      snapshot.forEach((item) => {
        pendingListArray.push(item.val().groupuid + item.val().invitationreciveruid)
      })
      setGroupInvitePendingList(pendingListArray)
    })
  } , [])

  return (
    <section className={"w-full h-dvh bg-white/70 absolute top-0 left-0 flex justify-center items-center z-50"}>
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
          <SearchBox
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={"Search friends"}
          />
        </Box>
        <Box className={"overflow-y-auto h-[79%] text-start"}>
          {friendList.filter((item) => {
            const name = activeUserData.uid == item.reciveruid ? item.sendername : item.recivername
            return searchValue == "" ? item : name.toLowerCase().includes(searchValue.toLowerCase())
          }).map((item) => (
            <GroupInviteListItem
              profile={activeUserData.uid == item.reciveruid ? item.senderprofile : item.reciverprofile}
              name={activeUserData.uid == item.reciveruid ? item.sendername : item.recivername}
              button={groupInvitePendingList.includes(activeGroupData.groupuid + (activeUserData.uid == item.reciveruid ? item.senderuid : item.reciveruid)) || groupInvitePendingList.includes((activeUserData.uid == item.reciveruid ? item.senderuid : item.reciveruid) + activeGroupData.groupuid) ? "pending" : "add"}
              addButton={() => handleInvite(item)}
            />
          ))}
        </Box>
      </div>
    </section>
  );
};

export default GroupMemberInviteModal;
