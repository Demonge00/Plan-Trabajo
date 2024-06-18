import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { selectPlan } from "../../api/login.api";
import { useNavigate, useParams } from "react-router-dom";
import { useUserDetails } from "../contents/UserContext";

function ListWork() {
  const monthdays = ["", 31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const params = useParams();
  const [list, setList] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useUserDetails();
  const day = new Date(params.listDate);
  let month = monthdays[day.getMonth() + 2];
  if (day.getMonth() + 2 == 2) {
    if (day.getFullYear() % 4 == 0) {
      month = month[1];
    } else {
      month = month[0];
    }
  }
  let monthBefore = monthdays[day.getMonth() + 1];
  if (day.getMonth() + 1 == 2) {
    if (day.getFullYear() % 4 == 0) {
      monthBefore = monthBefore[1];
    } else {
      monthBefore = monthBefore[0];
    }
  }
  const initdays = [];
  if (monthBefore - day.getDay() != monthBefore) {
    initdays.push(monthBefore);
  } else {
    initdays.push(0);
  }
  useEffect(() => {
    for (let i = 1 + (7 - day); i < month; i++) {
      initdays.push(i);
    }
    console.log(day.getDay(), month, monthBefore);
    const info = {
      accesToken: userInfo.accesToken,
      date: params.listDate,
    };
    selectPlan(info, (date) => {
      setList(date);
    });
  });
  return (
    <div className=" flex flex-col justify-center items-center h-5/6 gap-4 min-w-[320px]">
      <div className=" max-w-[310px] sm:max-w-[740px] 2xl:max-w-[1000px] text-base flex items-center justify-start flex-wrap gap-4  rounded px-2 sm:px-12 py-6 ml-4 ">
        Back
      </div>
    </div>
  );
}

export default ListWork;
