import Image from 'next/image'
import React from 'react'
import { urlForImage } from './AddtoCart';

export const RichTextComponent = {
    types: {
        image: ({ value }: any) => {
            return(
                <div className='relative  items-center text-center flex justify-start lg:px-40 w-full h-60  lg:mx-auto'>
                    <Image 
                    className='object-contain object-left'
                    src={urlForImage(value).url()}
                    
                    alt="Blog post image"
                    fill
                    />
                </div>
            );
        },
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="ml-10 py-5 list-disc text-gray-600 text-[16px] space-y-5"> {children} </ul>
        ),
        number: ({ children }: any) => (
            <ol className="mt-lg list-decimal text-gray-600 text-sm"> {children} </ol>
        ),
    },
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-4xl py-5 text-gray-800 font-[400]">{children}</h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-3xl py-2 text-gray-800 font-[400]">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-2xl py-2 text-gray-800 font-[400]">{children}</h3>
        ),
        h4: ({ children }: any) => (
            <h4 className="text-2xl py-2 text-gray-800 font-[400]">{children}</h4>
        ),
        normal: ({ children }: any) => (
            <p className="text-[16px] text-gray-600 leading-normal ">{children}</p>
        ),

        blockquote: ({ children}: any) => (
            <blockquote className=' w-full bg-neutral-900 rounded text-slate-200 text-sm leading-loose pl-5 py-5 my-5'>
                {children}
            </blockquote>
        ),
    },
    marks: {
        link: ({ children, value }: any) => {
            const rel = (value?.href || '').startsWith('https') ? '_blank' : undefined;  
            
            return (
                <a href={value?.href}  className="underline text-blue-900 font-semibold decoration-blue-600 hover:decoration-black" rel={rel}>{children}</a>
            );
        },
    },

}
