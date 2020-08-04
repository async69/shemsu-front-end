import { _categoriesUpdate, getExistingCategories } from '../index'

describe('operations on categories', () => {
    it('should update on category fetch', done => {
        _categoriesUpdate(res => {
            if (res.failed) {
                expect(res.data).toBeNull()
                done()
            } else {
                expect(res.message).toBeNull()
                done()
            }
        })
        getExistingCategories()
    })
})
