import React, { useEffect, useState } from "react";
import Box from "./Box";
import Image from "./Image";
import Typography from "./Typography";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDatabase, onValue, ref } from "firebase/database";
import moment from "moment";

const GroupItem = ({ keys, groupId, groupName, groupPhoto, onClick }) => {
  const db = getDatabase();
  let location = useLocation().pathname;
  const activeUserData = useSelector((state) => state.user.information);
  const activeGroupData = useSelector((state) => state.activeGroup.information);
  const [messegeList, setMessegeList] = useState([]);
  const lastMessage = messegeList.slice(-1);

  useEffect(() => {
    let messageREf = ref(db, "groupmessege");
    onValue(messageREf, (snapshot) => {
      const messageArray = [];
      snapshot.forEach((item) => {
        if (groupId == item.val().groupuid) {
          messageArray.push({ ...item.val(), messageId: item.key });
        }
      });
      setMessegeList(messageArray);
    });
  }, [groupId]);

  return (
    <Box
      key={keys}
      onClick={onClick}
      className={
        activeGroupData?.groupuid == groupId &&
        location.includes("/pages/chat/chat-with-group")
          ? "group flex items-center gap-x-4 py-[14px] px-3 rounded-[8px] relative bg-[#ebf5ff] cursor-pointer mb-[2px]"
          : "group flex items-center gap-x-4 py-[14px] px-3 rounded-[8px] relative bg-[#f5f5f5]/50 transition-all ease-linear duration-300 hover:bg-[#f5f5f5] cursor-pointer mb-[2px]"
      }
    >
      <Image
        src={groupPhoto}
        alt={groupName}
        className={"w-[52px] h-[52px] object-cover rounded-full "}
      />
      <Box>
        <Typography variant="h3" className="font-semibold font-open-sans">
          {groupName}
        </Typography>
        {lastMessage.map((item) =>
          activeUserData.uid == item.senderuid ? (
            item.type.includes("text") ? (
              item.type == "text/forwarded" ? (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                  you forward a message
                </Typography>
              ) : (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                  <span className="font-semibold">You:</span> {item.text}
                </Typography>
              )
            ) : item.type.includes("voice") ? (
              item.type == "voice/normal" ? (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                  You sent a voice message.
                </Typography>
              ) : (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                  you forwarded a voice message.
                </Typography>
              )
            ) : item.type.includes("image") ? (
              item.type == "image/normal" ? (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                  You sent an image
                </Typography>
              ) : (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                  you forwarded an image
                </Typography>
              )
            ) : item.type.includes("video") ? (
              item.type == "video/normal" ? (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                  You sent a video
                </Typography>
              ) : (
                item.type == "video/forwarded" && (
                  <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                    You forwarded a video
                  </Typography>
                )
              )
            ) : item.type.includes("file") ? (
              item.type == "file/normal" ? (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                  You sent a file
                </Typography>
              ) : (
                item.type == "file/forwarded" && (
                  <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                    You forwarded a file
                  </Typography>
                )
              )
            ) : item.type.includes("gif") ? (
              item.type == "gif/normal" ? (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                  You sent a gif
                </Typography>
              ) : (
                item.type == "gif/forwarded" && (
                  <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                    You forwarded a gif
                  </Typography>
                )
              )
            ) : item.type == "deleted" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                You unsent a message
              </Typography>
            ) : (
              item.type == "like" && (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                  you sent a like
                </Typography>
              )
            )
          ) : item.type.includes("groupmanagment") ? (
            item.type == "groupmanagment/member-added" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                {item.whoadded} added {item.whojoined} to the group
              </Typography>
            ) : item.type == "groupmanagment/member-remove" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                {item.whoremove} removed {item.whoremoved} from the group
              </Typography>
            ) : item.type == "groupmanagment/member-remove" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                {item.whoremove} removed {item.whoremoved} from the group
              </Typography>
            ) : item.type == "groupmanagment/groupadmin-change" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                {item.oldadmin} transferred Admin role to {item.newadmin} for this group
              </Typography>
            ) : item.type == "groupmanagment/groupname-changed" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                {item.whochanged} changed the group name
              </Typography>
            ) : (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                {item.whochanged} changed the group photo
              </Typography>
            )
          ) : item.type.includes("text") ? (
            <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
              {item.sendername}: {item.text}
            </Typography>
          ) : item.type.includes("voice") ? (
            item.type == "voice/normal" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                {item.sendername} sent a voice message.
              </Typography>
            ) : (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                {item.sendername} forwarded a voice message.
              </Typography>
            )
          ) : item.type.includes("image") ? (
            item.type == "image/normal" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                {item.sendername} sent an image
              </Typography>
            ) : (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                {item.sendername} forwarded an image
              </Typography>
            )
          ) : item.type.includes("video") ? (
            item.type == "video/normal" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                {item.sendername} sent a video
              </Typography>
            ) : (
              item.type == "video/forwarded" && (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                  {item.sendername} forwarded a video
                </Typography>
              )
            )
          ) : item.type.includes("file") ? (
            item.type == "file/normal" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                {item.sendername} sent a video
              </Typography>
            ) : (
              item.type == "file/forwarded" && (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                  {item.sendername} forwarded a video
                </Typography>
              )
            )
          ) : item.type.includes("gif") ? (
            item.type == "gif/normal" ? (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                {item.sendername} sent a gif
              </Typography>
            ) : (
              item.type == "gif/forwarded" && (
                <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                  {item.sendername} forwarded a gif
                </Typography>
              )
            )
          ) : item.type == "deleted" ? (
            <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
              {item.sendername} unsent a message
            </Typography>
          ) : (
            item.type == "like" && (
              <Typography className="text-sm font-open-sans text-secoundaryText whitespace-nowrap overflow-hidden text-ellipsis w-[285px]">
                {item.sendername} send a like
              </Typography>
            )
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

export default GroupItem;
