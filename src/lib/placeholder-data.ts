
import { PlaceHolderImages } from './placeholder-images';

export type ProductImage = {
  src: string;
  alt: string;
  aiHint: string;
};

export type ProductVariant = {
  id: string;
  color: string;
  mrp: number;
  price: number;
  stock: number;
  images: ProductImage[];
};

export type ProductSpecification = {
    name: string;
    value: string;
}

export type Product = {
  id: string;
  name: string;
  description: string;
  category: 'Office Furniture' | 'Electronics' | 'Accessories';
  vendor: string;
  highlights: string[];
  specifications: ProductSpecification[];
  variants: ProductVariant[];
  offers: string[];
  services: {
    warranty: string;
    returnPolicy: string;
  };
};

export type Course = {
  id: string;
  name: string;
  description: string;
  instructor: string;
  price: number;
  image: {
    src: string;
    alt: string;
    aiHint: string;
  };
};

const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Ergonomic Chair',
    description: 'The ultimate chair for comfort and productivity during long work hours. Featuring adjustable lumbar support, 4D armrests, and a breathable mesh back, this chair is designed to keep you comfortable and focused throughout the day.',
    vendor: 'OfficePro',
    category: 'Office Furniture',
    highlights: [
      "Adjustable lumbar support",
      "4D adjustable armrests",
      "Breathable mesh back",
      "Synchro-tilt mechanism",
      "5-year warranty"
    ],
    specifications: [
      { name: "Material", value: "Nylon Mesh, Aluminum Frame" },
      { name: "Weight Capacity", value: "150 kg" },
      { name: "Dimensions", value: "65cm x 65cm x 120cm" },
      { name: "Recline Angle", value: "90-135 degrees" }
    ],
    offers: [
        "10% off on HDFC Bank Credit Card",
        "No Cost EMI available",
        "Special discount: Get 5% extra off"
    ],
    services: {
        warranty: "5 Year Manufacturer Warranty",
        returnPolicy: "10 Days Replacement Policy"
    },
    variants: [
      {
        id: 'prod-1-black',
        color: 'Black',
        mrp: 399.99,
        price: 349.99,
        stock: 50,
        images: [
          {
            src: PlaceHolderImages.find(img => img.id === 'prod-img-1')?.imageUrl || '',
            alt: 'Modern ergonomic chair in black',
            aiHint: 'ergonomic chair black'
          },
           {
            src: 'https://picsum.photos/seed/chair-black-2/1000/1000',
            alt: 'Modern ergonomic chair in black - side view',
            aiHint: 'ergonomic chair side'
          },
           {
            src: 'https://picsum.photos/seed/chair-black-3/1000/1000',
            alt: 'Modern ergonomic chair in black - back view',
            aiHint: 'ergonomic chair back'
          }
        ]
      },
      {
        id: 'prod-1-white',
        color: 'White',
        mrp: 419.99,
        price: 369.99,
        stock: 35,
        images: [
          {
            src: 'https://picsum.photos/seed/chair-white-1/1000/1000',
            alt: 'Modern ergonomic chair in white',
            aiHint: 'ergonomic chair white'
          },
          {
            src: 'https://picsum.photos/seed/chair-white-2/1000/1000',
            alt: 'Modern ergonomic chair in white - side view',
            aiHint: 'ergonomic chair side'
          }
        ]
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Wireless Mechanical Keyboard',
    description: 'A sleek, 75% layout mechanical keyboard with hot-swappable switches, customizable RGB backlighting, and dual Bluetooth/wired connectivity. Perfect for gamers and programmers.',
    price: 129.99,
    vendor: 'TechGear',
    category: 'Electronics',
     highlights: [
      "Hot-swappable switches (Gateron Brown)",
      "Customizable RGB backlighting",
      "Bluetooth 5.1 and USB-C connectivity",
      "Compact 75% layout",
      "PBT keycaps"
    ],
    specifications: [
      { name: "Layout", value: "75%" },
      { name: "Switch Type", value: "Gateron Brown Mechanical" },
      { name: "Connectivity", value: "Bluetooth 5.1, USB-C" },
      { name: "Battery Life", value: "Up to 72 hours with RGB" }
    ],
    offers: [
        "5% Cashback with Learn&Shop Pay Later",
        "Partner Offer: Get 3 months of free coding classes"
    ],
    services: {
        warranty: "1 Year Warranty",
        returnPolicy: "10 Days Replacement Policy"
    },
    variants: [
        {
            id: 'prod-2-grey',
            color: 'Grey',
            mrp: 149.99,
            price: 129.99,
            stock: 120,
            images: [
                {
                    src: PlaceHolderImages.find(img => img.id === 'prod-img-2')?.imageUrl || '',
                    alt: 'Wireless mechanical keyboard',
                    aiHint: 'mechanical keyboard'
                }
            ]
        }
    ]
  },
  // Add more products with the new structure...
  {
    id: 'prod-3',
    name: '4K Monitor',
    description: 'A 27-inch 4K UHD monitor with vibrant colors and crisp details.',
    price: 499.99,
    vendor: 'ViewSonic',
    category: 'Electronics',
    highlights: ["27-inch 4K UHD (3840x2160) display", "99% sRGB color gamut", "USB-C with 65W power delivery", "Adjustable stand"],
    specifications: [
        { name: "Screen Size", value: "27 inches" },
        { name: "Resolution", value: "4K UHD (3840x2160)" },
    ],
    offers: [],
    services: { warranty: '3 Years', returnPolicy: '10 Days Replacement' },
    variants: [
        {
            id: 'prod-3-silver',
            color: 'Silver',
            mrp: 549.99,
            price: 499.99,
            stock: 80,
            images: [
                {
                    src: PlaceHolderImages.find(img => img.id === 'prod-img-3')?.imageUrl || '',
                    alt: '4K Ultra HD monitor',
                    aiHint: 'computer monitor'
                }
            ]
        }
    ]
  },
  {
    id: 'prod-4',
    name: 'Noise-Cancelling Headphones',
    description: 'Immerse yourself in sound with these premium over-ear headphones.',
    price: 299.99,
    vendor: 'AudioPhile',
    category: 'Accessories',
    highlights: ["Active Noise Cancellation", "Up to 30 hours battery life", "Comfortable over-ear design", "Crystal-clear calls"],
     specifications: [
        { name: "Type", value: "Over-ear" },
        { name: "Connectivity", value: "Bluetooth 5.0, 3.5mm jack" },
    ],
    offers: [],
    services: { warranty: '2 Years', returnPolicy: '10 Days Replacement' },
    variants: [
        {
            id: 'prod-4-black',
            color: 'Black',
            mrp: 329.99,
            price: 299.99,
            stock: 150,
            images: [
                {
                    src: PlaceHolderImages.find(img => img.id === 'prod-img-4')?.imageUrl || '',
                    alt: 'Noise-cancelling headphones',
                    aiHint: 'headphones'
                }
            ]
        }
    ]
  },
];

