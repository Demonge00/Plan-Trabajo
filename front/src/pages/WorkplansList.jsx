import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { obtainWorkplans } from "../../api/login.api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUserDetails } from "../contents/UserContext";

function WorkplansList() {
  const [workplans, setWorkplans] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useUserDetails();

  useEffect(() => {
    obtainWorkplans(userInfo.accesToken).then((response) => {
      setWorkplans(response.data.list);
    });
    if (!userInfo.accesToken) {
      navigate("/login");
    }
  }, []);
  const { mutate: update } = useMutation({
    mutationFn: (data) => obtainWorkplans(data),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      navigate("/login");
    },
  });
  return (
    <div className=" flex flex-col justify-center items-center h-5/6 gap-4 min-w-[320px]">
      <div className=" w-72 sm:w-1/2 2xl:w-1/3 text-base flex flex-col items-center gap-4 bg-green-500 rounded px-2 sm:px-12 py-6 shadow-md shadow-green-800">
        {workplans.map((e) => {
          return <div key={e.date}>{e.date}</div>;
        })}
      </div>
    </div>
  );
}

export default WorkplansList;
