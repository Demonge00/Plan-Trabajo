import { Button, Link } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { checkPasswordComplexity, checkEmailComplex } from "../utilities";
import { registerUser } from "../../api/login.api";

function Register() {
  // const [userInfo, setUserInfo] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // setUserInfo((data) => ({ ...data, name: "jgkglhgl" })); //Agrupar propiedades

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [buttonEn, setButtonEn] = useState(false);
  const [passGood, setPassGood] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [succes, setSucces] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("test");
    const userinfo = {
      name: name,
      email: email,
      password: password,
    };
    registerUser(userinfo)
      .then(() => {
        setLoading(false), setSubmit(true), setSucces(true);
      })
      .catch(() => {
        setLoading(false), setSubmit(true), setSucces(false);
      });
  };

  useEffect(() => {
    if (loading || succes || submit) console.log("test");
    if (password || rpassword) {
      if (checkPasswordComplexity(password, rpassword).length == 0)
        setPassGood(true);
      else setPassGood(false);
    }
    if (name && checkEmailComplex(email) && passGood) setButtonEn(true);
    else setButtonEn(false);
  }, [email, name, password, rpassword, passGood, submit, loading, succes]);

  if (submit) {
    return (
      <div className=" flex flex-col justify-center items-center h-5/6 gap-4 min-w-[320px]">
        {succes ? (
          <h1 className=" text-lg font-medium md:text-2xl ">
            Registro correcto. Revise su email para confirmar su cuenta.
          </h1>
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
          className=" w-72 sm:w-1/2 xl:w-1/4 text-base flex flex-col items-center gap-4 bg-green-500 rounded px-2 sm:px-12 py-6 shadow-md shadow-green-800"
          onSubmit={submitHandler}
        >
          <h1 className="  font-medium text-2xl ">Registrate!</h1>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={rpassword}
              onChange={(e) => setRPassword(e.target.value)}
            />
          </div>
          {password ? (
            passGood ? (
              <div>Password is Correct</div>
            ) : (
              <ul className=" bg-white w-full rounded border-black text-base">
                {checkPasswordComplexity(password, rpassword).map((e) => {
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
            isDisabled={!buttonEn}
            isLoading={loading}
          >
            Submit
          </Button>
        </form>
      </div>
    );
}

export default Register;
