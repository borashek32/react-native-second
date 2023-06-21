import {RootStateType} from "../../app/store"

const selectProducts = (state: RootStateType) => state.products.products

export {
  selectProducts
}