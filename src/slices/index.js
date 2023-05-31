import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./layouts/products";
import brandsReducer from './layouts/brands';
import categoriesReducer from './layouts/categories';
import subcategoriesReducer from "./layouts/subcategories";
import commentsReducer from './layouts/comments';
import LayoutReducer from "./layouts/reducer";
import user from "./layouts/user";

const rootreducer = combineReducers({
    Layout: LayoutReducer,
    Products: productsReducer,
    Categories: categoriesReducer,
    Subcategories: subcategoriesReducer,
    Brands: brandsReducer,
    Comments: commentsReducer,
    User: user
})
export default rootreducer;