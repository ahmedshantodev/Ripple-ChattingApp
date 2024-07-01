import React from "react";
import Typography from "./Typography";
import Box from "./Box";

const GroupManagementMessage = ({
  type,
  whoAdded,
  whoJoined,
  whoRemove,
  whoRemoved,
  whoLeft,
  whoChanged,
  newGroupName,
  oldGroupName,
}) => {
  return (
    <Box className={"text-center mt-3"}>
      {type == "groupmanagment/member-added" ? (
        <Typography className="text-secoundaryText text-sm">
          {whoAdded} added {whoJoined} to the group.
        </Typography>
      ) : type == "groupmanagment/member-remove" ? (
        <Typography className="text-secoundaryText text-sm">
          {whoRemove} removed {whoRemoved} from the group.
        </Typography>
      ) : type == "groupmanagment/member-left" ? (
        <Typography className="text-secoundaryText text-sm">
          {whoLeft} has left the group.
        </Typography>
      ) : type == "groupmanagment/groupphoto-changed" ? (
        <Typography className="text-secoundaryText text-sm">
          {whoChanged} changed the group photo
        </Typography>
      ) : type == "groupmanagment/groupname-changed" && (
        <Typography className="text-secoundaryText text-sm">
          {whoChanged} changed the group name from {oldGroupName} to {newGroupName}.
        </Typography>
      )}
    </Box>
  );
};

export default GroupManagementMessage;
