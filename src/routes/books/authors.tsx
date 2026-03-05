import { Button } from '#/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/components/ui/card';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';
import { Spinner } from '#/components/ui/spinner';
import { createAuthorSchema, type AuthorFormData } from '#/lib/validators/author';
import { createAuthor } from '#/server/authors';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const Route = createFileRoute('/books/authors')({
    component: RouteComponent,
})

function RouteComponent() {
    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AuthorFormData>({
        resolver: zodResolver(createAuthorSchema as any),
        defaultValues: {
            name: "",
            age: 0,
        },
    })

    const onSubmit = async (data: AuthorFormData) => {
        try {
            await createAuthor({
                data,
            });

            reset();
            toast("Author created successfully")
        } catch (error) {
            console.error(error)
            toast("Failed to create user")
        }
    };
    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <Card className="w-105">
                <CardHeader>
                    <CardTitle>Create New Author</CardTitle>
                    <CardDescription>
                        Add a new author to the database
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-6">

                        {/* Author Name */}
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Input
                                            {...field}
                                            placeholder="Enter author name"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        {/* Author Age */}
                        <div className="space-y-2">
                            <Label>Age</Label>
                            <Controller
                                name="age"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Input
                                            // type="number"
                                            {...field}
                                            placeholder="Enter age"
                                            onChange={(e) =>
                                                field.onChange(Number(e.target.value))
                                            }
                                        />
                                        {errors.age && (
                                            <p className="text-red-500 text-sm">
                                                {errors.age.message}
                                            </p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                    </CardContent>

                    <CardFooter className="flex justify-center mt-3">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Spinner /> : "Create Author"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
