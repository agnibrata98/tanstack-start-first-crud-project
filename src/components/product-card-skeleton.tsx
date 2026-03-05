import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function ProductCardSkeleton() {
    return (
        <Card className="flex flex-col justify-between rounded-2xl">
            <CardHeader className="flex justify-center items-center h-52">
                <Skeleton className="h-40 w-32" />
            </CardHeader>

            <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />

                <Skeleton className="h-4 w-3/4" />

                <Skeleton className="h-5 w-20" />
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
            </CardFooter>
        </Card>
    )
}