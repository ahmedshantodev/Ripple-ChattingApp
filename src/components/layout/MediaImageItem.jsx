import React from "react";
import Box from "./Box";
import ModalImage from "react-modal-image";

const MediaImageItem = ({ image, className }) => {
  return (
    <Box className={className}>
      <ModalImage
        small={image}
        large={image}
        className={`w-full rounded aspect-square object-cover border border-[#f2f2f2]`}
      />
    </Box>
  );
};

export default MediaImageItem;
