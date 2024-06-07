import React from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";

const GroupItem = ({
  activeItem,
  onClick,
  profile,
  profileAltText,
  groupName,
  lastMessege,
  lastMessegeSentTime,
}) => {
  return (
    <Box
      onClick={onClick}
      className={
        activeItem == groupName
          ? "group flex items-center gap-x-4 py-[14px] px-3 rounded-[8px] relative bg-[#dddcea]  cursor-pointer"
          : "group flex items-center gap-x-4 py-[14px] px-3 rounded-[8px] relative cursor-pointer transition-all ease-linear duration-200 hover:bg-[#f0f0f0]"
      }
    >
      <Image
        src={profile}
        alt={groupName}
        className={"w-[52px] h-[52px] object-cover rounded-full "}
      />
      <Box>
        <Typography variant="h3" className="text-lg font-semibold">
          {groupName}
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
