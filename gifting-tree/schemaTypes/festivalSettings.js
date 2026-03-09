export default {
  name: 'festivalSettings',
  title: 'Festival Settings',
  type: 'document',
  fields: [
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
          {title: 'Holi', value: 'holi'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
  ],
}
