import constants from '../../constants/Category'

const initalState = {
    loadingCategories: false,
    success: false,
    error: {
        value: false,
        message: null
    },
    categories: []
}

const categoryReducer = (state = initalState, action) => {
    switch(action.type) {
        case constants.REQUEST_EXISTING_CATEGORIES: {
            return {
                ...state, loadingCategories: true, success: false
            }
        }

        case constants.SUCCESS_EXISTING_CATEGORIES: {
            return {
                ...state, loadingCategories: false, success: true, categories: action.payload
            }
        }

        case constants.FAILURE_EXISTING_CATEGORIES: {
            return {
                ...state, loadingCategories: false, success: false, error: {
                    value: true, message: action.payload
                }
            }
        }

        default: return state
    }
}

export default categoryReducer