const courses: Course[] = [
  {
    id: 'course-1',
    name: 'Intro to Web Development',
    description: 'Learn HTML, CSS, and JavaScript from scratch. No experience necessary.',
    instructor: 'Jane Doe',
    price: 49.99,
    image: {
      src: PlaceHolderImages.find(img => img.id === 'course-img-1')?.imageUrl || '',
      alt: 'Introduction to Web Development',
      aiHint: PlaceHolderImages.find(img => img.id === 'course-img-1')?.imageHint || '',
    },
  },
  {
    id: 'course-2',
    name: 'Advanced React Patterns',
    description: 'Take your React skills to the next level with advanced concepts.',
    instructor: 'John Smith',
    price: 99.99,
    image: {
      src: PlaceHolderImages.find(img => img.id === 'course-img-2')?.imageUrl || '',
      alt: 'Advanced React Patterns',
      aiHint: PlaceHolderImages.find(img => img.id === 'course-img-2')?.imageHint || '',
    },
  },
  {
    id: 'course-3',
    name: 'Digital Marketing Masterclass',
    description: 'Master SEO, social media marketing, and content strategy.',
    instructor: 'Emily White',
    price: 149.99,
    image: {
      src: PlaceHolderImages.find(img => img.id === 'course-img-3')?.imageUrl || '',
      alt: 'Digital Marketing Masterclass',
      aiHint: PlaceHolderImages.find(img => img.id === 'course-img-3')?.imageHint || '',
    },
  },
  {
    id: 'course-4',
    name: 'Graphic Design for Beginners',
    description: 'Learn the fundamentals of design theory, color, and typography.',
    instructor: 'Michael Brown',
    price: 79.99,
    image: {
      src: PlaceHolderImages.find(img => img.id === 'course-img-4')?.imageUrl || '',
      alt: 'Graphic Design for Beginners',
      aiHint: PlaceHolderImages.find(img => img.id === 'course-img-4')?.imageHint || '',
    },
  },
  {
    id: 'course-5',
    name: 'AI & Machine Learning',
    description: 'An introduction to the exciting world of AI and machine learning.',
    instructor: 'Dr. Ada Lovelace',
    price: 199.99,
    image: {
      src: PlaceHolderImages.find(img => img.id === 'course-img-5')?.imageUrl || '',
      alt: 'AI and Machine Learning Fundamentals',
      aiHint: PlaceHolderImages.find(img => img.id === 'course-img-5')?.imageHint || '',
    },
  },
  {
    id: 'course-6',
    name: 'Project Management Prep',
    description: 'Prepare for your PMP certification with this comprehensive course.',
    instructor: 'Peter Drucker',
    price: 129.99,
    image: {
      src: PlaceHolderImages.find(img => img.id === 'course-img-6')?.imageUrl || '',
      alt: 'Project Management Professional (PMP) Prep',
      aiHint: PlaceHolderImages.find(img => img.id === 'course-img-6')?.imageHint || '',
    },
  },
  {
    id: 'course-7',
    name: 'The Art of Public Speaking',
    description: 'Build confidence and deliver powerful presentations.',
    instructor: 'Dale Carnegie',
    price: 59.99,
    image: {
      src: PlaceHolderImages.find(img => img.id === 'course-img-7')?.imageUrl || '',
      alt: 'The Art of Public Speaking',
      aiHint: PlaceHolderImages.find(img => img.id === 'course-img-7')?.imageHint || '',
    },
  },
  {
    id: 'course-8',
    name: 'Financial Planning',
    description: 'Learn to manage your money, invest, and plan for the future.',
    instructor: 'Susan Orman',
    price: 89.99,
    image: {
      src: PlaceHolderImages.find(img => img.id === 'course-img-8')?.imageUrl || '',
      alt: 'Financial Planning for Millennials',
      aiHint: PlaceHolderImages.find(img => img.id === 'course-img-8')?.imageHint || '',
    },
  },
];

export const getProducts = () => products;
export const getProductById = (id: string) => products.find(p => p.id === id);

export const getCourses = () => courses;
export const getCourseById = (id: string) => courses.find(c => c.id === id);
