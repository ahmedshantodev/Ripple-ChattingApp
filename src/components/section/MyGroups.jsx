import React, { useEffect, useState } from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import SearchBox from "../layout/SearchBox";
import Flex from "../layout/Flex";
import MyGroupItem from "../layout/MyGroupItem";
import { getDatabase, onValue, ref } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { activeGroup } from './../../slices/activeGroupSlice';
import { useNavigate } from "react-router-dom";

const MyGroups = () => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const activeUserData = useSelector((state) => state.user.information);
  const [searchValue, setSearchValue] = useState("");
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    let groupRef = ref(db, "groupmembers");
    onValue(groupRef, (snapshot) => {
      let groupListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().memberuid) {
          groupListArray.push(item.val());
        }
      });
      setGroupList(groupListArray);
    });
  }, []);

  const filteredList = groupList.filter((item) => {
    return searchValue == "" ? item : item.groupname.toLowerCase().includes(searchValue.toLowerCase())
  })

  const handleViewGroup = (item) => {  
    dispatch(activeGroup({
      groupmemberid: item.groupmemberid,
      groupuid: item.groupuid,
      groupname: item.groupname,
      groupphoto: item.groupphoto,
      groupadminuid: item.groupadminuid,
      groupadminname: item.groupadminname,
      groupadminprofile: item.groupadminprofile,
    }));
    localStorage.setItem("activeGroup",JSON.stringify({
      groupmemberid: item.groupmemberid,
      groupuid: item.groupuid,
      groupname: item.groupname,
      groupphoto: item.groupphoto,
      groupadminuid: item.groupadminuid,
      groupadminname: item.groupadminname,
      groupadminprofile: item.groupadminprofile,
    }));
     navigate("/pages/chat/chat-with-group");
  }

  return (
    <Box className={"h-full"}>
      <Box className={"h-[14%]"}>
        <Typography
          variant="h4"
          className="font-inter text-[25px] font-semibold ml-2"
        >
          Groups you've joined
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
                No groups
              </Typography>
              <Typography className="font-mono text-2xl text-secoundaryText">
                Groups will appear here.
              </Typography>
            </Box>
          </Box>
        ) : (
          <Flex className={"flex-wrap w-full gap-x-[12px]"}>
            {filteredList.map((item , index) => (
              <MyGroupItem
                key={index}
                className={"w-[49.5%] mb-3"}
                groupuid={item.groupuid}
                groupName={item.groupname}
                groupPhoto={item.groupphoto}
                viewButton={() => handleViewGroup(item)}
              />
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default MyGroups;
