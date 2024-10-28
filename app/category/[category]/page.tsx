import ProductPage from "@/app/components/ProductPage";
import { client } from "@/sanity/lib/client";

interface dataFact {
  _id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  image: any;
}

async function getData(category: string) {
  const query = category === "all"
    ? `*[_type == 'product']{
        _id,
        price,
        name,
        "slug": slug.current,
        "image": images[0].asset -> url,
        "category": category -> title
      }`
    : `*[_type == 'product' && lower(category -> title) == '${category.toLowerCase()}']{
        _id,
        price,
        name,
        "slug": slug.current,
        "image": images[0].asset -> url,
        "category": category -> title
      }`;
      
  const data = await client.fetch(query);
  return data;
}

async function getCategories() {
  const query = `*[_type == 'category']{
    title
  }`;
  
  const categories = await client.fetch(query);
  return categories.map((cat: { title: string }) => cat.title);
}

const Page = async ({ params }: { params: { category: string } }) => {
  const data: dataFact[] = await getData(params.category);
  const categories: string[] = await getCategories();

  return <ProductPage data={data} category={params.category} categories={categories} />;
};

export default Page;
