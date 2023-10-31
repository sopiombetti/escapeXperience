import { createContext, useContext, useEffect, useMemo, useReducer} from "react";
import { addAdventure, deleteAdventure, getAdventures,filterByDate, filterByWord, getCategories, deleteCategory, addCategory, getCharacteristics, addCharacteristic, deleteCharacteristic, getPolicies, addPolicy, deletePolicy, addRating, editCategory, editCharacteristic, editPolicy, addBooking, addImagesForAdventure, getBookings } from "../api/adventures.api";
import shuffle from "../scripts/shuffle_array";
import Swal from "sweetalert2";

export const adventureActions = {
    GET_ALL_ADVENTURES: "GET_ALL_ADVENTURES",
    ADD_ADVENTURE: "ADD_ADVENTURE",
    EDIT_ADVENTURE: "EDIT_ADVENTURE",
    DELETE_ADVENTURE: "DELETE_ADVENTURE",
    LIKE_ADVENTURE: "LIKE_ADVENTURE",
    DISLIKE_ADVENTURE: "DISLIKE_ADVENTURE",
    ADD_RATING: "ADD_RATING",
    FILTER_BY_DATE: "FILTER_BY_DATE",
    FILTER_BY_WORD: "FILTER_BY_WORD",
    SET_DATE_SELECTED: "SET_DATE_SELECTED",
    SET_KEYWORD_FILTER: "SET_KEYWORD_FILTER",
    SET_FILTERED_ADV: "SET_FILTERED_ADV"
}

export const categoriesActions = {
    GET_ALL_CATEGORIES: "GET_ALL_CATEGORIES",
    ADD_CATEGORY: "ADD_CATEGORY",
    DELETE_CATEGORY: "DELETE_CATEGORY",
    EDIT_CATEGORY: "EDIT_CATEGORY",
    SET_FILER_CATEGORIES: "SET_FILER",
}

export const characteristicsActions = {
    GET_ALL_CHARACTERISTICS: "GET_ALL_CHARACTERISTICS",
    ADD_CHARACTERISTIC: "ADD_CHARACTERISTIC",
    DELETE_CHARACTERISTIC: "DELETE_CHARACTERISTIC",
    EDIT_CHARACT: "EDIT_CHARACT"
}

export const policiesActions = {
    GET_ALL_POLICIES: "GET_ALL_POLICIES",
    ADD_POLICY: "ADD_POLICY",
    DELETE_POLICY: "DELETE_POLICY",
    EDIT_POLICY: "EDIT_POLICY"
}

export const bookingActions = {
    ADD_BOOKING: "ADD_BOOKING",
    GET_ALL_BOOKINGS: "GET_ALL_BOOKINGS"
}

const initialAdventureReducer = {
    adventures: [],
    categories: [],
    categories_filters: [],
    characteristics: [],
    adventuresFavs: JSON.parse(localStorage.getItem("favs")) || [],
    policies: [],
    date_selected_filter: [],
    filtered_adventures: [],
    palabraClave_filter: '',
    bookings: []
}

