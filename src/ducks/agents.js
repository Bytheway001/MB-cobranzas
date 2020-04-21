import Axios from "axios";
import { API } from "./root";
import { onSetNotification } from "./notifications";

export const AGENT_LIST_REQUESTED = "AGENT_LIST_REQUESTED";
export const AGENT_LIST_SUCCEEDED = "AGENT_LIST_SUCCEEDED";
export const AGENT_LIST_FAILED = "AGENT_LIST_FAILED";

export const COLLECTOR_LIST_REQUESTED = 'COLLECTOR_LIST_REQUESTED'
export const COLLECTOR_LIST_SUCCEEDED = 'COLLECTOR_LIST_SUCCEEDED'
export const COLLECTOR_LIST_FAILED = 'COLLECTOR_LIST_FAILED'

const onAgentListRequested = () => ({ type: AGENT_LIST_REQUESTED })
const onAgentListSucceeded = (data) => ({ type: AGENT_LIST_SUCCEEDED, payload: data })
const onAgentListFailed = (error) => ({ type: AGENT_LIST_FAILED, payload: error })

const onCollectorListRequested = () => ({ type: COLLECTOR_LIST_REQUESTED })
const onCollectorListSucceeded = (data) => ({ type: COLLECTOR_LIST_SUCCEEDED, payload: data })
const onCollectorListFailed = (err) => ({ type: COLLECTOR_LIST_FAILED, payload: err })

const initialState = {
    agents: [],
    collectors: [],
    loading: false
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

export const createClient=(data)=>{
    return dispatch=>{
        Axios.post(API+'/clients/create',data).then(res=>{
            dispatch(onSetNotification('success',res.data.data))
        })
    }
   
}

export const createBulkClients=(clientList)=>{
    return dispatch=>{
        Axios.post(API+'/clients/bulk',clientList).then(res=>{
            dispatch(onSetNotification('success',res.data.data))
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
                loading:false
            }
        case COLLECTOR_LIST_FAILED:
            return{
                ...state,
                loading:false
            }

        default:
            return state
    }
}