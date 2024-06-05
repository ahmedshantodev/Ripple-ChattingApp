import React from "react";
import Box from "./Box";
import Flex from "./Flex";
import Image from "./Image";
import { BsThreeDotsVertical } from "react-icons/bs";
import Typography from "./Typography";

const GroupMemberListItem = ({memberProfile, memberName, addedBy}) => {
  return (
    <Box className={"py-1 rounded-md flex justify-between items-center"}>
      <Flex alignItems={"center"} className={"gap-x-2"}>
        <Image
          src={memberProfile}
          alt={memberName}
          className={"w-[40px] h-[40px] object-cover rounded-full"}
        />
        <Box>
          <Typography className="text-[15px]">{memberName}</Typography>
          <Typography className="text-[13px] text-secoundaryText">
            Added by {addedBy}
          </Typography>
        </Box>
      </Flex>
      <BsThreeDotsVertical className=" box-content bg-[#f2f2f2] hover:bg-primaryBgColor p-[6px] rounded-full cursor-pointer" />
    </Box>
  );
};

export default GroupMemberListItem;
