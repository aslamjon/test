import { ProductsTypes } from './products.type'

export const setProducts = item => ({
    type: ProductsTypes.SET_PRODUCTS,
    payload: item
})
export const searchProducts = item => ({
    type: ProductsTypes.SEARCH_PRODUCT,
    payload: item
})