import React from "react";
import ProductPage from "./ProductPage";
import { client } from "@/sanity/lib/client";

interface DataFact {
  _id: string;
  images: any;
  price: number;
  name: string;
  description: string;
  slug: string;
  category: string;
  sku:string;
  price_id: string;
  specifications: any;
  features: any;
}

interface DataType {
  _id: string;
  name: string;
  price: number;
  sku:string,
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
    sku,
    description,
    "category": category -> name,
    "slug": slug.current,
    specifications,
  features,
    price_id
  }`;
  const data = await client.fetch(query);
  return data;
}

async function getOtherProducts() {
  const query = `*[_type == 'product'][0...8] | order(_createdAt desc) {
    _id,
    name,
    sku,
    price,
    "slug": slug.current,
    "category": category -> name,
    "productImage": images[0].asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const data: DataFact = await getData(params.slug);
  const otherProducts: DataType[] = await getOtherProducts();

  return <ProductPage data={data} otherProducts={otherProducts} />;
};

export const dynamic = "force-dynamic";

export default Page;
