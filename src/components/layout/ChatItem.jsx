import React, { useEffect, useState } from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import moment from "moment";

const ChatItem = ({
  onClick,
  profile,
  userName,
  userid,
}) => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state.user.information);
  const activeChatData = useSelector((state) => state.activeChat.information);
  const [messegeList, setMessegeList] = useState([]);
  const lastMessage = messegeList.slice(-1);

  useEffect(() => {
    let messegeRef = ref(db, "singlemessege/");
    onValue(messegeRef, (snapshot) => {
      let messegeArray = [];
      snapshot.forEach((item) => {
        if (
          (activeUserData?.uid == item.val().senderuid && userid == item.val().reciveruid) ||
          (activeUserData?.uid == item.val().reciveruid && userid == item.val().senderuid)
        ) {
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
        activeChatData?.uid == userid
          ? "group flex items-center gap-x-4 py-[14px] px-3 rounded-[8px] relative bg-[#f0f0f0] cursor-pointer mb-[2px]"
          : "group flex items-center gap-x-4 py-[14px] px-3 rounded-[8px] relative bg-[#f5f5f5]/50 transition-all ease-linear duration-300 hover:bg-[#f5f5f5] cursor-pointer mb-[2px]"
      }
    >
      <Image
        src={profile}
        alt={userName}
        className={"w-[52px] h-[52px] rounded-full "}
      />
      <Box>
        <Typography variant="h3" className="font-semibold font-open-sans">
          {userName}
        </Typography>
        {lastMessage.map((item) =>
          activeUserData.uid == item.senderuid ? (
            item.type.includes("text") ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                <span className="font-semibold">You:</span> {item.text}
              </Typography>
            ) : item.type.includes("image") ? (
              item.type == "image/normal" ? (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                  You sent an image
                </Typography>
              ) : (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                  you forwarded an image
                </Typography>
              )
            ) : item.type.includes("video") ? (
              item.type == "video/normal" ? (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                  You sent a video
                </Typography>
              ) : (
                item.type == "video/forwarded" && (
                  <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                    You forwarded a video
                  </Typography>
                )
              )
            ) : item.type.includes("file") ? (
              item.type == "file/normal" ? (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                  You sent a file
                </Typography>
              ) : (
                item.type == "file/forwarded" && (
                  <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                    You forwarded a file
                  </Typography>
                )
              )
            ) : (
              item.type.includes("gif") &&
              (item.type == "gif/normal" ? (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                  You sent a gif
                </Typography>
              ) : (
                item.type == "gif/forwarded" && (
                  <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                    You forwarded a gif
                  </Typography>
                )
              ))
            )
          ) : item.type.includes("text") ? (
            <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
              {item.text}
            </Typography>
          ) : item.type.includes("image") ? (
            item.type == "image/normal" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                {item.sendername} sent an image
              </Typography>
            ) : (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                {item.sendername} forwarded an image
              </Typography>
            )
          ) : item.type.includes("video") ? (
            item.type == "video/normal" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                {item.sendername} sent a video
              </Typography>
            ) : (
              item.type == "video/forwarded" && (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                  {item.sendername} forwarded a video
                </Typography>
              )
            )
          ) : item.type.includes("file") ? (
            item.type == "file/normal" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                {item.sendername} sent a video
              </Typography>
            ) : (
              item.type == "file/forwarded" && (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                  {item.sendername} forwarded a video
                </Typography>
              )
            )
          ) : (
            item.type.includes("gif") &&
            (item.type == "gif/normal" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                {item.sendername} sent a gif
              </Typography>
            ) : (
              item.type == "gif/forwarded" && (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[250px]">
                  {item.sendername} forwarded a gif
                </Typography>
              )
            ))
          )
        )}
      </Box>
      {lastMessage.map((item) => (
        <Typography className="text-[12px] font-open-sans text-secoundaryText absolute right-2.5 top-2.5">
          {moment(item.senttime, "YYYYMMDDh:mm").fromNow()}
        </Typography>
      ))}
    </Box>
  );
};

export default ChatItem;
