import { ProductsTypes } from './products.type'

const INITIAL_STATE = {
    products: 0,
    search: ''
}
const ProductsReduser = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductsTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }        
        case ProductsTypes.SEARCH_PRODUCT:
            return {
                ...state,
                search: action.payload
            }              
        default:
            return state;
    }
}
export default ProductsReduser;