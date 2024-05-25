import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Flex from "../components/layout/Flex";
import Box from "../components/layout/Box";
import SidebarMenu from "../components/section/SidebarMenu";

const Pages = () => {
  const navigate = useNavigate();
  const activeUserData = useSelector((state) => state.user.information);

  useEffect(() => {
    if (!activeUserData?.email) {
      navigate("/login");
    }
  }, []);

  return (
    <section>
      <Flex>
        <Box
          className={
            "w-[10%] h-[100dvh] bg-white pt-12 pl-6 relative shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
          }
        >
          <SidebarMenu />
        </Box>
        <Box className={"w-[90%] h-[100dvh]"}>
          <Outlet />
        </Box>
      </Flex>
    </section>
  );
};

export default Pages;
