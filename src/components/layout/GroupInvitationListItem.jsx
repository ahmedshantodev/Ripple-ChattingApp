import React from "react";
import Box from "./Box";
import Flex from "./Flex";
import Image from "./Image";
import { RxCross2 } from "react-icons/rx";
import { LuCheck } from "react-icons/lu";
import Typography from "./Typography";

const GroupInvitationListItem = ({
  groupPhoto,
  groupName,
  invitedBy,
  acceptButton,
  rejectButton,
}) => {
  return (
    <Box className={"py-1 rounded-md flex justify-between items-center"}>
      <Flex alignItems={"center"} className={"gap-x-3"}>
        <Image
          src={groupPhoto}
          alt={groupName}
          className={"w-[40px] h-[40px] object-cover rounded-full"}
        />
        <Box>
          <Typography className="text-[15px]">{groupName}</Typography>
          <Typography className="text-[13px] text-secoundaryText">
            Invited by {invitedBy}
          </Typography>
        </Box>
      </Flex>
      <Flex alignItems={"center"} className={""}>
        <RxCross2
          onClick={rejectButton}
          className=" box-content bg-[#f2f2f2] hover:bg-primaryBgColor p-[6px] rounded-full cursor-pointer mr-2 hover:text-red-600"
        />
        <LuCheck
          onClick={acceptButton}
          className=" box-content bg-[#f2f2f2] hover:bg-primaryBgColor p-[6px] rounded-full cursor-pointer hover:text-green-600"
        />
      </Flex>
    </Box>
  );
};

export default GroupInvitationListItem;
