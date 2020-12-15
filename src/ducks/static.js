import Axios from "axios";
import { API } from "../utils/utils";

const COMPANY_LIST_REQUESTED = "COMPANY_LIST_REQUESTED";
const COMPANY_LIST_SUCCEEDED = "COMPANY_LIST_SUCCEEDED";
const COMPANY_LIST_FAILED = "COMPANY_LIST_FAILED";

const PLAN_LIST_REQUESTED = "PLAN_LIST_REQUESTED";
const PLAN_LIST_SUCCEEDED = "PLAN_LIST_SUCCEEDED";
const PLAN_LIST_FAILED = "PLAN_LIST_FAILED";
const InitialState={
    agents:[],
    collectors:[],
    companies:[],
    plans:[],
    loadingCompanies:false,
    loadingPlans:false,
    loadingAgents:false,
    loadingCollectors:false
}

export const getCompanies=()=>{
    return dispatch=>{
        Axios.get(API + '/companies').then(res => {
            dispatch({type:COMPANY_LIST_SUCCEEDED,payload:res.data.data})
        })
    }
}

export const getPlans=(planArray)=>{
    
    return dispatch=>{
        if(planArray!==null){
            Axios.get(API + '/plans/'+planArray.id).then(res => {
                dispatch({type:PLAN_LIST_SUCCEEDED,payload:res.data.data})
            })
        }
     
    }

   
}


export const staticReducer = (state=InitialState,{type,payload})=>{
    switch(type){
        case COMPANY_LIST_REQUESTED:
            return{
                ...state,
                loadingCompanies:true
            }
        case COMPANY_LIST_SUCCEEDED:
            return{
                ...state,
                companies:payload,
                loadingCompanies:false
            }
        case COMPANY_LIST_FAILED:
            return{
                ...state,
                companies:[],
                loadingCompanies:false
            }
        case PLAN_LIST_REQUESTED:
            return{
                ...state,
                loadingPlans:true
            }
        case PLAN_LIST_SUCCEEDED:
            return{
                ...state,
                loadingPlans:false,
                plans:payload
            }
        case PLAN_LIST_FAILED:
            return{
                ...state,
                loadingPlans:false,
                plans:[]
            }
            default:
                return state
    }
}

