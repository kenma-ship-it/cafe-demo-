/* ============================================================
   EDIT THIS FILE to rebrand the demo for a new café.
   Name, address, phone, hours, menu, tables and reviews
   all flow from here into every page.
   ============================================================ */
window.SITE = {
  id: 'little-fern',
  name: 'Little Fern',
  tagline: 'Neighbourhood coffee, bakes and slow breakfasts. Order from your table.',
  city: 'Bengaluru',
  phone: '+91 99001 23456',
  whatsapp: '919900123456',
  email: 'hello@littlefern.cafe',
  address: {
    lines: ['22, 11th Main, 4th Block', 'Jayanagar', 'Bengaluru 560011'],
    street: '22, 11th Main, 4th Block, Jayanagar',
    region: 'Karnataka', postcode: '560011', country: 'IN',
  },
  social: [{ label: 'Instagram', href: 'https://instagram.com/' }],
  hours: {
    sessions: [{ label: 'Open', open: '07:30', close: '22:00' }],
    closedDays: [],
    display: ['Every day, 7:30 am to 10 pm', 'Kitchen closes at 9:30 pm'],
  },
  currency: '₹',
  locale: 'en-IN',
  refPrefix: 'LF-',
  schemaType: 'CafeOrCoffeeShop',
  priceRange: '₹₹',
  schemaExtra: { servesCuisine: 'Coffee, breakfast, bakery', acceptsReservations: true, menu: 'menu.html' },
  demo: { busy: 30 },
  tableCount: 12,
  seating: [
    { id: 'window', name: 'Window bar', note: 'Stools facing the street, good for one or two' },
    { id: 'garden', name: 'Garden', note: 'Under the jacaranda, shaded until 4 pm' },
    { id: 'communal', name: 'Long table', note: 'Shared, with plugs, laptop friendly' },
    { id: 'nook', name: 'Reading nook', note: 'Two armchairs and a sofa, quiet' },
  ],

  nav: [
    { href: 'menu.html', label: 'Menu' },
    { href: 'reviews.html', label: 'Reviews' },
    { href: 'tables.html', label: 'Table QR codes' },
  ],
  cta: { href: 'book.html', label: 'Book a table' },

  menu: [
    { id: 'coffee', name: 'Hot coffee', items: [
      { id: 'esp', name: 'Espresso', desc: 'Single origin, Chikmagalur. Chocolate and cherry.', price: 140, veg: true },
      { id: 'cap', name: 'Cappuccino', desc: 'Double shot, silky milk.', price: 210, veg: true, pop: true, img: '1572442388796-11668a67e53d' },
      { id: 'flat', name: 'Flat white', desc: 'Less milk, more coffee.', price: 220, veg: true, pop: true, img: '1534778101976-62847782c213' },
      { id: 'filter', name: 'Filter kaapi', desc: 'Brass dabarah, chicory blend, boiled milk.', price: 120, veg: true },
      { id: 'mocha', name: 'Dark mocha', desc: '70% cacao, espresso, steamed milk.', price: 260, veg: true },
    ] },
    { id: 'cold', name: 'Cold coffee', items: [
      { id: 'coldbrew', name: 'Cold brew', desc: 'Steeped 18 hours. Served black over ice.', price: 230, veg: true, pop: true, img: '1461023058943-07fcbe16d735' },
      { id: 'tonic', name: 'Espresso tonic', desc: 'Tonic, orange peel, double shot.', price: 260, veg: true },
      { id: 'frappe', name: 'Jaggery frappé', desc: 'Blended, palm jaggery, cream.', price: 280, veg: true },
    ] },
    { id: 'tea', name: 'Tea and more', items: [
      { id: 'chai', name: 'Masala chai', desc: 'Ginger, cardamom, made to order.', price: 110, veg: true },
      { id: 'matcha', name: 'Iced matcha latte', desc: 'Ceremonial grade, oat milk.', price: 290, veg: true },
      { id: 'cocoa', name: 'Hot chocolate', desc: 'Thick, with a toasted marshmallow.', price: 240, veg: true },
    ] },
    { id: 'breakfast', name: 'Breakfast', note: 'Served until 12 noon', items: [
      { id: 'akuri', name: 'Akuri on sourdough', desc: 'Parsi-style spiced scrambled eggs.', price: 320, veg: false, pop: true },
      { id: 'avo', name: 'Smashed avocado toast', desc: 'Chilli flakes, feta, lime.', price: 360, veg: true },
      { id: 'pancakes', name: 'Ragi pancakes', desc: 'Banana, honey butter, berries.', price: 340, veg: true },
      { id: 'bowl', name: 'Granola bowl', desc: 'House granola, curd, seasonal fruit.', price: 290, veg: true },
    ] },
    { id: 'bakes', name: 'Bakes', items: [
      { id: 'croissant', name: 'Butter croissant', desc: 'Laminated in-house, baked every morning.', price: 160, veg: true, pop: true, img: '1555507036-ab1f4038808a' },
      { id: 'cinnamon', name: 'Cardamom bun', desc: 'Swedish-style, pearl sugar.', price: 180, veg: true },
      { id: 'banana', name: 'Banana walnut loaf', desc: 'A thick slice, warmed.', price: 150, veg: true },
      { id: 'cookie', name: 'Sea salt choc chip cookie', desc: 'Crisp edge, soft middle.', price: 120, veg: true },
    ] },
    { id: 'mains', name: 'Sandwiches and bowls', items: [
      { id: 'panini', name: 'Pesto paneer panini', desc: 'Sun-dried tomato, rocket.', price: 380, veg: true },
      { id: 'chicken', name: 'Chilli chicken sourdough', desc: 'Pulled chicken, pickled onion, slaw.', price: 420, veg: false },
      { id: 'buddha', name: 'Millet buddha bowl', desc: 'Roast veg, hummus, tahini.', price: 390, veg: true },
    ] },
  ],

  reviews: [
    { name: 'Tara V.', rating: 5, date: '2026-10-19', tag: 'Ordered at the table', text: 'Scanned the code, ordered a flat white and a croissant, and it arrived before I had my laptop open. No waving at staff.' },
    { name: 'Rohan B.', rating: 5, date: '2026-10-14', tag: 'Breakfast', text: 'The akuri is the real thing. Garden seats in the morning are the best in Jayanagar.' },
    { name: 'Divya K.', rating: 4, date: '2026-10-06', tag: 'Working from the café', text: 'Plugs at the long table and decent wifi. Gets busy at weekends, so book.' },
    { name: 'Arjun T.', rating: 5, date: '2026-09-28', tag: 'Booked a table', text: 'Booked the reading nook for my mum’s birthday. They had a candle in the cardamom bun.' },
    { name: 'Sana Q.', rating: 4, date: '2026-09-17', tag: 'Takeaway', text: 'Cold brew is smooth and not bitter. Wish the cups were bigger.' },
    { name: 'Manish L.', rating: 5, date: '2026-09-02', tag: 'Ordered at the table', text: 'Being able to add another coffee from the phone without getting up is dangerous. Love it.' },
  ],
};
