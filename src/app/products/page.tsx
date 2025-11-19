import { getProducts, Product } from '@/lib/placeholder-data';
import ProductCard from '@/components/shared/product-card';
import { Separator } from '@/components/ui/separator';

export default function ProductsPage() {
  const products = getProducts();
  
  const productsByCategory = products.reduce((acc, product) => {
    const { category } = product;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<Product['category'], Product[]>);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 font-headline">All Products</h1>
      
      <div className="space-y-12">
        {Object.entries(productsByCategory).map(([category, products]) => (
          <div key={category}>
            <h2 className="text-2xl font-bold font-headline mb-6">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
