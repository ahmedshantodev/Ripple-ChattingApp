import React, { useEffect, useState } from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import BlockListItem from "../layout/BlockListItem";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useSelector } from "react-redux";
import SearchBox from "../layout/SearchBox";
import Flex from "../layout/Flex";

const BlockList = () => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state?.user?.information);
  const [blockList, setBlockList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
    remove(ref(db, "block/" + item.blockid));
  };

  const filteredList = blockList.filter((item) => {
    return searchValue == "" ? item : item.blockedusername.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <Box className={"h-full"}>
      <Box className={"h-[14%]"}>
        <Typography
          variant="h4"
          className="font-inter text-[28px] font-semibold ml-2"
        >
          Block List
        </Typography>
        <SearchBox
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={"Search friend"}
          className={"mt-2"}
        />
      </Box>
      <Box className={"h-[86%] overflow-y-auto"}>
        {filteredList.length == 0 && searchValue ? (
          <Box className={"flex h-full justify-center items-center"}>
            <Typography className="font-mono text-3xl text-secoundaryText">
              No results found.
            </Typography>
          </Box>
        ) : filteredList.length == 0 ? (
          <Box className={"flex h-full justify-center items-center"}>
            <Box className={"text-center"}>
              <Typography className="font-mono text-3xl mb-2">
                No blocked user
              </Typography>
              <Typography className="font-mono text-2xl text-secoundaryText">
                Blocked user will appear here.
              </Typography>
            </Box>
          </Box>
        ) : (
          <Flex className={"flex-wrap w-full gap-x-[12px]"}>
            {filteredList.map((item , index) => (
              <BlockListItem
                key={index}
                className={"w-[18.50%] mb-[22px]"}
                profile={item.blockeduserprofile}
                userName={item.blockedusername}
                unblockButton={() => handleUnblock(item)}
              />
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default BlockList;
