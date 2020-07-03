import { combineReducers } from "redux";
import { sessionReducer } from "./session";
import { agentReducer } from "./agents";
import { clientReducer } from './clients';
import { notificationReducer } from "./notifications";
import { expensesReducer } from "./expenses";
import { paymentsReducer } from "./payments";
import { AccountsReducer } from "./accounts";
//export const API = 'https://capi.megabrokerslatam.com'
export const API = process.env.REACT_APP_API_URL;
export const rootReducer = combineReducers(
    {
        session: sessionReducer,
        agents: agentReducer,
        notifications: notificationReducer,
        clients: clientReducer,
        expenses: expensesReducer,
        payments: paymentsReducer,
        accounts: AccountsReducer,
    }
)
