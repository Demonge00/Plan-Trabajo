import {
  useContext,
  createContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";

const userContext = createContext();

export function useUserDetails() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("Esta funcion se usa solo con contexts.");
  }
  return context;
}

export function UserDetailsProvider(props) {
  const jsonParsed = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;
  var userAccesToken = false;
  var userRefreshToken = false;
  var userName = false;
  if (jsonParsed) {
    if (jsonParsed.accesToken) {
      userAccesToken = jsonParsed.accesToken;
      userName = jwtDecode(userAccesToken).name;
    } else {
      userAccesToken = false;
      userName = false;
    }
    userRefreshToken = jsonParsed.refreshToken
      ? jsonParsed.refreshToken
      : false;
  }
  const [userInfo, setUserInfo] = useState({
    accesToken: userAccesToken,
    refreshToken: userRefreshToken,
    name: userName,
  });
  const updateUserInfo = useCallback(
    (accesToken, refreshToken) => {
      const newUserInfo = { ...userInfo };
      newUserInfo.accesToken = accesToken;
      newUserInfo.refreshToken = refreshToken;
      if (accesToken === false) {
        newUserInfo.name = false;
        console.log(newUserInfo);
      } else {
        const jwt_decoded = jwtDecode(newUserInfo.accesToken);
        newUserInfo.name = jwt_decoded.name;
      }
      setUserInfo(newUserInfo);
      localStorage.setItem("userDetails", JSON.stringify(newUserInfo));
    },
    [userInfo]
  );
  const value = useMemo(() => {
    return { userInfo, updateUserInfo };
  }, [updateUserInfo, userInfo]);
  return <userContext.Provider value={value} {...props} />;
}
