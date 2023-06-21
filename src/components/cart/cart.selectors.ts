import {RootStateType} from "../../app/store"

const selectProductInCart = (state: RootStateType) => state.cart.productsInCart

export {
  selectProductInCart
}