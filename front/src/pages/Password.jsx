import { Button } from "@nextui-org/react";
import { useState } from "react";
import { recoverPassword } from "../../api/login.api";
import { useMutation } from "@tanstack/react-query";
import { checkEmailComplex } from "../utilities";

function Password() {
  const [email, setEmail] = useState("");
  const {
    mutate: recover,
    isError,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => recoverPassword(data),
    onError: (error) => {
      console.log(error);
    },
  });
  const submitHandler = (e) => {
    e.preventDefault();
    const sendMail = {
      email: email,
    };
    recover(sendMail);
  };
  const buttonEnabled = checkEmailComplex(email);
  if (isSuccess) {
    return (
      <h1 className=" font-medium text-2xl ">
        Chequea tu email para cambiar tu contraseña.
      </h1>
    );
  } else {
    return (
      <div className=" flex flex-col justify-center items-center h-5/6 gap-4 min-w-[320px]">
        <form
          className=" w-72 sm:w-1/2 2xl:w-1/3 text-base flex flex-col items-center gap-4 bg-green-500 rounded px-2 sm:px-12 py-6 shadow-md shadow-green-800"
          onSubmit={submitHandler}
        >
          {isError ? (
            <h1 className=" font-medium text-2xl ">
              No se pudo enviar el email a este correo
            </h1>
          ) : (
            <h1 className=" font-medium text-2xl ">
              Introduce tu email para recuperar la contraseña.
            </h1>
          )}
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
          <Button
            color="primary"
            className=" w-1/2 text-xl"
            type="submit"
            isDisabled={!buttonEnabled}
            isLoading={isPending}
          >
            Enviar
            <i className="fa fa-send" />
          </Button>
        </form>
      </div>
    );
  }
}

export default Password;
