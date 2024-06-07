import React from "react";
import { TbTriangleFilled } from "react-icons/tb";
import Box from "./Box";
import Typography from "./Typography";

const ReciverMessege = ({ messege, messegeSentTime }) => {
  return (
    <Box className={"mt-4"}>
      <Box className={"max-w-[70%] inline-block relative mb-2 ml-2.5"}>
        <TbTriangleFilled className="text-[22px] text-[#f0f0f0] absolute -bottom-[3px] left-[2px] -translate-x-2/4" />
        <Typography className="font-poppins py-3 px-6 rounded-[10px] bg-[#f0f0f0]">
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

export default ReciverMessege;
