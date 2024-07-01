import React, { useEffect, useRef, useState } from "react";
import Box from "./Box";
import Flex from "./Flex";
import Image from "./Image";
import { BsThreeDotsVertical } from "react-icons/bs";
import Typography from "./Typography";
import { useSelector } from "react-redux";

const GroupMemberListItem = ({
  memberUid,
  memberName,
  memberProfile,
  addedBy,
  removeButton,
}) => {
  const activeGroupData = useSelector((state) => state.activeGroup.information);
  const [menuShow, setMenuShow] = useState(false);
  const menuRef = useRef();
  const openButtonRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (openButtonRef.current?.contains(e.target)) {
        setMenuShow(true);
      } else if (!menuRef.current?.contains(e.target)) {
        setMenuShow(false);
      } else if (buttonRef.current?.contains(e.target)) {
        setMenuShow(false);
      }
    });
  }, []);

  return (
    <Box className={"py-1 rounded-md flex justify-between items-center"}>
      <Flex alignItems={"center"} className={"gap-x-2"}>
        <Image
          src={memberProfile}
          alt={memberName}
          className={"w-[40px] h-[40px] object-cover rounded-full"}
        />
        <Box>
          <Typography className="text-[15px]">{memberName}</Typography>
          {activeGroupData.groupadminuid == memberUid ? (
            <Typography className="text-[13px] text-secoundaryText">
              Group Admin
            </Typography>
          ) : (
            <Typography className="text-[13px] text-secoundaryText">
              Added by {addedBy}
            </Typography>
          )}
        </Box>
      </Flex>
      <Box className={"relative"}>
        {activeGroupData.groupadminuid != memberUid && 
          <div ref={openButtonRef} onClick={() => setMenuShow(!menuShow)}>
            <BsThreeDotsVertical className=" box-content bg-[#f2f2f2] hover:bg-primaryBgColor p-[6px] rounded-full cursor-pointer" />
          </div>
        }
        {menuShow && (
          <div
            ref={menuRef}
            className={
              "w-[100px] bg-white rounded-md p-1 absolute right-[140%] top-[0px] z-[1] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] border border-primaryBorder after:content-[''] after:bg-white after:w-[14px] after:h-[14px] after:absolute after:right-0 after:translate-x-2/4 after:top-0 after:translate-y-2/4 after:rotate-45 after:z-[-1] after:border-t after:border-r after:border-primaryBorder"
            }
          >
            <button
              ref={buttonRef}
              onClick={removeButton}
              className={
                "w-full py-[6px] font-semibold rounded-lg hover:bg-[#f2f2f2] text-[#6a6b6d] text-sm"
              }
            >
              Remove
            </button>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default GroupMemberListItem;
