export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION"

export const onSetNotification = (msgType, text) => ({ type: "ADD_NOTIFICATION", payload: { msgType, text } })
export const onDeleteNotification = (index) => ({ type: DELETE_NOTIFICATION, payload: index })

const initialState = [
   
]

export const addNotification = (type, text) => {
    return dispatch => {
        dispatch(onSetNotification(type, text))
        setTimeout(()=>{
            dispatch(deleteNotification(0))
        },3000)
    }

}

export const deleteNotification = (index) => {
    return dispatch => {
        dispatch(onDeleteNotification(index))
    }
}


export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return [...state, { type: action.payload.msgType, text: action.payload.text }]
            case DELETE_NOTIFICATION:
                let s = [...state]
                console.log ([...s.splice(action.payload,1)])
                return s
        default:
            return state
    }
}
