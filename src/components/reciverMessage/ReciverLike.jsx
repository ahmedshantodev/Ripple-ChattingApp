import React from "react";
import Typography from "../layout/Typography";
import moment from "moment";
import Box from "../layout/Box";
import Image from "../layout/Image";
import { MdThumbUpAlt } from "react-icons/md";

const ReciverLike = ({
  name,
  profile,
  sentTime,
}) => {
  return (
    <Box className={"mt-5 flex items-end gap-x-3 w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={profile}
          alt={name}
          title={name}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box>
        <MdThumbUpAlt
          className="text-[#007bf5] text-[55px]"
          title={
            <Typography className="font-poppins text-xs font-medium text-secoundaryText -ml-1">
              {moment(sentTime, "YYYYMMDDh:mm").fromNow()}
            </Typography>
          }
        />
      </Box>
    </Box>
  );
};

export default ReciverLike;
