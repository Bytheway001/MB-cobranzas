import Axios from "axios";
import { API } from "./root";
import { onSetNotification } from "./notifications";

export const AGENT_LIST_REQUESTED = "AGENT_LIST_REQUESTED";
export const AGENT_LIST_SUCCEEDED = "AGENT_LIST_SUCCEEDED";
export const AGENT_LIST_FAILED = "AGENT_LIST_FAILED";

export const COLLECTOR_LIST_REQUESTED = 'COLLECTOR_LIST_REQUESTED'
export const COLLECTOR_LIST_SUCCEEDED = 'COLLECTOR_LIST_SUCCEEDED'
export const COLLECTOR_LIST_FAILED = 'COLLECTOR_LIST_FAILED'

export const CLIENT_PROFILE_REQUESTED = "CLIENT_PROFILE_REQUESTED";
export const CLIENT_PROFILE_SUCCEEDED = "CLIENT_PROFILE_SUCCEEDED";
export const CLIENT_PROFILE_FAILED = "CLIENT_PROFILE_FAILED";

export const CLIENT_LIST_REQUESTED = "CLIENT_LIST_REQUESTED";
export const CLIENT_LIST_SUCCEEDED = "CLIENT_LIST_SUCCEEDED";
export const CLIENT_LIST_FAILED = "CLIENT_LIST_FAILED";


const onAgentListRequested = () => ({ type: AGENT_LIST_REQUESTED })
const onAgentListSucceeded = (data) => ({ type: AGENT_LIST_SUCCEEDED, payload: data })
const onAgentListFailed = (error) => ({ type: AGENT_LIST_FAILED, payload: error })

const onCollectorListRequested = () => ({ type: COLLECTOR_LIST_REQUESTED })
const onCollectorListSucceeded = (data) => ({ type: COLLECTOR_LIST_SUCCEEDED, payload: data })
const onCollectorListFailed = (err) => ({ type: COLLECTOR_LIST_FAILED, payload: err })

const onClientProfileRequested = () => ({ type: CLIENT_PROFILE_REQUESTED })
const onClientProfileSucceeded = (profile) => ({ type: CLIENT_PROFILE_SUCCEEDED, payload: profile })
const onClientProfileFailed = (err) => ({ type: CLIENT_PROFILE_FAILED, payload: err })

const onClientListRequested = () => ({ type: CLIENT_LIST_REQUESTED })
const onClientListSucceeded = (clientList) => ({ type: CLIENT_LIST_SUCCEEDED, payload: clientList })
const onClientListFailed = (err) => ({ type: CLIENT_LIST_FAILED, payload: err })



const initialState = {
    agents: [],
    collectors: [],
    loading: false
}

const clientInitialState = {
    list: [],
    loading: false,
    editing: null
}


export const getClientById = (id) => {
    return dispatch => {
        Axios.get(API + '/clients/' + id).then(res => {
            dispatch(onClientProfileSucceeded(res.data.data))
        })
    }
}

export const getClientList = (search = null) => {
   
    let string = '';
    if (!search) {
        string=API+'/clients/list';
    }
    else{
        string=API+'/clients/list?criteria='+search.criteria+'&term='+search.term
    }

    return dispatch => {
        Axios.get(string).then(res => {
            dispatch(onClientListSucceeded(res.data.data))
        })
        .catch(err=>{
            dispatch(onClientListFailed(err))
        })
    }
}

export const getAgents = () => {
    return dispatch => {
        dispatch(onAgentListRequested())
        Axios.get(API + '/agents').then(res => {

            dispatch(onAgentListSucceeded(res.data.data))
        })
            .catch(err => dispatch(onAgentListFailed(err)))
    }
}

export const getCollectors = () => {
    return dispatch => {
        dispatch(onCollectorListRequested())
        Axios.get(API + '/collectors').then(res => {
            dispatch(onCollectorListSucceeded(res.data.data))
        })
            .catch(err => dispatch(onCollectorListFailed(err)))
    }
}

export const createClient = (data) => {
    return dispatch => {
        Axios.post(API + '/clients/create', data).then(res => {
            dispatch(onSetNotification('success', res.data.data))
        })
    }

}

export const createBulkClients = (clientList) => {
    return dispatch => {
        Axios.post(API + '/clients/bulk', clientList).then(res => {
            dispatch(onSetNotification('success', res.data.data))
        })
    }
}

export const agentReducer = (state = initialState, action) => {
    switch (action.type) {
        case AGENT_LIST_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case AGENT_LIST_SUCCEEDED:
            return {
                ...state,
                agents: action.payload,
                loading: false
            }
        case AGENT_LIST_FAILED:
            return state;
        case COLLECTOR_LIST_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case COLLECTOR_LIST_SUCCEEDED:
            return {
                ...state,
                collectors: action.payload,
                loading: false
            }
        case COLLECTOR_LIST_FAILED:
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}

export const clientReducer = (state = clientInitialState, action) => {
    switch (action.type) {
        case CLIENT_LIST_SUCCEEDED:
            return {
                ...state,
                list: action.payload,
                loading: false
            }
        case CLIENT_PROFILE_SUCCEEDED:
            return {
                ...state,
                editing:action.payload,
                loading:false
            }
        default:
            return state
    }
}