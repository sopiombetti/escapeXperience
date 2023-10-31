import Swal from "sweetalert2";
import axios from "axios";
import { useAdventure } from "../utils/ctx/adventure.ctx";
import { useUser } from "../utils/ctx/user.ctx";
import CharacteristicForm from "./Forms/CharacteristicForm";
import { useState } from "react";


export default function CharacteristicsList() {

    const {state, dispatch} = useAdventure()
    const { characteristics } = state

    const {state: stateUser } = useUser()
    const { users, session } = stateUser

    const [showForm, setShowForm] = useState(false)
    const [edit, setEdit] = useState({
      id: 0,
      nombre: "",
      icono: ""
    })

    const token = session.jwt

    const auth = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const handleEditCharacteristic = (id, nombre, icono) => {
      setEdit({
        id: id,
        nombre: nombre,
        icono: icono
      })
      setShowForm(true)
    }

    const handleDeleteCharacteristics = (id) => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Está seguro de que desea eliminar la característica?',
        text: "Los datos se perderán",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch('DELETE_CHARACTERISTIC', {id: id, auth: auth})
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La característica no se ha eliminado',
            'error'
          )
        }
      })
    }

    return (
      <>
      {showForm ? 
          <CharacteristicForm caracteristicaEdit={edit}/>
          :
          <ul role="list" className="divide-y divide-gray-100">
            {characteristics.map((charact) => (
              <li key={charact.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{charact.nombre}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-row sm:items-end">
                    <button onClick={() => handleEditCharacteristic(charact.id, charact.nombre, charact.icono)}><span className="material-symbols-outlined m-3">edit</span></button>
                    <button onClick={() => handleDeleteCharacteristics(charact.id)}><span className="material-symbols-outlined m-3">delete</span></button>
                </div>
              </li>
            ))}
          </ul>
      }
      </>
    )
  }