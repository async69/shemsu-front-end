import { eventHandler, keys } from '../../events/Product'
class ModelProduct {
    constructor() {
        this.state = {
            products: [],
            categories: [],
            currentCategory: -1
        }
    }

    setState(newState = this.state) {
        for (var item in newState) {
            this.state[item] = newState[item]
        }
        eventHandler.emit(keys.MAIN_STATE_UPDATE, this.state)
    }
}

export const Product = new ModelProduct()

export default ModelProduct