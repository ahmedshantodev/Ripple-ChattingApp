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
  const [dropdownShow, setDropdownShow] = useState(false);

  return (
    <Box
      className={
        "group flex items-center gap-x-4 py-[14px] px-3 rounded-[8px] relative transition-all ease-linear duration-300 hover:bg-[#dddcea] bg-[#dddcea] cursor-pointer"
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
      {/* <Box className={"absolute top-2/4 -translate-y-2/4 right-4 z-10"}>
        <BsThreeDotsVertical
          onClick={() => setDropdownShow(!dropdownShow)}
          className={`group-hover:block box-content text-[18px] ${
            dropdownShow ? "bg-[#ededf9]" : "bg-white"
          } rounded-full p-[6px] transition-all ease-linear duration-300 ${
            dropdownShow ? "block" : "hidden"
          }`}
        />
        {dropdownShow && (
          <div className="bg-green-100 w-[200px] h-[100px] absolute right-0 !z-50">
            hello
          </div>
        )}
      </Box> */}
    </Box>
  );
};

export default GroupItem;
