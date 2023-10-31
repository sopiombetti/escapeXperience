import Swal from "sweetalert2";
import axios from "axios";
import { useAdventure } from "../utils/ctx/adventure.ctx";
import { useUser } from "../utils/ctx/user.ctx";
import { useState } from "react";
import CategoryForm from "./Forms/CategoryForm";



export default function CategoryList() {

    const {state, dispatch} = useAdventure()
    const { categories } = state

    const { state: stateUser } = useUser()
    const { session } = stateUser
    const [showForm, setShowForm] = useState(false)
    const [edit, setEdit] = useState({
      id: 0,
      nombre: "",
      descripcion: "",
      hexColor: "",
      urlImage: ""
    })

    const token = session.jwt

    const auth = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const handleEditCategory = (id, nombre, descripcion, color, imagen) => {
      setEdit({
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        hexColor: color,
        urlImage: imagen
      })
      setShowForm(true)
    }

    const handleDeleteCategory = (id) => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Está seguro de que desea eliminar la categoría?',
        text: "Los datos se perderán",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch("DELETE_CATEGORY", {id: id, auth: auth})
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La categoría no se ha eliminado',
            'error'
          )
        }
      })
    }

    return (
      <>
        {showForm ? 
          <CategoryForm categoriaEdit={edit}/>
          :
          <ul role="list" className="divide-y divide-gray-100">
            {categories.map((category) => (
              <li key={category.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{category.nombre}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-row sm:items-end">
                    <button onClick={() => handleEditCategory(category.id, category.nombre, category.descripcion, category.hexColor, category.urlImage)}><span className="material-symbols-outlined m-3">edit</span></button>
                    <button onClick={() => handleDeleteCategory(category.id)}><span className="material-symbols-outlined m-3">delete</span></button>
                </div>
              </li>
            ))}
          </ul> 
        }
      </>
    )
  }