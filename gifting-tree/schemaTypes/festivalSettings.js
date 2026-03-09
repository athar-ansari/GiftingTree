export default {
  name: 'festivalSettings',
  title: 'Global Festival Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Settings Title',
      type: 'string',
      initialValue: 'Website Festival Configuration',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'activeFestival',
      title: 'Active Festival',
      type: 'string',
      description: 'Select the current active festival to display on the website.',
      options: {
        list: [
          {title: 'Ramzan', value: 'ramzan'},
          {title: 'Eid', value: 'eid'},
          {title: 'Valentine', value: 'valentine'},
          {title: 'Rakhi', value: 'rakhi'},
          {title: 'Diwali', value: 'diwali'},
          {title: 'Standard (No Festival)', value: 'standard'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Festival Settings',
      }
    },
  },
}
