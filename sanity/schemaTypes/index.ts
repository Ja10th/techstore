import { type SchemaTypeDefinition } from 'sanity'
import { Store } from '../store'
import { Category } from '../category'
import { Product } from '../product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Store, Product, Category],
}
