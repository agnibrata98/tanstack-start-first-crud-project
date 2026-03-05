import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import { getProductById } from '#/server/products'
import { createFileRoute } from '@tanstack/react-router'
import { Star } from 'lucide-react'

export const Route = createFileRoute('/demo/products/$productId')({
    component: RouteComponent,
    loader: async ({ params }) => {
        const product = await getProductById({
            data: { id: params.productId },
        })

        return { product }
    },
})

function RouteComponent() {
    // const { productId } = Route.useParams()
    const { product } = Route.useLoaderData()
    // console.log(product);
    return (
        <div className="max-w-6xl mx-auto px-6 py-12">

            <Card className="p-8 island-shell rounded-2xl">
                <CardContent className="grid md:grid-cols-2 gap-10">

                    {/* Product Image */}
                    <div className="flex justify-center items-center bg-muted rounded-lg p-6">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-96 object-contain"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">

                        <Badge variant="secondary" className='island-kicker'>
                            {product.category}
                        </Badge>

                        <h1 className="mb-3 text-2xl font-bold text-(--sea-ink) sm:text-5xl">
                            {product.title}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm text-muted-foreground">
                                {product.rating.rate} ({product.rating.count} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <p className="text-3xl font-bold text-primary">
                            ${product.price}
                        </p>

                        {/* Description */}
                        <p className="leading-relaxed max-w-2xl text-base text-(--sea-ink-soft) sm:text-lg">
                            {product.description}
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <Button className="px-8">
                                Add to Cart
                            </Button>

                            <Button variant="outline">
                                Buy Now
                            </Button>
                        </div>

                    </div>

                </CardContent>
            </Card>

        </div>
    )
}
