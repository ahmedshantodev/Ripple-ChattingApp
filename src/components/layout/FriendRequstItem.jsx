import React from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";
import Button from "./Button";

const FriendRequstItem = ({
  className,
  profile,
  profileAlt,
  userName,
  friendRequstConfirm,
  friendRequstDelete,
}) => {
  return (
    <Box
      className={`${className} border border-primaryBorder rounded-md overflow-hidden`}
    >
      <Image
        src={profile}
        alt={profileAlt}
        className={"w-full aspect-square object-cover"}
      />
      <Box className={"pt-2.5 pb-2 px-2"}>
        <Typography
          variant="h3"
          className="font-inter font-semibold text-[20px] mt-2.5  mb-[2px] ml-1"
        >
          {userName}
        </Typography>
        <Button
          onClick={friendRequstConfirm}
          className={
            "bg-[#2176ff] w-full py-2.5 text-white font-semibold rounded-lg mt-1 active:scale-[0.97]"
          }
        >
          Confirm
        </Button>
        <Button
          onClick={friendRequstDelete}
          className={
            "bg-[#4e4f50] w-full py-2.5 text-white font-semibold rounded-lg mt-1 active:scale-[0.97]"
          }
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default FriendRequstItem;
