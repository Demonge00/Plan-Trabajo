import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { loginFunc } from "../../api/login.api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { checkPasswordComplexity } from "../utilities";
import { useUserDetails } from "../contents/UserContext";

function Profile() {
  const { userInfo, updateUserInfo } = useUserDetails();
  const [name, setName] = useState(userInfo.name);
  const [password, setPassword] = useState("");
  const [verified_password, setVerifiedPassword] = useState("");
  const navigate = useNavigate();
  const { mutate: loguearse, isPending } = useMutation({
    mutationFn: (data) => loginFunc(data),
    onSettled: () => {},
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (response) => {
      updateUserInfo(response.data.access, response.data.refresh);
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const userinfo = {
      name: name,
      password: password,
    };
    loguearse(userinfo);
  };
  useEffect(() => {
    if (!userInfo.accesToken) {
      navigate("/login");
    }
  }, [navigate, userInfo]);
  const buttonEnabled =
    name && checkPasswordComplexity(password, verified_password).length == 0;

  return (
    <div className=" flex flex-col justify-center items-center h-5/6 gap-4 min-w-[320px]">
      <form
        className=" w-72 sm:w-1/2 2xl:w-1/3 text-base flex flex-col items-center gap-4 bg-green-500 rounded px-2 sm:px-12 py-6 shadow-md shadow-green-800"
        onSubmit={submitHandler}
      >
        <h1 className=" font-medium text-2xl ">
          Inicia sección y crea tus workplans!
        </h1>
        <div className="w-full font-bold text-[0.8rem]">
          <label htmlFor="rname" className="block text-start">
            Nuevo nombre:
          </label>
          <input
            type="name"
            placeholder="Introduzca su nombre completo"
            className=" w-full bg-white text-black border-xs border-black rounded p-0.5"
            id="rname"
            defaultValue={name}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full font-bold text-[0.8rem]">
          <label htmlFor="rpassword" className="block text-start">
            Nueva contraseña:
          </label>
          <input
            type="password"
            placeholder="Introduzca su contraseña"
            className=" w-full bg-white text-black border-xs border-black rounded p-0.5"
            id="rpassword"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-full font-bold text-[0.8rem]">
          <label htmlFor="rpassword" className="block text-start">
            Confirmar contraseña:
          </label>
          <input
            type="password"
            placeholder="Verifique su contraseña"
            className=" w-full bg-white text-black border-xs border-black rounded p-0.5"
            id="rvpassword"
            required
            value={verified_password}
            onChange={(e) => setVerifiedPassword(e.target.value)}
          />
        </div>
        {password ? (
          checkPasswordComplexity(password, verified_password) ? (
            <ul className=" bg-white w-full">
              {checkPasswordComplexity(password, verified_password).map((e) => {
                if (e) {
                  return <li key={e}>{e}</li>;
                }
              })}
            </ul>
          ) : (
            <div />
          )
        ) : null}
        <Button
          color="primary"
          className=" w-1/2 text-xl"
          type="submit"
          isDisabled={!buttonEnabled}
          isLoading={isPending}
        >
          Iniciar sección
        </Button>
      </form>
    </div>
  );
}

export default Profile;
