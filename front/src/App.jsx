import "./App.css";
import { NavbarX } from "./contents/NavbarX";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";
import Password from "./pages/Password";
import PasswordUpdate from "./pages/PasswordUpdate";

import { UserDetailsProvider } from "./contents/UserContext";
function App() {
  return (
    <div className=" bg-white flex-col h-full w-full  justify-center items-center min-w-[320px]">
      <UserDetailsProvider>
        <BrowserRouter>
          <NavbarX />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="makeplan" />
            <Route path="listplans" />
            <Route path="password" element={<Password />} />
            <Route path="password/:updateSecret" element={<PasswordUpdate />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify/:verifySecret" element={<Verify />} />
            <Route path="*" />
          </Routes>
        </BrowserRouter>
      </UserDetailsProvider>
    </div>
  );
}

export default App;
