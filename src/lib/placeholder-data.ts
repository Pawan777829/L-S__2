
import { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  vendor: string;
  category: 'Office Furniture' | 'Electronics' | 'Accessories';
  image: {
    src: string;
    alt: string;
    aiHint: string;
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
    description: 'The ultimate chair for comfort and productivity during long work hours.',
    price: 349.99,
    vendor: 'OfficePro',
    category: 'Office Furniture',
    image: {
      src: PlaceHolderImages.find(img => img.id === 'prod-img-1')?.imageUrl || '',
      alt: 'Modern ergonomic chair',
      aiHint: PlaceHolderImages.find(img => img.id === 'prod-img-1')?.imageHint || '',
    },
  },
  {
    id: 'prod-2',
    name: 'Wireless Keyboard',
    description: 'A sleek, mechanical keyboard with customizable RGB backlighting.',
    price: 129.99,
    vendor: 'TechGear',
    category: 'Electronics',
    image: {
      src: PlaceHolderImages.find(img => img.id === 'prod-img-2')?.imageUrl || '',
      alt: 'Wireless mechanical keyboard',
      aiHint: PlaceHolderImages.find(img => img.id === 'prod-img-2')?.imageHint || '',
    },
  },
  {
    id: 'prod-3',
    name: '4K Monitor',
    description: 'A 27-inch 4K UHD monitor with vibrant colors and crisp details.',
    price: 499.99,
    vendor: 'ViewSonic',
    category: 'Electronics',
    image: {
      src: PlaceHolderImages.find(img => img.id === 'prod-img-3')?.imageUrl || '',
      alt: '4K Ultra HD monitor',
      aiHint: PlaceHolderImages.find(img => img.id === 'prod-img-3')?.imageHint || '',
    },
  },
  {
    id: 'prod-4',
    name: 'Noise-Cancelling Headphones',
    description: 'Immerse yourself in sound with these premium over-ear headphones.',
    price: 299.99,
    vendor: 'AudioPhile',
    category: 'Accessories',
    image: {
      src: PlaceHolderImages.find(img => img.id === 'prod-img-4')?.imageUrl || '',
      alt: 'Noise-cancelling headphones',
      aiHint: PlaceHolderImages.find(img => img.id === 'prod-img-4')?.imageHint || '',
    },
  },
    {
    id: 'prod-5',
    name: 'Smart Home Hub',
    description: 'Control all your smart devices from one central hub with voice commands.',
    price: 99.99,
    vendor: 'ConnectHome',
    category: 'Electronics',
    image: {
      src: PlaceHolderImages.find(img => img.id === 'prod-img-5')?.imageUrl || '',
      alt: 'Smart home hub',
      aiHint: PlaceHolderImages.find(img => img.id === 'prod-img-5')?.imageHint || '',
    },
  },
  {
    id: 'prod-6',
    name: 'Portable Power Bank',
    description: 'A 20,000mAh power bank to keep your devices charged on the go.',
    price: 49.99,
    vendor: 'ChargeUp',
    category: 'Accessories',
    image: {
      src: PlaceHolderImages.find(img => img.id === 'prod-img-6')?.imageUrl || '',
      alt: 'Portable power bank',
      aiHint: PlaceHolderImages.find(img => img.id === 'prod-img-6')?.imageHint || '',
    },
  },
  {
    id: 'prod-7',
    name: 'Adjustable Standing Desk',
    description: 'Switch between sitting and standing with this electric height-adjustable desk.',
    price: 599.99,
    vendor: 'OfficePro',
    category: 'Office Furniture',
    image: {
      src: PlaceHolderImages.find(img => img.id === 'prod-img-7')?.imageUrl || '',
      alt: 'Adjustable standing desk',
      aiHint: PlaceHolderImages.find(img => img.id === 'prod-img-7')?.imageHint || '',
    },
  },
  {
    id: 'prod-8',
    name: 'Webcam with Ring Light',
    description: 'A 1080p webcam with a built-in ring light for professional video calls.',
    price: 79.99,
    vendor: 'StreamLine',
    category: 'Accessories',
    image: {
      src: PlaceHolderImages.find(img => img.id === 'prod-img-8')?.imageUrl || '',
      alt: 'Webcam with ring light',
      aiHint: PlaceHolderImages.find(img => img.id === 'prod-img-8')?.imageHint || '',
    },
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
