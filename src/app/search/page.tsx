'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { unifiedSearch, type UnifiedSearchOutput } from '@/ai/flows/unified-search-results';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, GraduationCap } from 'lucide-react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<UnifiedSearchOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      unifiedSearch({ query })
        .then(setResults)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!query) {
    return <p className="text-center text-muted-foreground">Please enter a search term.</p>;
  }
  
  if (!results || results.results.length === 0) {
    return <p className="text-center text-muted-foreground">No results found for "{query}".</p>;
  }

  return (
    <div className="space-y-6">
      {results.results.map((result) => (
        <Link href={result.type === 'product' ? `/products/${result.id}` : `/courses/${result.id}`} key={result.id} className="block">
          <Card className="hover:shadow-md transition-shadow">
            <div className="flex gap-4 p-4">
              <div className="w-24 h-24 relative flex-shrink-0">
                 {result.imageUrl ? (
                    <Image src={'https://picsum.photos/seed/search/200'} alt={result.title} fill objectFit="cover" className="rounded-md" />
                  ) : (
                    <div className="w-full h-full bg-secondary rounded-md flex items-center justify-center">
                       {result.type === 'product' ? <ShoppingBag className="w-8 h-8 text-muted-foreground"/> : <GraduationCap className="w-8 h-8 text-muted-foreground"/>}
                    </div>
                  )}
              </div>
              <div className="flex-grow">
                <CardHeader className="p-0">
                  <div className="flex items-center gap-2 mb-1">
                     {result.type === 'product' ? <ShoppingBag className="w-4 h-4 text-muted-foreground"/> : <GraduationCap className="w-4 h-4 text-muted-foreground"/>}
                    <span className="text-sm capitalize text-muted-foreground">{result.type}</span>
                  </div>
                  <CardTitle className="text-lg">{result.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-2">
                  <CardDescription>{result.description}</CardDescription>
                </CardContent>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Suspense fallback={<h1 className="text-4xl font-bold mb-8 font-headline">Searching...</h1>}>
        <SearchPageContent />
      </Suspense>
    </div>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 font-headline">
        Search Results {query && <span className="text-muted-foreground">for "{query}"</span>}
      </h1>
      <SearchResults />
    </>
  )
}
