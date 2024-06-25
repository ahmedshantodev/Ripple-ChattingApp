import React from "react";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Error from "./pages/Error";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Pages from "./pages/Pages";
import EmailVerification from "./pages/EmailVerification";
import Chat from "./pages/Chat";
import Groups from "./pages/Groups";
import ForgotPassword from "./pages/ForgotPassword";
import Friends from "./pages/Friends";
import AllFriends from "./components/section/AllFriends";
import AddFriends from "./components/section/AddFriends";
import FriendRequsts from "./components/section/FriendRequsts";
import BlockList from "./components/section/BlockList";
import Community from "./pages/Community";
import MyGroups from "./components/section/MyGroups";
import OthersGroup from "./components/section/OthersGroup";
import GroupInvitation from "./components/section/GroupInvitation";
import Notification from "./pages/Notification";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/*" element={<Error />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/pages" element={<Pages />}>
          <Route path="chat" element={<Chat />} />
          <Route path="groups" element={<Groups />} />
          <Route path="friends" element={<Friends />}>
            <Route path="all-friends" element={<AllFriends />} />
            <Route path="add-friends" element={<AddFriends />} />
            <Route path="friend-requsts" element={<FriendRequsts />} />
            <Route path="block-list" element={<BlockList />} />
          </Route>
          <Route path="community" element={<Community />}>
            <Route path="my-groups" element={<MyGroups />} />
            <Route path="others-groups" element={<OthersGroup />} />
            <Route path="group-invitation" element={<GroupInvitation />} />
          </Route>
          <Route path="notification" element={<Notification />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
