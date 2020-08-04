import { fetchProductsByCategory } from '../fetchProductsByCategory'

describe('fetches products based on category', () => {
    it('should fetch products', async () => {
        const response = await fetchProductsByCategory(1)
        if (response.failed) {
            expect(response.data).toBeNull()
        } else {
            expect(response.message).toBeNull()
        }
    })
})
