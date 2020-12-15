export const LOGIN_REQUESTED = "LOGIN_REQUESTED";
export const LOGIN_SUCCEEDED = "LOGIN_SUCCEEDED";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCEEDED = "LOGOUT_SUCCEEDED";


const onLoginSucceeded = (data)=>({type:LOGIN_SUCCEEDED,payload:data})

const onLogoutSucceeded = ()=>({type:LOGOUT_SUCCEEDED})


const initialState={
    loading:false
};

export const login = (data)=>{
    return dispatch =>{
        localStorage.setItem('user',JSON.stringify(data))
        dispatch(onLoginSucceeded(data))
    }
}

export const logout =()=>{
    return dispatch =>{
        localStorage.removeItem('user')
        dispatch(onLogoutSucceeded())
    }
}

export const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUESTED:
            return state;
        case LOGIN_SUCCEEDED:
            return {
                ...state,
                user:action.payload,
                loading:false
            }
        case LOGIN_FAILED:
            return state;
        case LOGOUT_SUCCEEDED:
            return {
                ...state,
                user:null
            }
        default:
            return state
    }
}