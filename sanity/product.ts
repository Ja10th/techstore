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
      type: 'text',
      title: 'Specifications',
      validation: (Rule: { max: (arg0: number) => any; }) => Rule.max(500),
    },
    {
      name: 'features',
      type: 'text',
      title: 'Key Features',
      validation: (Rule: { max: (arg0: number) => any; }) => Rule.max(500),
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
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: [{ type: 'category' }],
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
  ],
};
