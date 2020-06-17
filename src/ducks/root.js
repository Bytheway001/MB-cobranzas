import { combineReducers } from "redux";
import { sessionReducer } from "./session";
import { agentReducer } from "./agents";
import { clientReducer } from './clients';
import { notificationReducer } from "./notifications";
import { expensesReducer } from "./expenses";
import { paymentsReducer } from "./payments";
import { AccountsReducer } from "./accounts";
//export const API = 'https://capi.megabrokerslatam.com'
export const API = 'http://192.168.0.14:200'
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