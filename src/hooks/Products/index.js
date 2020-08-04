import Defaults from './defaults'
import { eventHandler, keys } from '../../events/Product'
import { fetchProductsByCategory } from './functions/fetchProductsByCategory'
import { fetchAllProducts } from './functions/fetchAllProducts'
import { Product } from './model'

export const _componentDidUpdate = (callback = Defaults._componentDidUpdate) => {
    eventHandler.on(keys.MAIN_STATE_UPDATE, state => {
        callback(state)
    })
}

export const _productCategoryUpdate = (callback = Defaults._productCategoryUpdate, categoryID) => {
    eventHandler.on(keys.CATEGORY_UPDATE + categoryID, res => callback(res))
}

export const getProductsByCategory = categoryID => {
    fetchProductsByCategory(categoryID)
        .then(res => {
            if (!res.failed) {
                Product.setState({ products: res.data })
            }
            eventHandler.emit(keys.CATEGORY_UPDATE + categoryID, res)
        })
}

export const setCategory = categoryID => {
    Product.setState({ currentCategory: categoryID })
}

export const getCategory = () => Product.state.currentCategory

export const _productsUpdate = (callback = Defaults._componentDidUpdate) => {
    eventHandler.on(keys.PRODUCTS_UPDATE, res => callback(res))
}

export const getAllProducts = () => {
    fetchAllProducts()
        .then(res => {
            if (!res.failed) {
                Product.setState({ products: res.data })
            }
            eventHandler.emit(keys.PRODUCTS_UPDATE, res)
        })
}