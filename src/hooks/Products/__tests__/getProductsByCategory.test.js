import {
    _componentDidUpdate, _productCategoryUpdate,
    getProductsByCategory, setCategory, getCategory
} from '../index'
import { productCategory } from '../../../constants/categories'

describe('should work', () => {
    it('should work on fetching fashion products', done => {
        _productCategoryUpdate(res => {
            if (res.failed) {
                expect(res.data).toBeNull()
            } else {
                expect(res.message).toBeNull()
            }
            done()
        }, productCategory.FASHION)
        getProductsByCategory(productCategory.FASHION)
    })

    it('should work on fetching kids fashion products', done => {
        _productCategoryUpdate(res => {
            if (res.failed) {
                expect(res.data).toBeNull()
            } else {
                expect(res.message).toBeNull()
            }
            done()
        }, productCategory.KIDS_FASHION)
        getProductsByCategory(productCategory.KIDS_FASHION)
    })

    it('should change category', () => {
        setCategory(1)
        expect(getCategory()).toBe(1)
    })
})