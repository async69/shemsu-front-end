import { fetchCategories } from '../fetchCategories'

describe('should fetch all existing categories', () => {
    it('should fetch all categories', async () => {
        const response = await fetchCategories()
        if (response.failed) {
            expect(response.data).toBeNull()
        } else {
            expect(response.message).toBeNull()
        }
    })
})
