import type { MenuCategory, CrabSize } from "./types";

// Transcribed exactly as printed on Ranmo's menu boards. All prices in LKR.
// A 10% service charge applies to all prices (printed on every board).

export const SERVICE_CHARGE_NOTE = "All prices are subject to a 10% service charge.";

export const CRAB_SIZES: CrabSize[] = [
  { label: "M", weightRange: "300g – 500g", pricePer100g: 2150 },
  { label: "L", weightRange: "500g – 700g", pricePer100g: 2150 },
  { label: "XL", weightRange: "700g – 900g", pricePer100g: 2350 },
  { label: "XXL", weightRange: "900g – 1.2kg", pricePer100g: 2750 },
  { label: "JUMBO", weightRange: "1.2kg up", pricePer100g: 3200 },
];

export const MENU: MenuCategory[] = [
  // ---------------- Mud Crab ----------------
  {
    slug: "sri-lankan-mud-crab",
    boardTitle: "Sri Lankan Mud Crab",
    tabGroup: "Mud Crab",
    note: "Priced by weight — pick your size (see chart) for Kochchi, Garlic or Black Pepper Crab.",
    items: [
      {
        name: "Kochchi Crab",
        description:
          "Sri Lankan mud crab tossed in a flavorful kochchi and olive oil-based sauce. Served with roast paan and coconut sambol for a true taste of Sri Lanka.",
        price: {},
        priceNote: "Priced per 100g by size — see crab size chart",
      },
      {
        name: "Garlic Crab",
        description:
          "Sri Lankan mud crab tossed in a rich garlic and olive oil-based sauce. Served with roast paan and coconut sambol for a deliciously aromatic experience.",
        price: {},
        priceNote: "Priced per 100g by size — see crab size chart",
      },
      {
        name: "Black Pepper Crab",
        description:
          "Sri Lankan mud crab tossed in a bold black pepper and olive oil-based sauce. Served with roast paan and coconut sambol for a flavorful and spicy delight.",
        price: {},
        priceNote: "Priced per 100g by size — see crab size chart",
      },
      {
        name: "Crab Curry",
        description:
          "Rich mud crab curry served with roast paan and pol sambol for a hearty and flavorful Sri Lankan experience.",
        price: { regular: 4500 },
      },
    ],
  },

  // ---------------- Main Course – Rice ----------------
  {
    slug: "main-course-rice",
    boardTitle: "Main Course – Rice",
    tabGroup: "Rice & Noodles",
    items: [
      {
        name: "Vegetable Fried Rice",
        description: "Kiri samba rice stir-fried with a vibrant mix of fresh vegetables for a light and flavorful dish.",
        price: { small: 320, large: 650, basmathiSmall: 400, basmathiLarge: 750 },
      },
      {
        name: "Chicken Fried Rice",
        description: "Kiri samba rice stir-fried with fresh vegetables, tender chicken, and scrambled egg for a deliciously satisfying dish.",
        price: { small: 500, large: 900, basmathiSmall: 600, basmathiLarge: 1100 },
      },
      {
        name: "Mutton Rice",
        description: "Aromatic kiri samba rice cooked with tender, spiced mutton and a medley of fresh vegetables, seasoned with traditional spices for a hearty and flavorful meal.",
        price: { small: 850, large: 1500, basmathiSmall: 850, basmathiLarge: 1800 },
      },
      {
        name: "Mixed Fried Rice",
        description: "Kiri samba rice stir-fried with a colorful mix of vegetables, chicken, beef, sausages, shrimp, calamari, and scrambled egg for a hearty and flavorful dish.",
        price: { small: 700, large: 1300, basmathiSmall: 750, basmathiLarge: 1450 },
      },
      {
        name: "Garlic Rice",
        description: "Fragrant kiri samba rice sautéed with butter, garlic, scrambled egg, and topped with fresh spring onions for a flavorful and aromatic dish.",
        price: { small: 450, large: 800, basmathiSmall: 500, basmathiLarge: 900 },
      },
      {
        name: "Egg Fried Rice",
        description: "Kiri samba rice stir-fried with fluffy scrambled eggs and a mix of fresh vegetables for a simple yet satisfying dish.",
        price: { small: 370, large: 750, basmathiSmall: 450, basmathiLarge: 850 },
      },
      {
        name: "Seafood Fried Rice",
        description: "A delightful blend of kiri samba rice, vegetables, and a medley of seafood including prawns, fish, and calamari, all finished with a touch of egg for a satisfying meal.",
        price: { small: 650, large: 1200, basmathiSmall: 750, basmathiLarge: 1400 },
      },
      {
        name: "Mongolian Rice",
        description: "Kiri samba rice tossed with julienne vegetables, chicken, beef, sausages, shrimp, and cuttlefish, all enveloped in a spicy Mongolian sauce. Served with a fried egg for an extra touch of flavor.",
        price: { small: 950, large: 1800, basmathiSmall: 1000, basmathiLarge: 1950 },
      },
      {
        name: "Biryani",
        description: "A sumptuous blend of fragrant kiri samba rice, tender marinated chicken, and a medley of spices that creates a symphony of flavors. Traditionally garnished with fried onions and boiled eggs for an authentic touch.",
        price: { regular: 850, basmathiRegular: 1000 },
      },
      {
        name: "Yellow Rice",
        description: "Savor our aromatic Sri Lankan Yellow Rice, infused with turmeric for a vibrant golden color. Cooked with creamy coconut milk, this fluffy rice perfectly complements our rich curries and flavorful dishes.",
        price: { regular: 700, basmathiRegular: 800 },
      },
      {
        name: "Steamed Rice",
        description: "Simple and fluffy steamed rice, the perfect accompaniment to any meal.",
        price: { regular: 350 },
      },
      {
        name: "Nasi Goreng",
        description: "Basmathi rice, nasi paste, chicken or seafood for your choice. Served with a piece of pineapple and sunny side up egg.",
        price: { regular: 1000 },
      },
      {
        name: "Chopsuey Rice",
        description: "A sophisticated take on a classic dish, featuring a medley of premium vegetables, tender protein, and aromatic rice.",
        price: { regular: null },
        priceNote: "TODO — illegible on source menu board (\"Rs.xxxx\"), confirm with client",
      },
    ],
  },

  // ---------------- Main Course – Noodles ----------------
  {
    slug: "main-course-noodles",
    boardTitle: "Main Course – Noodles",
    tabGroup: "Rice & Noodles",
    items: [
      {
        name: "Seafood Noodles",
        description: "Delicious noodles stir-fried with fresh vegetables, a medley of seafood including prawns, fish, and calamari, all finished with scrambled egg for a satisfying dish.",
        price: { small: 700, large: 1250 },
      },
      {
        name: "Mutton Noodles",
        description: "Savory stir-fried noodles tossed with tender, spiced mutton, fresh vegetables, and a blend of aromatic herbs for a flavorful, satisfying meal.",
        price: { small: 900, large: 1550 },
      },
      {
        name: "Chicken Noodles",
        description: "Tender noodles stir-fried with fresh vegetables, juicy chicken, and scrambled egg for a deliciously satisfying meal.",
        price: { small: 550, large: 950 },
      },
      {
        name: "Mixed Noodles",
        description: "Hearty noodles stir-fried with a vibrant mix of vegetables, chicken, sausages, shrimp, calamari, and scrambled egg for a flavor-packed dish.",
        price: { small: 650, large: 1200 },
      },
      {
        name: "Vegetable Noodles",
        description: "Flavorful noodles stir-fried with a colorful assortment of fresh vegetables for a light and satisfying dish.",
        price: { small: 350, large: 700 },
      },
      {
        name: "Egg Noodles",
        description: "Delicious noodles stir-fried with fluffy scrambled eggs and a medley of fresh vegetables for a hearty and satisfying meal.",
        price: { small: 400, large: 800 },
      },
      {
        name: "Mongolian Noodles",
        description: "Noodles stir-fried with julienne vegetables, chicken, beef, sausages, shrimp, and cuttlefish, all tossed in a spicy Mongolian sauce. Served with a fried egg for an extra kick.",
        price: { small: 1000, large: 1950 },
      },
    ],
  },

  // ---------------- Main Course – Meat ----------------
  {
    slug: "main-course-meat",
    boardTitle: "Main Course – Meat",
    tabGroup: "Meat & Fish",
    items: [
      {
        name: "Beef Sirloin Steak",
        description: "Grilled to perfection, this sirloin steak is served with fresh tomato salsa and pepper sauce, accompanied by creamy mashed potatoes and a side salad for a hearty meal.",
        price: { regular: 3800 },
      },
      {
        name: "Beef Tenderloin",
        description: "Grilled tenderloin steak drizzled with a rich red wine sauce, served alongside creamy mashed potatoes and grilled vegetables for a delectable dining experience.",
        price: { regular: 3500 },
      },
      {
        name: "Grilled Chicken",
        description: "BBQ-grilled chicken leg, served with a side salad, along with BBQ sauce and pepper sauce for a flavorful and satisfying meal.",
        price: { regular: 2350 },
      },
    ],
  },

  // ---------------- Main Course – Fish ----------------
  {
    slug: "main-course-fish",
    boardTitle: "Main Course – Fish",
    tabGroup: "Meat & Fish",
    items: [
      {
        name: "Devilled Fish",
        description: "Fried fish sautéed with onion, tomato, capsicum, kochchi, green chili, coriander, garlic, and ginger, all tossed in a spicy devilled sauce for a deliciously bold flavor.",
        price: { regular: 2400 },
      },
      {
        name: "Fried Tilapia",
        description: "Boneless, crumb-fried tilapia fillets served with tartar sauce, sweet and sour sauce, and a fresh side salad for a delightful meal.",
        price: { regular: 3000 },
      },
      {
        name: "Grilled Mullet (Whole)",
        description: "Seasoned grilled mullet served with lemon butter, Thai chili sauce, and a side salad for a fresh and flavorful dining experience.",
        price: { regular: 3500 },
      },
      {
        name: "Grilled Fish Fillet",
        description: "Seasoned and grilled mullet fillet, glazed with a rich garlic butter sauce. Accompanied by creamy mashed potatoes and a fresh salad for a delightful meal.",
        price: { regular: 2500 },
      },
    ],
  },

  // ---------------- Bites – Beef ----------------
  {
    slug: "bites-beef",
    boardTitle: "Bites – Beef",
    tabGroup: "Meat & Fish",
    items: [
      {
        name: "Devilled Beef",
        description: "Fried beef with onion, tomato, capsicum, kochchi, green chili, coriander, chopped garlic and ginger tossed in a devilled sauce.",
        price: { regular: 2400 },
      },
      {
        name: "Pepper Steak",
        description: "Tender steak seasoned with cracked black pepper, grilled to your liking and served sizzling hot.",
        price: { regular: 2300 },
      },
      {
        name: "Fried Beef",
        description: "Crispy fried beef stir-fried with onion, tomato, capsicum, kochchi, green chili, and coriander, tossed in soy sauce, black pepper, and chili flakes for a savory and spicy delight.",
        price: { regular: 2400 },
      },
      {
        name: "Beef Stew",
        description: "Tender chunks of beef slow-cooked with a medley of aromatic spices, including cinnamon, cloves, and cardamom, and infused with fresh vegetables like carrots and potatoes for a hearty and flavorful dish.",
        price: { regular: 2400 },
      },
    ],
  },

  // ---------------- Bites – Chicken ----------------
  {
    slug: "bites-chicken",
    boardTitle: "Bites – Chicken",
    tabGroup: "Meat & Fish",
    items: [
      {
        name: "Devilled Chicken",
        description: "Fried chicken sautéed with onion, tomato, capsicum, kochchi, green chili, coriander, garlic, and ginger, all tossed in a spicy devilled sauce.",
        price: { regular: 1500 },
      },
      {
        name: "Pepper Chicken",
        description: "Sautéed with onion, garlic, and ginger, this chicken is cooked to perfection and combined with fresh green chilies, finished with a sprinkle of freshly ground black pepper.",
        price: { regular: 1800 },
      },
      {
        name: "Fried Chicken",
        description: "Crispy fried chicken mixed with onion, tomato, capsicum, kochchi, green chili, and coriander, tossed in soy sauce, black pepper, and chili flakes.",
        price: { regular: 1900 },
      },
      {
        name: "Chili Chicken",
        description: "Tender chicken pieces stir-fried with vibrant bell peppers and onions, tossed in a bold blend of spices and savory chili sauce. Garnished with fresh green chilies and coriander for an extra burst of flavor.",
        price: { regular: 1800 },
      },
    ],
  },

  // ---------------- Bites – Mutton ----------------
  {
    slug: "bites-mutton",
    boardTitle: "Bites – Mutton",
    tabGroup: "Meat & Fish",
    items: [
      {
        name: "Grilled Mutton",
        description: "Marinated in a fragrant blend of traditional spices and herbs, including garlic, ginger, and a hint of curry powder, this dish boasts a smoky flavor and tender texture. Served with a zesty lime and chili dipping sauce for an extra kick.",
        price: { regular: 3500 },
      },
      {
        name: "Devilled Mutton",
        description: "Fried mutton sautéed with onion, tomato, capsicum, kochchi, green chili, coriander, garlic, and ginger, all tossed in a spicy devilled sauce for a rich and flavorful experience.",
        price: { regular: 3500 },
      },
      {
        name: "Fried Mutton",
        description: "Fried mutton with onion, tomato, capsicum, kochchi, green chili, coriander, tossed with soy sauce, black pepper, and chili flakes.",
        price: { regular: 3500 },
      },
    ],
  },

  // ---------------- Starters – Appetizer ----------------
  {
    slug: "starters-appetizer",
    boardTitle: "Starters – Appetizer",
    tabGroup: "Starters, Soups & Seafood Bites",
    items: [
      {
        name: "Oyster Platter",
        description: "Freshly shucked oysters, served with lime, tabasco, and our signature homemade oyster sauce.",
        price: { regular: 2200 },
      },
      {
        name: "Kochchi Clams",
        description: "Steamed short neck clams tossed in a spicy kochchi cream sauce.",
        price: { regular: 1900 },
      },
      {
        name: "Garlic Clams",
        description: "Steamed short neck clams tossed in garlic and butter.",
        price: { regular: 1600 },
      },
      {
        name: "Baked Mangrove Clams",
        description: "Pick your flavor! Baked cheesy sauce or baked Italian sunrise tomato sauce.",
        price: { regular: 1600 },
      },
      {
        name: "Seafood Cocktail",
        description: "Boiled tuna, shrimp, cuttlefish, green mussels, fresh lettuce, lemon, and cocktail sauce.",
        price: { regular: 2300 },
      },
      {
        name: "Shrimp Cocktail",
        description: "Deshelled shrimp in cocktail sauce and fresh salad.",
        price: { regular: 1800 },
      },
    ],
  },

  // ---------------- Starters – Soups ----------------
  {
    slug: "starters-soups",
    boardTitle: "Starters – Soups",
    tabGroup: "Starters, Soups & Seafood Bites",
    note: "Served with bread & butter.",
    items: [
      { name: "Cream of Chicken", price: { regular: 1000 } },
      { name: "Cream of Vegetable", price: { regular: 800 } },
      { name: "Cream Corn Soup", price: { regular: 1000 } },
      { name: "Tom Yum Soup", price: { regular: 1800 } },
      { name: "Cream of Mushroom Soup", price: { regular: 1000 } },
      { name: "Cream of Pumpkin Soup", price: { regular: 800 } },
    ],
  },

  // ---------------- Bites – Seafood ----------------
  {
    slug: "bites-seafood",
    boardTitle: "Bites – Seafood",
    tabGroup: "Starters, Soups & Seafood Bites",
    items: [
      {
        name: "Calamari Rings",
        description: "Tender cuttlefish rings seasoned with lemon and thyme, coated in crisp breadcrumbs, and fried to perfection. Served with fresh parsley and a side of French fries.",
        price: { regular: 2300 },
      },
      {
        name: "Garlic Prawns",
        description: "De-shelled and de-veined prawns, egg-washed with corn flour and deep-fried to golden perfection. Tossed in a sweet chili sauce with capsicum, tomato, bell pepper, carrot, and onion.",
        price: { regular: 3800 },
      },
      {
        name: "Hot Butter Cuttlefish",
        description: "Tender pieces of cuttlefish, crispy fried to perfection and tossed in a tantalizing blend of garlic, ginger, and fiery green chilies.",
        price: { regular: 2000 },
      },
      {
        name: "Devilled Prawns",
        description: "Prawns stir-fried with onion, tomato, capsicum, kochchi, green chili, coriander, garlic, and ginger, all tossed in a spicy devilled sauce.",
        price: { regular: 2200 },
      },
    ],
  },

  // ---------------- Salads ----------------
  {
    slug: "salads",
    boardTitle: "Salads",
    tabGroup: "Salads & Vegetables",
    items: [
      {
        name: "Seafood Salad",
        description: "A refreshing medley of tender shrimp, octopus, mussels, clams, and succulent crab meat, tossed with crisp greens, cherry tomatoes, cucumber, and a light citrus vinaigrette.",
        price: { regular: 3000 },
      },
      {
        name: "Caesar Salad",
        description: "Crisp romaine lettuce tossed with creamy Caesar dressing, tender grilled chicken, crunchy croutons, and freshly grated Parmesan cheese, finished with a touch of lemon and a sprinkle of black pepper.",
        price: { regular: 1500 },
      },
      {
        name: "Mixed Vegetable Salad",
        description: "A vibrant blend of fresh, crisp vegetables — bell peppers, cucumbers, cherry tomatoes, carrots, and red onions — served with a rich, creamy cheese sauce.",
        price: { regular: 1800 },
      },
      {
        name: "Greek Salad",
        description: "Crisp cucumbers, juicy tomatoes, red onions, bell peppers, and Kalamata olives, all tossed with tangy feta cheese and a zesty lemon oregano vinaigrette.",
        price: { regular: 1500 },
      },
    ],
  },

  // ---------------- Bites – Vegetables ----------------
  {
    slug: "bites-vegetables",
    boardTitle: "Bites – Vegetables",
    tabGroup: "Salads & Vegetables",
    items: [
      {
        name: "French Fries",
        description: "Perfectly fried to a delightful crunch, these classic favorites are seasoned with a touch of salt and served piping hot.",
        price: { regular: 1000 },
      },
      {
        name: "Boiled Vegetables",
        description: "A medley of potatoes, carrots, beans, cauliflower, and broccoli, boiled and tossed in rich garlic butter for a simple yet flavorful dish.",
        price: { regular: 900 },
      },
      {
        name: "Chilli Kankun",
        description: "A refined take on a classic dish, featuring stir-fried kankun with a delicate balance of spices and chili peppers.",
        price: { regular: 550 },
      },
      {
        name: "Hot Butter Mushroom",
        description: "Mushrooms tossed in a rich buttery sauce with a hint of spices, stir-fried to perfection with crunchy onions and chili flakes. Crispy on the outside and tender on the inside.",
        price: { regular: 1000 },
      },
      {
        name: "Vegetable Chopsuey",
        description: "A colorful mix of vegetables stir-fried in a savory sauce made from soy sauce, garlic, ginger, and a blend of seasonings for a deliciously satisfying dish.",
        price: { regular: 1500 },
      },
    ],
  },

  // ---------------- Pizza ----------------
  {
    slug: "pizza",
    boardTitle: "Pizza – Thin Crust",
    tabGroup: "Pizza & Pasta",
    items: [
      {
        name: "Chicken Pizza",
        description: "Topped with tender marinated chicken pieces, fresh bell peppers, and onions. Layered with gooey mozzarella cheese and a zesty tomato sauce, finished with a sprinkle of aromatic herbs.",
        price: { regular: 1600 },
      },
      {
        name: "Cheese & Tomato Pizza",
        description: "A classic favorite featuring a luscious layer of tangy tomato sauce spread over a perfectly baked crust. Topped with gooey mozzarella cheese, finished with Italian herbs such as oregano and basil.",
        price: { regular: 1500 },
      },
      {
        name: "Beef Mutton Pizza",
        description: "Topped with tender marinated beef and mutton pieces, fresh bell peppers, and onions. Layered with gooey mozzarella cheese and a zesty tomato sauce, finished with aromatic herbs.",
        price: { regular: 3000 },
      },
      {
        name: "Seafood Pizza",
        description: "Topped with a medley of fresh shrimp and calamari, layered with rich tomato sauce and melted mozzarella cheese. Enhanced with a sprinkle of herbs and a hint of chili, served with a side of tangy tartar sauce.",
        price: { regular: 3200 },
      },
      {
        name: "Cheese Pizza",
        description: "A delightful creation featuring a crispy crust generously topped with a blend of melted mozzarella cheese and a rich tomato sauce. Complemented by a sprinkle of Italian herbs like oregano and basil.",
        price: { regular: 2200 },
      },
    ],
  },

  // ---------------- Pasta ----------------
  {
    slug: "pasta",
    boardTitle: "Main Course – Pasta",
    tabGroup: "Pizza & Pasta",
    items: [
      {
        name: "Carbonara",
        description: "Choose between spaghetti or penne pasta, sautéed with bacon, garlic, onion, bay leaves, and oregano, all enriched with creamy Parmesan cheese. Topped with extra grated Parmesan for a decadent finish.",
        price: { regular: 2500 },
      },
      {
        name: "Marinara",
        description: "Choose between spaghetti or penne pasta, tossed in olive oil with garlic, onion, bay leaves, and basil. Enhanced with a medley of seafood including fish, prawns, calamari, clams, and mussels, all simmered in a spicy Provençal sauce and topped with grated cheese.",
        price: { regular: 2600 },
      },
      {
        name: "Alfredo",
        description: "Choose between spaghetti or penne pasta, sautéed with tender chicken, garlic, onion, mushrooms, bay leaves, and oregano, all enveloped in a creamy sauce enriched with egg yolk and Parmesan cheese.",
        price: { regular: 2600 },
      },
      {
        name: "Arrabiata",
        description: "Choose between spaghetti or penne pasta, sautéed in olive oil with garlic, onion, diced chili, capsicum, mushrooms, tomatoes, bell pepper, carrots, and spring onions, all simmered in a rich tomato puree for a bold and spicy flavor.",
        price: { regular: 2200 },
      },
      {
        name: "Spaghetti Bolognese",
        description: "Ground beef slowly simmered with finely chopped onions, carrots, celery, and garlic, enhanced with crushed tomatoes, a splash of red wine, and a hint of herbs. Finished with a touch of milk for creaminess, served with freshly grated Parmesan cheese and a sprinkle of basil.",
        price: { regular: 2500 },
      },
    ],
  },

  // ---------------- Platters ----------------
  {
    slug: "bbq-platters",
    boardTitle: "Platters – BBQ Platters",
    tabGroup: "Platters, Kottu & Sausages",
    items: [
      {
        name: "BBQ Seafood Platter",
        description: "A delightful assortment of BBQ freshwater prawns, jumbo prawns, cuttlefish, octopus, and fish fillet. Served with a side salad, BBQ sauce, and garlic butter sauce for a flavorful feast.",
        price: { regular: 5800 },
      },
      {
        name: "BBQ Meat Platter",
        description: "A hearty selection featuring a BBQ chicken leg, beef steak, jumbo chicken sausages, and a poached egg. Accompanied by a fresh salad, pepper sauce, and BBQ sauce for a satisfying meal.",
        price: { regular: 4000 },
      },
      {
        name: "BBQ Sausage Platter",
        description: "A delicious variety of BBQ jumbo sausages glazed with BBQ sauce. Served with a side salad, BBQ sauce, and pepper sauce for an enjoyable meal.",
        price: { regular: 2750 },
      },
    ],
  },

  // ---------------- Kottu ----------------
  {
    slug: "kottu",
    boardTitle: "Kottu",
    tabGroup: "Platters, Kottu & Sausages",
    items: [
      { name: "Chicken Kottu", price: { regular: 850 } },
      { name: "Seafood Kottu", price: { regular: 1200 } },
      { name: "Beef Kottu", price: { regular: 1400 } },
      { name: "Mutton Kottu", price: { regular: 1500 } },
      { name: "Egg Kottu", price: { regular: 750 } },
      { name: "Vegetable Kottu", price: { regular: 600 } },
      { name: "Cheese Kottu", price: { regular: 900 } },
    ],
  },

  // ---------------- Bites – Sausages ----------------
  {
    slug: "bites-sausages",
    boardTitle: "Bites – Sausages",
    tabGroup: "Platters, Kottu & Sausages",
    items: [
      {
        name: "Devilled Chicken Sausages",
        description: "Fried jumbo chicken sausages sautéed with onion, tomato, capsicum, kochchi, green chili, coriander, garlic, and ginger, all tossed in a spicy devilled sauce for a deliciously bold flavor.",
        price: { regular: 1700 },
      },
      {
        name: "Devilled Kochchi Sausages",
        description: "Infused with the bold heat of kochchi, stir-fried to perfection with onions and peppers, tossed in a special blend of spices and a spicy devilled sauce for an exciting flavor experience.",
        price: { regular: 1700 },
      },
      {
        name: "Devilled Garlic Sausages",
        description: "Stir-fried in a bold garlic-infused sauce, seasoned with a dash of spices, delivering a savory, spicy kick in every bite.",
        price: { regular: 1700 },
      },
      {
        name: "Sausages Platter",
        description: "Indulge in a delightful assortment of grilled sausages, including tender chicken, flavorful garlic, and spicy kochchi. Perfect for sharing with friends and family.",
        price: { regular: 2300 },
      },
    ],
  },

  // ---------------- Set Menu ----------------
  {
    slug: "set-menu",
    boardTitle: "Set Menu",
    tabGroup: "Set Menu & Sides",
    items: [
      {
        name: "Basmathi Fried Rice",
        description: "Vegetable fried rice with chopsuey, chilli chicken or chilli fish with chilli paste.",
        price: { regular: 800 },
      },
    ],
  },

  // ---------------- Bites – Omelette ----------------
  {
    slug: "bites-omelette",
    boardTitle: "Bites – Omelette",
    tabGroup: "Set Menu & Sides",
    items: [
      {
        name: "Sri Lankan Omelette",
        description: "A flavorful mix of eggs, onion, tomato, green chili, and capsicum, cooked to perfection.",
        price: { regular: 800 },
      },
      {
        name: "Cheese Omelette",
        description: "A delicious blend of eggs and melted cheddar cheese, cooked to fluffy perfection.",
        price: { regular: 1000 },
      },
      {
        name: "Chicken Omelette",
        description: "A delightful mix of eggs, shredded roasted chicken, onion, green chili, and tomato, creating a flavorful and hearty dish.",
        price: { regular: 1200 },
      },
    ],
  },

  // ---------------- Bites – Snacks ----------------
  {
    slug: "bites-snacks",
    boardTitle: "Bites – Snacks",
    tabGroup: "Set Menu & Sides",
    items: [
      {
        name: "Chicken Burger",
        description: "Savor our juicy Chicken Burger, featuring a tender, grilled chicken patty seasoned to perfection. Nestled in a freshly baked bun and topped with crisp lettuce, ripe tomatoes, and our special sauce.",
        price: { regular: 750 },
      },
      {
        name: "Beef Burger",
        description: "Sink your teeth into our mouthwatering Beef Burger, featuring a juicy, grilled beef patty cooked to perfection. Nestled in a soft, freshly baked bun and topped with fresh lettuce, ripe tomatoes, pickles, and our signature sauce.",
        price: { regular: 1000 },
      },
      {
        name: "Ranmo Club Sandwich",
        description: "A hearty and satisfying sandwich featuring juicy grilled chicken, crispy bacon, fresh lettuce, ripe tomatoes, and creamy mayonnaise, all sandwiched between toasted white bread.",
        price: { regular: 1250 },
      },
    ],
  },

  // ---------------- Desserts ----------------
  {
    slug: "desserts",
    boardTitle: "Desserts",
    tabGroup: "Desserts",
    items: [
      { name: "Banana Fritters", price: { regular: 750 } },
      { name: "Pineapple Fritters", price: { regular: 750 } },
      { name: "Watalappan", price: { regular: 225 } },
      { name: "Vanilla Ice Cream (3 Scoops)", price: { regular: 350 } },
      { name: "Chocolate Ice Cream (3 Scoops)", price: { regular: 350 } },
      { name: "Fruit Salad with Ice Cream", price: { regular: 800 } },
      { name: "Fruit Platter", price: { regular: 1000 } },
    ],
  },

  // ---------------- Beverages – Cool Drinks ----------------
  {
    slug: "cool-drinks",
    boardTitle: "Cool Drinks",
    tabGroup: "Beverages",
    items: [
      { name: "EGB", price: { regular: 250 } },
      { name: "Necto", price: { regular: 250 } },
      { name: "Lemonade", price: { regular: 250 } },
      { name: "Ginger Ale", price: { regular: 250 } },
      { name: "Soda", price: { regular: 200 } },
      { name: "Coca Cola", price: { regular: 250 } },
      { name: "Fanta", price: { regular: 250 } },
      { name: "Sprite", price: { regular: 250 } },
    ],
  },

  // ---------------- Beverages – Milk Shakes ----------------
  {
    slug: "milk-shakes",
    boardTitle: "Milk Shakes",
    tabGroup: "Beverages",
    items: [
      { name: "Chocolate", price: { regular: 800 } },
      { name: "Vanilla", price: { regular: 800 } },
      { name: "Strawberry", price: { regular: 800 } },
    ],
  },

  // ---------------- Beverages – Fresh Juice ----------------
  {
    slug: "fresh-juice",
    boardTitle: "Fresh Juice",
    tabGroup: "Beverages",
    items: [
      { name: "Plain Lassi", price: { regular: 650 } },
      { name: "Mango Juice", price: { regular: 650 } },
      { name: "Mango Lassi", price: { regular: 650 } },
      { name: "Pineapple Juice", price: { regular: 650 } },
      { name: "Watermelon Juice", price: { regular: 650 } },
      { name: "Mixed Fruit Juice", price: { regular: 650 } },
      { name: "Carrot Juice", price: { regular: 650 } },
      { name: "Cucumber Juice", price: { regular: 650 } },
      { name: "Papaya Juice", price: { regular: 650 } },
      { name: "Orange Juice", price: { regular: 650 } },
    ],
  },

  // ---------------- Ranmo Special Tea ----------------
  {
    slug: "ranmo-special-tea",
    boardTitle: "Ranmo Special Tea",
    tabGroup: "Beverages",
    items: [
      { name: "Plain Tea", price: { regular: 50 } },
      { name: "Milk Tea", price: { regular: 100 } },
    ],
  },

  // ---------------- Pastries / Short Eats ----------------
  {
    slug: "pastries",
    boardTitle: "Pastries / Short Eats",
    tabGroup: "Short Eats & Pastries",
    items: [
      { name: "Omelette Burger", price: { regular: 100 } },
      { name: "Salmon Bun", price: { regular: 100 } },
      { name: "Sandwich Bread (370g)", price: { regular: 180 } },
      { name: "Tea Bun", price: { regular: 60 } },
      { name: "Fish Bun", price: { regular: 100 } },
      { name: "Sausage Bun", price: { regular: 100 } },
      { name: "Egg Bun", price: { regular: 100 } },
      { name: "Fish Baked Patty", price: { regular: 70 } },
      { name: "Chicken Bun", price: { regular: 120 } },
      { name: "Kimbula Bun", price: { regular: 80 } },
      { name: "Jam Bun", price: { regular: 70 } },
      { name: "Vegetable Bun", price: { regular: 80 } },
    ],
  },
];

export const MENU_ITEM_COUNT = MENU.reduce((sum, cat) => sum + cat.items.length, 0);
