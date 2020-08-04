import { SIGNUP_CONSTANTS } from './signupReducer'
import { registerUser } from './network'

const signUp = user => async dispatch => {
    var incompleteForm = false

    if (user.firstName.length === 0) {
        incompleteForm = true
        dispatch({ type: SIGNUP_CONSTANTS.NO_FIRST_NAME })
    } else {
        dispatch({ type: SIGNUP_CONSTANTS.NO_FIRST_NAME, payload: true })
    }

    if (user.lastName.length === 0) {
        incompleteForm = true
        dispatch({ type: SIGNUP_CONSTANTS.NO_LAST_NAME })
    } else {
        dispatch({ type: SIGNUP_CONSTANTS.NO_LAST_NAME, payload: true })
    }

    if (user.username.length === 0) {
        incompleteForm = true
        dispatch({ type: SIGNUP_CONSTANTS.NO_USERNAME })
    } else {
        dispatch({ type: SIGNUP_CONSTANTS.NO_USERNAME, payload: true })
    }

    if (user.email.length === 0) {
        incompleteForm = true
        dispatch({ type: SIGNUP_CONSTANTS.NO_EMAIL })
    } else {
        dispatch({ type: SIGNUP_CONSTANTS.NO_EMAIL, payload: true })
    }

    if (user.password.length === 0) {
        incompleteForm = true
        dispatch({ type: SIGNUP_CONSTANTS.NO_PASSWORD })
    } else {
        dispatch({ type: SIGNUP_CONSTANTS.NO_PASSWORD, payload: true })
    }

    if (!incompleteForm) {
        dispatch({ type: SIGNUP_CONSTANTS.REQUEST_SIGNUP })
        const { status } = await registerUser(user)
        if (status === 200) {
            dispatch({ type: SIGNUP_CONSTANTS.SUCCESS_SIGNUP })
        }
    }
}

export {
    signUp
}