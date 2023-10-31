import Swal from "sweetalert2";
import { useAdventure } from "../utils/ctx/adventure.ctx";
import { useState } from "react";
import PolicyForm from "./Forms/PolicyForm";
import { useUser } from "../utils/ctx/user.ctx";


export default function PoliciesList() {

    const {state, dispatch} = useAdventure()
    const { policies } = state
    const { state: stateUser } = useUser()
    const { session } = stateUser

    const token = session.jwt

    const auth = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const [showForm, setShowForm] = useState(false)
    const [edit, setEdit] = useState({
      id: 0,
      titulo: "",
      descripcion: ""
    })

    const handleEditPolicy = (id, titulo, descripcion) => {
      setEdit({
        id: id,
        titulo: titulo,
        descripcion: descripcion
      })
      setShowForm(true)
    }


    const handleDeletePolicy = (id) => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Está seguro de que desea eliminar la política?',
        text: "Los datos se perderán",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch("DELETE_POLICY", {id: id, auth: auth})
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La política no se ha eliminado',
            'error'
          )
        }
      })
    }

    return (
      <>
      {showForm ?
      <PolicyForm politicaEdit={edit}/>  
      :
      <ul role="list" className="divide-y divide-gray-100">
        {policies.map((policy) => (
          <li key={policy.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{policy.titulo}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-row sm:items-end">
                <button onClick={() => handleEditPolicy(policy.id, policy.titulo, policy.descripcion)}><span className="material-symbols-outlined m-3">edit</span></button>
                <button onClick={() => handleDeletePolicy(policy.id)}><span className="material-symbols-outlined m-3">delete</span></button>
            </div>
          </li>
        ))}
      </ul>
      }
      </>
    )
  }
  