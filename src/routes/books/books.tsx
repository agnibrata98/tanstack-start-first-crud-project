import BooksList from '#/components/books-list';
import CreateBookForm from '#/components/create-book-form';
import { getAuthors } from '#/server/authors';
import { getBooks } from '#/server/books';
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/books/books')({
    component: RouteComponent,
    loader: async () => {
        const authors = await getAuthors();
        const books = await getBooks()
        return { authors, books };
    },
})

function RouteComponent() {
    const { authors } = Route.useLoaderData();
    const { books } = Route.useLoaderData();


    return (
        <div className='max-w-6xl mx-auto space-y-12 py-10'>
        <CreateBookForm authors={authors} />
        <BooksList books={books} />
        </div>
    )
}
