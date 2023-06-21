import {RootStateType} from "../../app/store"

const selectProductInCart = (state: RootStateType) => state.cart.productsInCart
const selectCartInfo = (stata: RootStateType) => stata.cart.cartInfo

export {
  selectProductInCart,
  selectCartInfo
}