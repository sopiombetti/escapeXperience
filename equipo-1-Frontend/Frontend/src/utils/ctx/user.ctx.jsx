import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { createUser, deleteUser, getUser, getUsers, loginUser, updateUser, validateUser } from '../api/user.api';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';

export const userActions = {
    REGISTER: "REGISTER",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    GET_ALL_USERS: "GET_ALL_USERS",
    GET_USER: "GET_USER",
    EDIT_USER: "EDIT_USER",
    DELETE_USER: "DELETE_USER",
    VALIDATE_USER: "VALIDATE_USER"
}

const initialUserReducer = {
    users: [],
    session: JSON.parse(localStorage.getItem("user_session")) || {},
    registerinfo: undefined
}

const useUserReducer = () => {
    const [state, dispatch] = useReducer((state, {type, payload}) => {
        switch (type) {
        case userActions.LOGIN:
            localStorage.setItem('user_session', JSON.stringify(payload))
            return {...state, session: payload}
        case userActions.LOGOUT:
            localStorage.removeItem('user_session')
             return {...state, session: {}}
        case userActions.REGISTER:
            return {...state, users: [...state.users, payload], registerinfo: payload.id}
        case userActions.GET_ALL_USERS:
            return {...state, users: payload}
        case userActions.GET_USER:
            return {...state, session: {...state.session, ...payload}}
        case userActions.EDIT_USER:
            // return {...state, users[users.findIndex(user => user.id === payload.id)] = payload}
            return {...state, users: state.users.map(user => user.id === payload.id ? payload : user)}
        case userActions.DELETE_USER:
            return {...state, users: state.users.filter((user) => user.id !== payload)}
        default:
            return state;
        }
    }, initialUserReducer)


    const asyncDispatch = (type, payload) => {
        switch (type) {
            case userActions.REGISTER:
                createUser(payload)
                .then(response => {
                    dispatch({type, payload: response.data})
                    //asyncDispatch('VALIDATE_USER')
                })
                .catch(error => dispatch("ERROR"));
                break;
            case userActions.VALIDATE_USER:
                validateUser(state.registerinfo)
                .then(response => console.log(response))
                .catch(error => console.log(error));
                break;
            case userActions.LOGIN:
                loginUser(payload)
                .then(response => {
                    dispatch({type, payload: response.data})
                    window.location.replace('/')
                })
                .catch(error => {
                    dispatch("ERROR", error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Las credenciales son incorrectas',
                        text: 'Intente nuevamente'
                    })
                })
                break;
            case userActions.LOGOUT:
                dispatch({type});
                break;
            case userActions.GET_ALL_USERS:
                getUsers(payload)
                .then(response => dispatch({type, payload: response.data}))
                .catch(error => dispatch("ERROR"));
                break;
            case userActions.GET_USER:
                getUser(payload)
                .then(response => dispatch({type, payload: response.data}))
                .catch(error => dispatch("ERROR"));
                break;
            case userActions.EDIT_USER:
                updateUser(payload.id, payload.user, payload.auth)
                .then(response => {
                    dispatch({type, payload: response.data})
                    Swal.fire(
                        'Editado',
                        'Usuario modificado correctamente',
                        'success'
                    )
                })
                .catch(error => {
                    dispatch("ERROR")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo modificar! Intenta de nuevo',
                        footer: error
                    })
                });
                break;
            case userActions.DELETE_USER:
                deleteUser(payload.id, payload.auth)
                .then(response => {
                    dispatch({type, payload: payload.id})
                    Swal.fire(
                        'Eliminado',
                        'Usuario eliminado correctamente',
                        'success'
                    )
                })
                .catch(error => {
                    dispatch("ERROR")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo eliminar! Intenta de nuevo',
                        footer: error
                    })
                });
                break;
            case "ERROR":
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo anda mal',
                    footer: payload
                  })
            default:
                break;
            }
    }

    const memorizedState = useMemo(() => state, [state]);

    return { state: memorizedState, dispatch: asyncDispatch }
};

const UserCtx = createContext(undefined);



const UserContext = ({ children }) => {
    const userReducer = useUserReducer()

    const token = userReducer.state.session.jwt

    const auth = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
        userReducer.dispatch(userActions.GET_ALL_USERS, auth)
    },[])

    return (
        <UserCtx.Provider value={userReducer}>
            {children}
        </UserCtx.Provider>
    );
};

export const useUser = () => useContext(UserCtx);

export default UserContext;