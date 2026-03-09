import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Define the singleton types
const singletonTypes = new Set(['festivalSettings'])

// Define the singleton actions
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'GIFTING TREE',

  projectId: 'rv6k790j',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Regular document types
            S.documentTypeListItem('product').title('Products'),

            S.divider(),

            // Singleton document types
            S.listItem()
              .title('Festival Settings')
              .id('festivalSettings')
              .child(S.document().schemaType('festivalSettings').documentId('festivalSettings')),

            // Filter out the singleton types from the default list
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId()) && listItem.getId() !== 'product',
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global “New document” menu options
    templates: (prev) => prev.filter((template) => !singletonTypes.has(template.schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not allowed
    actions: (prev, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({action}) => action && singletonActions.has(action))
        : prev,
  },
})
