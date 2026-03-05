import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/components/ui/card';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select';
import { Textarea } from '#/components/ui/textarea';
import { createBookSchema, type BookFormData } from '#/lib/validators/book';
import { createBook } from '#/server/books';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';
import { toast } from 'sonner';
import { useRouter } from '@tanstack/react-router';

type Author = {
    id: string;
    name: string;
};


export default function CreateBookForm({ authors }: { authors: Author[] }) {
    const router = useRouter()

    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<BookFormData>({
        resolver: zodResolver(createBookSchema as any),
        defaultValues: {
            title: "",
            genre: "",
            description: "",
            authorId: "",
        },
    });

    const onSubmit = async (data: BookFormData) => {
        try {
            await createBook({
                data,
            });

            router.invalidate();


            reset();
            toast("Book Created Successfully")
        } catch (error) {
            console.error(error)
            toast("Failed to create user")
        }
    };
    return (
        <div className="flex justify-center py-10">
            <Card className="w-125">
                <CardHeader>
                    <CardTitle>Create Book</CardTitle>
                    <CardDescription>
                        Add a new book and assign an author
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-6">

                        {/* Title */}
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Input {...field} placeholder="Book title" />
                                        {errors.title && (
                                            <p className="text-red-500 text-sm">
                                                {errors.title.message}
                                            </p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        {/* Genre */}
                        <div className="space-y-2">
                            <Label>Genre</Label>
                            <Controller
                                name="genre"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Input {...field} placeholder="Fantasy, Horror, Sci-Fi..." />
                                        {errors.genre && (
                                            <p className="text-red-500 text-sm">
                                                {errors.genre.message}
                                            </p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Textarea {...field} placeholder="Write book description..." />
                                        {errors.description && (
                                            <p className="text-red-500 text-sm">
                                                {errors.description.message}
                                            </p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        {/* Author Select */}
                        <div className="space-y-2">
                            <Label>Author</Label>

                            <Controller
                                name="authorId"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className='w-full'>
                                                <SelectValue placeholder="Select author" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {
                                                    authors.length === 0 ? (
                                                        <div className="p-2 text-sm text-muted-foreground">
                                                            No authors found
                                                        </div>
                                                    ) :
                                                        authors.map((author) => (
                                                            <SelectItem key={author.id} value={author.id}>
                                                                {author.name}
                                                            </SelectItem>
                                                        ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        {errors.authorId && (
                                            <p className="text-red-500 text-sm">
                                                {errors.authorId.message}
                                            </p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                    </CardContent>

                    <CardFooter className="flex justify-center">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Spinner /> : "Create Book"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
