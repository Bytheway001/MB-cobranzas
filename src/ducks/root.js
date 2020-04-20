import { combineReducers } from "redux";
import { sessionReducer } from "./session";
import { agentReducer } from "./agents";
export const API = 'http://127.0.0.1:200'
export const rootReducer = combineReducers(
    {
        session: sessionReducer,
        agents:agentReducer
    }
)