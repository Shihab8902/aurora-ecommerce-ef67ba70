import fs from 'fs';
import path from 'path';

const MOCK_DATA_PATH = path.join(process.cwd(), 'src/data/mockData.json');

async function fetchUnsplashImages(query, count = 3) {
  try {
    const response = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=${count}`);
    const data = await response.json();
    return data.results.map(p => p.urls.regular.replace('w=1080', 'w=800') + '&auto=format&fit=crop&q=80');
  } catch (error) {
    console.error(`Error fetching images for ${query}:`, error);
    return [];
  }
}

const PRODUCT_LIST = [
  { id: "1", name: "Aurora Minimalist Watch", price: 129, cat: "Accessories" },
  { id: "2", name: "Luxe Cotton Hoodie", price: 89, cat: "Apparel" },
  { id: "3", name: "Geometric Glass Vase", price: 45, cat: "Home Decor" },
  { id: "4", name: "Indigo Leather Portfolio", price: 159, cat: "Accessories" },
  { id: "5", name: "Slate Silk Scarf", price: 65, cat: "Accessories" },
  { id: "6", name: "Minimalist Desktop Organizer", price: 39, cat: "Home Decor" },
  { id: "7", name: "Ceramic Coffee Mug", price: 24, cat: "Home Decor" },
  { id: "8", name: "Leather Weekend Bag", price: 249, cat: "Accessories" },
  { id: "9", name: "Canvas Totebag", price: 35, cat: "Apparel" },
  { id: "10", name: "Wireless Noise-Canceling Headphones", price: 299, cat: "Electronics" },
  { id: "11", name: "Mechanical Keyboard", price: 149, cat: "Electronics" },
  { id: "12", name: "Linen Bedding Set", price: 199, cat: "Home Decor" },
  { id: "13", name: "Scented Soy Candle", price: 28, cat: "Home Decor" },
  { id: "14", name: "Stainless Steel Water Bottle", price: 32, cat: "Accessories" },
  { id: "15", name: "Wool Blend Coat", price: 189, cat: "Apparel" },
  { id: "16", name: "Modern Desk Lamp", price: 79, cat: "Home Decor" },
  { id: "17", name: "Leather Card Holder", price: 45, cat: "Accessories" },
  { id: "18", name: "Yoga Mat Essentials", price: 55, cat: "Sports" },
  { id: "19", name: "Enamel Cast Iron Pot", price: 120, cat: "Kitchen" },
  { id: "20", name: "Premium Olive Oil Set", price: 65, cat: "Kitchen" }
];

async function updateMockData() {
  const mockData = JSON.parse(fs.readFileSync(MOCK_DATA_PATH, 'utf8'));
  const newProducts = [];

  console.log('Fetching images for 20 products...');
  for (const p of PRODUCT_LIST) {
    console.log(`- ${p.name}`);
    const images = await fetchUnsplashImages(p.name + ' product minimalist', 3);
    newProducts.push({
      id: p.id,
      name: p.name,
      price: p.price,
      description: `A premium ${p.name} designed for modern living.`,
      category: p.cat,
      image: images[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      images: images.length > 1 ? images : [images[0]],
      featured: Math.random() > 0.5,
      rating: 4 + Math.random()
    });
  }

  mockData.products = newProducts;
  fs.writeFileSync(MOCK_DATA_PATH, JSON.stringify(mockData, null, 2));
  console.log('Successfully updated mockData.json with 20 working products!');
}

updateMockData();
