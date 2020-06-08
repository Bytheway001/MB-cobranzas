import { API } from "./root";
import Axios from 'axios'
const ACCOUNT_LIST_REQUESTED = "ACCOUNT_LIST_REQUESTED";
const ACCOUNT_LIST_SUCCEEDED = "ACCOUNT_LIST_SUCCEEDED";
const ACCOUNT_LIST_FAILED = "ACCOUNT_LIST_FAILED";

const onAccountListRequested = () => ({ type: ACCOUNT_LIST_REQUESTED });
const onAccountListSucceeded = (data) => ({ type: ACCOUNT_LIST_SUCCEEDED, payload: data })
const onAccountListFailed = (err) => ({ type: ACCOUNT_LIST_FAILED, payload: err })

export const getAccountList = () => {
    return dispatch => {
        Axios.get(API + '/accounts').then(res =>
            dispatch(onAccountListSucceeded(res.data.data))
        )
    }
}

const initialState = {
    list: []
}


export const AccountsReducer = (state = initialState, action)=>{
    switch (action.type) {
        case ACCOUNT_LIST_SUCCEEDED:
            return {
                ...state,
                list: action.payload
            }
        default:
            return state
    }
}