import React from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";
import Button from "./Button";
import { FaUserCheck, FaUserPlus } from "react-icons/fa6";
import { FaUserTimes } from "react-icons/fa";
const UserListItem = ({
  className,
  profile,
  profileAlt,
  userName,
  sendRequstBtn,
  button,
  cencelRequstBtn,
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
          className="font-inter font-semibold text-[20px] mt-2.5 mb-[2px] ml-1"
        >
          {userName}
        </Typography>
        {button == "pending" ? (
          <Button
            onClick={cencelRequstBtn}
            className={
              "bg-[#d8dadf] text-[#26282c] w-full py-2.5 font-semibold rounded-lg mt-1 active:scale-[0.97] flex justify-center items-center gap-x-2.5"
            }
          >
            <FaUserTimes className="text-lg" /> Cancel Requst
          </Button>
        ) : button == "friends" ? (
          <Button
            className={
              "bg-[#d8dadf] text-[#26282c] w-full py-2.5 font-bold rounded-lg mt-1 active:scale-[0.97] flex items-center justify-center gap-x-2.5"
            }
          >
            <FaUserCheck className="text-lg" /> Friends
          </Button>
        ) : (
          <Button
            onClick={sendRequstBtn}
            className={
              "bg-[#2176ff] w-full py-2.5 text-white font-semibold rounded-lg mt-1 active:scale-[0.97] flex justify-center items-center gap-x-2.5"
            }
          >
            <FaUserPlus className="text-lg" /> Send Requsts
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserListItem;
