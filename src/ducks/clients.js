import { API } from "./root";
import Axios from "axios";
import { onSetNotification } from "./notifications";

export const CLIENT_PROFILE_REQUESTED = "CLIENT_PROFILE_REQUESTED";
export const CLIENT_PROFILE_SUCCEEDED = "CLIENT_PROFILE_SUCCEEDED";
export const CLIENT_PROFILE_FAILED = "CLIENT_PROFILE_FAILED";

export const CLIENT_SHOW_REQUESTED = "CLIENT_SHOW_REQUESTED"
export const CLIENT_SHOW_SUCCEEDED = "CLIENT_SHOW_SUCCEEDED"
export const CLIENT_SHOW_FAILED = "CLIENT_SHOW_FAILED"

export const CLIENT_LIST_REQUESTED = "CLIENT_LIST_REQUESTED";
export const CLIENT_LIST_SUCCEEDED = "CLIENT_LIST_SUCCEEDED";
export const CLIENT_LIST_FAILED = "CLIENT_LIST_FAILED";

export const CLIENT_PROFILE_UPDATED = "CLIENT_PROFILE_UPDATED";

const onClientProfileSucceeded = (profile) => ({ type: CLIENT_PROFILE_SUCCEEDED, payload: profile })
const onClientShowSucceeded = (data) => ({ type: CLIENT_SHOW_SUCCEEDED, payload: data })

const onClientListRequested = (data)=>({type:CLIENT_LIST_REQUESTED})
const onClientListSucceeded = (clientList) => ({ type: CLIENT_LIST_SUCCEEDED, payload: clientList })
const onClientListFailed = (err) => ({ type: CLIENT_LIST_FAILED, payload: err })

const onClientProfileUpdated = (client) => ({ type: CLIENT_PROFILE_UPDATED, payload: client })

export const createBulkClients = (clientList) => {
    return dispatch => {
        Axios.post(API + '/clients/bulk', clientList).then(res => {
            dispatch(onSetNotification('success', res.data.data))
        })
    }
}

export const UpdateClientPolicy = (id, data) => {
    return dispatch => {
        Axios.put(API + '/clients/' + id + '/update', data).then(res => {
            dispatch(onClientProfileUpdated(res.data.data))
            dispatch(onSetNotification('success', "El perfil del cliente ha sido actualizado"))
        })

    }
}

export const createClient = (data) => {
    return dispatch => {
        Axios.post(API + '/clients/create', data).then(res => {
            dispatch(onSetNotification('success', 'Cliente Creado Correctamente'))
        })
    }

}



export const getClientById = (id) => {
    return dispatch => {
        Axios.get(API + '/clients/' + id).then(res => {
            dispatch(onClientProfileSucceeded(res.data.data))
        })
    }
}

export const showClientProfile = (id) => {
    return dispatch => {
        Axios.get(API + '/clients/show/' + id).then(res => {
            dispatch(onClientShowSucceeded(res.data.data))
        })
    }
}

export const getClientList = (search = null) => {

    let string = '';
    if (!search) {
        string = API + '/clients/list';
    }
    else {
        string = API + '/clients/list?criteria=' + search.criteria + '&term=' + search.term
    }

    return dispatch => {
        dispatch(onClientListRequested())
        Axios.get(string).then(res => {
            dispatch(onClientListSucceeded(res.data.data))
        })
            .catch(err => {
                dispatch(onClientListFailed(err))
            })
    }
}

const clientInitialState = {
    list: [],
    loading: false,
    editing: null,
    showing: null
}

export const clientReducer = (state = clientInitialState, action) => {
    switch (action.type) {
        case CLIENT_LIST_REQUESTED:
            return{
                ...state,
                loading:true
            }
        case CLIENT_LIST_SUCCEEDED:
            return {
                ...state,
                list: action.payload,
                loading: false
            }
        case CLIENT_LIST_FAILED:
            return{
                ...state,
                list:[],
                loading:false
            }
        case CLIENT_PROFILE_SUCCEEDED:
            return {
                ...state,
                editing: action.payload,
                loading: false
            }
        case CLIENT_PROFILE_UPDATED:
            return {
                ...state,
                editing: action.payload,
                loading: false
            }
        case CLIENT_SHOW_SUCCEEDED:
            return {
                ...state,
                loading: false,
                showing: action.payload
            }

        default:
            return state
    }
}