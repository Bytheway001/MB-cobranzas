import Axios from 'axios'
import { API } from '../utils/utils';
const ACCOUNT_LIST_REQUESTED = "ACCOUNT_LIST_REQUESTED";
const ACCOUNT_LIST_SUCCEEDED = "ACCOUNT_LIST_SUCCEEDED";
const ACCOUNT_LIST_FAILED = "ACCOUNT_LIST_FAILED";

const onAccountListRequested = () => ({ type: ACCOUNT_LIST_REQUESTED });
const onAccountListSucceeded = (data) => ({ type: ACCOUNT_LIST_SUCCEEDED, payload: data })
const onAccountListFailed = (err) => ({ type: ACCOUNT_LIST_FAILED, payload: err })

export const getAccountList = () => {
    return dispatch => {
        dispatch(onAccountListRequested())
        Axios.get(API + '/accounts').then(res =>
            dispatch(onAccountListSucceeded(res.data.data))
        )
        .catch(err=>{
            
            dispatch(onAccountListFailed(err.response.data))
        })
    }
}

const initialState = {
    list: [],
    loading:false
}

export const AccountsReducer = (state = initialState, action)=>{
    switch (action.type) {
        case ACCOUNT_LIST_REQUESTED:
            return {
                ...state,
                loading:true
            }
        case ACCOUNT_LIST_SUCCEEDED:
            return {
                ...state,
                list: action.payload,
                loading:false
            }
        case ACCOUNT_LIST_FAILED:
            return{
                ...state,
                list:[],
                loading:false
            }
        default:
            return state
    }
}