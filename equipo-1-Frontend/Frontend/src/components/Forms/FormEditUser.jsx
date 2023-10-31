import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useUser } from '../../utils/ctx/user.ctx';
import { useState } from 'react';

const FormEditUser = ({id, nombre, apellido, email, validacion, contrasenia, atribuciones, rol, setFormState}) => {
  
  const {state: stateUser, dispatch} = useUser()
  const { users, session } = stateUser

  const isSuperAdm = (rol)=>{
    if(rol === "SUPER_ADMIN"){
      return true 
    }
    return false
  }

  const [userUpdate, setUserUpdate] = useState({
      id: id,
      nombre: nombre,
      apellido: apellido,
      contrasenia: contrasenia,
      email: email,
      validacion: validacion,
      atribuciones: atribuciones,
      rol: rol
  })

  const token = session.jwt

  const auth = {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch('EDIT_USER', {id: id, user: userUpdate, auth: auth})
  }

  return (
    <Formik>
      <Form className='grid grid-cols-4 gap-4' onSubmit={handleSubmit}>
        <div className="mt-2">
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder={nombre}
            disabled={isSuperAdm(rol)}
            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-secondary-300 focus:outline-secondary-400 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <input
            id="apellido"
            name="apellido"
            type="text"
            placeholder={apellido}
            disabled={isSuperAdm(rol)}
            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-secondary-300 focus:outline-secondary-400 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2 col-2">
          <input
            id="email"
            name="email"
            type="email"
            placeholder={email}
            disabled={isSuperAdm(rol)}
            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-secondary-300 focus:outline-secondary-400 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2">
          <select onChange={(e)=> setUserUpdate({...userUpdate, rol: e.target.value})} className="text-gray-700 dark:text-gray-200 inline-flex justify-start items-start py-2 px-2 text-sm font-medium text-secondary-600 border border-secondary-300 rounded-md hover:bg-off-white focus:ring-2 focus:outline-none focus:ring-secondary-300 dark:bg-secondary-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
            <option selected disabled className="inline-flex w-full px-4 py-2 text-primary shadow-sm ring-1 ring-inset ring-secondary-300 focus:outline-secondary-400 placeholder:text-gray-400 sm:text-sm sm:leading-6">
              Rol
            </option>
            <option disabled={isSuperAdm(rol)} value="USER" className="inline-flex w-full px-4 py-2 text-primary shadow-sm ring-1 ring-inset ring-secondary-300 focus:outline-secondary-400 placeholder:text-gray-400 sm:text-sm sm:leading-6">
              User
            </option>
            <option disabled={isSuperAdm(rol)} value="ADMIN" className="inline-flex w-full px-4 py-2 text-primary shadow-sm ring-1 ring-inset ring-secondary-300 focus:outline-secondary-400 placeholder:text-gray-400 sm:text-sm sm:leading-6">
              Admin
            </option>
          </select>
        </div>
        
          <button
            type="submit"
            className="flex text-sm justify-center mt-2 rounded-full bg-tertiary py-1.5 font-medium leading-6 text-primary shadow-sm hover:bg-tertiary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Guardar cambios
          </button>
          <button
            onClick={()=> setFormState()}
            className="flex text-sm justify-center mt-2 rounded-full bg-tertiary py-1.5 font-medium leading-6 text-primary shadow-sm hover:bg-tertiary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Cancelar
          </button>
        
      </Form>
    </Formik>
  )
}

export default FormEditUser