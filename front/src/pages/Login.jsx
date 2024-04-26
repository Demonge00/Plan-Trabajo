import { Button, Link } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { registerUser } from "../../api/login.api";
import { useNavigate } from "react-router-dom";

function Register() {
  // const [userInfo, setUserInfo] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // setUserInfo((data) => ({ ...data, name: "jgkglhgl" })); //Agrupar propiedades
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonEn, setButtonEn] = useState(false);
  const navigate = useNavigate();
  const { loading, submit, succes, register } = registerUser();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("test");
    const userinfo = {
      email: email,
      password: password,
    };
    register(userinfo);
  };

  useEffect(() => {
    if (email && password) setButtonEn(true);
    else setButtonEn(false);
  }, [email, password]);

  if (submit) {
    return (
      <div className=" flex flex-col justify-center items-center h-5/6 gap-4 min-w-[320px]">
        {succes ? (
          navigate("/profile")
        ) : (
          <h1 className=" text-lg font-medium md:text-2xl ">
            No se pudo completar su registro intente{" "}
            <Link href="register" color="primary" className=" md:text-2xl">
              registrarse
            </Link>{" "}
            nuevamente.
          </h1>
        )}
      </div>
    );
  } else
    return (
      <div className=" flex flex-col justify-center items-center h-5/6 gap-4 min-w-[320px]">
        <form
          className=" w-72 sm:w-1/2 2xl:w-1/3 text-base flex flex-col items-center gap-4 bg-green-500 rounded px-2 sm:px-12 py-6 shadow-md shadow-green-800"
          onSubmit={submitHandler}
        >
          <h1 className=" font-medium text-2xl ">Inicia sección y trabaja!</h1>

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

          <Button
            color="primary"
            className=" w-1/2 text-xl"
            type="submit"
            isDisabled={!buttonEn}
            isLoading={loading}
          >
            Conectarse
          </Button>
        </form>
      </div>
    );
}

export default Register;
