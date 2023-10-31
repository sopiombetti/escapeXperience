import { adventureActions, useAdventure } from '../../utils/ctx/adventure.ctx'
import { useCallback, useState } from 'react'
import { useUser } from '../../utils/ctx/user.ctx'
import { Field, Formik, Form } from 'formik'
import { useDropzone } from 'react-dropzone'

const CharacteristicsList = ({form, field, ...props}) => (
  <div className="mt-2 flex gap-x-3">
    <select
      {...field}
      className="col-span-2 min-w-[250px] rounded-md relative border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-secondary-600 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
    >
      <option value="">--Por favor elige una caracteristica--</option>
    {props.data.map(characteristic =>
      <option key={characteristic.id} value={characteristic.id} >{characteristic.nombre}</option>
    )}
    </select>
    <button onClick={props.removeItem} type='button' className='self-center ml-2 border border-secondary-500 rounded-full h-5 w-5 flex items-center justify-center text-secondary col-span-2 font-bold hover:text-secondary-400'>-</button>
  </div>
)

const PoliciesList = ({form, field, ...props}) => (
  <div className="mt-2 flex gap-x-3">
    <select
      {...field}
      className="col-span-2 min-w-[250px] self-end rounded-md relative border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-secondary-600 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
    >
    <option value="">--Por favor elige una politica--</option>
    {props.data.map(policy =>
      <option key={policy.id} value={policy.id} >{policy.titulo}</option>
    )}
    </select>
    <button onClick={props.removeItem} type='button' className='self-center ml-2 border border-secondary-500 rounded-full h-5 w-5 flex items-center justify-center text-secondary col-span-2 font-bold hover:text-secondary-400'>-</button>
  </div>
)

const MB_10 = 10485760;
const bytesToMB = (bytes) => (bytes / 1048576).toFixed(2);
const validateCSVSize = (file) => {
  if (file.size > MB_10) {
    return {
      code: "file-size-too-big",
      message: 'Files sizes must be less than 10MB'
    };
  }
  
}


const Dropzone = ({field, form}) => {
  const {acceptedFiles, fileRejections, getRootProps, getInputProps} = useDropzone({
    multiple: true,
    validator: validateCSVSize,
    accept: {
      "image/jpg": ['.jpg'],
      "image/jpeg": ['.jpeg'],
      "image/png": ['.png'],
    },
    onDrop: acceptedFiles => {
      form.setFieldValue(field.name, acceptedFiles)
    }
  });
  
  const Files = () => acceptedFiles.map(file => (
    <p key={file.path} style={{display: "flex", alignItems: "center", gap: 1}}>
      {file.path} - {bytesToMB(file.size)}mb
    </p>
  ));

  const Errors = () => fileRejections.map(({ file, errors }) => (
    <p key={file.path} style={{display: "flex", alignItems: "center", gap: 1, color: "red"}}>
      {file.path} es mas largo que 100mb ({bytesToMB(file.size)}mb)
    </p>
  ));

  const setPaperVariant = useCallback(() => {
    if (fileRejections.length > 0) {
      return "errors"
    }
    if (acceptedFiles.length > 0) {
    return "valid"
    }
    return "unused"
  }, [fileRejections.length, acceptedFiles.length])


  return (
      <div style={{cursor: "pointer", minHeight: "120px"}} {...getRootProps({className: 'dropzone bg-white flex rounded-md shadow-sm ring-1 ring-inset ring-secondary-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary items-center justify-center'})} >
        <input {...getInputProps()}/>
        {setPaperVariant() === "unused" && <p>Arrastra tus imagenes o haz click para seleccionarlas</p>}
        {setPaperVariant() === "valid" && <Files /> }
        {setPaperVariant() === "errors" && <Errors />}
      </div>
  )
}


const Input = ({field, form, ...props}) => (
    <div className={"mt-2 " + props.labelclassName}>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {props.label} {props.required && <span className="text-secondary">*</span>}
      </label>
      <div className="flex bg-white rounded-md shadow-sm ring-1 ring-inset ring-secondary-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary">
        <input
          className=" block grow border-0 bg-transparent p-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          {...field}
          type={props.type}
          placeholder={props.placeholder}
          required={props.required}
          />
      </div>
    </div>
)

const TextArea = ({field, form, ...props}) => (
  <div className="mt-2">
    <label htmlFor={field.name} className="block text-sm font-medium leading-6 text-gray-900">
      {props.label} {props.required && <span className="text-secondary">*</span>}
    </label>
    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-secondary-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary">
    <textarea
      id={field.name}
      {...field}
      rows={3}
      className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-secondary-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
      required={props.required}
    />
    </div>
  </div>
)

const Select = ({children, field, form, ...props}) => (
  <div className="mt-2">
    <label htmlFor={field.name} className="block text-sm font-medium leading-6 text-gray-900">
      {props.label} {props.required && <span className="text-secondary">*</span>}
    </label>
    <div className="flex bg-white rounded-md shadow-sm ring-1 ring-inset ring-secondary-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary">
      <select
        {...field}
        id={field.name}
        placeholder={props.placeholder}
        className="block grow border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        required={props.required}
        >
          {children}
      </select>
    </div>
  </div>
)



