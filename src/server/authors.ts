import { createAuthorSchema } from "#/lib/validators/author";
import { createServerFn } from "@tanstack/react-start";
import { prisma } from "@/db"
import { zodValidator } from "@tanstack/zod-adapter"

export const createAuthor = createServerFn({ method: "POST" })
    .inputValidator(zodValidator(createAuthorSchema))
    .handler(async ({ data }) => {
        const author = await prisma.author.create({
            data: {
                name: data.name,
                age: data.age,
            },
        });

        return author;
    });


export const getAuthors = createServerFn({
    method: "GET",
}).handler(async () => {
    const authors = await prisma.author.findMany({
        orderBy: {
            name: "asc",
        },
    });

    return authors;
});