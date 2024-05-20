import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Button from "../components/layout/Button";
import { getAuth, signOut } from "firebase/auth";
import { activeUser } from "../slices/activeUserSlice";
import Flex from "../components/layout/Flex";
import Box from "../components/layout/Box";
import SidebarMenu from "../components/section/SidebarMenu";

const Pages = () => {
  const navigate = useNavigate();
  const activeUserData = useSelector((state) => state.user.information);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!activeUserData?.email) {
      navigate("/login");
    }
  }, []);

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        dispatch(activeUser(null));
        navigate("/registration");
      })
      .catch((error) => {});
  };

  return (
    <section className="bg-sign-up bg-no-repeat bg-cover">
      <Flex>
        <Box className={"w-[10%] h-[100dvh] bg-white pt-12 pl-6 relative"}>
          <SidebarMenu />  
          <button className="absolute bottom-5 left-[300px] bg-green-300 py-2.5 px-4" onClick={handleLogOut}>
            logout
          </button>
        </Box>
        <Box className={"w-[90%] h-[100dvh]"}>
          <Outlet />
        </Box>
      </Flex>
    </section>
  );
};

export default Pages;
