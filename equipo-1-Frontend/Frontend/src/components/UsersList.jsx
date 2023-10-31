import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import axios from "axios"
import FormEditUser from "./Forms/FormEditUser"
import { useUser } from "../utils/ctx/user.ctx"

const UsersList = () => {
  const {state: stateUser, dispatch} = useUser()
  const { users, session } = stateUser

  const [formState, setFormState] = useState()

  const isSuperAdmin = (user) =>{
    if(user.rol === "SUPER_ADMIN"){
      return true
    }
    return false
  }

  const token = session.jwt
    const auth = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro de que desea eliminar este usuario?',
      text: "Los datos se perderán",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch('DELETE_USER', {id: id, auth: auth})
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El usuario no se ha eliminado',
          'error'
        )
      }
    })
  }
  const openForm = (id) => {
    setFormState(id)
  }
  return (
    <>
    <ul role="list" className="divide-y divide-gray-100">
        {users.map((user) => (
          <li key={user.id} className="flex-col items-between gap-x-6 py-5">
            <div className="flex w-full justify-between min-w-0 gap-x-4">
              <div className="h-12 w-12 flex items-center justify-center border-2 rounded-full bg-gray-50 uppercase">
                <span className="font-bold">
                  {user.nombre.slice(0,1)}{user.apellido.slice(0,1)}
                </span>
              </div>
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{user.nombre} {user.apellido}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.rol}</p>
              </div>
              <button 
              className="material-symbols-outlined m-3"
              onClick={()=>openForm(user.id)}
              >edit
            </button>
            {!isSuperAdmin(user) && 
                <button 
                  className="material-symbols-outlined m-3"
                  onClick={() => handleDelete(user.id)}
                  >delete
                </button>}
            </div>
            
            {formState == user.id && <FormEditUser id={user.id} nombre={user.nombre} apellido={user.apellido} email={user.email} contrasenia={user.contrasenia} validacion={user.validacion} atribuciones ={user.atribuciones} rol={user.rol} setFormState={setFormState}/> }             
          </li>
        ))}
      </ul>
  </>
)}

export default UsersList