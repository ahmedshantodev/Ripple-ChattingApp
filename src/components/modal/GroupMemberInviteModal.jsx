import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Typography from "../layout/Typography";
import Box from "../layout/Box";
import GroupInviteListItem from "../layout/GroupInviteListItem";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
import SearchBox from '../layout/SearchBox';

const GroupMemberInviteModal = ({ modalShow, modalClose }) => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state.user.information);
  const activeGroupData = useSelector((state) => state.activeGroup.information)
  const [friendList, setFriendList] = useState([]);
  const [groupInvitePendingList, setGroupInvitePendingList] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [groupMemberLlist, setGroupMemberLlist] = useState([]);
  const modalRef = useRef();
  const boxRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (modalRef.current?.contains(e.target) && !boxRef.current?.contains(e.target)) {
        modalClose(false)
      }
    });
  }, []);

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

  useEffect(() => {
    let groupMemberRef = ref(db, "groupmembers");
    onValue(groupMemberRef, (snapshot) => {
      let groupMemberArray = [];
      snapshot.forEach((item) => {
        if (activeGroupData.groupuid == item.val().groupuid) {
          groupMemberArray.push(item.val().memberuid);
        }
      });
      setGroupMemberLlist(groupMemberArray);
    });
  }, [activeGroupData]);

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

  const filteredList = friendList.filter((item) => {
    const uid = activeUserData.uid == item.reciveruid ? item.senderuid : item.reciveruid
    const name = activeUserData.uid == item.reciveruid ? item.sendername : item.recivername
    return (
      (!groupMemberLlist.includes(uid)) &&
      (searchValue == "" ? item : name.toLowerCase().includes(searchValue.toLowerCase()))
    )
  })

  const handleInvite = (item) => {
    if (activeUserData.uid == item.senderuid) {
      set(ref(db , "groupinvitation/" + (activeGroupData.groupuid + item.reciveruid)) , {
        groupuid: activeGroupData.groupuid,
        groupname: activeGroupData.groupname,
        groupphoto:activeGroupData.groupphoto,
        groupadminuid: activeGroupData.groupadminuid,
        groupadminname: activeGroupData.groupadminname,
        groupadminprofile: activeGroupData.groupadminprofile,
        invitationsenderuid: activeUserData.uid,
        invitationsendername: activeUserData.displayName,
        invitationsenderprofile: activeUserData.photoURL,
        invitationreciveruid: item.reciveruid,
        invitationrecivername: item.recivername,
        invitationreciverprofile: item.reciverprofile,
      })
    } else {
      set(ref(db , "groupinvitation/" + (activeGroupData.groupuid +  item.senderuid)) , {
        groupuid: activeGroupData.groupuid,
        groupname: activeGroupData.groupname,
        groupphoto:activeGroupData.groupphoto,
        groupadminuid: activeGroupData.groupadminuid,
        groupadminname: activeGroupData.groupadminname,
        groupadminprofile: activeGroupData.groupadminprofile,
        invitationsenderuid: activeUserData.uid,
        invitationsendername: activeUserData.displayName,
        invitationsenderprofile: activeUserData.photoURL,
        invitationreciveruid: item.senderuid,
        invitationrecivername: item.sendername,
        invitationreciverprofile: item.senderprofile,
      })
    }
  }

  const handleInviteCancel = (item) => {
    const userid = (activeUserData.uid == item.senderuid ? item.reciveruid : item.senderuid)
    remove(ref(db , "groupinvitation/" + (activeGroupData.groupuid +  userid)))
  }

  return (
    <section
      ref={modalRef}
      className={`w-full h-dvh bg-white/70 fixed top-0 left-0 ${modalShow ? "flex" : "hidden"} justify-center items-center z-50`}
    >
      <div 
        ref={boxRef}
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
          {filteredList.map((item , index) => (
            <GroupInviteListItem
              key={index}
              profile={activeUserData.uid == item.reciveruid ? item.senderprofile : item.reciverprofile}
              name={activeUserData.uid == item.reciveruid ? item.sendername : item.recivername}
              buttonType={
                groupInvitePendingList.includes(activeGroupData.groupuid + (activeUserData.uid == item.reciveruid ? item.senderuid : item.reciveruid)) ||
                groupInvitePendingList.includes((activeUserData.uid == item.reciveruid ? item.senderuid : item.reciveruid) + activeGroupData.groupuid)
                  ? "cancel"
                  : "add"
              }
              addButton={() => handleInvite(item)}
              cancelButton={() => handleInviteCancel(item)}
            />
          ))}
        </Box>
      </div>
    </section>
  );
};

export default GroupMemberInviteModal;
