import Defaults from '../defaults'
import { eventHandler, keys } from '../../../events/Product'
import { Product } from '../model'
import { fetchCategories } from './functions/fetchCategories'

export const _categoriesUpdate = (callback = Defaults.callback) => {
    eventHandler.on(keys.CATEGORIES_UPDATE, res => callback(res))
}

export const getExistingCategories = () => {
    fetchCategories()
        .then(res => {
            if (!res.failed) {
                Product.setState({ categories: res.data })
            }
            eventHandler.emit(keys.CATEGORIES_UPDATE, res)
            return res.data
        })
}

export const getCategories = () => {
    return Product.state.categories
}