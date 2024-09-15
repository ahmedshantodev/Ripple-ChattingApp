import React, { useEffect, useState } from "react";
import Box from "./Box";
import Flex from "./Flex";
import Image from "./Image";
import Typography from "./Typography";
import Button from "./Button";
import { BsThreeDots } from "react-icons/bs";
import { getDatabase, onValue, ref } from "firebase/database";

const MyGroupItem = ({
  key,
  groupuid,
  groupName,
  groupPhoto,
  className,
  viewButton,
}) => {
  const db = getDatabase();
  const [groupMemberList, setGroupMemberList] = useState([]);

  useEffect(() => {
    let memberListRef = ref(db, "groupmembers");
    onValue(memberListRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (item.val().groupuid == groupuid) {
          array.push(item.val());
        }
      });
      setGroupMemberList(array);
    });
  }, []);

  return (
    <Box
      key={key}
      className={`${className} p-5 rounded-[10px] border broder-[#dedede]`}
    >
      <Flex alignItems={"end"} className={"gap-x-4"}>
        <Image
          src={groupPhoto}
          alt={groupName}
          className={"w-[150px] aspect-square object-cover rounded-md"}
        />
        <Box className={"w-[100%]"}>
          <Typography variant="h3" className="text-xl font-semibold font-inter">
            {groupName}
          </Typography>
          <Typography className="text-sm text-secoundaryText">
            {groupMemberList.length} members
          </Typography>
          <Flex
            justifyContent={"between"}
            alignItems={"center"}
            className={"mt-4"}
          >
            <Button
              onClick={viewButton}
              className={
                "text-[#005fcf] bg-[#ebf5ff] hover:bg-[#dfe9f2] py-3 w-[82%] font-semibold rounded-md font-poppins transition-all duration-200 active:scale-[0.98]"
              }
            >
              View group
            </Button>
            <BsThreeDots className="box-content bg-[#d8dadf] text-[#3e4043] text-xl py-[13px] px-5 rounded-md cursor-pointer" />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default MyGroupItem;
