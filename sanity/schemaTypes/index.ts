import { type SchemaTypeDefinition } from 'sanity'
import { Store } from '../store'
import { Category } from '../category'
import { Product } from '../product'
import blockContent from '../blockContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Store, Product, Category, blockContent],
}
