import Swal from "sweetalert2"
import { useAdventure } from "../utils/ctx/adventure.ctx"
import { useUser } from "../utils/ctx/user.ctx"

  
  export default function ProductsList({onEdit}) {

    const {state, dispatch} = useAdventure()
    const { adventures } = state

    const {state: stateUser} = useUser()
    const { users, session } = stateUser

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
        title: '¿Está seguro de que desea eliminar la aventura?',
        text: "Los datos se perderán",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch("DELETE_ADVENTURE", {id: id, auth: auth})
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La aventura no se ha eliminado',
            'error'
          )
        }
      })
    }


    return (
        <ul role="list" className="divide-y divide-gray-100">
          {adventures.map((adventure) => (
            <li key={adventure.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{adventure.nombre}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{adventure.operador}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-row sm:items-end">
                  <button onClick={() => onEdit(adventure)}><span className="material-symbols-outlined m-3">edit</span></button>
                  <button onClick={() => handleDelete(adventure.id)}><span className="material-symbols-outlined m-3">delete</span></button>
              </div>
            </li>
          ))}
        </ul>
    )
  }