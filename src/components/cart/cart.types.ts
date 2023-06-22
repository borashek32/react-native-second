export type ProductInCartType = {
  userUid: string
  uid: string
  title: string
  price: number
  priceForOneItem: number
  quantity: number
  totalQuantity: number
}

export type CartInfoType = {
  productsTotalQuantity: number
  productsTotalPrice: number
}

// export type UserCartType = {
//   uid: string
//   userUid: string
//   cartUid: string
//   productsTotalQuantity: number
//   productsTotalPrice: number
// }