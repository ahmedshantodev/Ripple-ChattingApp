import React, { useEffect, useState } from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import BlockListItem from "../layout/BlockListItem";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useSelector } from "react-redux";

const BlockList = () => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state?.user?.information);
  const [blockList, setBlockList] = useState([]);

  useEffect(() => {
    const blockListRef = ref(db, "block/");
    onValue(blockListRef, (snapshot) => {
      let blockListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().blockbyuid) {
          blockListArray.push({ ...item.val(), blockid: item.key });
        }
      });
      setBlockList(blockListArray);
    });
  }, []);

  const handleUnblock = (item) => {
    remove(ref(db , "block/" + item.blockid))
  }

  return (
    <Box className={"h-full"}>
      <Typography
        variant="h4"
        className="h-[7%] font-inter text-[28px] font-semibold"
      >
        Block List
      </Typography>
      <Box
        className={
          "h-[93%] flex gap-x-[15px] items-start flex-wrap overflow-y-auto"
        }
      >
        {blockList.map((item) => (
          <BlockListItem
            className={"w-[24%] mb-[15px]"}
            profile={item.blockeduserprofile}
            userName={item.blockedusername}
            unblockButton={() => handleUnblock(item)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BlockList;
