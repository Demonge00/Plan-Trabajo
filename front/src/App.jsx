import "./App.css";
import { NavbarX } from "./contents/NavbarX";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import { UserDetailsProvider } from "./contents/UserContext";
function App() {
  return (
    <div className="flex-col h-full w-full bg-green-400 justify-center items-center min-w-[320px]">
      <UserDetailsProvider>
        <NavbarX />
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Register />} />
            <Route path="makeplan" />
            <Route path="listplans" />
            <Route path="profile" element={<Login />} />
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
