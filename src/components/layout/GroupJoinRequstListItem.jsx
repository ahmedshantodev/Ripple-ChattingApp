import React from "react";
import Box from "./Box";
import Flex from "./Flex";
import Image from "./Image";
import { RxCross2 } from "react-icons/rx";
import { LuCheck } from "react-icons/lu";
import Typography from "./Typography";

const JoinRequstItem = ({ profile, name, acceptButton, deleteButton }) => {
  return (
    <Box className={"py-[6px] px-2 mb-1 bg-[#f5f5f5] rounded-md flex justify-between items-center"}>
      <Flex alignItems={"center"} className={"gap-x-2"}>
        <Image
          src={profile}
          alt={"name"}
          className={"w-[40px] h-[40px] object-cover rounded-full"}
        />
        <Box>
          <Typography className="text-[15px]">{name}</Typography>
        </Box>
      </Flex>
      <Flex alignItems={"center"} className={""}>
        <RxCross2
          onClick={deleteButton}
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

export default JoinRequstItem;
