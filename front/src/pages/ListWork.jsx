import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { selectPlan } from "../../api/login.api";
import { useNavigate, useParams } from "react-router-dom";
import { useUserDetails } from "../contents/UserContext";
import { textGenerator } from "../utilities";

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
    setPastMonthDay([monthBefore, month]);
    setInitDays(myArr);
    console.log(day.getDay(), month, monthBefore, myArr);
    const info = {
      accesToken: userInfo.accesToken,
      date: { date: params.listDate },
    };
    selectPlan(info, (date) => {
      setList(date);
    });
    setTimeout(() => setLoading(false), 2000);
  }, []);
  const textGenerator = (date, turn, pastMonthDay, index) => {
    if (
      (date == pastMonthDay[0] || date % pastMonthDay[0] > 7) &&
      index + 1 == 1
    )
      return "Mes Pasado";
    else if (
      (index == 4 || index == 5) &&
      date % pastMonthDay[1] < 7 &&
      date != pastMonthDay[1]
    ) {
      return "Mes Proximo";
    } else {
      if (list[date % pastMonthDay[0]]) {
        if (list[date % pastMonthDay[0]][turn])
          return list[date % pastMonthDay[0]][turn];
        else if (turn <= 3) return "Auto Preparacion";
        else return "Auto Superacion";
      } else if (turn <= 3) return "Auto Preparacion";
      else return "Auto Superacion";
    }
  };
  const handlerChange = (e, key, turn) => {
    var cap = { ...list };
    cap[key] = { ...cap[key] };
    cap[key][turn] = e.target.value;
    console.log(cap);
    setList(cap);
  };
  if (loading) return <h1>Espere por favor</h1>;
  else
    return (
      <div className=" flex flex-col items-center h-5/6 ">
        <div className=" flex flex-col justify-start flex-wrap gap-4  rounded ">
          <h1 className=" mt-3 text-xl">
            Plan de trabajo de {params.listDate}
          </h1>

          {initdays.map((e, index) => {
            const monthAux = index < 2 ? 0 : 1;
            return (
              <div key={e}>
                <div className="w-[300px] border border-black border-b-0 sm:w-[700px]">
                  {" "}
                  Semana del {e} al{" "}
                  {e + 6 == pastMonthDay[monthAux]
                    ? pastMonthDay[monthAux]
                    : (e + 6) % pastMonthDay[monthAux]}
                </div>
                <table className="w-[300px] border border-black text-xs sm:w-[700px] sm:text-sm">
                  <tbody>
                    <tr className="">
                      <th className="w-10 h-20 border border-black">Turn</th>
                      <th className="w-10 h-20 border border-black">
                        {e + 1 == pastMonthDay[monthAux]
                          ? pastMonthDay[monthAux]
                          : (e + 1) % pastMonthDay[monthAux]}
                      </th>
                      <th className="w-10 h-20 border border-black">
                        {e + 2 == pastMonthDay[monthAux]
                          ? pastMonthDay[monthAux]
                          : (e + 2) % pastMonthDay[monthAux]}
                      </th>
                      <th className="w-10 h-20 border border-black">
                        {e + 3 == pastMonthDay[monthAux]
                          ? pastMonthDay[monthAux]
                          : (e + 3) % pastMonthDay[monthAux]}
                      </th>
                      <th className="w-10 h-20 border border-black">
                        {e + 4 == pastMonthDay[monthAux]
                          ? pastMonthDay[monthAux]
                          : (e + 4) % pastMonthDay[monthAux]}
                      </th>
                      <th className="w-10 h-20 border border-black">
                        {e + 5 == pastMonthDay[monthAux]
                          ? pastMonthDay[monthAux]
                          : (e + 5) % pastMonthDay[monthAux]}
                      </th>
                      <th className="w-10 h-20 border border-black">
                        {e + 6 == pastMonthDay[monthAux]
                          ? pastMonthDay[monthAux]
                          : (e + 6) % pastMonthDay[monthAux]}
                      </th>
                    </tr>
                    <tr>
                      <td className="w-10 h-20 border border-black">1</td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 1,
                            1,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 1) % pastMonthDay[monthAux],
                              1
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 2,
                            1,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 2) % pastMonthDay[monthAux],
                              1
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 3,
                            1,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 3) % pastMonthDay[monthAux],
                              1
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 4,
                            1,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 4) % pastMonthDay[monthAux],
                              1
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 5,
                            1,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 5) % pastMonthDay[monthAux],
                              1
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 6,
                            1,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 6) % pastMonthDay[monthAux],
                              1
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="w-10 h-20 border border-black">2</td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 1,
                            2,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 1) % pastMonthDay[monthAux],
                              2
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 2,
                            2,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 2) % pastMonthDay[monthAux],
                              2
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 3,
                            2,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 3) % pastMonthDay[monthAux],
                              2
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 4,
                            2,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 4) % pastMonthDay[monthAux],
                              2
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 5,
                            2,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 5) % pastMonthDay[monthAux],
                              2
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 6,
                            2,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 6) % pastMonthDay[monthAux],
                              2
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="w-10 h-20 border border-black">3</td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 1,
                            3,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 1) % pastMonthDay[monthAux],
                              3
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 2,
                            3,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 2) % pastMonthDay[monthAux],
                              3
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 3,
                            3,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 3) % pastMonthDay[monthAux],
                              3
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 4,
                            3,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 4) % pastMonthDay[monthAux],
                              3
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 5,
                            3,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 5) % pastMonthDay[monthAux],
                              3
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 6,
                            3,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 6) % pastMonthDay[monthAux],
                              3
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="w-10 h-20 border border-black">4</td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 1,
                            4,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 1) % pastMonthDay[monthAux],
                              4
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 2,
                            4,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 2) % pastMonthDay[monthAux],
                              4
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 3,
                            4,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 3) % pastMonthDay[monthAux],
                              4
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 4,
                            4,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 4) % pastMonthDay[monthAux],
                              4
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 5,
                            4,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 5) % pastMonthDay[monthAux],
                              4
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 6,
                            4,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 6) % pastMonthDay[monthAux],
                              4
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="w-10 h-20 border border-black">5</td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 1,
                            5,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 1) % pastMonthDay[monthAux],
                              5
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 2,
                            5,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 2) % pastMonthDay[monthAux],
                              5
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 3,
                            5,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 3) % pastMonthDay[monthAux],
                              5
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 4,
                            5,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 4) % pastMonthDay[monthAux],
                              5
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 5,
                            5,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 5) % pastMonthDay[monthAux],
                              5
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 6,
                            5,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 6) % pastMonthDay[monthAux],
                              5
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="w-10 h-20 border border-black">6</td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 1,
                            6,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 1) % pastMonthDay[monthAux],
                              6
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 2,
                            6,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 2) % pastMonthDay[monthAux],
                              6
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 3,
                            6,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 3) % pastMonthDay[monthAux],
                              6
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 4,
                            6,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 4) % pastMonthDay[monthAux],
                              6
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 5,
                            6,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 5) % pastMonthDay[monthAux],
                              6
                            )
                          }
                        />
                      </td>
                      <td className="w-10 h-20 border border-black">
                        <textarea
                          className="w-full h-full bg-white mt-0.5"
                          defaultValue={textGenerator(
                            e + 6,
                            6,
                            pastMonthDay[monthAux],
                            index
                          )}
                          onChange={(element) =>
                            handlerChange(
                              element,
                              (e + 6) % pastMonthDay[monthAux],
                              6
                            )
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default ListWork;