export default function ProductForm({initialSource}) {
  const {state, dispatch} = useAdventure()
  const {state: stateUser} = useUser()
  const { users, session } = stateUser
  
  const { characteristics, categories, policies } = state

  const [characteristicsForm, setCharacteristicsForm] = useState([{id: Date.now(), component: CharacteristicsList}])

  const [policiesForm, setPoliciesForm] = useState([{id:Date.now(), component: PoliciesList}])

  const addCharacteristic = () => {
    const newCharacteristic = {id: Date.now(), component: CharacteristicsList}
    setCharacteristicsForm([...characteristicsForm, newCharacteristic])
  }

  const addPolicy = () => {
    const newPolicy = {id:Date.now(), component: PoliciesList}
    setPoliciesForm([...policiesForm, newPolicy])
  }

  const removeCharacteristicFromForm = (idToRemove) => {
    setCharacteristicsForm(characteristicsForm.filter(({component, id}) => idToRemove !== id))
  }

  const removePolicyFromForm = (idToRemove) => {
    setPoliciesForm(policiesForm.filter(({component, id}) => idToRemove !== id))
  }

  const selectOption = (condition) => {
    if (condition) {
      console.log("hola")
      return {selected: true}
    }
    return {}
  }

  const formInitialValues = initialSource || {
    nombre: '',
    descripcion: '',
    ubicacion: '',
    operador: '',
    precio: '',
    fechaInicio: '',
    categoria_id: '',
    caracteristicas_id: [],
    imagenes: [],
    politicas_id: []
  }

  return (
    <Formik
    initialValues = {formInitialValues}
    onSubmit = {(values, {setSubmitting}) => {
      console.log(values)
      // Object.entries(values).forEach(([key, value]) => {
      //   if (key.includes("caracteristica_") && value !== "") {
      //     values.caracteristicas_id.push(Number.parseInt(value))
      //     delete values[key]
      //   }
      //   if (key.includes("politica_") && value !== "") {
      //     values.politicas_id.push(Number.parseInt(value))
      //     delete values[key]
      //   }
      // })

      // const token = session.jwt
      // const auth = {
      //   'Authorization': `Bearer ${token}`
      // }

      // const imagesForm = new FormData()
      // values.imagenes.forEach(image => {
      //   imagesForm.append("imagenes", image)
      // })
      // values.imagenes = []

      // dispatch(adventureActions.ADD_ADVENTURE, {data: { values, imagesForm: imagesForm}, auth: auth})

      setSubmitting(false)

    }}
    >
      {({
         isSubmitting,
         values
       }) => (
      <Form>
        <div className="space-y-12 m-5">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Nueva Aventura</h2>
            <div className="mt-8 grid grid-cols-8 gap-x-6 gap-y-8">
              <div className="col-span-4">
                <Field name="nombre" type="text" label="Nombre de Aventura" required component={Input} />
              </div>
              <div className="col-span-4">
                <Field label="Categoria" name="categoria_id" id="categoria" required component={Select}>
                  <option value="">--Por favor elige una categoria--</option> 
                  {categories.map(category =>
                    <option selected={category.id === values.categoria_id} key={category.id} value={category.id}>{category.nombre}</option>
                  )}
                </Field>
              </div>
              <div className="col-span-full">
                <Field label="Descripción" name="descripcion" component={TextArea} required/>
              </div>
              <div className="col-span-8">
                <label htmlFor="imagenes" className="block text-sm font-medium leading-6 text-gray-900">
                  Imagenes de Aventura <span className="text-secondary">*</span>
                </label>
                <Field name="imagenes" type="file" required component={Dropzone} />
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Información sobre la reserva</h2>
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Field name="fechaInicio" type="date" min="2023-09-19" label="Fecha Limite" required component={Input} />
              </div>
              <div className="sm:col-span-3">
                <Field name="ubicacion" type="text" label="Ubicación" required component={Input} />
              </div>
              <div className="sm:col-span-3">
                <Field name="operador" type="text" label="Operador" required component={Input} />
              </div>
              <div className="sm:col-span-3">
                <Field name="precio" type="number" label="Precio" placeholder={"$USD"} required component={Input} />
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Características</h2>
            <div className="mt-8 flex-col">
              <div className='flex w-full justify-between'>
                <label htmlFor="caracteristica_id" className="block text-sm font-medium leading-6 text-gray-900">
                  Elegí hasta 9 características:
                </label>
                <button type='button' disabled={characteristicsForm.length >= 9} onClick={addCharacteristic} className='h-8 text-secondary w-64 rounded-md col-span-2 font-bold hover:text-secondary-400'>+ Agregar Característica</button>
              </div>
              {/* {characteristicsForm.map(({component: Characteristic, id}) => <Characteristic key={id} idKey={id} data={characteristics} removeItem={() => removeCharacteristicFromForm(id)} />)} */}
              {characteristicsForm.map(({component: Characteristic, id}) => <Field component={Characteristic} key={id} name={`caracteristica_${id}`} data={characteristics} removeItem={() => removeCharacteristicFromForm(id)} />)}
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Políticas</h2>
            <div className="mt-8 flex-col">
              <div className='flex w-full justify-between'>
                <label htmlFor="politica_id" className="block text-sm font-medium leading-6 text-gray-900">
                  Elegí las políticas:
                </label>
                <button type='button' disabled={policiesForm.length >= 9} onClick={addPolicy} className='h-8 text-secondary w-64 rounded-md col-span-2 font-bold hover:text-secondary-400'>+ Agregar Política</button>
              </div>
              {policiesForm.map(({component: Policies, id}) => <Field component={Policies} key={id} name={`politica_${id}`} data={policies} removeItem={() => removePolicyFromForm(id)} />)}
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-tertiary px-3 py-2 text-sm font-semibold text-color-text-dark shadow-sm hover:bg-tertiary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isSubmitting}
          >
            Guardar
          </button>
        </div>
      </Form>
       )}
    </Formik>
  )
}