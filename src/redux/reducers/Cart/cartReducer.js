import constants from '../../constants/Cart'

const initialState = {
    cart: [],
    quantityUpdate: 0
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.ADD_TO_CART: {
            const index = state.cart.findIndex(item => item.id === action.payload.id)
            var item = {
                ...action.payload,
                quantity: 1
            }
            if (index === -1) state.cart.push(item)
            return { ...state, quantityUpdate: state.quantityUpdate + 1 }
        }

        case constants.REMOVE_FROM_CART: {
            const index = state.cart.findIndex(item => item.id === action.payload)
            if (index !== -1) state.cart.splice(index, 1)
            return state
        }

        case constants.CLEAR_CART: {
            return { ...state, cart: [] }
        }

        case constants.INCREASE_QUANTITY: {
            const index = state.cart.findIndex(item => item.id === action.payload)
            var updatedQuantity = state.cart
            if (index !== -1) {
                updatedQuantity[index].quantity = updatedQuantity[index].quantity + 1
            }
            
            return { ...state, cart: updatedQuantity, quantityUpdate: state.quantityUpdate + 1 }
        }

        case constants.DECREASE_QUANTITY: {
            const index = state.cart.findIndex(item => item.id === action.payload)
            updatedQuantity = state.cart
            if (index !== -1) {
                updatedQuantity[index].quantity = updatedQuantity[index].quantity - 1
            }
            return { ...state, cart: updatedQuantity, quantityUpdate: state.quantityUpdate - 1 }
        }

        default: return state
    }
}

export default cartReducer