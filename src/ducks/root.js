import { combineReducers } from "redux";
import { sessionReducer } from "./session";
import { agentReducer, clientReducer } from "./agents";
import { notificationReducer } from "./notifications";
export const API = 'https://capi.megabrokerslatam.com'
//export const API = 'http://127.0.0.1:200'
export const rootReducer = combineReducers(
    {
        session: sessionReducer,
        agents:agentReducer,
        notifications:notificationReducer,
        clients:clientReducer
    }
)