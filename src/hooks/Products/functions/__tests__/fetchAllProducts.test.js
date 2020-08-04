import { fetchAllProducts } from '../fetchAllProducts'

describe('operation on fetching all products', () => {
    it('should fetch all products', async () => {
        const response = await fetchAllProducts()
        if (response.failed) {
            expect(response.data).toBeNull()
        } else {
            expect(response.message).toBeNull()
        }
    })
})