import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema, type UserFormData } from "@/lib/validators/user"
import { createUser, deleteUser, getUsers } from "#/server/user"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from 'sonner'
import { Spinner } from '#/components/ui/spinner'
import { DataTable } from '#/components/data-table'
import { columns } from '#/components/users-columns'

export const Route = createFileRoute('/demo/users/add-user')({
    component: AddUsers,
    loader: async () => await getUsers()
})

function AddUsers() {
    const router = useRouter()
    const users = Route.useLoaderData()
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema as any),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            age: 0,
        },
    })

    const onSubmit = async (data: UserFormData) => {
        try {
            await createUser({ data }) //  Correct way

            router.invalidate();
            toast("User created successfully")
            reset()
        } catch (error) {
            console.error(error)
            toast("Failed to create user")
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteUser({ data: { id } })

            router.invalidate();
            toast(`User Deleted With ID: ${id}`)
        } catch (error) {
            console.error(error)
            toast("Failed to delete user")
        }
    }
    return <div className="flex justify-center mt-20 gap-1">
        <Card className="w-100 island-shell rounded-2xl">
            <CardHeader>
                <CardTitle>Add User</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Name */}
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <Input placeholder="Name" {...field} />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    {/* Email */}
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <Input placeholder="Email" {...field} />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    {/* Phone */}
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <Input placeholder="Phone" {...field} />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    {/* Age */}
                    <Controller
                        name="age"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <Input
                                    // type="number"
                                    placeholder="Age"
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                                {errors.age && (
                                    <p className="text-red-500 text-sm">
                                        {errors.age.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner /> : "Create User"}
                    </Button>

                </form>
            </CardContent>
        </Card>

        {/* Users Table */}
        {
            users && users.length > 0 && (
                <Card className='island-shell rounded-2xl'>
                    <CardHeader>
                        <CardTitle>All Users</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <DataTable
                            columns={columns(handleDelete)}
                            data={users}
                        />
                    </CardContent>
                </Card>
            )
        }

    </div>
}
