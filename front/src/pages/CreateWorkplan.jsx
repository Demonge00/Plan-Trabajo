import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { createWorkplan } from "../../api/login.api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUserDetails } from "../contents/UserContext";

function CreateWorkplan() {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState("");
  const { userInfo } = useUserDetails();
  const navigate = useNavigate();
  const {
    mutate: crear,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (data) => createWorkplan(data),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (response) => {
      console.log(response.data.message);
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("test");
    const data = {
      accesToken: userInfo.accesToken,
      year: year,
      month: month,
    };
    crear(data);
  };
  useEffect(() => {
    if (!userInfo.accesToken) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const buttonEnabled = year && month;
  if (isSuccess) {
    return (
      <div className=" flex flex-col justify-center items-center h-5/6 gap-4 min-w-[320px]">
        <h1 className=" font-medium text-2xl ">Plan Creado!</h1>
      </div>
    );
  } else
    return (
      <div className=" flex flex-col justify-center items-center h-5/6 gap-4 min-w-[320px]">
        <form
          className=" w-72 sm:w-1/2 2xl:w-1/3 text-base flex flex-col items-center gap-4 bg-green-500 rounded px-2 sm:px-12 py-6 shadow-md shadow-green-800"
          onSubmit={submitHandler}
        >
          {isError ? (
            <h1 className=" font-medium text-2xl ">
              No se pudo crear el plan de trabajo
            </h1>
          ) : (
            <h1 className=" font-medium text-2xl ">
              Introduzca año y mes del plan de trabajo
            </h1>
          )}

          <div className="w-full font-bold text-[0.8rem]">
            <label htmlFor="year" className="block text-start">
              Año:
            </label>
            <input
              type="text"
              placeholder="Introduzca el año"
              className=" w-full bg-white text-black border-xs border-black rounded p-0.5"
              id="year"
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="w-full font-bold text-[0.8rem]">
            <label htmlFor="mes" className="block text-start ">
              Mes:
            </label>
            <input
              type="text"
              placeholder="Introduzca el mes"
              className=" w-full bg-white text-black border-xs border-black rounded p-0.5"
              id="mes"
              required
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
          <div className="w-full font-bold text-[0.8rem]">
            <label htmlFor="file" className="block text-start ">
              Plan Trabajo Facultad(Opcional):
            </label>
            <input
              type="file"
              className=" w-full bg-white text-black border-xs border-black rounded p-0.5"
              id="file"
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>

          <Button
            color="primary"
            className=" w-1/2 text-xl"
            type="submit"
            isDisabled={!buttonEnabled}
            isLoading={isPending}
          >
            Crear Plan
          </Button>
        </form>
      </div>
    );
}

export default CreateWorkplan;