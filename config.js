/* ============================================================
   EDIT THIS FILE to rebrand the demo for a new café.
   Name, address, phone, hours, currency, menu, seating and
   reviews all flow from here into every page.
   ============================================================ */
window.SITE = {
  id: 'little-fern',
  name: 'Little Fern',
  tagline: 'Specialty coffee, pastry baked in-house and brunch every day until 2.',
  city: 'Austin',
  phone: '(512) 555-0142',
  whatsapp: '', // digits only for Gulf clients, e.g. '97142223344'. Empty = confirmations go by SMS.
  email: 'hello@littlefern.coffee',
  address: {
    lines: ['418 South Congress Avenue', 'Austin, TX 78704'],
    street: '418 South Congress Avenue',
    region: 'TX', postcode: '78704', country: 'US',
  },
  social: [{ label: 'Instagram', href: 'https://instagram.com/' }],
  hours: {
    sessions: [{ label: 'Open', open: '07:00', close: '18:00' }],
    closedDays: [],
    display: ['Open daily, 7 am to 6 pm', 'Brunch until 2 pm'],
  },
  currency: 'USD', // ISO code: USD, AED, KWD …
  currencyDigits: 2, // decimals shown: 2 for USD, 0 for AED, 3 for KWD
  locale: 'en-US', // date style: en-US (October 24) or en-GB (24 October)
  refPrefix: 'LF-',
  schemaType: 'CafeOrCoffeeShop',
  priceRange: '$$',
  schemaExtra: { servesCuisine: ['Coffee', 'Brunch', 'Bakery'], acceptsReservations: true, menu: 'menu.html' },
  demo: { busy: 30 },
  tableCount: 12, // table QR codes: tables.html prints one per table, each opens menu.html?table=N
  seating: [
    { id: 'window', name: 'Window bar', note: 'Stools facing the street, best for one or two', max: 2 },
    { id: 'patio', name: 'Patio', note: 'Under the live oak, shaded until 4 pm' },
    { id: 'communal', name: 'Long table', note: 'Shared, with outlets, laptop friendly' },
    { id: 'lounge', name: 'Lounge corner', note: 'Armchairs and a sofa, the quiet end', max: 4 },
  ],

  nav: [
    { href: 'menu.html', label: 'Menu' },
    { href: 'index.html#coffee', label: 'Our coffee' },
    { href: 'reviews.html', label: 'Reviews' },
    { href: 'index.html#visit', label: 'Visit' },
  ],
  cta: { href: 'book.html', label: 'Reserve' },
  /* Logo mark: a fern frond. */
  logoMark: `<svg class="logo-mark" viewBox="0 0 32 40" aria-hidden="true"><g fill="var(--logo-fill,var(--accent))"><ellipse cx="10.5" cy="31" rx="7" ry="2.6" transform="rotate(28 10.5 31)"/><ellipse cx="21.5" cy="31" rx="7" ry="2.6" transform="rotate(-28 21.5 31)"/><ellipse cx="11" cy="23.5" rx="6" ry="2.3" transform="rotate(28 11 23.5)"/><ellipse cx="21" cy="23.5" rx="6" ry="2.3" transform="rotate(-28 21 23.5)"/><ellipse cx="11.8" cy="16.5" rx="4.8" ry="2" transform="rotate(28 11.8 16.5)"/><ellipse cx="20.2" cy="16.5" rx="4.8" ry="2" transform="rotate(-28 20.2 16.5)"/><ellipse cx="16" cy="8.5" rx="2.2" ry="4.2"/></g><path d="M16 38V11" stroke="var(--logo-fill,var(--accent))" stroke-width="1.6" stroke-linecap="round"/></svg>`,

  /* Dietary tags: V vegetarian, VG vegan, GF gluten-free. */
  menu: [
    { id: 'coffee', name: 'Coffee', items: [
      { id: 'esp', name: 'Espresso', desc: 'Rotating single origin. This month: Huila, Colombia.', price: 3.5, tags: ['VG'], img: '1510591509098-f4fdc6d0ff04' },
      { id: 'cortado', name: 'Cortado', desc: 'Equal parts espresso and steamed milk.', price: 4.25, tags: ['V'], img: '1541167760496-1628856ab772' },
      { id: 'cap', name: 'Cappuccino', desc: 'Double shot, silky foam.', price: 4.75, tags: ['V'], pop: true, img: '1572442388796-11668a67e53d' },
      { id: 'latte', name: 'Oat latte', desc: 'House-blend espresso with oat milk.', price: 5.25, tags: ['VG'], pop: true, img: '1534778101976-62847782c213' },
      { id: 'drip', name: 'Drip coffee', desc: 'Free refills while you stay.', price: 3.25, tags: ['VG'], img: '1497515114629-f71d768fd07c' },
      { id: 'mocha', name: 'Dark mocha', desc: '70% chocolate, espresso, steamed milk.', price: 5.5, tags: ['V'], img: '1542990253-0d0f5be5f0ed' },
    ] },
    { id: 'cold', name: 'Cold', items: [
      { id: 'coldbrew', name: 'Cold brew', desc: 'Steeped 18 hours, served black over ice.', price: 4.75, tags: ['VG'], pop: true, img: '1461023058943-07fcbe16d735' },
      { id: 'icedlatte', name: 'Iced honey latte', desc: 'Local wildflower honey, cinnamon.', price: 5.75, tags: ['V'], img: '1517701604599-bb29b565090c' },
      { id: 'tonic', name: 'Espresso tonic', desc: 'Tonic, orange peel, double shot.', price: 5.5, tags: ['VG'], img: '1578314675249-a6910f80cc4e' },
      { id: 'matcha', name: 'Matcha latte', desc: 'Ceremonial grade, oat milk, hot or iced.', price: 5.75, tags: ['VG'], img: '1515823064-d6e0c04616a7' },
    ] },
    { id: 'brunch', name: 'Brunch', note: 'Served until 2 pm', items: [
      { id: 'avo', name: 'Avocado toast', desc: 'Sourdough, soft eggs, chili crisp, lime.', price: 12.5, tags: ['V'], pop: true, img: '1541519227354-08fa5d50c44d' },
      { id: 'tacos', name: 'Breakfast tacos', desc: 'Two flour tortillas, eggs, potato, salsa verde.', price: 10, tags: ['V'], pop: true, img: '1551504734-5ee1c4a1479b' },
      { id: 'pancakes', name: 'Ricotta pancakes', desc: 'Blueberries, maple, whipped butter.', price: 13, tags: ['V'], img: '1506084868230-bb9d95c24759' },
      { id: 'bowl', name: 'Yogurt and granola', desc: 'House granola, seasonal fruit, honey.', price: 9.5, tags: ['V', 'GF'], img: '1490474418585-ba9bad8fd0ea' },
      { id: 'eggcroissant', name: 'Poached eggs and greens', desc: 'Two poached eggs, sourdough, avocado, herbs.', price: 9.75, tags: ['V'], img: '1513442542250-854d436a73f2' },
    ] },
    { id: 'pastry', name: 'Pastry', items: [
      { id: 'croissant', name: 'Butter croissant', desc: 'Laminated here, baked from 6 am.', price: 4.25, tags: ['V'], pop: true, img: '1555507036-ab1f4038808a' },
      { id: 'almond', name: 'Almond croissant', desc: 'Frangipane, toasted almonds.', price: 5.25, tags: ['V'], img: '1530610476181-d83430b64dcd' },
      { id: 'bun', name: 'Cinnamon cardamom bun', desc: 'Swedish-style, pearl sugar.', price: 4.75, tags: ['V'], img: '1509365465985-25d11c17e812' },
      { id: 'cookie', name: 'Chocolate chip cookie', desc: 'Brown butter, sea salt.', price: 3.5, tags: ['V'], img: '1558961363-fa8fdf82db35' },
      { id: 'tart', name: 'Seasonal fruit tart', desc: 'Vanilla custard, whatever is ripe.', price: 6, tags: ['V'], img: '1495147466023-ac5c588e2e94' },
    ] },
    { id: 'lunch', name: 'Lunch', items: [
      { id: 'panini', name: 'Turkey pesto panini', desc: 'Provolone, roasted tomato, arugula.', price: 13.5, tags: [], img: '1528735602780-2552fd46c7af' },
      { id: 'grain', name: 'Grain bowl', desc: 'Farro, roast vegetables, tahini, soft egg.', price: 14, tags: ['V'], img: '1512621776951-a57141f2eefd' },
      { id: 'soup', name: 'Tomato soup and grilled cheese', desc: 'The rainy-day order.', price: 12, tags: ['V'], img: '1547592166-23ac45744acd' },
    ] },
  ],

  reviews: [
    { name: 'Taylor V.', rating: 5, date: '2026-10-19', tag: 'Brunch', text: 'The breakfast tacos are the real thing and the cortado is perfect. Patio seats in the morning are the best on South Congress.' },
    { name: 'Marcus B.', rating: 5, date: '2026-10-14', tag: 'Coffee', text: 'Rotating single origin is always interesting, and the staff actually tell you about it if you ask.' },
    { name: 'Priya K.', rating: 4, date: '2026-10-06', tag: 'Working from the café', text: 'Outlets at the long table and fast wifi. Gets busy on weekends, so reserve.' },
    { name: 'Hannah T.', rating: 5, date: '2026-09-28', tag: 'Reserved a table', text: 'Reserved the lounge corner for my mom’s birthday. They brought a candle in a cardamom bun.' },
    { name: 'Diego S.', rating: 4, date: '2026-09-17', tag: 'To go', text: 'Cold brew is smooth and not bitter. Wish the cups were bigger.' },
    { name: 'Emily L.', rating: 5, date: '2026-09-02', tag: 'Brunch', text: 'Ordered from the table and a second coffee arrived without me getting up. Dangerous. Love it.' },
  ],
};
