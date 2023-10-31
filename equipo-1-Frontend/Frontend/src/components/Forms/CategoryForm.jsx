import React, { useState } from 'react'
import { useAdventure } from '../../utils/ctx/adventure.ctx'
import { UNSAFE_useRouteId } from 'react-router-dom'
import { useUser } from '../../utils/ctx/user.ctx'

const CategoryForm = ({categoriaEdit}) => {

    const { dispatch } = useAdventure()

    const { state: stateUser } = useUser()
    const { session } = stateUser

    const [newCategory, setNewCategory] = useState({
        nombre: "",
        descripcion: "",
        hexColor: "",
        urlImage: ""
      })
    const [editCategory, setEditCategory] = useState(categoriaEdit)

    const token = session.jwt

    const auth = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const handleSubmitCategory = (e) => {
      e.preventDefault()
      
      if(categoriaEdit){
        dispatch("EDIT_CATEGORY", {id: editCategory.id, category: editCategory, auth: auth})
      }
      else{
      dispatch("ADD_CATEGORY", {category: newCategory, auth: auth})
      }
    }

    return (
        <form className="mt-8 flex flex-col grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6" onSubmit={handleSubmitCategory}>
              <div className="sm:col-span-4">
                <label htmlFor="categoryname" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre de la Categoría*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-secondary-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary sm:max-w-md">
                    <input
                      type="text"
                      name="categoryname"
                      id="categoryname"
                      autoComplete="name"
                      value={categoriaEdit && editCategory.nombre}
                      onChange={(e) => {categoriaEdit ? setEditCategory({...editCategory, nombre: e.target.value}) : setNewCategory({...newCategory, nombre: e.target.value})}}
                      className="block grow border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="categorydescription" className="block text-sm font-medium leading-6 text-gray-900">
                  Descripción*
                </label>
                <div className="mt-2">
                  <textarea
                    id="categorydescription"
                    name="categorydescription"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-secondary-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                    value={categoriaEdit && editCategory.descripcion}
                    onChange={(e) => {categoriaEdit ? setEditCategory({...editCategory, descripcion: e.target.value}) : setNewCategory({...newCategory, descripcion: e.target.value})}}
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="categorycolor" className="block text-sm font-medium leading-6 text-gray-900">
                  Color*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-secondary-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary sm:max-w-[80px]">
                    <input
                      type="color"
                      name="categorycolor"
                      id="categorycolor"
                      autoComplete="color"
                      value={categoriaEdit && editCategory.hexColor}
                      onChange={(e) => {categoriaEdit ? setEditCategory({...editCategory, hexColor: e.target.value}) : setNewCategory({...newCategory, hexColor: e.target.value})}}
                      className="block grow border-0 bg-transparent p-0.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="categoryurl" className="block text-sm font-medium leading-6 text-gray-900">
                  URL de la imagen*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-secondary-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary sm:max-w-md">
                    <input
                      type="text"
                      name="categorurl"
                      id="categoryurl"
                      autoComplete="name"
                      value={categoriaEdit && editCategory.urlImage}
                      onChange={(e) => {categoriaEdit ? setEditCategory({...editCategory, urlImage: e.target.value}) : setNewCategory({...newCategory, urlImage: e.target.value})}}
                      className="block grow border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="rounded-md bg-tertiary px-3 py-2 text-sm font-semibold text-color-text-dark shadow-sm hover:bg-tertiary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Guardar
                </button>
              </div>
            </form>
  )
}

export default CategoryForm