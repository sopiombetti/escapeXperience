import axios from "axios";
import API_URL from "./global.constants";


export const addBooking = async (booking, auth) => await axios.post(`${API_URL}/reserva/registrar`, booking, auth);

export const getBookings = async () => await axios.get(`${API_URL}/reserva/listar`);

// Adventures

export const ADVENTURES_ATTR = { 
    NOMBRE: "nombre",
    DESC: "descripcion",
    OPERADOR: "operador",
    PRECIO: "precio",
    CATEGORIA: "categoria",
    CATEGORIA_ID: "categoria_id",
    UBICACION: "ubicacion",
    FECHA_INICIO: "fechaInicio",
    ARRAY_CARACTERISTICAS: "caracteristicas",
    ARRAY_CARACTERISTICAS_ID: "caracteristicas_id",
    ARRAY_IMAGENES: "imagenes"
}

export const getAdventures = async () => await axios.get(`${API_URL}/aventuras`);

export const addAdventure = async (aventura, auth) => await axios.post(`${API_URL}/aventuras`, 
    aventura,
    {headers: { 
        ...auth,
    }},
  );

export const addImagesForAdventure = async (id, images, auth) => await axios.post(`${API_URL}/aventuras/imagenes/${id}`, 
    images,
    {headers: { 
        "Content-Type": "multipart/form-data",
        ...auth,
    }},
  );

export const deleteAdventure = async (id, auth) => await axios.delete(`${API_URL}/aventuras/${id}`, auth);

export const updateAdventure = async (id) => await axios.put(`${API_URL}/aventuras/${id}`);

export const addRating = async (rating) => await axios.post(`${API_URL}/puntuacion/agregar`, rating);

export const filterByDate = async (date) => await axios.get(`${API_URL}/aventuras/por-fecha/${date}`);

export const filterByWord = async (word) => await axios.get(`${API_URL}/aventuras/search?palabra-clave=${word}`);
// Categories

export const CATEGORIES_ATTR = { 
    NOMBRE:"nombre",
    IMAGE_URL: "urlImage",
    DESC: "descripcion",
    COLOR: "hexColor"
}
    
export const getCategories = async () => await axios.get(`${API_URL}/categorias`);

export const addCategory = async (category, auth) => await axios.post(`${API_URL}/categorias`, category, auth);

export const deleteCategory = async (id, auth) => await axios.delete(`${API_URL}/categorias/${id}`, auth);

export const editCategory = async (id, category, auth) => await axios.put(`${API_URL}/categorias/actualizar/${id}`, category, auth);

// Caracteristics

export const CHARACTERISTICS_ATTR = {
    NOMBRE: "nombre",
    ICONO: "icono",
    CATEGORIA: "categoria_id"
}

export const getCharacteristics = async () => await axios.get(`${API_URL}/caracteristicas`);

export const addCharacteristic = async (characteristic, auth) => await axios.post(`${API_URL}/caracteristicas`, characteristic, auth);

export const deleteCharacteristic = async (id, auth) => await axios.delete(`${API_URL}/caracteristicas/${id}`, auth);

export const editCharacteristic = async (id, charact, auth) => await axios.put(`${API_URL}/caracteristicas/actualizar/${id}`, charact, auth);

//Policies

export const POLICIES_ATTR = { 
    NOMBRE:"nombre",
    DESC: "descripcion"
}

export const getPolicies = async () => await axios.get(`${API_URL}/politicas`);

export const addPolicy = async (policy, auth) => await axios.post(`${API_URL}/politicas`, policy, auth);

export const deletePolicy = async (id, auth) => await axios.delete(`${API_URL}/politicas/${id}`, auth);

export const editPolicy = async (id, policy, auth) => await axios.put(`${API_URL}/politicas/actualizar/${id}`, policy, auth);