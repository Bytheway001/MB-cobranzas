import Axios from "axios";
import { API } from "../utils/utils";

const PAYMENT_LIST_REQUESTED = 'PAYMENT_LIST_REQUESTED';
const PAYMENT_LIST_SUCCEEDED = "PAYMENT_LIST_SUCCEEDED";
const PAYMENT_LIST_FAILED = 'PAYMENT_LIST_FAILED'

const PAYMENT_VALIDATION_REQUESTED = 'PAYMENT_VALIDATION_REQUESTED';
const PAYMENT_VALIDATION_SUCCEEDED ='PAYMENT_VALIDATION_SUCCEEDED';
const PAYMENT_VALIDATION_FAILED = 'PAYMENT_VALIDATION_FAILED';

const onPaymentListRequested = () => ({ type: PAYMENT_LIST_REQUESTED })
const onPaymentListSucceeded = (data) => ({ type: PAYMENT_LIST_SUCCEEDED, payload: data })
const onPaymentListFailed = () => ({ type: PAYMENT_LIST_FAILED })

const onPaymentValidationRequested = () => ({ type: PAYMENT_VALIDATION_REQUESTED })
const onPaymentValidationSucceeded = (data) => ({ type: PAYMENT_VALIDATION_SUCCEEDED, payload: data })
const onPaymentValidationFailed = () => ({ type: PAYMENT_VALIDATION_FAILED })

export const getPaymentList=()=>{
    return dispatch=>{
        dispatch(onPaymentListRequested());
        Axios.get(API+'/payments').then(res=>{
            dispatch(onPaymentListSucceeded(res.data.data))
        })
        .catch(err=>{
            dispatch(onPaymentListFailed(err.respose))
        })
    }
}

export const validatePayment=(id)=>{
    return dispatch=>{
        dispatch(onPaymentValidationRequested());
        Axios.get(API+'/payments/validate/'+id).then(res=>{
            dispatch(onPaymentValidationSucceeded(res.data.data))
        })
        .catch(err=>{
            dispatch(onPaymentValidationFailed(err.respose))
        })
    }
}


const initialState = {
    list: [],
    loading: false
}

export const paymentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_LIST_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case PAYMENT_LIST_SUCCEEDED:
            return{
                ...state,
                list:action.payload,
                loading:false
            }
        case PAYMENT_LIST_FAILED:
            return{
                ...state,
                list:[],
                loading:false
            }
            default:
                return state
    }
}