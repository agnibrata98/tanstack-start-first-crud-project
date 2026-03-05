import ProductGridSkeleton from '#/components/product-grid-skeleton';
import { Button } from '#/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '#/components/ui/card';
import { getProducts } from '#/server/products'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Star } from 'lucide-react';

export const Route = createFileRoute('/demo/products/products')({
    component: ProductPage,
    loader: async () => await getProducts(),
    pendingComponent: ProductGridSkeleton
})

function ProductPage() {
    const products = Route.useLoaderData();
    // console.log(products);
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            {/* Page Title */}
            <h1 className="display-title mb-3 text-4xl font-bold text-(--sea-ink) sm:text-5xl">Products</h1>

            {/* Product Grid */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    products?.map((product: any) => (

                        <Card
                            key={product.id}
                            className="flex flex-col justify-between hover:shadow-lg transition-shadow island-shell rounded-2xl"
                        >

                            {/* Image */}
                            <CardHeader className="flex justify-center items-center h-52">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-40 object-contain"
                                />
                            </CardHeader>

                            {/* Content */}
                            <CardContent className="space-y-2">
                                <h2 className="font-semibold line-clamp-2 island-kicker">
                                    {product.title}
                                </h2>

                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {product.description}
                                </p>

                                <p className="text-lg font-bold text-primary island-kicker">
                                    ${product.price}
                                </p>

                                {/* Rating */}
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                    {product.rating.rate} ({product.rating.count} reviews)
                                </div>
                            </CardContent>

                            {/* Footer */}
                            <CardFooter className="flex flex-col gap-2">

                                <Button className="w-full" suppressHydrationWarning>
                                    Add to Cart
                                </Button>

                                <Button asChild variant="outline" className="w-full">
                                    <Link
                                        to="/demo/products/$productId"
                                        params={{ productId: product.id.toString() }}
                                    >
                                        View Details
                                    </Link>
                                </Button>

                            </CardFooter>

                        </Card>

                    ))}
            </div>

        </div>
    )
}
