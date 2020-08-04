const initialLoginState = {
    username: {},
    password: {},
    requesting_login: false,
    success_login: false,
    error: {
        value: false,
        message: ""
    }
}

const LOGIN_CONSTANTS = {
    NO_USERNAME: 'NO LOGIN USERNAME',
    NO_PASSWORD: 'NO LOGIN PASSWORD',
    REQUEST_LOGIN: 'REQUEST LOGIN',
    SUCCESS_LOGIN: 'SUCCESS LOGIN',
    ERROR_LOGIN: 'ERROR LOGIN'
}

const loginReducer = (state, action) => {
    switch(action.type) {
        case LOGIN_CONSTANTS.NO_USERNAME: {
            return {
                ...state, username: {
                    value: !action.payload,
                    message: "Please enter your username"
                }
            }
        }
        case LOGIN_CONSTANTS.NO_PASSWORD: {
            return {
                ...state, password: {
                    value: !action.payload,
                    message: "Please enter your password"
                }
            }
        }
        case LOGIN_CONSTANTS.REQUEST_LOGIN: {
            return {
                ...state, requesting_login: true
            }
        }
        case LOGIN_CONSTANTS.SUCCESS_LOGIN: {
            return {
                ...state, success_login: true
            }
        }
        case LOGIN_CONSTANTS.ERROR_LOGIN: {
            return {
                ...state, error: action.payload, requesting_login: false
            }
        }
        default: return state
    }
}

export {
    initialLoginState, LOGIN_CONSTANTS, loginReducer
}