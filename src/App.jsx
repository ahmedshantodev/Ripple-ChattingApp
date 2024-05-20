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
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Group from "./pages/Group";
import AccountSettings from "./pages/AccountSettings";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/*" element={<Error />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/pages" element={<Pages />} >
          <Route path="home" element={<Home />}/>
          <Route path="chat" element={<Chat />}/>
          <Route path="group" element={<Group />}/>
          <Route path="account-setting" element={<AccountSettings />}/>
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
