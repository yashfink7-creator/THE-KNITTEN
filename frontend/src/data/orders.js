export const ORDER_STATUSES = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];

const orders = [
  {
    id: 1024,
    customer: 'Meera Nair',
    product: 'Daisy Bouquet',
    amount: 699,
    status: 'Pending',
    date: '2026-08-15',
  },
  {
    id: 1023,
    customer: 'Ayesha Khan',
    product: 'Crochet Teddy',
    amount: 899,
    status: 'Confirmed',
    date: '2026-08-14',
  },
  {
    id: 1022,
    customer: 'Priya Sharma',
    product: 'Tote Bag',
    amount: 999,
    status: 'Shipped',
    date: '2026-08-13',
  },
  {
    id: 1021,
    customer: 'Fatima Rahman',
    product: 'Mini Bear Keychain',
    amount: 349,
    status: 'Delivered',
    date: '2026-08-11',
  },
  {
    id: 1020,
    customer: 'Sara Ali',
    product: 'Sunflower Bouquet',
    amount: 799,
    status: 'Delivered',
    date: '2026-08-09',
  },
  {
    id: 1019,
    customer: 'Neha Verma',
    product: 'Daisy Bucket Hat',
    amount: 599,
    status: 'Pending',
    date: '2026-08-08',
  },
  {
    id: 1018,
    customer: 'Kavya Reddy',
    product: 'Granny Square Blanket',
    amount: 2499,
    status: 'Confirmed',
    date: '2026-08-07',
  },
];

export default orders;
