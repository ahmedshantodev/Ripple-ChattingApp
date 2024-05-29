import React, { useState } from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";

const GroupItem = ({
  profile,
  profileAltText,
  userName,
  lastMessege,
  lastMessegeSentTime,
}) => {

  return (
    <Box
      className={
        "group flex items-center gap-x-4 py-[14px] px-3 rounded-[8px] relative transition-all ease-linear duration-200 hover:bg-[#dddcea]  cursor-pointer"
      }
    >
      <Image
        src={profile}
        alt={profileAltText}
        className={"w-[52px] h-[52px] object-cover rounded-full "}
      />
      <Box>
        <Typography variant="h3" className="text-lg font-semibold">
          {userName}
        </Typography>
        <Typography
          variant="p"
          className="text-sm text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[220px]"
        >
          {lastMessege}
        </Typography>
      </Box>
      <Typography className="text-sm text-secoundaryText absolute right-2.5 top-2.5">
        -{lastMessegeSentTime}
      </Typography>
    </Box>
  );
};

export default GroupItem;
