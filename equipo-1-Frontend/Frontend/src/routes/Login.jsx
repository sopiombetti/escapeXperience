import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../utils/ctx/user.ctx';
import { useEffect } from 'react';


const formSchema = Yup.object().shape({
  email: Yup.string().email('El correo electrónico debe tener el siguiente formato "ejemplo@dominio.com"').required('Ingrese su correo electrónico'),
  password: Yup.string().min(1, 'La contraseña no es válida').max(20, 'La contraseña no es válida').required('Ingrese su contraseña')
})

const Login = () => {
  const {state, dispatch} = useUser()
  const { users, session } = state
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: formSchema,
    onSubmit: values => {
      dispatch('LOGIN', values)
    },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 mt-5">
      <div className="flex flex-col items-center px-6 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h4 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
              Inicia sesión en tu cuenta
            </h4>
            <Formik>
              <form onSubmit={formik.handleSubmit} className="space-y-6" action="#" method="#">
                <div>
                  <label htmlFor="email" className="block font-medium leading-6 text-primary">
                    Correo electrónico
                  </label>
                  <div className="mt-2">
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
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block font-medium leading-6 text-primary">
                      Contraseña
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-secondary-300 focus:outline-secondary-400 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {formik.touched.password && formik.errors.password ? ( <div className="text-[#EF4141] font-medium text-sm">{formik.errors.password}</div> ) : null}
                  </div>
                </div>
              
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-full bg-tertiary px-3 py-1.5 font-semibold leading-6 text-primary shadow-sm hover:bg-tertiary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Ingresar
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  ¿No tienes una cuenta? 
                  <Link to={"/singup"} className="px-2 font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Regístrate
                  </Link>
                </p>
              </form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login