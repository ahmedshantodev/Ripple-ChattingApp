import React, { useEffect, useState } from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import SearchBox from "../layout/SearchBox";
import Flex from "../layout/Flex";
import GroupInvitationItem from "./../layout/GroupInvitationItem";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";

const GroupInvitation = () => {
  const db = getDatabase();
  const [searchValue, setSearchValue] = useState("");
  const [groupInvitationList, setGroupInvitationList] = useState([]);
  const activeUserData = useSelector((state) => state.user.information);

  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();

  useEffect(() => {
    let invitationRef = ref(db, "groupinvitation");
    onValue(invitationRef, (snapshot) => {
      let invitationArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().invitationreciveruid) {
          invitationArray.push({ ...item.val(), invitationId: item.key });
        }
      });
      setGroupInvitationList(invitationArray);
    });
  }, []);

  const filteredList = groupInvitationList.filter((item) => {
    return searchValue == "" ? item : item.groupname.toLowerCase().includes(searchValue.toLowerCase())
  })

  const handleInvitationAccept = (item) => {
    set(push(ref(db, "groupmembers/")), {
      groupuid: item.groupuid,
      groupname: item.groupname,
      groupphoto: item.groupphoto,
      groupadminuid: item.groupadminuid,
      groupadminname: item.groupadminname,
      groupadminprofile: item.groupadminprofile,
      memberuid: item.invitationreciveruid,
      membername: item.invitationrecivername,
      memberprofile: item.invitationreciverprofile,
      addedbyuid: item.invitationsenderuid,
      addedbyname: item.invitationsendername,
      addedbyprofile: item.invitationsenderprofile,
      lastmessagesent: Date.now(),
    }).then(() => {
      set(push(ref(db , "groupmessege/")) , {
        type: "groupmanagment/member-added",
        groupuid: item.groupuid,
        whoadded: item.invitationsendername,
        whojoined: item.invitationrecivername,
        senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
      })
      remove(ref(db, "groupinvitation/" + item.invitationId));
    });
  };

  const handleInvitationReject = (item) => {
    remove(ref(db, "groupinvitation/" + item.invitationId));
  };

  return (
    <Box className={"h-full"}>
      <Box className={"h-[14%]"}>
        <Typography
          variant="h4"
          className="font-inter text-[25px] font-semibold ml-2"
        >
          Groups invitation
        </Typography>
        <SearchBox
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={"Search groups"}
          className={"mt-2"}
        />
      </Box>
      <Box className={"h-[86%] overflow-y-auto"}>
        {filteredList.length == 0 && searchValue ? (
          <Box className={"flex h-full justify-center items-center"}>
            <Typography className="font-mono text-3xl text-secoundaryText">
              No results found.
            </Typography>
          </Box>
        ) : filteredList.length == 0 ? (
          <Box className={"flex h-full justify-center items-center"}>
            <Box className={"text-center"}>
              <Typography className="font-mono text-3xl mb-2">
                No invitation
              </Typography>
              <Typography className="font-mono text-2xl text-secoundaryText">
                Invitation will appear here.
              </Typography>
            </Box>
          </Box>
        ) : (
          <Flex className={"flex-wrap w-full gap-x-[12px]"}>
            {filteredList.map((item , index) => (
              <GroupInvitationItem
                key={index}
                groupPhoto={item.groupphoto}
                groupName={item.groupname}
                inviteByname={item.invitationsendername}
                inviteByProfile={item.invitationsenderprofile}
                acceptButton={() => handleInvitationAccept(item)}
                deleteButton={() => handleInvitationReject(item)}
                className={"w-[49.50%] mb-3"}
              />
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default GroupInvitation;
