import React from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";
import Flex from "./Flex";
import Button from "./Button";

const GroupInviteListItem = ({
  profile,
  profileAlt,
  name,
  button,
  addButton,
}) => {
  return (
    <Box
      className={
        "border border-[#dddcea] py-2 rounded-lg px-2 flex items-center justify-between mb-2"
      }
    >
      <Flex alignItems={"center"} className={"gap-x-3"}>
        <Image
          src={profile}
          alt={profileAlt}
          className={"w-[65px] h-[65px] object-cover rounded-full"}
        />
        <Typography
          variant={"h3"}
          className="text-lg font-semibold font-open-sans"
        >
          {name}
        </Typography>
      </Flex>
      {button == "add" ? (
        <Button
          onClick={addButton}
          className={
            "bg-[#cacad8] w-[90px] py-2 rounded-md mr-2 transition-all ease-in-out duration-200 active:scale-[0.97] font-semibold"
          }
        >
          Add
        </Button>
      ) : (
        <Button
          className={"bg-[#cacad8] w-[90px] py-2 rounded-md mr-2 font-semibold"}
        >
          Pending
        </Button>
      )}
    </Box>
  );
};

export default GroupInviteListItem;
