export const FetchProductsByCategory = (categoryID) => {
    return {
        query: `mutation ($categoryID: Int!) {
            fetchProductsByCategory(categoryID: $categoryID) {
                id productName productPrice categoryID
            }
        }`,
    
        variables: {
            "categoryID": categoryID
        }
    }
}

export const FetchAllProducts = () => {
    return {
        query: `{
            products {
                id productName productPrice categoryID availableColors availableSizes
            }
        }`
    }
}

export const FetchAllCategories = () => {
    return {
        query: `{
            categories {
                id name
            }
        }`
    }
}