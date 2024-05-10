import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { loginFunc } from "../../api/login.api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUserDetails } from "../contents/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const { userInfo, updateUserInfo } = useUserDetails();
  const navigate = useNavigate();
  const {
    mutate: loguearse,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (data) => loginFunc(data),
    onSettled: () => {
      setSubmit(true);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (response) => {
      localStorage.setItem("userDetails", JSON.stringify(response.data));
      updateUserInfo(response.data.access, response.data.refresh);
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("test");
    const userinfo = {
      email: email,
      password: password,
    };
    loguearse(userinfo);
  };
  useEffect(() => {
    if (submit && isSuccess) {
      navigate("/");
    }
  }, [userInfo, submit, isSuccess, navigate]);

  const buttonEnabled = email && password;

  if (submit && isSuccess) {
    return <div>Test</div>;
  } else
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
            <label htmlFor="remail" className="block text-start">
              Email:
            </label>
            <input
              type="email"
              placeholder="Introduzca su nombre completo"
              className=" w-full bg-white text-black border-xs border-black rounded p-0.5"
              id="remail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full font-bold text-[0.8rem]">
            <label htmlFor="rpassword" className="block text-start">
              Password:
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
          {isError ? (
            <h1 className=" font-medium text-2xl w-full ">
              Credenciales incorrectas
            </h1>
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

export default Login;
