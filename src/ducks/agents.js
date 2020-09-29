import Axios from "axios";
import { onSetNotification } from "./notifications";
import { getAccountList } from "./accounts";
import { API } from "../utils/utils";

export const AGENT_LIST_REQUESTED = "AGENT_LIST_REQUESTED";
export const AGENT_LIST_SUCCEEDED = "AGENT_LIST_SUCCEEDED";
export const AGENT_LIST_FAILED = "AGENT_LIST_FAILED";

export const COLLECTOR_LIST_REQUESTED = 'COLLECTOR_LIST_REQUESTED'
export const COLLECTOR_LIST_SUCCEEDED = 'COLLECTOR_LIST_SUCCEEDED'
export const COLLECTOR_LIST_FAILED = 'COLLECTOR_LIST_FAILED'

export const PAYMENT_CREATION_REQUESTED = "PAYMENT_CREATION_REQUESTED"
export const PAYMENT_CREATION_SUCCEEDED = "PAYMENT_CREATION_SUCCEEDED"
export const PAYMENT_CREATION_FAILED = 'PAYMENT_CREATION_FAILED'

const onAgentListRequested = () => ({ type: AGENT_LIST_REQUESTED })
const onAgentListSucceeded = (data) => ({ type: AGENT_LIST_SUCCEEDED, payload: data })
const onAgentListFailed = (error) => ({ type: AGENT_LIST_FAILED, payload: error })

const onCollectorListRequested = () => ({ type: COLLECTOR_LIST_REQUESTED })
const onCollectorListSucceeded = (data) => ({ type: COLLECTOR_LIST_SUCCEEDED, payload: data })
const onCollectorListFailed = (err) => ({ type: COLLECTOR_LIST_FAILED, payload: err })



const onPaymentCreationRequested = () => ({ type: PAYMENT_CREATION_REQUESTED });
const onPaymentCreationSucceeded = (data) => ({ type: PAYMENT_CREATION_SUCCEEDED, payload: data });
const onPaymentCreationFailed = (err) => ({ type: PAYMENT_CREATION_FAILED, payload: err })

const initialState = {
    agents: [],
    collectors: [],
    loading: false,
    creatingPayment: false
}


/** Functions */


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

export const createPayment = (payment) => {
    return dispatch => {
        dispatch(onPaymentCreationRequested())
        Axios.post(API + '/payments/create', payment).then(res => {
            dispatch(onPaymentCreationSucceeded(res.data))
            dispatch(getAccountList())
            dispatch(onSetNotification('success', 'Pago creado con exito'))
          
        })
        .catch(err=>{
            dispatch(onSetNotification('danger', 'No se pudo crear este pago'))
            dispatch(onPaymentCreationFailed('No se pudo crear este pago'))
        })
    }
}

/** Reducers */
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
            return {
                ...state,
                agents:[],
                loading:false,
                errors:action.payload.message
            }
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
        case PAYMENT_CREATION_REQUESTED:
            return {
                ...state,
                creatingPayment: true
            }
        case PAYMENT_CREATION_SUCCEEDED:
            return {
                ...state,
                creatingPayment: false
            }
        case PAYMENT_CREATION_FAILED:
            return{
                ...state,
                creatingPayment:false
            }
        default:
            return state
    }
}

