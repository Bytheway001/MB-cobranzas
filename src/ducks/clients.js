import Axios from "axios";
import { API } from "../utils/utils";
import { onSetNotification, } from "./notifications";

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
export const CLIENT_SELECTED = "CLIENT_SELECTED";
const CLIENT_POLICY_SELECTED = "CLIENT_POLICY_SELECTED";
const MODIFY_CLIENT = "MODIFY_CLIENT";


const onClientProfileSucceeded = (profile) => ({ type: CLIENT_PROFILE_SUCCEEDED, payload: profile })
const onClientShowSucceeded = (data) => ({ type: CLIENT_SHOW_SUCCEEDED, payload: data })

const onClientListRequested = () => ({ type: CLIENT_LIST_REQUESTED })
const onClientListSucceeded = (clientList) => ({ type: CLIENT_LIST_SUCCEEDED, payload: clientList })
const onClientListFailed = (err) => ({ type: CLIENT_LIST_FAILED, payload: err })

const modifyClient = (client)=>({type:MODIFY_CLIENT,payload:client})


export const createBulkClients = (clientList) => {
    return dispatch => {
        Axios.post(API + '/clients/bulk', clientList).then(res => {
            dispatch(onSetNotification('success', res.data.data))
        })
    }
}

/* Receives a serialized client */
export const selectClient =(clientArr)=>{
    return dispatch =>{
        if(clientArr[0]){
            Axios.get(API + '/clients/' + clientArr[0].id).then(res => {
                dispatch(onClientProfileSucceeded(res.data.data))
            })
        } else{
            dispatch(onClientProfileSucceeded(null))
        }
       
    }
}

export const createClient = (data) => {
    return async dispatch => {
            const res = await Axios.post(API + '/clients/create', data);
            dispatch(onClientProfileSucceeded(res.data.data))
            if(data.id){
                dispatch(modifyClient(res.data.data))
            }
            return res.data
    }
}

export const selectClientPolicy = (policyArr)=>{
    return (dispatch,getState)=>{
        let oldState= getState().clients.editing
        let newState=[]
        if(policyArr[0]){
            
            newState=oldState.policies.map((e)=>{
                return{...e,selected:e.id===policyArr[0].id}
            })
        }
        else{
            newState=oldState.policies.map((e)=>{
                return {...e,selected:false}
            })
        }
        dispatch({type:CLIENT_POLICY_SELECTED,payload:{...oldState,policies:newState}})
    }
}

export const createPolicy=(policy)=>{
    
    return async dispatch => {
        try {
            const res =await Axios.post(API + '/clients/policies/create', policy);
            dispatch(onClientProfileSucceeded(res.data.data))
            return res.data;
        } catch (err) {
            return err;
        }
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


export const getClientList = (query = null) => {
    let string = '';
    if (!query) {
        string = API + '/clients/list';
    }
    else {
        string = API + '/clients/list?q=' + query
    }
    return dispatch => {
        dispatch(onClientListRequested())
        Axios.get(string).then(res => {
            dispatch(onClientListSucceeded(res.data.data))
        }).catch(() => {
                dispatch(onSetNotification('danger','Error al procesar la llamada al servidor, presione F5 para actualizar'));
                dispatch(onClientListFailed('Error de servidor'))
        })
    }
}

const clientInitialState = {
    list: [],
    loading: false,
    editing: null,
    showing: null,
    errors: null
}

export const clientReducer = (state = clientInitialState, action) => {
    switch (action.type) {
        case CLIENT_LIST_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case CLIENT_LIST_SUCCEEDED:
            return {
                ...state,
                list: action.payload,
                loading: false
            }
        case CLIENT_LIST_FAILED:
            return {
                ...state,
                list: [],
                loading: false,
                errors: action.payload
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
        case CLIENT_POLICY_SELECTED:{
            return{
                ...state,
                editing:action.payload,

            }
        }
        case MODIFY_CLIENT:{
            const index = state.list.findIndex(x=>x.id===action.payload.id);
            let newArray = [...state.list];
            newArray[index]= action.payload;
            return{
                ...state,
                list:newArray
            }
        }

       
           
        default:
            return state
    }
}