import { useContext, createContext, useMemo, useState } from "react";
import jwt_decode from "jwt-decode";

const userContext = createContext();

export function useUserDetails() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("Esta funcion se usa solo con contexts.");
  }
  return context;
}

export function UserDetailsProvider(props) {
  const [userInfo, setUserInfo] = useState({
    accesToken: false,
    refreshToken: false,
    name: false,
  });
  const value = useMemo(() => {
    function updateUserInfo(accesToken, refreshToken) {
      const newUserInfo = { ...userInfo };
      newUserInfo.accesToken = accesToken;
      newUserInfo.refreshToken = refreshToken;
      const jwt_decoded = jwt_decode(newUserInfo.accesToken);
      newUserInfo.name = jwt_decoded.name;
      setUserInfo(newUserInfo);
    }
    return [{ ...userInfo, updateUserInfo }];
  }, [userInfo]);
  return <userContext.Provider value={value} {...props} />;
}
