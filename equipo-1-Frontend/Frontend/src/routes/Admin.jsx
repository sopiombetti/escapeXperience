import React, { useEffect, useState } from 'react'
import ProductsList from '../components/ProductsList'
import UsersList from '../components/UsersList'
import ProductForm from '../components/Forms/ProductForm'
import CategoryList from '../components/CategoryList'
import CharacteristicsList from '../components/CharacteristicsList'
import CharacteristicForm from '../components/Forms/CharacteristicForm'
import { useUser } from '../utils/ctx/user.ctx'
import CategoryForm from '../components/Forms/CategoryForm'
import PolicyForm from '../components/Forms/PolicyForm'
import PoliciesList from '../components/PoliciesList'

const initialSectionsViews = {adventure: false, users: false, categories: false, addAventure: false, addCategory: false, characteristics:false, addCharacteristic: false, policies: false, addPolicy: false}

const Admin = () => {
  const [initialAdventureSource, setInitialAdventureSource] = useState()
  const {state: stateUser, dispatch} = useUser()
  const { users, session } = stateUser
 
  const [sectionsViews, setSectionsViews] = useState({adventure: true, users: false, categories: false, addAventure: false, addCategory: false, characteristics:false, addCharacteristic: false, policies: false, addPolicy: false})

  const buttonHandler = (section) => {
    setSectionsViews({...initialSectionsViews, [section]: true})
  }


  const onEditAdventureHandler = (adventure) => {
    let formInitialValues = {}
    if(adventure) {
      formInitialValues = {
        id: adventure.id || "",
        nombre: adventure.nombre || "",
        descripcion: adventure.descripcion || "",
        ubicacion: adventure.ubicacion || "",
        operador: adventure.operador || "",
        precio: adventure.precio || "",
        fechaInicio: adventure.fechaInicio || "",
        categoria_id: adventure.categoria_id || "",
        caracteristicas_id: adventure.caracteristicas.map(c => c.id) || [],
        imagenes: adventure.imagenes || [],
        politicas_id: adventure.politicas.map(c => c.id) || []
      }
      setInitialAdventureSource(formInitialValues)
    } else {
      setInitialAdventureSource(null)
    }
    buttonHandler("addAventure")
  }
  return (
    <>
      <div className="hidden md:flex ">
        <div className='flex w-3/12 min-h-screen items-start bg-tertiary-400 lg:w-2/12'>
          <div className='fixed flex flex-col items-start pl-4 space-y-3'>
            <h2 className='font-bold my-6'>Panel de <br /> Administrador</h2>
            <button className='font-semibold hover:text-primary' onClick={() => buttonHandler("adventure")}>Aventuras</button>
            {session.usuarioRol.rol == "SUPERADMIN" &&
            <button className='font-semibold hover:text-primary' onClick={() => buttonHandler("users")}>Usuarios</button>}
            {session.usuarioRol.rol == "SUPERADMIN" &&
            <button className='font-semibold hover:text-primary' onClick={() => buttonHandler("categories")}>Categorías</button>}
            {session.usuarioRol.rol == "ADMIN" &&
            <button className='font-semibold hover:text-primary' onClick={() => buttonHandler("categories")}>Categorías</button>}
            {session.usuarioRol.rol == "SUPERADMIN" &&
            <button className='font-semibold hover:text-primary' onClick={() => buttonHandler("characteristics")}>Características</button>}
            {session.usuarioRol.rol == "ADMIN" &&
            <button className='font-semibold hover:text-primary' onClick={() => buttonHandler("characteristics")}>Características</button>}
            {session.usuarioRol.rol == "SUPERADMIN" &&
            <button className='font-semibold hover:text-primary' onClick={() => buttonHandler("policies")}>Políticas</button>}
            {session.usuarioRol.rol == "ADMIN" &&
            <button className='font-semibold hover:text-primary' onClick={() => buttonHandler("policies")}>Políticas</button>}
          </div>
        </div>
        <section className='w-10/12 m-5 flex flex-col items-center'>
          {sectionsViews["adventure"] && 
            <div className='w-10/12'>
              <div className='flex justify-between items-center my-4'>
                <div>
                  <h2 className='mt-4 mb-1.5'>Listado de Aventuras</h2>
                  <hr className="underline w-20 text-tertiary border-2"/>
                </div>
                <button className='h-8 my-2 text-secondary w-56 rounded-md  font-bold hover:text-secondary-400' onClick={() => onEditAdventureHandler(null)}>+ Agregar Nueva Aventura</button>
              </div>
              <ProductsList onEdit={onEditAdventureHandler} />
            </div>
          }
          {sectionsViews["users"] && 
            <div className='w-10/12'>
              <div>
                <h2 className='mt-4 mb-1.5'>Listado de Usuarios</h2>
                <hr className="underline w-20 text-tertiary border-2"/>
              </div>
              <UsersList/>
            </div>
          }
          {sectionsViews["addAventure"] && 
            <div className='lg:w-8/12 md:w-full'>
              <ProductForm initialSource={initialAdventureSource}/>
            </div>
          }
          {sectionsViews["characteristics"] && 
            <div className='w-10/12'>
              <div className='flex items-center justify-between my-4'>
                <div>
                  <h2 className='mt-4 mb-1.5'>Listado de Características</h2>
                  <hr className="underline w-20 text-tertiary border-2"/>
                </div>
                <button className='h-8 my-2 text-secondary w-70 rounded-md  font-bold hover:text-secondary-400' onClick={() => buttonHandler("addCharacteristic")}>+ Agregar Nueva Característica</button>
              </div>
              <CharacteristicsList/>
            </div>
          }
          {sectionsViews["addCharacteristic"] && 
            <div className='w-8/12'>
              <CharacteristicForm/>
            </div>
          }
          {sectionsViews["categories"] && 
            <div className='w-10/12'>
              <div className='flex items-center justify-between my-4'>
                <div>
                  <h2 className='mt-4 mb-1.5'>Listado de Categorías</h2>
                  <hr className="underline w-20 text-tertiary border-2"/>
                </div>
                <button className='h-8 my-2 text-secondary w-56 rounded-md  font-bold hover:text-secondary-400' onClick={() => buttonHandler("addCategory")}>+ Agregar Nueva Categoría</button>
              </div>
              <CategoryList/>
            </div>
          }
          {sectionsViews["addCategory"] && 
            <div className='w-8/12'>
              <CategoryForm/>
            </div>
          }
          {sectionsViews["policies"] && 
            <div className='w-10/12'>
              <div className='flex items-center justify-between my-4'>
                <div>
                  <h2 className='mt-4 mb-1.5'>Listado de Políticas</h2>
                  <hr className="underline w-20 text-tertiary border-2"/>
                </div>
                <button className='h-8 my-2 text-secondary w-56 rounded-md  font-bold hover:text-secondary-400' onClick={() => buttonHandler("addPolicy")}>+ Agregar Nueva Política</button>
              </div>
              <PoliciesList/>
            </div>
          }
          {sectionsViews["addPolicy"] && 
            <div className='w-8/12'>
              <PolicyForm/>
            </div>
          }
        </section>
      
      </div>
      <div className='flex items-center justify-center mx-4 mt-10 md:hidden'>
          <h2 className='font-bold text-center'>El panel de administrador no está disponible en dispositivos móviles</h2>
      </div>
    </>
  )
}

export default Admin