const useAdventureReducer = () => {
    const [state, dispatch] = useReducer((state, {type, payload}) => {
        switch (type) {
        case adventureActions.GET_ALL_ADVENTURES:
            return {...state, adventures: shuffle(payload)}
        case adventureActions.ADD_ADVENTURE:
            return {...state, adventures: shuffle([...state.adventures, payload])}
        case adventureActions.DELETE_ADVENTURE:
            return {...state, adventures: state.adventures.filter((adventure) => adventure.id !== payload)}
        case adventureActions.LIKE_ADVENTURE:
            localStorage.setItem('favs', JSON.stringify(payload))
            return {...state, adventuresFavs: payload}
        case adventureActions.DISLIKE_ADVENTURE:
            localStorage.setItem('favs', JSON.stringify(payload))
            return {...state, adventuresFavs: payload}
        // case adventureActions.ADD_RATING:
        //     return {...state}
        case adventureActions.SET_DATE_SELECTED:
            return {...state, date_selected_filter: payload}
        case adventureActions.FILTER_BY_DATE:
            return {...state, filtered_adventures: payload}  
        case adventureActions.SET_KEYWORD_FILTER:
            return {...state, palabraClave_filter: payload}
        case adventureActions.FILTER_BY_WORD:
            return {...state, filtered_adventures: payload}
        case categoriesActions.GET_ALL_CATEGORIES:
            return {...state, categories: payload}
        case categoriesActions.ADD_CATEGORY:
            return {...state, categories: [...state.categories, payload]}
        case categoriesActions.DELETE_CATEGORY:
            return {...state, categories: state.categories.filter((category) => category.id !== payload)}
        case categoriesActions.EDIT_CATEGORY:
            return {...state, categories: state.categories.map(category => category.id === payload.id ? payload : category)}
        case categoriesActions.SET_FILER_CATEGORIES:
            return {...state, categories_filters: payload}
        case characteristicsActions.GET_ALL_CHARACTERISTICS:
            return {...state, characteristics: payload}
        case characteristicsActions.ADD_CHARACTERISTIC:
            return {...state, characteristics: [...state.characteristics, payload]}
        case characteristicsActions.DELETE_CHARACTERISTIC:
            return {...state, characteristics: state.characteristics.filter((characteristic) => characteristic.id !== payload)}
        case characteristicsActions.EDIT_CHARACT:
            return {...state, characteristics: state.characteristics.map(charact => charact.id === payload.id ? payload : charact)}
        case policiesActions.GET_ALL_POLICIES:
            return {...state, policies: payload}
        case policiesActions.ADD_POLICY:
            return {...state, policies: [...state.policies, payload]}
        case policiesActions.DELETE_POLICY:
            return {...state, policies: state.policies.filter((policy) => policy.id !== payload)}
        case policiesActions.EDIT_POLICY:
            return {...state, policies: state.policies.map(policy => policy.id === payload.id ? payload : policy)}
        case bookingActions.GET_ALL_BOOKINGS:
            return {...state, bookings: payload}
        case bookingActions.ADD_BOOKING:
            return {...state, bookings: [...state.bookings, payload]}
        default:
            return state;
        }
    }, initialAdventureReducer)

    const asyncDispatch = (type, payload) => {
        switch (type) {
            case adventureActions.GET_ALL_ADVENTURES:
                getAdventures()
                .then(response => dispatch({type, payload: response.data}))
                .catch(error => dispatch("ERROR"));
                break;
            case adventureActions.ADD_ADVENTURE:
                addAdventure(payload.data.values, payload.auth)
                .then(response => {
                    addImagesForAdventure(response.data.id, payload.data.imagesForm, payload.auth)
                    .then(responseImage => {
                        asyncDispatch(adventureActions.GET_ALL_ADVENTURES)
                        Swal.fire({
                            icon: 'success',
                            title: 'Genial!',
                            text: 'La aventura a sido creada correctamente',
                        })
                    })
                    .catch(error => {
                        dispatch("ERROR")
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se pudo agregar las imagenes para la aventura',
                            footer: error
                        })
                    })
                })
                .catch(error => {
                    dispatch("ERROR")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo agregar la aventura',
                        footer: error
                    })
                })
                break;                
            case adventureActions.DELETE_ADVENTURE:
                deleteAdventure(payload.id, payload.auth)
                .then(response => {
                    dispatch({type, payload: payload.id})
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'La aventura se eliminó correctamente',
                    })
            })
                .catch(error => {
                    dispatch("ERROR")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo eliminar la aventura',
                        footer: error
                    })
            });
                break;
            case adventureActions.LIKE_ADVENTURE:
                dispatch({type, payload});
                break;
            case adventureActions.DISLIKE_ADVENTURE:
                dispatch({type, payload});
                break;
            case adventureActions.ADD_RATING:
                addRating(payload)
                .then(response => {
                    dispatch({type, payload: response.data})
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'La valoración se agregó correctamente',
                    })
                })
                .catch(error => dispatch("ERROR"));
                break;
            case adventureActions.SET_DATE_SELECTED:
                dispatch({type, payload})
                break;
            case adventureActions.FILTER_BY_DATE:
                filterByDate(payload)
                .then(response => dispatch({type, payload: response.data}))  
                .catch(error => {
                    dispatch("ERROR")
                    Swal.fire({
                        icon: 'error',
                        title: 'Lo sentimos',
                        text: 'No hay actividades para la fecha seleccionada, intente con otra fecha distinta',
                        footer: error
                    })
                });
                break;
            case adventureActions.SET_KEYWORD_FILTER:
                dispatch({type, payload})
                break;
            case adventureActions.FILTER_BY_WORD:
                filterByWord(payload)
                .then(response => dispatch({type, payload: response.data}))  
                .catch(error => dispatch("ERROR"));
                break;

            case categoriesActions.GET_ALL_CATEGORIES:
                getCategories()
                .then(response => dispatch({type, payload: response.data}))
                .catch(error => dispatch("ERROR"));
                break;
            case categoriesActions.ADD_CATEGORY:
                addCategory(payload.category, payload.auth)
                .then(response => {
                    dispatch({type, payload: response.data})
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'La categoría se agregó correctamente',
                    })
                })
                .catch(error => {
                    dispatch("ERROR")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo agregar la categoría',
                        footer: error
                    })
                });
                break;
            case categoriesActions.DELETE_CATEGORY:
                deleteCategory(payload.id, payload.auth)
                .then(response => {
                    dispatch({type, payload: payload.id})
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'La categoría se eliminó correctamente',
                    })
                })
                .catch(error => {
                    dispatch("ERROR")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo eliminar la categoría',
                        footer: error
                    })
                });
                break;
            case categoriesActions.EDIT_CATEGORY:
                editCategory(payload.id, payload.category, payload.auth)
                .then(response => {
                    dispatch({type, payload: response.data})
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualizado',
                        text: 'La categoría se actualizó correctamente',
                    })
                })
                .catch(error => {
                    dispatch("ERROR")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo actualizar la categoría',
                        footer: error
                    })
                });
                break;
            case categoriesActions.SET_FILER_CATEGORIES:
                dispatch({type, payload})
                break;
            case characteristicsActions.GET_ALL_CHARACTERISTICS:
                getCharacteristics()
                .then(response => dispatch({type, payload: response.data}))
                .catch(error => dispatch("ERROR"));
                break;
            case characteristicsActions.ADD_CHARACTERISTIC:
                addCharacteristic(payload.characteristic, payload.auth)
                .then(response => {
                    dispatch({type, payload: response.data})
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'La característica se agregó correctamente',
                    })
                })
                .catch(error => {
                    dispatch("ERROR")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo agregar la característica',
                        footer: error
                    })
                });
                break;
            case characteristicsActions.DELETE_CHARACTERISTIC:
                deleteCharacteristic(payload.id, payload.auth)
                .then(response => {
                    dispatch({type, payload: payload.id})
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'La característica se eliminó correctamente',
                    })
                })
                .catch(error => {
                    dispatch("ERROR")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo eliminar la característica',
                        footer: error
                    })
                });
                break;
            case characteristicsActions.EDIT_CHARACT:
                editCharacteristic(payload.id, payload.charact, payload.auth)
                .then(response => {
                    dispatch({type, payload: response.data})
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualizado',
                        text: 'La característica se actualizó correctamente',
                    })
                })
                .catch(error => {
                    dispatch("ERROR")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo actualizar la característica',
                        footer: error
                    })
                });
                break;
            case policiesActions.GET_ALL_POLICIES:
                getPolicies()
                .then(response => dispatch({type, payload: response.data}))
                .catch(error => dispatch("ERROR"));
                break;
            case policiesActions.ADD_POLICY:
                addPolicy(payload.policy, payload.auth)
                .then(response => {
                    dispatch({type, payload: response.data})
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'La política se agregó correctamente',
                    })
                })
                .catch(error => {
                    dispatch("ERROR")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo agregar la política',
                        footer: error
                    })
                });
                break;
            case policiesActions.DELETE_POLICY:
                deletePolicy(payload.id, payload.auth)
                .then(response => {
                    dispatch({type, payload: payload.id})
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'La política se eliminó correctamente',
                    })
                })
                .catch(error => {
                    dispatch("ERROR")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo eliminar la política',
                        footer: error
                    })
                });
                break;
            case policiesActions.EDIT_POLICY:
                editPolicy(payload.id, payload.policy, payload.auth)
                .then(response => {
                    dispatch({type, payload: response.data})
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualizado',
                        text: 'La política se actualizó correctamente',
                    })
                })
                .catch(error => {
                    dispatch("ERROR")
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo actualizar la política',
                        footer: error
                    })
                });
                break;
            case bookingActions.GET_ALL_BOOKINGS:
                getBookings()
                .then(response => dispatch({type, payload: response.data}))
                .catch(error => dispatch("ERROR"));
                break;
            case bookingActions.ADD_BOOKING:
                addBooking(payload.booking, payload.auth)
                .then(response => {
                    dispatch({type, payload: response.data})
                    window.location.replace('/confirmbooking/ok')
                })
                .catch(error => {
                    window.location.replace(`/confirmbooking/${error}`)
                })
            default:
                break;
            }
    }

    const memorizedState = useMemo(() => state, [state]);

    return { state: memorizedState, dispatch: asyncDispatch }
};

const AdventureContext = createContext();

const AdventureCtx = ({ children }) => {
    const adventureReudcer = useAdventureReducer()
    
    useEffect(() => {
        adventureReudcer.dispatch(adventureActions.GET_ALL_ADVENTURES)
        adventureReudcer.dispatch(categoriesActions.GET_ALL_CATEGORIES)
        adventureReudcer.dispatch(characteristicsActions.GET_ALL_CHARACTERISTICS)
        adventureReudcer.dispatch(policiesActions.GET_ALL_POLICIES)
        adventureReudcer.dispatch(bookingActions.GET_ALL_BOOKINGS)
    }, [])

    return (
        <AdventureContext.Provider value={adventureReudcer}>
            {children}
        </AdventureContext.Provider>
    );
}

export default AdventureCtx;

export const useAdventure = () => useContext(AdventureContext);