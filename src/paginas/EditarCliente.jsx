import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);
  
  const { id } = useParams();
useEffect(() => {
  const getCliente = async () => {
    try {
      const url = `http://localhost:4000/clientes/${id}`;

      const resp = await fetch(url);
      const result = await resp.json();

      setCliente(result);
    } catch (error) {
      console.log(error);
    }
  };
  getCliente();
}, []);

  return (
    <>
      <h1 className="font-black text-blue-900 text-4xl">Editar Cliente</h1>
      <p>Utiliza este formulario para Editar los datos del Cliente</p>
      <hr className="mt-5" />
      {
        cliente?.nombre && (
          <Formulario cliente={cliente} />
        )
      }
    </>
  );
};

export default EditarCliente;
