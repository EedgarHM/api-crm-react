import { useNavigate } from "react-router-dom";



const Cliente = ({cliente, handleEliminar}) => {
    const {nombre, empresa, telefono,email, notas, id } = cliente;

    const navigate = useNavigate();

  return (
    <tr className='border-b hover:bg-slate-300'>
        <td className='p-3 text-center'>{nombre}</td>
        <td className='p-3 text-center'>{empresa}</td>
        <td className='p-3 text-center'>{email}</td>
        <td className='p-3 text-center'>{telefono}</td>

        <td className='p-3 text-center'>

                <button 
                    type='button'
                    className='bg-green-700 hover:bg-green-900 block w-full text-white p-2 uppercase mt-3'
                    onClick={()=> navigate(`/clientes/${id}`)}
                >
                    Ver
                </button>
                
                <button 

                    type='button'
                    className='bg-blue-900 hover:bg-blue-700 block w-full text-white p-2 uppercase mt-3'
                    onClick={()=> navigate(`/clientes/editar/${id}`)}
                >
                    Editar
                </button>

                <button 
                    type='button'
                    className='bg-red-700 hover:bg-red-900 block w-full text-white p-2 uppercase mt-3'
                    onClick={()=> handleEliminar(id)}
                >
                    Eliminar
                </button>
        </td>
    </tr>
  )
}

export default Cliente