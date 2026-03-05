import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Spinner } from '#/components/ui/spinner'
import { userSchema, type UserFormData } from '#/lib/validators/user'
import { getUserById, updateUser } from '#/server/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const Route = createFileRoute('/demo/users/$id')({
    component: EditUser,
    loader: async ({ params }) => {
        const user = await getUserById({
            data: { id: params.id },
        })

        return { user }
    },
})

function EditUser() {
    const { id } = Route.useParams()
    const { user } = Route.useLoaderData()
    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema as any),
        defaultValues: {
            name: user?.name ?? "",
            email: user?.email ?? "",
            phone: user?.phone ?? "",
            age: user?.age ?? 0,
        },
    })



    const onSubmit = async (data: UserFormData) => {
        try {
            await updateUser({
                data: {
                    id,
                    ...data,
                },
            })

            toast.success("User updated successfully")

            navigate({
                to: "/demo/users/add-user",
            })
        } catch (error) {
            console.error(error)
            toast.error("Failed to update user")
        }
    }
    return (
        <div className="flex justify-center mt-20">
            <Card className="w-100">
                <CardHeader>
                    <CardTitle>Edit User</CardTitle>
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
                                        type="number"
                                        value={field.value ?? ""}
                                        onChange={(e) =>
                                            field.onChange(Number(e.target.value))
                                        }
                                        placeholder="Age"
                                    />
                                    {errors.age && (
                                        <p className="text-red-500 text-sm">
                                            {errors.age.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? <Spinner /> : "Update User"}
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
