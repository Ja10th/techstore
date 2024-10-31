export const Product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Product Name',
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().min(3).max(100),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Product Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Product Description',
      validation: (Rule: { max: (arg0: number) => any; }) => Rule.max(500),
    },
    {
      name: 'specifications',
      type: 'blockContent',
      title: 'Specifications',
      validation: (Rule: { max: (arg0: number) => any; }) => Rule.max(5000),
    },
    {
      name: 'features',
      type: 'blockContent',
      title: 'Key Features',
      validation: (Rule: { max: (arg0: number) => any; }) => Rule.max(5000),
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(0),
    },
    {
      name: 'stock',
      type: 'number',
      title: 'Stock Quantity',
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(0),
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'images',
      type: 'array',
      title: 'Product Images',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().min(1).max(10), // At least 1 image, maximum of 10
    },
    {
      name: 'sku',
      type: 'string',
      title: 'SKU (Stock Keeping Unit)',
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: 'isFeatured',
      type: 'boolean',
      title: 'Featured Product',
    },
    {
      name: 'brand', // New field added for the brand
      type: 'string',
      title: 'Brand',
      validation: (Rule: { required: () => any; }) => Rule.required(), // Optional: make it required if needed
    },
  ],
};
