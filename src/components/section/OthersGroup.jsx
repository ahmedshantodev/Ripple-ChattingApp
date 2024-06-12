import React, { useEffect, useState } from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import SearchBox from "../layout/SearchBox";
import Flex from "../layout/Flex";
import OthersGroupListItem from "../layout/OthersGroupListItem";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";

const OthersGroup = () => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state.user.information);
  const [searchValue, setSearchValue] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [groupJoinRequstList, setGroupJoinRequstList] = useState([]);
  const [groupInvitationList, setGroupInvitationList] = useState([]);
  const [groupMemberList, setGroupMemberList] = useState([]);

  useEffect(() => {
    let groupRef = ref(db, "groups");
    onValue(groupRef, (snapshot) => {
      let groupListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid != item.val().groupcreatoruid) {
          groupListArray.push({ ...item.val(), groupuid: item.key });
        }
      });
      setGroupList(groupListArray);
    });
  }, []);

  const handleJoinButton = (item) => {
    set(ref(db, "groupjoinrequst/" + (item.groupuid + activeUserData.uid)), {
      ...item,
      requstsenderuid: activeUserData.uid,
      requstsendername: activeUserData.displayName,
      requstsenderprofile: activeUserData.photoURL,
    });
  };

  useEffect(() => {
    let groupJoinRequstRef = ref(db, "groupjoinrequst");
    onValue(groupJoinRequstRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().groupuid + item.val().requstsenderuid);
      });
      setGroupJoinRequstList(array);
    });
  }, []);

  const handleCancelButton = (item) => {
    remove(ref(db , "groupjoinrequst/" + (item.groupuid + activeUserData.uid)))
  }

  useEffect(() => {
    let invitationRef = ref(db, "groupinvitation");
    onValue(invitationRef, (snapshot) => {
      let invitationArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().invitationreciveruid) {
          invitationArray.push(item.val().groupuid);
        }
      });
      setGroupInvitationList(invitationArray);
    });
  }, []);

  useEffect(() => {
    let groupRef = ref(db, "groupmembers");
    onValue(groupRef, (snapshot) => {
      let groupListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().memberuid) {
          groupListArray.push(item.val().groupuid + item.val().memberuid);
        }
      });
      setGroupMemberList(groupListArray);
    });
  }, []);

  const filteredList = groupList.filter((item) => {
    return (
      (!groupInvitationList.includes(item.groupuid)) &&
      (!groupMemberList.includes(item.groupuid + activeUserData.uid)) &&
      (searchValue == "" ? item : item.groupname.toLowerCase().includes(searchValue.toLowerCase()))
    )
  });

  return (
    <Box className={"h-full"}>
      <Box className={"h-[14%] bg-white"}>
        <Typography
          variant="h4"
          className="font-inter text-[25px] font-semibold ml-2"
        >
          Others group list
        </Typography>
        <SearchBox
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={"Search groups"}
          className={"mt-2"}
        />
      </Box>
      <Box className={"h-[86%] overflow-y-auto"}>
        {false ? (
          <Box className={"flex h-full justify-center items-center"}>
            <Typography className="font-mono text-3xl text-secoundaryText">
              There are no groups
            </Typography>
          </Box>
        ) : (
          <Flex
            alignItems={"baseline"}
            className={"flex-wrap w-full gap-x-[12px]"}
          >
            {filteredList.map((item) => (
              <OthersGroupListItem
                className={"w-[24.2%] mb-3"}
                groupPhoto={item.groupphoto}
                groupName={item.groupname}
                adminName={item.groupcreatorname}
                adminProfile={item.groupcreatoprofile}
                buttonType={
                  groupJoinRequstList.includes(activeUserData.uid + item.groupuid) ||
                  groupJoinRequstList.includes(item.groupuid + activeUserData.uid)
                    ? "cancel"
                    : "send"
                }
                joinButton={() => handleJoinButton(item)}
                cancelButton={() => handleCancelButton(item)}
              />
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default OthersGroup;
