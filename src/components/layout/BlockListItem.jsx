import React from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";
import Button from "./Button";

const BlockListItem = ({
  className,
  profile,
  userName,
  unblockButton,
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
          className="font-inter font-semibold text-[20px] mt-2.5 mb-[2px] ml-1"
        >
          {userName}
        </Typography>
        <Button
          onClick={unblockButton}
          className={
            "bg-[#4e4f50] w-full py-2.5 text-white font-semibold rounded-lg mt-1 active:scale-[0.97]"
          }
        >
          Unblock
        </Button>
      </Box>
    </Box>
  );
};

export default BlockListItem;
