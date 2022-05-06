import { useEffect, useState } from "react";
import Cliente from "../components/Cliente";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const url = "http://localhost:4000/clientes";
        const response = await fetch(url);
        console.log(response);
        const result = await response.json();
        setClientes(result);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerClientesApi();
  }, []);

  const handleEliminar = async  (id) =>{
    const eliminar = confirm('¿Estás Seguro de ELIMINAR este Cliente? ')
    
    if(eliminar){
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const resp = await fetch(url,{
          method: 'DELETE'
        });

        await resp.json()
        const clientesActuales = clientes.filter( cliente => 
          cliente.id !== id
        )
        setClientes(clientesActuales)
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <>
      <h1 className="font-black text-4xl text-blue-900"> Clientes </h1>
      <p className="mt-3"> Administra tus Clientes </p>

      <table className="w-full mt-5 table-auto shadow ">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Email</th>
            <th className="p-2">Telefono</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            clientes.map( cliente => (
              <Cliente
                key={cliente.id}
                cliente = {cliente}
                handleEliminar = {handleEliminar}
              />
            ))
          }
        </tbody>
      </table>
    </>
  );
};

export default Inicio;
