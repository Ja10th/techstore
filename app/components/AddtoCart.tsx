'use client'

import React from 'react'
import  ImageUrlBuilder  from '@sanity/image-url'
import { useShoppingCart } from 'use-shopping-cart'
import { client } from '@/sanity/lib/client'


export interface ProductCart {
    name: string,
    description: string,
    price: number,
    currency: string,
    image: any,
    price_id: string,
}
    
const AddtoCart = ({name, description, price, currency, price_id ,image}:ProductCart) => {
    const { addItem, handleCartClick} = useShoppingCart()

    const product = {
        name: name,
        description: description,
        price:price,
        currency: currency,
        image: urlForImage(image).url(),
        price_id: price_id,
    }
  return (
    <button 
    onClick={() => {
        addItem(product), handleCartClick();
    }}
    className="px-8 bg-blue-500 py-2 text-gray-100 rounded-2xl">
    Add to Cart
  </button>
  )
}

export default AddtoCart

const builder = ImageUrlBuilder(client)

export function urlForImage(source: any){
    return builder.image(source)
}

