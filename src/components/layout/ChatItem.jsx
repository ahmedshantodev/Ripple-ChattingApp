import React, { useEffect, useState } from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";
import Button from "./Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const ChatItem = ({
  activeItem,
  onClick,
  profile,
  userName,
  userid,
  lastMessegeSentTime,
}) => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state.user.information)
  const [dropdownShow, setDropdownShow] = useState(false);
  const [messegeList, setMessegeList] = useState([]);

  useEffect(() => {
    let messegeRef = ref(db, "singlemessege/");
    onValue(messegeRef, (snapshot) => {
      let messegeArray = [];
      snapshot.forEach((item) => {
        if (activeUserData?.uid == item.val().messegereciveruid && userid == item.val().messegesenderuid) {
          messegeArray.push({ ...item.val(), messegeid: item.key }); 
        }
      });
      setMessegeList(messegeArray);
    });
  }, [userid]);

  return (
    <Box
    onClick={onClick}
      className={
        activeItem == userName
        ? "group flex items-center gap-x-4 py-[14px] px-3 rounded-[8px] relative bg-[#dddcea] cursor-pointer mb-[2px]"
        : "group flex items-center gap-x-4 py-[14px] px-3 rounded-[8px] relative transition-all ease-linear duration-300 hover:bg-[#f4f4f4] cursor-pointer mb-[2px]"
      }  
    >
      <Image
        src={profile}
        alt={userName}
        className={"w-[52px] h-[52px] rounded-full "}
      />
      <Box>
        <Typography variant="h3" className="text-lg font-semibold">
          {userName}
        </Typography>
        <Typography
          variant="p"
          className="text-sm text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[220px]"
        >
         {messegeList.length}
        </Typography>
      </Box>
      <Typography className="text-sm text-secoundaryText absolute right-2.5 top-2.5">
        -{lastMessegeSentTime}
      </Typography>
      {/* <Box className={"absolute top-2/4 -translate-y-2/4 right-4 z-10"}>
        <BsThreeDotsVertical
          onClick={() => setDropdownShow(!dropdownShow)}
          className={`group-hover:block box-content text-[18px] ${
            dropdownShow ? "bg-[#ededf9]" : "bg-white"
          } rounded-full p-[6px] transition-all ease-linear duration-300 ${
            dropdownShow ? "block" : "hidden"
          }`}
        />
        {dropdownShow && (
          <div className="bg-green-100 w-[200px] h-[100px] absolute right-0 !z-50">
            hello
          </div>
        )}
      </Box> */}
    </Box>
  );
};

export default ChatItem;
