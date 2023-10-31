import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../utils/ctx/user.ctx'
import AvatarMenu from '../../components/AvatarMenu'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {state: stateUser, dispatch} = useUser()
  const { users, session } = stateUser

  const navigate = useNavigate()

  const handlelogout = () => {
      dispatch('LOGOUT')
      navigate('/')
  }


  return (
    <header className="bg-secondary sticky top-0 z-40">
      <nav className="flex items-center justify-between py-3 px-4 lg:px-16 md:px-8" aria-label="Global">
        <div className="flex lg:grow">
          <a href="/" className="-m-1.5 p-1.5 flex-column items-start">
            <div className='flex gap-1'>
              <img className="h-8 w-auto" src="/marca/Logo.png" alt="" />
              <img className="h-8 w-auto" src="/marca/Iconotype.png" alt="" />
            </div>
              <span className='text-color-text-white text-sm pl-8 italic'>Una aventura asegurada</span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 text-color-text-white" aria-hidden="true" />
          </button>
        </div>
        {session.id ?
          <div className='hidden lg:flex'>
            <AvatarMenu/>
          </div> 
          :
          <div className="hidden lg:flex lg:grow lg:justify-end lg:gap-x-8 text-color-text-white ">
            <Link to={"/login"} className="text-sm flex flex-col items-center font-semibold leading-6 text-gray-900 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Iniciar Sesión 
            </Link>
            <Link to={"/singup"} className="text-sm flex flex-col items-center font-semibold leading-6 text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
              Crear Cuenta
            </Link>
          </div>
        }
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-secondary text-color-text-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-end">

            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {Object.entries(session).length === 0 ?
                <div className="py-6">
                  <Link
                    to={"/login"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to={"/singup"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Crear Cuenta
                  </Link>
                </div>
                :
                <div className="py-6">
                  <Link
                    to={"/account"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mi Cuenta
                  </Link>
                  <Link
                    to={"/favs"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mis Favoritos
                  </Link>
                  <Link
                    to={"/bookinghistory"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mis Reservas
                  </Link>
                  <Link
                    to={"/admin"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Panel Administración
                  </Link>
                  <button
                    onClick={handlelogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              }
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
