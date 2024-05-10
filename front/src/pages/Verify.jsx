import { Link } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { secretVerify } from "../../api/login.api";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function Verify() {
  let params = useParams();
  const [submit, setSubmit] = useState(false);
  const {
    mutate: Verificar,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => secretVerify(data),
    onSettled: () => {
      setSubmit(true);
    },
  });

  useEffect(() => {
    Verificar(params.verifySecret);
  }, [Verificar, params.verifySecret]);

  if (submit && !isPending) {
    return (
      <div className=" flex flex-col justify-center items-center h-5/6 gap-4 min-w-[320px]">
        {isSuccess ? (
          <h1 className=" text-lg font-medium md:text-2xl ">
            Su registro fue completado con exito!
            <br />
            <Link
              href="http://localhost:5173/login"
              color="primary"
              className=" md:text-2xl "
            >
              Inicie seccion
            </Link>{" "}
          </h1>
        ) : (
          <h1 className=" text-lg font-medium md:text-2xl ">
            No se pudo completar su registro intente{" "}
            <Link href="login" color="primary" className=" md:text-2xl">
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
        <h1 className=" text-lg font-medium md:text-2xl ">
          Cargando por favor espere...
        </h1>
      </div>
    );
}

export default Verify;
