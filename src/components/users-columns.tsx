import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

export type User = {
    id: number
    name: string
    email: string
    phone: string
    age: number
}

export const columns = (
    handleDelete: (id: number) => void
): ColumnDef<User>[] => [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "age",
            header: "Age",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const user = row.original

                return (
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                            <Link
                                to="/demo/users/$id"
                                params={{ id: String(user.id) }}
                            >
                                Edit
                            </Link>
                        </Button>

                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(user.id)}
                        >
                            Delete
                        </Button>
                    </div>
                )
            },
        },
    ]