import constants from '../../constants/Product'
import { fetchProductsByCategory } from './functions/fetchProductsByCategory'

export const getProductsByCategory = categoryID => dispatch => {
    dispatch({ type: constants.REQUEST_PRODUCTS_BY_CATEGORY })
    fetchProductsByCategory(categoryID)
        .then(res => {
            if (res.failed) {
                dispatch({ type: constants.FAILURE_PRODUCTS_BY_CATEGORY, payload: res.message })
            } else {
                dispatch({ type: constants.SUCCESS_PRODUCTS_BY_CATEGORY, payload: res.data })
            }
        })
    
}