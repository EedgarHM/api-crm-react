import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import Error from "./Error";

const Formulario = ({cliente}) => {
    const navigate = useNavigate();
  
    const nuevoClienteSchema = Yup.object().shape({
    
    nombre: Yup.string()
      .min(3, "El nombre es muy corto krnal")
      .max(20, "Que nombre tan largo krnal")
      .required("El nombre del cliente es Obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("El correo no es valido")
      .required("El Email es obligatorio"),
    telefono: Yup.number()
      .positive('Numero debe ser positivo')
      .integer('Numero no valido')
      .typeError('El numero no es valido')
    ,
  });

  const handleSubmit = async (valores) => {
    try {
        const url = 'http://localhost:4000/clientes';
        let resp;
        if(cliente.id){
           resp = await fetch(url.concat(`/${cliente.id}`), {
            method: 'PUT',
            body: JSON.stringify(valores),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        }else{
           resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(valores),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        }

       await resp.json()
        
        navigate('/clientes')
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div
      className="bg-white 
        mt-10 
        px-5 
        py-10 
        shadow-md
        rounded-md
        md:w-3/4 mx-auto
    "
    >
      <h1
        className="
            text-gray-600 
            font-bold 
            text-xl 
            uppercase
            text-center    
        "
      >
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>

      <Formik
        initialValues={{
          nombre:  cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email:   cliente?.email ?? "",
          telefono:cliente?.telefono ?? "",
          notas:   cliente?.notas ?? "",
        }}

        enableReinitialize={true}

        onSubmit={ async (values , {resetForm}) => {
          await handleSubmit(values);
          resetForm()
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          console.log(errors);
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre:{" "}
                </label>
                <Field
                  type="text"
                  id="nombre"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del cliente"
                  name="nombre"
                />

                {errors.nombre && touched.nombre ? (
                  <Error>{errors.nombre}</Error>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:{" "}
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del cliente"
                  name="empresa"
                />

                {errors.empresa && touched.empresa ? (
                  <Error>{errors.empresa}</Error>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  E-mail:{" "}
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="E-mail del cliente"
                  name="email"
                />
              </div>
              {errors.email && touched.email ? (
                <Error>{errors.email}</Error>
              ) : null}

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">
                  Telefono:{" "}
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="telefono del cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Error>{errors.telefono}</Error>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas:{" "}
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Notas del cliente"
                  name="notas"
                />
              </div>

              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 uppercase font-bold w-full text-lg bg-blue-900  p-3 text-white"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {}
}
export default Formulario;
