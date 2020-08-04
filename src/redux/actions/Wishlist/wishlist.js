import constants from '../../constants/Wishlist'

export const _addToWishlist = product => dispatch => {
    dispatch({ type: constants.ADD_TO_WISHLIST, payload: product })
}

export const _removeFromWishlist = productID => dispatch => {
    dispatch({ type: constants.REMOVE_FROM_WISHLIST, payload: productID })
}

export const _clearWishlist = () => dispatch => {
    dispatch({ type: constants.CLEAR_WISHLIST })
}