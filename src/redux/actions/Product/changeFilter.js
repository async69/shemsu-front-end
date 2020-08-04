import constants from '../../constants/Product'

export const changeFilter = (key, value) => dispatch => {
    dispatch({ type: constants.CHANGE_FILTER_VARIABLE, payload: { key, value } })
}

export const changeMetaData = (key, value) => dispatch => {
    dispatch({ type: constants.CHANGE_META_DATA, payload: { key, value } })
}
