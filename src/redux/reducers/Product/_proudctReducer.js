import constants from '../../constants/Product'

const initalState = {
    products: [],
    loadingProducts: false,
    success: false,
    error: {
        value: false,
        message: null
    },
    filter: {
        categoryID: -1
    },
    metaData: {
        productCount: -1,
        filteredProductCount: -1
    },
    currentProduct: {}
}

const productReducer = (state = initalState, action) => {
    switch(action.type) {
        case constants.REQUEST_PRODUCTS_BY_CATEGORY: {
            return {
                ...state, loadingProducts: true, success: false
            }
        }

        case constants.SUCCESS_PRODUCTS_BY_CATEGORY: {
            return {
                ...state, loadingProducts: false,
                products: action.payload, success: true
            }
        }

        case constants.FAILURE_PRODUCTS_BY_CATEGORY: {
            return {
                ...state, loadingProducts: false, success: false,
                error: {
                    value: true, message: action.payload
                }
            }
        }

        case constants.REQUEST_ALL_PRODUCTS: {
            return {
                ...state, loadingProducts: true, success: false
            }
        }

        case constants.SUCCESS_ALL_PRODUCTS: {
            return {
                ...state, loadingProducts: false, success: true, products: action.payload
            }
        }

        case constants.FAILURE_ALL_PRODUCTS: {
            return {
                ...state, loadingProducts: false, success: false,
                error: { value: true, message: action.payload }
            }
        }

        case constants.CHANGE_FILTER_VARIABLE: {
            return {
                ...state, filter: {
                    ...state.filter,
                    [action.payload.key]: action.payload.value
                }
            }
        }

        case constants.CHANGE_META_DATA: {
            return {
                ...state, metaData: {
                    ...state.metaData,
                    [action.payload.key]: action.payload.value
                }
            }
        }

        case constants.CHANGE_CURRENT_PRODUCT: {
            return { ...state, currentProduct: action.payload }
        }

        default: return state
    }
}

export default productReducer