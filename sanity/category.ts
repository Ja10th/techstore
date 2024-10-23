export const Category = {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Category Name',
        validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().min(3).max(50),
      },
      {
        name: 'description',
        type: 'text',
        title: 'Category Description',
        validation: (Rule: { max: (arg0: number) => any; }) => Rule.max(200),
      },
    ],
  };