import { userSchema, type UserFormData } from "@/lib/validators/user"
import { createServerFn } from "@tanstack/react-start"
import { zodValidator } from "@tanstack/zod-adapter"

export const createUser = createServerFn({
    method: "POST",
})
    .inputValidator(zodValidator(userSchema))
    .handler(async ({ data }) => {
        const user = await prisma.user.create({
            data,
        })

        return user
    })

export const getUsers = createServerFn({
    method: "GET",
})
    .handler(async () => {
        const users = await prisma.user.findMany({
            orderBy: { id: "desc" },
        })
        return users;
    })

export const getUserById = createServerFn({
    method: "GET",
})
    .inputValidator((data: { id: string }) => data)
    .handler(async ({ data }) => {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(data.id),
            },
        })

        return user
    })


export const updateUser = createServerFn({
    method: "POST",
})
    .inputValidator(
        (data: { id: string } & UserFormData) => data
    )
    .handler(async ({ data }) => {
        const { id, ...userData } = data

        const user = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: userData,
        })

        return user
    })

export const deleteUser = createServerFn({
    method: "POST",
})
    .inputValidator((data: { id: number }) => data)
    .handler(async ({ data }) => {
        await prisma.user.delete({
            where: { id: data.id },
        })

        return { success: true }
    })