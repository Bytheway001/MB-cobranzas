import Axios from "axios";
import { API } from "../utils/utils";

export const EXPENSES_LIST_REQUESTED = "EXPENSES_LIST_REQUESTED";
export const EXPENSES_LIST_SUCCEEDED = "EXPENSES_LIST_SUCCEEDED";
export const EXPENSES_LIST_FAILED = "EXPENSES_LIST_FAILED";

export const onExpensesListRequested = () => ({ type: EXPENSES_LIST_REQUESTED });
export const onExpensesListSucceeded = (data) => ({ type: EXPENSES_LIST_SUCCEEDED, payload: data })
export const onExpensesListFailed = (err) => ({ type: EXPENSES_LIST_FAILED, payload: err })




export const getExpenses = () => {
    return dispatch => {
        dispatch(onExpensesListRequested())
        Axios.get(API + '/expenses').then(res => {
            dispatch(onExpensesListSucceeded(res.data.data))
        })
            .catch(err => dispatch(onExpensesListFailed(err)))
    }
}


const initialState = {
    list: [],
    expenses:[],
    payments:[]
}

export const expensesReducer = (state = initialState, action) => {
    switch (action.type) {
        case EXPENSES_LIST_SUCCEEDED:
            return {
                ...state,
                expenses:action.payload.expenses,
                payments:action.payload.payments
            }
        case EXPENSES_LIST_REQUESTED:
            return {
                ...state,
                list: []
            }
        default:
            return state
    }
}