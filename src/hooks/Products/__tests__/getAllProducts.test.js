import { _productsUpdate, getAllProducts } from '../index'

describe('should fetch all products and update it\' state', () => {
    it('should fetch all categories and return to the callback', done => {
        _productsUpdate(res => {
            if (res.failed) {
                expect(res.data).toBeNull()
            } else {
                expect(res.message).toBeNull()
            }
            done()
        })
        getAllProducts()
    })
})
