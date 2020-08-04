import constants from '../../constants/Cart'

export const _addToCart = product => dispatch => {
    dispatch({ type: constants.ADD_TO_CART, payload: product })
}

export const _removeFromCart = productID => dispatch => {
    dispatch({ type: constants.REMOVE_FROM_CART, payload: productID })
}

export const _clearCart = () => dispatch => {
    dispatch({ type: constants.CLEAR_CART })
}

export const _increaseQuantity = id => dispatch => {
    dispatch({ type: constants.INCREASE_QUANTITY, payload: id })
}

export const _decreaseQuantity = id => dispatch => {
    dispatch({ type: constants.DECREASE_QUANTITY, payload: id })
}