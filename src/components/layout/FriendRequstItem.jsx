import React from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";
import Button from "./Button";

const FriendRequstItem = ({
  className,
  profile,
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
        alt={userName}
        className={"w-full aspect-square object-cover"}
      />
      <Box className={"pt-2.5 pb-2 px-2"}>
        <Typography
          variant="h3"
          className="font-inter font-semibold text-[18px] mt-2.5 mb-[2px] ml-1 w-[98%] whitespace-nowrap overflow-hidden text-ellipsis capitalize"
        >
          {userName}
        </Typography>
        <Button
          onClick={friendRequstConfirm}
          className={
            "bg-[#0861f2] w-full py-2 text-white font-semibold rounded-lg mt-1 active:scale-[0.97]"
          }
        >
          Confirm
        </Button>
        <Button
          onClick={friendRequstDelete}
          className={
            "bg-[#4e4f50] w-full py-2 text-white font-semibold rounded-lg mt-1 active:scale-[0.97]"
          }
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default FriendRequstItem;
