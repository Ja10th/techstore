'use client'

import React, { ReactNode } from 'react'
import { CartProvider as CartProvide} from 'use-shopping-cart'

const CartProvider = ({children}: {children: ReactNode}) => {
  return (
   <CartProvide
     mode='payment'
     cartMode='client-only'
     stripe={process.env.NEXT_PUBLIC_STRIPE as string}
     successUrl='http://localhost:3000/success'
     cancelUrl='http://localhost:3000/error'
     billingAddressCollection={false}
     shouldPersist={true}
     language='en-US'
     currency='USD'
   >
    {children}
   </CartProvide>
  )
}

export default CartProvider
