import React from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";
import Button from "./Button";
import Flex from "./Flex";

const OthersGroupListItem = ({
  className,
  groupPhoto,
  groupName,
  adminProfile,
  adminName,
  buttonType,
  joinButton,
  cancelButton
}) => {
  return (
    <Box
      className={`${className} overflow-hidden rounded-[10px] border broder-[#dedede]`}
    >
      <Image
        src={groupPhoto}
        alt={groupName}
        className={"w-full aspect-square object-cover"}
      />
      <Box className={"p-3"}>
        <Typography className="text-lg font-bold">{groupName}</Typography>
        <Flex alignItems={"center"} className={"gap-x-2.5 mt-2"}>
          <Image
            src={adminProfile}
            alt={adminName}
            className={"w-[26px] aspect-square object-cover rounded-full"}
          />
          <Typography className="text-[13px] text-secoundaryText font-inter">
            <span className=" font-semibold">{adminName}</span> is admin
          </Typography>
        </Flex>
        {buttonType == "send" ? (
          <Button
            onClick={joinButton}
            className={
              "w-full text-[#005fcf] bg-[#ebf5ff] hover:bg-[#dfe9f2] py-2.5 rounded-[10px] font-semibold text-lg mt-2 font-poppins transition-all duration-200 active:scale-[0.98]"
            }
          >
            Join group
          </Button>
        ) : (
          <Button
            onClick={cancelButton}
            className={
              "w-full bg-[#d8dadf] py-2.5 rounded-[10px] font-semibold text-lg mt-2 font-poppins transition-all duration-200 active:scale-[0.98]"
            }
          >
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default OthersGroupListItem;
