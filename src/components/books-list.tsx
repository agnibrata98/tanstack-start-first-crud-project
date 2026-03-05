import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Link } from "@tanstack/react-router"

type Book = {
    id: string
    title: string
    genre: string
    description: string
    author: {
        name: string
    }
}

export default function BooksList({ books }: { books: Book[] }) {
    return (
        <Card className="shadow-sm">
            <CardHeader className="border-b">
                <CardTitle className="text-2xl">Books Library</CardTitle>
                <CardDescription>
                    Browse all books stored in the system
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
                {books.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <p className="text-muted-foreground text-sm">
                            No books created yet
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Create your first book using the form above
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {books.map((book) => (
                            <Link
                                key={book.id}
                                to="/books/$id"
                                params={{ id: book.id }}
                                className="block"
                            >
                                <div
                                    // key={book.id}
                                    className="group border rounded-xl p-5 bg-background hover:shadow-lg transition-all duration-200"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition">
                                            {book.title}
                                        </h3>

                                        <Badge variant="secondary" className="text-xs">
                                            {book.genre}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                        {book.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-2 border-t">
                                        <span className="text-xs text-muted-foreground">
                                            Author
                                        </span>

                                        <Badge variant="outline">
                                            {book.author.name}
                                        </Badge>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}