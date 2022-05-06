import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VerCliente = () => {
    
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


  const { nombre, email, notas, empresa, telefono } = cliente;
  return (
    Object.keys(cliente).length > 0 ? (
        <div className="bg-blue-900 shadow-md p-10 rounded">
        <h1 className="font-black text-4xl text-white">Cliente: {nombre}</h1>
        <hr className="mt-5 "/>
        <p className="text-2xl text-gray-300 mt-4">
            <span className="text-blue-300 uppercase font-bold"> Nombre: </span>
            {nombre}
        </p>

        <p className="text-2xl text-gray-300 mt-4">
            <span className="text-blue-300 uppercase font-bold"> Email: </span>
            {email}
        </p>

        <p className="text-2xl text-gray-300 mt-4">
            <span className="text-blue-300 uppercase font-bold"> Telefono: </span>
            {telefono}
        </p>

        <p className="text-2xl text-gray-300 mt-4">
            <span className="text-blue-300 uppercase font-bold"> Empresa: </span>
            {empresa}
        </p>

        <p className="text-2xl text-gray-300 mt-4">
            <span className="text-blue-300 uppercase font-bold"> Notas: </span>
            {notas}
        </p>
    </div>
    ) : (
        <p>No hay resultados</p>
    )
  )
};

export default VerCliente;
