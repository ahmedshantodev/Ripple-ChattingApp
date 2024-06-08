import React, { useEffect, useRef, useState } from "react";
import { TbTriangleFilled } from "react-icons/tb";
import Box from "./Box";
import Typography from "./Typography";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaReply } from "react-icons/fa";
import Flex from "./Flex";
import { BsFillTriangleFill } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import Button from "./Button";

const SenderMessege = ({
  messege,
  messegeSentTime,
  removeButton,
  forwardButton,
  editButton,
}) => {
  const [menuShow, setMenuShow] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!buttonRef.current.contains(e.target)) {
        setMenuShow(false);
      }
    });
  }, []);

  return (
    <Box className={"mt-4 group text-end"}>
      <Box
        className={
          "max-w-[70%] inline-block relative mb-2 ml-2.5 bg-yellow-200"
        }
      >
        <TbTriangleFilled className="text-[22px] text-[#5a3bff] absolute -bottom-[3px] right-[2px] translate-x-2/4" />
        <Typography className="font-poppins py-3 px-6 rounded-[10px] bg-[#5a3bff] text-white break-words">
          {messege}
        </Typography>
        <Flex
          alignItems={"center"}
          className={`absolute top-2/4 -translate-y-2/4 -left-[120px] ${
            menuShow ? "flex" : "hidden"
          } group-hover:flex`}
        >
          <button ref={buttonRef} className={"relative"}>
            <PiDotsThreeOutlineVerticalFill
              onClick={() => setMenuShow(!menuShow)}
              className={`box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2] ${
                menuShow ? "bg-[#f2f2f2]" : "bg-white"
              } z-20 relative`}
            />
            {menuShow && (
              <Box
                className={
                  "w-[110px] rounded-md p-1 absolute left-2/4 -translate-x-2/4 bottom-[50px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-white"
                }
              >
                <BsFillTriangleFill className="absolute left-2/4 -translate-x-2/4 top-[99%] rotate-180 text-[#ffffff]" />
                <Button
                  onClick={editButton}
                  className={
                    "w-full py-1 font-semibold rounded-lg hover:bg-[#f2f2f2] text-[#6a6b6d]"
                  }
                >
                  Edit
                </Button>
                <Button
                  onClick={removeButton}
                  className={
                    "w-full py-1 font-semibold rounded-lg hover:bg-[#f2f2f2] text-[#6a6b6d]"
                  }
                >
                  Remove
                </Button>
                <Button
                  onClick={forwardButton}
                  className={
                    "w-full py-1 font-semibold rounded-lg hover:bg-[#f2f2f2] text-[#6a6b6d]"
                  }
                >
                  Forward
                </Button>
              </Box>
            )}
          </button>
          <Box className={"relative group/tooltip z-10"}>
            <FaReply className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]" />
            <Typography
              variant="span"
              className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
            >
              Reply
              <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
            </Typography>
          </Box>
          <Box className={"relative group/tooltip z-10"}>
            <BsEmojiSmile className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2] z-20 relative" />
            <Typography
              variant="span"
              className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
            >
              React
              <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
            </Typography>
          </Box>
        </Flex>
      </Box>
      <Typography className="font-poppins text-xs font-medium text-secoundaryText">
        {messegeSentTime}
      </Typography>
    </Box>
  );
};

export default SenderMessege;
