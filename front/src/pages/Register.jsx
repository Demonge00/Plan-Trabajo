import { Button, Link } from "@nextui-org/react";
import { useState } from "react";
import { checkPasswordComplexity, checkEmailComplex } from "../utilities";
import { registerUser } from "../../api/login.api";
import { useMutation } from "@tanstack/react-query";

function Register() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    verify_password: "",
  });
  const [text, setText] = useState("");
  const [submit, setSubmit] = useState(false);
  const {
    mutate: Registrarse,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (data) => registerUser(data),
    onSettled: () => {
      setSubmit(true);
    },
    onSuccess: (response) => {
      console.log(response);
      setText(response.data.html);
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("test");
    const userinfo = {
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
    };
    Registrarse(userinfo);
    console.log(text);
  };

  const passGood =
    checkPasswordComplexity(userInfo.password, userInfo.verify_password)
      .length == 0;
  const buttonEnabled =
    userInfo.name && checkEmailComplex(userInfo.email) && passGood;

  if (submit && isSuccess) {
    return (
      <div className=" flex flex-col justify-center items-center h-5/6 gap-4 min-w-[320px]">
        <h1 className=" text-lg font-medium md:text-2xl ">{text}</h1>
      </div>
    );
  } else
    return (
      <div className=" flex flex-col justify-center items-center h-5/6 gap-4 min-w-[320px]">
        <form
          className=" w-72 sm:w-1/2 text-base flex flex-col items-center gap-4 bg-green-500 rounded px-2 sm:px-12 py-6 shadow-md shadow-green-800"
          onSubmit={submitHandler}
        >
          {isError ? (
            <h1 className="  font-medium text-2xl">
              No se pudo completar su registro intente{" "}
              <Link href="register" color="primary" className=" md:text-2xl">
                registrarse
              </Link>{" "}
              nuevamente.
            </h1>
          ) : (
            <h1 className="  font-medium text-2xl ">Registrate!</h1>
          )}
          <div className="w-full text-left font-bold text-[0.8rem]">
            <label htmlFor="rname" className="block text-start">
              Nombre:
            </label>
            <input
              type="name"
              placeholder="Introduzca su nombre completo"
              className=" w-full bg-white text-black border-xs border-black rounded p-0.5"
              id="rname"
              required
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo((data) => ({ ...data, name: e.target.value }))
              }
            />
          </div>
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
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo((data) => ({ ...data, email: e.target.value }))
              }
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
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo((data) => ({ ...data, password: e.target.value }))
              }
            />
          </div>
          <div className="w-full font-bold text-[0.8rem]">
            <label htmlFor="rvpassword" className="block text-start">
              Confirm Password:
            </label>
            <input
              type="password"
              placeholder="Verifique la  contraseña"
              className=" w-full bg-white text-black border-xs border-black rounded p-0.5"
              id="rvpassword"
              required
              value={userInfo.verify_password}
              onChange={(e) =>
                setUserInfo((data) => ({
                  ...data,
                  verify_password: e.target.value,
                }))
              }
            />
          </div>
          {userInfo.password ? (
            passGood ? (
              <div></div>
            ) : (
              <ul className=" bg-white w-full rounded border-black text-base">
                {checkPasswordComplexity(
                  userInfo.password,
                  userInfo.verify_password
                ).map((e) => {
                  if (e) return <li key={e}>{e}</li>;
                })}
              </ul>
            )
          ) : (
            <div />
          )}
          <Button
            color="primary"
            className=" w-1/2 text-xl"
            type="submit"
            isDisabled={!buttonEnabled}
            isLoading={isPending}
          >
            Submit
          </Button>
        </form>
      </div>
    );
}

export default Register;
