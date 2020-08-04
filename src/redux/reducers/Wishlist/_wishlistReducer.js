import constants from '../../constants/Wishlist'

const initailState = {
    wishlist: []
}

const wishListReducer = (state = initailState, action) => {
    switch(action.type) {
        case constants.ADD_TO_WISHLIST: {
            const index = state.wishlist.findIndex(item => item.id === action.payload.id)
            if (index === -1) state.wishlist.push(action.payload)
            return state
        }

        case constants.REMOVE_FROM_WISHLIST: {
            const index = state.wishlist.findIndex(item => item.id === action.payload)
            state.wishlist.splice(index, 1)
            return state
        }

        case constants.CLEAR_WISHLIST: {
            return { ...state, wishlist: [] }
        }

        default:  return state
    }
}

export default wishListReducer