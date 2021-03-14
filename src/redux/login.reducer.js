import { LOG_IN, LOG_OUT } from "./login/login.types"

const INITIAL_STATE = {
    access_token: ""
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOG_IN:
            return {
                ...state, access_token: ""
            }
        case LOG_OUT:
            return {
                ...state, access_token: ""
            }
        default:
            return state
    }
}

export default reducer;