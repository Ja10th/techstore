'use client'

import React from 'react';
import ImageUrlBuilder from '@sanity/image-url';
import { useShoppingCart } from 'use-shopping-cart';
import { client } from '@/sanity/lib/client';

export interface ProductCart {
    name: string;
    description: string;
    price: number;
    currency: string;
    image: any; // Consider specifying a more precise type if possible
    price_id: string;
    quantity: number;
}

const AddtoCart = ({ name, description, price, currency, price_id, image, quantity }: ProductCart) => {
    const { addItem, handleCartClick } = useShoppingCart();

    const product = {
        name,
        description,
        price,
        currency,
        image: urlForImage(image).url(), // Ensure this returns a valid URL
        price_id,
        quantity
    };

    return (
        <button
            onClick={() => {
                addItem(product);
                handleCartClick();
            }}
            className="px-8 bg-blue-500 py-2 text-gray-100 rounded-2xl"
        >
            Add to Cart
        </button>
    );
};

export default AddtoCart;

const builder = ImageUrlBuilder(client);

export function urlForImage(source: any) {
    return builder.image(source);
}
