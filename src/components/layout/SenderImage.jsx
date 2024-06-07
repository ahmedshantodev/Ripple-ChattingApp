import React from "react";
import Image from "./Image";
import Box from "./Box";
import Typography from "./Typography";

const SenderImage = ({ onClick, src, alt, messegeSentTime }) => {
  return (
    <Box className={"mt-4 text-end"}>
      <Box className={"max-w-[75%] inline-block mr-2.5"}>
        <Image onClick={onClick} src={src} alt={alt} className={"w-[300px] rounded-[10px] border border-[#dcdcdc]"}/>
      </Box>
      <Typography className="font-poppins text-xs font-medium text-secoundaryText">
        {messegeSentTime}
      </Typography>
    </Box>
  );
};

export default SenderImage;
