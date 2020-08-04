import { LOGIN_CONSTANTS } from './loginReducer'
import { loginUser } from './network'

export const login = user => async dispatch => {
    var incompleteForm = false

    if (user.username.length === 0) {
        incompleteForm = true
        dispatch({ type: LOGIN_CONSTANTS.NO_USERNAME })
    } else {
        dispatch({ type: LOGIN_CONSTANTS.NO_USERNAME, payload: true })
    }

    if (user.password.length === 0) {
        incompleteForm = true
        dispatch({ type: LOGIN_CONSTANTS.NO_PASSWORD })
    } else {
        dispatch({ type: LOGIN_CONSTANTS.NO_PASSWORD, payload: true })
    }

    if (!incompleteForm) {
        dispatch({ type: LOGIN_CONSTANTS.REQUEST_LOGIN })
        const { status, data } = await loginUser(user)
        if (status === 200 && !data.error) {
            dispatch({ type: LOGIN_CONSTANTS.SUCCESS_LOGIN })
        } else {
            dispatch({ type: LOGIN_CONSTANTS.ERROR_LOGIN, payload: data.error })
        }
    }
}