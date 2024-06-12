import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { obtainWorkplans } from "../../api/login.api";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../contents/UserContext";

function WorkplansList() {
  const [workplans, setWorkplans] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useUserDetails();

  useEffect(() => {
    obtainWorkplans(userInfo.accesToken, (work) => {
      setWorkplans(work);
    });
    if (!userInfo.accesToken) {
      navigate("/login");
    }
  }, [navigate, userInfo.accesToken]);
  const clickHandler = (e) => {
    navigate("/listplans/" + e.date);
  };
  return (
    <div className=" flex flex-col justify-center items-center h-5/6 gap-4 min-w-[320px]">
      <div className=" max-w-[310px] sm:max-w-[740px] 2xl:max-w-[1000px] text-base flex items-center justify-start flex-wrap gap-4  rounded px-2 sm:px-12 py-6 ml-4 ">
        {workplans.map((e, index) => {
          return (
            <Button
              key={index}
              className=" text-sm sm:text-base text-black h-20 w-20 sm:w-32 2xl:text-xl 2xl:w-40 bg-green-500 shadow-green-800 shadow-md rounded flex items-center justify-center"
              onClick={() => clickHandler(e)}
              date={e.date}
            >
              {e.date}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default WorkplansList;
