export const Store = {
    name: 'store',
    title: 'Store',
    type: 'document',
    fields: [
      {
        name: 'storeName',
        type: 'string',
        title: 'Store Name',
        validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().min(3).max(100),
      },
      {
        name: 'storeDescription',
        type: 'text',
        title: 'Store Description',
        validation: (Rule: { max: (arg0: number) => any; }) => Rule.max(500),
      },
      {
        name: 'products',
        type: 'array',
        title: 'Products',
        of: [{ type: 'reference', to: [{ type: 'product' }] }],
      },
      {
        name: 'categories',
        type: 'array',
        title: 'Categories',
        of: [{ type: 'reference', to: [{ type: 'category' }] }],
      },
      {
        name: 'storeLogo',
        type: 'image',
        title: 'Store Logo',
        options: { hotspot: true },
      },
      {
        name: 'storeBanner',
        type: 'image',
        title: 'Store Banner',
        options: { hotspot: true },
      },
      {
        name: 'location',
        type: 'object',
        title: 'Store Location',
        fields: [
          {
            name: 'address',
            type: 'string',
            title: 'Address',
          },
          {
            name: 'city',
            type: 'string',
            title: 'City',
          },
          {
            name: 'state',
            type: 'string',
            title: 'State',
          },
          {
            name: 'postalCode',
            type: 'string',
            title: 'Postal Code',
          },
          {
            name: 'country',
            type: 'string',
            title: 'Country',
            initialValue: 'Nigeria',
          },
        ],
      },
      {
        name: 'contactInfo',
        type: 'object',
        title: 'Contact Information',
        fields: [
          {
            name: 'phone',
            type: 'string',
            title: 'Phone Number',
          },
          {
            name: 'email',
            type: 'string',
            title: 'Email Address',
          },
        ],
      },
    ],
  };
  
  
  
  
  