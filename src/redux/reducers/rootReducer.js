import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import _productReducer from './Product/_proudctReducer'
import categoryReducer from './Category/categoryReducer'
import _wishlistReducer from './Wishlist/_wishlistReducer'
import _cartReducer from './Cart/cartReducer'
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  productReducer: _productReducer,
  categoryReducer: categoryReducer,
  wishlistReducer: _wishlistReducer,
  cartReducer: _cartReducer
});

export default rootReducer;
