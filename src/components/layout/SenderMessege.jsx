import React from "react";
import { TbTriangleFilled } from "react-icons/tb";
import Box from "./Box";
import Typography from "./Typography";

const SenderMessege = ({ messege, messegeSentTime }) => {
  return (
    <Box className={"mt-4 text-end"}>
      <Box className={"max-w-[75%] inline-block relative mb-2 mr-2.5"}>
        <TbTriangleFilled className="text-[22px] text-[#5a3bff] text-red-400s absolute -bottom-[3px] -right-5 -translate-x-2/4" />
        <Typography className="font-poppins py-3 px-6 rounded-[10px] bg-[#5a3bff] text-white">
          {messege}
        </Typography>
      </Box>
      <Typography
        className="font-poppins text-xs font-medium text-secoundaryText"
      >
        {messegeSentTime}
      </Typography>
    </Box>
  );
};

export default SenderMessege;
