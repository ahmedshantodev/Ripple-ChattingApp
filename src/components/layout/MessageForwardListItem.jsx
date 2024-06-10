import React from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";
import Flex from "./Flex";
import Button from "./Button";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";

const MessageForwardListItem = ({
  profile,
  name,
  button,
  sendButton,
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
          alt={name}
          className={"w-[65px] h-[65px] object-cover rounded-full"}
        />
        <Typography
          variant={"h3"}
          className="text-lg font-semibold font-open-sans"
        >
          {name}
        </Typography>
      </Flex>
      {button == "send" ? (
        <Button
          onClick={sendButton}
          className={
            "bg-[#dbe7f2] text-[#1871e6] w-[100px] py-2 rounded-md mr-2 transition-all ease-in-out duration-200 active:scale-[0.97] font-semibold text-lg"
          }
        >
          send
        </Button>
      ) : (
        <Button
          className={"bg-[#dbe7f2] text-[#1871e6] w-[100px] py-2 rounded-md mr-2 font-semibold flex items-center justify-center gap-x-2 text-lg cursor-default"}
        >
          <FaEnvelopeCircleCheck /> 
          sent
        </Button>
      )}
    </Box>
  );
};

export default MessageForwardListItem;
