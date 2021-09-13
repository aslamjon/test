import { combineReducers } from "redux";
import AuthReduser from "./auth/auth.reducer";
import ProductsReduser from "./products/products.reducer";



const rootReducer = combineReducers({
    user: AuthReduser,
    products: ProductsReduser
});

export default rootReducer;