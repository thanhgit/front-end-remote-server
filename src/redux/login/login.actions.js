import { LOG_IN, LOG_OUT } from "./login.types"

export const login = () => {
    return {
        type: LOG_IN
    }
}

export const logout = () => {
    return {
        type: LOG_OUT
    }
}