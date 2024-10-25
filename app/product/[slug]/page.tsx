import AddtoCart from '@/app/components/AddtoCart';
import Floating from '@/app/components/floating';
import NavbarCart from '@/app/components/NavbarCart';
import Top from '@/app/components/top';
import { client } from '@/sanity/lib/client';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight, FaStar, FaTruck } from 'react-icons/fa6'

interface dataFact {
  _id: string,
  images: any,
  price: number,
  name: string,
  description: string,
  slug: string,
  category: string,
  price_id: string,
}

interface DataType {
  _id: string;
  name: string;
  price: number;
  slug: string;
  category: string;
  productImage: string;
}

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id,
    name,
    images,
    price,
    description,
    "category": category -> name,
    "slug": slug.current,
    price_id
  }`
  const data = await client.fetch(query)
  return data
}

async function getOtherProducts() {
  const query = `*[_type == 'product'][0...10] | order(_createdAt desc) {
    _id,
    name,
    price,
    "slug": slug.current,
    "category": category -> name,
    "productImage": images[0].asset->url
  }`

  const data = await client.fetch(query)
  return data
}

export const dynamic = 'force-dynamic'

const page = async ({ params }: { params: { slug: string } }) => {
  const data: dataFact = await getData(params.slug)
  const otherProducts: DataType[] = await getOtherProducts()

  return (
    <div>
           <Top />
      <Floating />
      <NavbarCart heroHeight={0} />
      <div className='max-w-7xl mx-auto px-8'>
        {/* Product details */}
        <div className='grid gap-8 md:grid-cols-2'>
          <div className='md:py-8'>
            <div className='mb-2 md:mb-3'>
              <span className='inline-block text-gray-500 mb-0.5'>
                {data.category}
              </span>
              <h2 className='text-2xl font-bold text-gray-800 lg:text-4xl'>{data.name}</h2>
            </div>

            <div className='mb-6 flex items-center gap-x-2 md:mb-10'>
              <button className='text-blue-500 justify-center rounded-xl px-1 py-2 flex items-center'>
                <span>4.2</span>
                <FaStar className='ml-1' />
              </button>
              <span className='text-sm text-gray-500 transition duration-100'>50 Ratings</span>

              <div className='flex items-center gap-x-2'>
                <FaTruck className='text-lg text-blue-500' />
                <p className='text-sm text-gray-500'>2-4 days shipping</p>
              </div>
            </div>

            <p className='text-gray-500 tracking-wide text-sm pb-10'>{data.description}</p>

            <div className=''>
              <div className='flex gap-2 items-center'>
                <span className='text-sm text-gray-800 md:text-2xl'>
                  NGN <span className='text-xl font-bold'>{data.price.toLocaleString()}</span>
                </span>
                <span className='text-sm line-through text-blue-500'>
                  NGN<span className=''>{(data.price + 30).toLocaleString()}</span>
                </span>
              </div>
              <span className='text-xs text-gray-500'>Incl. Vat plus shipping</span>
            </div>

            <div className='flex gap-x-4 pt-2'>
              <AddtoCart
                currency='USD'
                name={data.name}
                description={data.description}
                price={data.price}
                image={data.images[0]}
                key={data._id}
                price_id={data.price_id}
              />
              <Link href="/" className='underline flex gap-x-2 items-center text-blue-500 '>
                Checkout <FaArrowRight className='text-indigo-400 text-lg' />
              </Link>
            </div>
          </div>
        </div>

        {/* Horizontal scrolling section */}
        <div className='mt-12'>
          <h3 className='text-2xl font-semibold text-gray-800 mb-6'>You may also like</h3>
          <div className='overflow-x-auto flex space-x-6'>
            {otherProducts.map((product) => (
              <Link key={product._id} href={`/product/${product.slug}`} className='min-w-[200px] flex-shrink-0 bg-slate-100 rounded-xl border shadow-sm p-4'>
                 <div className='w-44 h-44 overflow-hidden rounded-xl border p-6 border-gray-300 bg-white group-hover:opacity-75'> {/* Set a fixed height */}
                <Image
                src={product.productImage}
                alt={product.name} // Use the product name for better accessibility
                className='w-full h-full object-contain ' // Use object-cover to maintain aspect ratio
                width={300} // These can be adjusted
                height={300} // These can be adjusted
                    />
                </div>
                <div className='mt-4'>
                  <h4 className='text-lg font-semibold text-gray-700'>{product.name}</h4>
                  <p className='text-sm text-gray-500'>₦{product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
