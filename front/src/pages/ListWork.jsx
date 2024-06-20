import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { selectPlan } from "../../api/login.api";
import { useNavigate, useParams } from "react-router-dom";
import { useUserDetails } from "../contents/UserContext";

function ListWork() {
  const params = useParams();
  const [list, setList] = useState("");
  const [initdays, setInitDays] = useState([0]);
  const [pastMonthDay, setPastMonthDay] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userInfo } = useUserDetails();
  useEffect(() => {
    const monthdays = [
      "",
      31,
      [28, 29],
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
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
    var myArr = [monthBefore - day.getDay()];
    for (let i = 1 + (6 - day.getDay()); i < month; i = i + 7) {
      myArr.push(i);
    }
    setPastMonthDay(monthBefore);
    setInitDays(myArr);
    console.log(day.getDay(), month, monthBefore, myArr);
    const info = {
      accesToken: userInfo.accesToken,
      date: { date: params.listDate },
    };
    selectPlan(info, (date) => {
      setList(date);
    });
    setLoading(false);
  }, []);
  const textGenerator = (date, turn, pastMonthDay) => {
    if (date <= pastMonthDay) return "Past Month";
    else {
      console.log(list[date]);
      if (list[date]) return list[date][turn];
      else if (turn <= 3) return "Auto Preparacion";
      else return "Auto Superacion";
    }
  };
  if (loading) return <h1>Espere por favor</h1>;
  else
    return (
      <div className=" flex flex-col items-center h-5/6 ">
        <div className=" flex flex-col justify-start flex-wrap gap-4  rounded ">
          <h1>Plan de trabajo de {params.listDate}</h1>

          {initdays.map((e) => {
            return (
              <div key={e}>
                <div className="w-[300px] border border-black border-b-0">
                  {" "}
                  Semana del {e} al{" "}
                  {e + 6 == pastMonthDay
                    ? pastMonthDay
                    : (e + 6) % pastMonthDay}
                </div>
                <table className="w-[300px] border border-black text-xs">
                  <tr className="">
                    <th className="w-10 h-20 border border-black">Turn</th>
                    <th className="w-10 h-20 border border-black">
                      {e + 1 == pastMonthDay
                        ? pastMonthDay
                        : (e + 1) % pastMonthDay}
                    </th>
                    <th className="w-10 h-20 border border-black">
                      {e + 2 == pastMonthDay
                        ? pastMonthDay
                        : (e + 2) % pastMonthDay}
                    </th>
                    <th className="w-10 h-20 border border-black">
                      {e + 3 == pastMonthDay
                        ? pastMonthDay
                        : (e + 3) % pastMonthDay}
                    </th>
                    <th className="w-10 h-20 border border-black">
                      {e + 4 == pastMonthDay
                        ? pastMonthDay
                        : (e + 4) % pastMonthDay}
                    </th>
                    <th className="w-10 h-20 border border-black">
                      {e + 5 == pastMonthDay
                        ? pastMonthDay
                        : (e + 5) % pastMonthDay}
                    </th>
                    <th className="w-10 h-20 border border-black">
                      {e + 6 == pastMonthDay
                        ? pastMonthDay
                        : (e + 6) % pastMonthDay}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-10 h-20 border border-black">1</td>
                    <td className="w-10 h-20 border border-black">
                      <textarea
                        className="w-full h-full bg-white mt-0.5"
                        defaultValue={textGenerator(10, 1)}
                      />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-10 h-20 border border-black">2</td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-10 h-20 border border-black">3</td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-10 h-20 border border-black">4</td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-10 h-20 border border-black">5</td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-10 h-20 border border-black">6</td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                    <td className="w-10 h-20 border border-black">
                      <textarea className="w-full h-full bg-white mt-0.5" />
                    </td>
                  </tr>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default ListWork;
