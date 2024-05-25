import React from "react";
import Box from "./Box";
import Flex from "./Flex";
import Image from "./Image";
import { RxCross2 } from "react-icons/rx";
import { LuCheck } from "react-icons/lu";
import Typography from "./Typography";

const JoinRequstItem = () => {
  return (
    <Box className={"py-1 rounded-md flex justify-between items-center"}>
      <Flex alignItems={"center"} className={"gap-x-2"}>
        <Image
          src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
          alt={"name"}
          className={"w-[40px] h-[40px] object-cover rounded-full"}
        />
        <Box>
          <Typography className="text-[15px]">ABM Shawon islam</Typography>
          <Typography className="text-[13px] text-secoundaryText">
            Added by Somor Mk
          </Typography>
        </Box>
      </Flex>
      <Flex alignItems={"center"} className={""}>
        <RxCross2 className=" box-content bg-[#f2f2f2] hover:bg-primaryBgColor p-[6px] rounded-full cursor-pointer mr-2 hover:text-red-600" />
        <LuCheck className=" box-content bg-[#f2f2f2] hover:bg-primaryBgColor p-[6px] rounded-full cursor-pointer hover:text-green-600" />
      </Flex>
    </Box>
  );
};

export default JoinRequstItem;
