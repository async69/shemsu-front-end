const initialSignUpState = {
    firstName: {},
    lastName: {},
    email: {},
    username: {},
    password: {},
    requesting_register: false,
    success_signup: false
}

const SIGNUP_CONSTANTS = {
    NO_FIRST_NAME: 'NO FIRST NAME',
    NO_LAST_NAME: 'NO LAST NAME',
    NO_USERNAME: 'NO USERNAME',
    NO_EMAIL: 'NO EMAIL',
    NO_PASSWORD: 'NO PASSWORD',
    REQUEST_SIGNUP: 'REQUEST SIGNUP',
    SUCCESS_SIGNUP: 'SUCCESS SIGNUP',
    FAILURE_SIGNUP: 'FAILURE SIGNUP'
}

const signUpReducer = (state, action) => {
    switch(action.type) {
        case SIGNUP_CONSTANTS.NO_FIRST_NAME: {
            return {
                ...state, firstName: {
                    value: !action.payload,
                    message: "Please enter your first name"
                }
            }
        }
        case SIGNUP_CONSTANTS.NO_LAST_NAME: {
            return {
                ...state, lastName: {
                    value: !action.payload,
                    message: "Please enter your last name"
                }
            }
        }
        case SIGNUP_CONSTANTS.NO_USERNAME: {
            return {
                ...state, username: {
                    value: !action.payload,
                    message: "Please enter your username"
                }
            }
        }
        case SIGNUP_CONSTANTS.NO_EMAIL: {
            return {
                ...state, email: {
                    value: !action.payload,
                    message: "Please enter your email"
                }
            }
        }
        case SIGNUP_CONSTANTS.NO_PASSWORD: {
            return {
                ...state, password: {
                    value: !action.payload,
                    message: "Please enter your password"
                }
            }
        }
        case SIGNUP_CONSTANTS.REQUEST_SIGNUP: {
            return {
                ...state, requesting_register: true
            }
        }
        case SIGNUP_CONSTANTS.SUCCESS_SIGNUP: {
            return {
                ...state, requesting_register: false,
                success_signup: true
            }
        }
        default: return state
    }
}

export {
    SIGNUP_CONSTANTS, signUpReducer, initialSignUpState
}