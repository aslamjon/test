import { createSelector } from "reselect";

const selectProducts = state => state.products;

export const ProductsSelector = createSelector(
    [selectProducts],
    (value) => value.products
)

export const SearchProductSelector = createSelector(
    [selectProducts],
    (value) => value.search
)