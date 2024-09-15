import React from "react";
import Box from "./Box";
import Flex from "./Flex";
import Image from "./Image";
import Typography from "./Typography";
import Button from "./Button";

const GroupInvitationItem = ({
  key,
  groupPhoto,
  groupName,
  inviteByname,
  inviteByProfile,
  className,
  acceptButton,
  deleteButton,
}) => {
  return (
    <Box
      key={key}
      className={`${className} p-4 rounded-[10px] border broder-[#dedede]`}
    >
      <Flex alignItems={"end"} className={"gap-x-4"}>
        <Image
          src={groupPhoto}
          alt={groupName}
          className={"w-[150px] aspect-square object-cover rounded-md"}
        />
        <Box className={"w-[100%]"}>
          <Typography
            variant="h3"
            className="text-xl font-semibold font-inter mb-2"
          >
            {groupName}
          </Typography>
          <Flex alignItems={"center"} className={"gap-x-2.5"}>
            <Image
              src={inviteByProfile}
              alt={inviteByname}
              className={"w-[30px] aspect-square object-cover rounded-full"}
            />
            <Typography className="text-[13px] text-secoundaryText">
              <span className="font-bold">{inviteByname}</span> invited you to
              join this group.
            </Typography>
          </Flex>
          <Flex
            justifyContent={"between"}
            alignItems={"center"}
            className={"mt-2"}
          >
            <Button
              onClick={acceptButton}
              className={
                "text-white bg-[#0861f2] py-3 w-[59%] text-[17px] rounded-md font-poppins transition-all duration-200 active:scale-[0.98]"
              }
            >
              Accept
            </Button>
            <Button
              onClick={deleteButton}
              className={
                "text-white bg-[#4e4f50] py-3 w-[38%] text-[17px] rounded-md font-poppins transition-all duration-200 active:scale-[0.98]"
              }
            >
              Delete
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default GroupInvitationItem;
