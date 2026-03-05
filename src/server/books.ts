import { createBookSchema, getBookSchema } from "#/lib/validators/book";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter"
import { prisma } from "@/db"


export const createBook = createServerFn({ method: "POST" })
    .inputValidator(zodValidator(createBookSchema))
    .handler(async ({ data }) => {

        const book = await prisma.book.create({
            data: {
                title: data.title,
                genre: data.genre,
                description: data.description,
                authorId: data.authorId,
            },
            include: {
                author: true,
            },
        });

        return book;
    });


export const getBooks = createServerFn({
    method: "GET",
}).handler(async () => {

    const books = await prisma.book.findMany({
        include: {
            author: true,
        },
        orderBy: {
            title: "asc",
        },
    });

    return books;
});



export const getBook = createServerFn({ method: "GET" })
    .inputValidator(zodValidator(getBookSchema))
    .handler(async ({ data }) => {

        const book = await prisma.book.findUnique({
            where: {
                id: data.id,
            },
            include: {
                author: true,
            },
        });

        return book;
    });