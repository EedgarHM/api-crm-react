import Formulario from "../components/Formulario";


const NuevoCliente = () => {

  
  return (
    <>
      <h1 className="font-black text-blue-900 text-4xl">Nuevo Cliente</h1>
      <p>Llena los siguientes campos para crear un cliente</p>
      <hr className="mt-5" />
      <Formulario />
    </>
  );
};

export default NuevoCliente;
