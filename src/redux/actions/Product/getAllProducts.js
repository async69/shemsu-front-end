import constants from '../../constants/Product'
import { fetchAllProducts } from './functions/fetchAllProducts'

export const getAllProducts = () => dispatch => {
    dispatch({ type: constants.REQUEST_ALL_PRODUCTS })
    fetchAllProducts()
        .then(res => {
            if (res.failed) {
                dispatch({ type: constants.FAILURE_ALL_PRODUCTS, payload: res.message })
            } else {
                dispatch({ type: constants.SUCCESS_ALL_PRODUCTS, payload: res.data })
            }
        })
}

export const changeCurrentProduct = product => dispatch => {
    dispatch({ type: constants.CHANGE_CURRENT_PRODUCT, payload: product })
}