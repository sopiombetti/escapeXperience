import axios from "axios";
import API_URL from "./global.constants";

export const USER_ATTR = {
    ID: "id",
    NOMBRE: "nombre",
    APELLIDO: "apellido",
    PASSWORD: "contrasenia",
    EMAIL: "email",
    VALIDACION: "validacion",
    ARRAY_ATRIBUCIONES: "atribuciones",
    ROL: "rol",
    TOKEN: "token"
}

export const getUsers = async (auth) => await axios.get(`${API_URL}/usuario`, auth);

export const createUser = async (user) => await axios.post(`${API_URL}/usuario/registrar`, user);

export const getUser = async (id) => await axios.get(`${API_URL}/usuario/${id}`);

export const updateUser = async (id, user, auth) => await axios.put(`${API_URL}/usuario/actualizar/${id}`, user, auth);

export const loginUser = async (login_data) => await axios.post(`${API_URL}/login`, login_data);

export const deleteUser = async (id, auth) => await axios.delete(`${API_URL}/usuario/${id}`, auth);

export const validateUser = async(id) => await axios.get(`${API_URL}/mail/validacion/${id}`)