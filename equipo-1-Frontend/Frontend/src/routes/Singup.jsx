import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../utils/ctx/user.ctx';
import { useState } from 'react';

const formSchema = Yup.object().shape({
  nombre: Yup.string().min(3,'El nombre debe tener al menos 3 caracteres').max(30, 'El nombre es muy extenso').required('Ingrese su nombre'),
  apellido: Yup.string().min(3,'El apellido debe tener al menos 3 caracteres').max(30, 'El apellido es muy extenso').required('Ingrese su apellido'),
  contrasenia: Yup.string()
              .min(8, 'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial')
              .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial"
  ).max(16, 'La contraseña debe tener entre 8 y 16 caracteres').required('Ingrese su contraseña'),
  email: Yup.string().email('El correo electrónico debe tener el siguiente formato "ejemplo@dominio.com"').required('Ingrese su correo electrónico'),
  repetirContrasenia: Yup.string().required('Repita la contraseña').oneOf([Yup.ref('contrasenia'), null], 'Las contraseñas no coinciden')
})
const Singup = () => {
  const {state, dispatch} = useUser()
  const navigate = useNavigate()
  const [showConfir, setShowConfir] = useState(false)
  const [disable, setDisable] = useState(true);

  const formik = useFormik({
    initialValues: {
      nombre:'',
      apellido:'',
      contrasenia: '',
      email: '',
      repetirContrasenia: ''
    },
    validationSchema: formSchema,
    onSubmit: values => {
      delete values.repetirContrasenia
      dispatch('REGISTER', values)
      setShowConfir(true)
    },
  });

  const handlevalidation = () => {
    dispatch('VALIDATE_USER')
  }

  return (
  <div className='flex items-center justify-center'>
    
  {showConfir ? 
    <div className='flex-col w-8/12 border-black border-2 text-center space-y-3 py-6 mt-10'>
      <h2>Gracias por registrarse. A continuación le llegará un mail para confirmar su cuenta de correo.</h2>
      <h4>En caso de que no le llegue el mail, puede solicitarlo nuevamente</h4>
      <button onClick={handlevalidation} disabled={disable} className=' w-1/2 justify-center rounded-full bg-tertiary px-3 py-1.5 text-sm font-semibold leading-6 text-primary shadow-sm hover:bg-tertiary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Solicitar mail de confirmación</button>
    </div>
    :
    <section className="bg-gray-50 dark:bg-gray-900 mt-6">
      <div className="flex flex-col items-center px-6 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h4 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
              Registro de usuario
            </h4>
            <Formik>
                <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label htmlFor="nombre" className="block font-medium leading-6 text-primary">Nombre</label>
                    <input
                        id="nombre"
                        name="nombre"
                        type="nombre"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre}
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-secondary-300 focus:outline-secondary-400 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      {formik.touched.nombre && formik.errors.nombre ? ( <div className="text-[#EF4141] font-medium text-sm">{formik.errors.nombre}</div> ) : null}
                  </div>
                  <div>
                    <label htmlFor="apellido" className="block font-medium leading-6 text-primary">Apellido</label>
                    <input
                        id="apellido"
                        name="apellido"
                        type="apellido"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.apellido}
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-secondary-300 focus:outline-secondary-400 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      {formik.touched.apellido && formik.errors.apellido ? ( <div className="text-[#EF4141] font-medium text-sm">{formik.errors.apellido}</div> ) : null}
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-medium leading-6 text-primary">Correo electrónico</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-secondary-300 focus:outline-secondary-400 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      {formik.touched.email && formik.errors.email ? ( <div className="text-[#EF4141] font-medium text-sm">{formik.errors.email}</div> ) : null}
                  </div>
                  <div>
                    <label htmlFor="contrasenia" className="block font-medium leading-6 text-primary">Contraseña</label>
                    <input
                        id="contrasenia"
                        name="contrasenia"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.contrasenia}
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-secondary-300 focus:outline-secondary-400 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      {formik.touched.contrasenia && formik.errors.contrasenia ? ( <div className="text-[#EF4141] font-medium text-sm">{formik.errors.contrasenia}</div> ) : null}                    
                  </div>
                  <div>
                    <label htmlFor="repetirContrasenia" className="block font-medium leading-6 text-primary">Confirmar contraseña</label>
                    <input
                        id="repetirContrasenia"
                        name="repetirContrasenia"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.repetirContrasenia}
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-secondary-300 focus:outline-secondary-400 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                      {formik.touched.repetirContrasenia && formik.errors.repetirContrasenia ? ( <div className="text-[#EF4141] font-medium text-sm">{formik.errors.repetirContrasenia}</div> ) : null}                    
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input defaultChecked 
                        id="terms" 
                        aria-describedby="newsletter" 
                        type="checkbox" 
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                        Acepto recibir novedades y promociones en mi correo electrónico.
                      </label>
                    </div>
                  </div>
                <button type="submit" className="flex w-full justify-center rounded-full bg-tertiary px-3 py-1.5 text-sm font-semibold leading-6 text-primary shadow-sm hover:bg-tertiary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Crear cuenta
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  ¿Ya tienes una cuenta? 
                  <Link to={"/login"} className="px-2 font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Inicia sesión
                  </Link>
                </p>
              </form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  }
</div>
)
}
export default Singup