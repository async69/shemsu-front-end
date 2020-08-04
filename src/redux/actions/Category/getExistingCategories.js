import { fetchCategories } from './functions/fetchCategories'
import constants from '../../constants/Category'

export const getExistingCategories = () => dispatch => {
    dispatch({ type: constants.REQUEST_EXISTING_CATEGORIES })
    fetchCategories()
        .then(res => {
            if (res.failed) {
                dispatch({ type: constants.FAILURE_EXISTING_CATEGORIES, payload: res.message })
            } else {
                dispatch({ type: constants.SUCCESS_EXISTING_CATEGORIES, payload: res.data })
            }
        })
}