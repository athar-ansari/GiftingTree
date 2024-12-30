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
        layout: 'dropdown',
        list: [
          {title: 'Best Seller', value: 'best-seller'},
          {title: 'New Arrival', value: 'new-arrival'},
          {title: 'Limited Edition', value: 'limited-edition'},
          {title: 'Key Chains', value: 'key-chains'},
          {title: 'Jewelry', value: 'jewelry'},
          {title: 'Birthday Frame', value: 'birthday-frame'},
          {title: 'Couple Frame', value: 'couple-frame'},
          {title: 'Religious Frame', value: 'religious-frame'},
          {title: 'Car Accessories', value: 'car-accessories'},
          {title: 'Clock', value: 'clock'},
          {title: 'Bookmarks', value: 'bookmarks'},
          {title: 'Puja Thali', value: 'puja-thali'},
          {title: 'Wall Art', value: 'wall-art'},
          {title: 'Book Holder', value: 'book-holder'},
          {title: 'Flower Preservation', value: 'flower-preservation'},
          {title: 'Pen', value: 'pen'},
          {title: 'Mirror', value: 'mirror'},
          {title: 'Dupatta', value: 'dupatta'},
          {title: 'Register', value: 'register'},
          {title: 'Thumb Frame', value: 'thumb-frame'},
          {title: 'Nikah Frame', value: 'nikah-frame'},
          {title: 'Wedding Boards', value: 'wedding-boards'},
          {title: 'Nikah Favours', value: 'nikah-favours'},
          {title: 'Mehar Box', value: 'mehar-box'},
          {title: 'Platter', value: 'platter'},
        ],

        // { title: ' ', value: ' ' },
        // { title: ' ', value: ' ' },

        // if you add extra then also add in productDetails.jsx , Products.jsx and ArtisanalCollections.jsx file .
      },
    },
  ],
}
