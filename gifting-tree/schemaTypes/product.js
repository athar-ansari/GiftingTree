export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'frontImage',
      title: 'Front Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'sizes',
      title: 'Sizes with Prices',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'size',
              title: 'Size',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          {title: 'Best Seller', value: 'best-seller'},
          {title: 'Bookmarks', value: 'bookmarks'},
          {title: 'New Arrival', value: 'new-arrival'},
          {title: 'Limited Edition', value: 'limited-edition'},
          {title: 'Key Chains', value: 'key-chains'},
          {title: 'Puja Thali', value: 'puja-thali'},
          {title: 'Wall Art', value: 'wall-art'},
          {title: 'Book Holder', value: 'book-holder'},
          {title: 'Jewellery', value: 'jewellery'},
          {title: 'Car Accessories', value: 'car-accessories'},
          {title: 'Flower Preservation', value: 'flower-preservation'},
          {title: 'Varmala', value: 'varmala'},
          {title: 'Clock', value: 'clock'},
          {title: 'Resin Frame', value: 'resin-frame'},
          {title: 'Other Products', value: 'other-products'},
        ],
      },
    },
    {
      name: 'festivals',
      title: 'Festivals',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Ramzan', value: 'ramzan'},
          {title: 'Eid', value: 'eid'},
          {title: 'Valentine', value: 'valentine'},
          {title: 'Rakhi', value: 'rakhi'},
          {title: 'Diwali', value: 'diwali'},
          {title: 'Standard', value: 'standard'},
        ],
      },
      description: 'Select which festivals this product belongs to (can select multiple).',
    },
  ],
}
