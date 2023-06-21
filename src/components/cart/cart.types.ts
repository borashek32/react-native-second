export type ProductInCartType = {
  userUid: string
  uid: string
  title: string
  price: number
  priceForOneItem: number
  quantity: number
}

export type ProductsInCartInfoType = {
  productsTotalQuantity: number
  productsTotalPrice: number
}