export const prices = [
  {
    _id: 0,
    name: '$0 to 19',
    array: [0, 19],
  },
  {
    _id: 1,
    name: '$19 to 39',
    array: [19, 39],
  },
  {
    _id: 2,
    name: '$39 to 59',
    array: [39, 59],
  },
  {
    _id: 3,
    name: '$59 to 79',
    array: [59, 79],
  },
  {
    _id: 4,
    name: '$79 to 99',
    array: [79, 99],
  },
  {
    _id: 5,
    name: '$99 or more',
    array: [99, 9999],
  },
]

export const shipping = [
  {
    value: true,
    name: 'Free',
  },
  {
    value: false,
    name: 'Not Free',
  },
]

export const processOrder = {
  NotProcess: 'not-process',
  Processing: 'processing',
  Shipped: 'shipped',
  Deliverd: 'deliverd',
  Cancelled: 'cancelled',
}
