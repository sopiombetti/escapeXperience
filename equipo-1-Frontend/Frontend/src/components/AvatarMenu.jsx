import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useUser } from '../utils/ctx/user.ctx'
import { Link, useNavigate } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AvatarMenu() {

  const {state: stateUser, dispatch} = useUser()
  const { users, session } = stateUser

  const navigate = useNavigate()

  const handlelogout = () => {
      dispatch('LOGOUT')
      navigate('/')
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center justify-center h-12 w-12 gap-x-1.5 rounded-full bg-secondary px-3 py-2 text-md font-bold text-white shadow-sm ring-1 ring-inset ring-white hover:bg-gray-50">
        {session.nombre.slice(0,1)}{session.apellido.slice(0,1)}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-30 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/account"}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Mi Cuenta
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/favs"}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Mis Favoritos
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/bookinghistory"}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Mis Reservas
                </Link>
              )}
            </Menu.Item>
            {session.usuarioRol.rol == "ADMIN" &&
            <Menu.Item>
            {({ active }) => (
              <Link
                to={"/admin"}
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm'
                )}
              >
                Panel Administración
              </Link>
            )}
            </Menu.Item>
            }
            {session.usuarioRol.rol == "SUPERADMIN" &&
            <Menu.Item>
            {({ active }) => (
              <Link
                to={"/admin"}
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm'
                )}
              >
                Panel Administración
              </Link>
            )}
            </Menu.Item>
            }
            
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handlelogout}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Cerrar Sesión
                  </button>
                )}
              </Menu.Item>
       
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
