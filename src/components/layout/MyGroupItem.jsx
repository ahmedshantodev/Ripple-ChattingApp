import React from "react";
import Box from "./Box";
import Flex from "./Flex";
import Image from "./Image";
import Typography from "./Typography";
import Button from "./Button";
import { BsThreeDots } from "react-icons/bs";

const MyGroupItem = ({ groupPhoto, groupName, className, viewButton }) => {
  return (
    <Box className={`${className} p-5 rounded-[10px] border broder-[#dedede]`}>
      <Flex alignItems={"end"} className={"gap-x-4"}>
        <Image
          src={groupPhoto}
          alt={groupName}
          className={"w-[150px] aspect-square object-cover rounded-md"}
        />
        <Box className={"w-[100%]"}>
          <Typography variant="h3" className="text-xl font-semibold font-inter">
            {groupName}
          </Typography>
          <Typography className="text-sm text-secoundaryText">
            10 members
          </Typography>
          <Flex
            justifyContent={"between"}
            alignItems={"center"}
            className={"mt-4"}
          >
            <Button
              onClick={viewButton}
              className={
                "text-[#005fcf] bg-[#ebf5ff] hover:bg-[#dfe9f2] py-3 w-[82%] text-lg font-semibold rounded-md font-poppins transition-all duration-200 active:scale-[0.98]"
              }
            >
              View group
            </Button>
            <BsThreeDots className="box-content bg-[#d8dadf] text-[#3e4043] text-lg py-[16px] px-5 rounded-md" />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default MyGroupItem;
