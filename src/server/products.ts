import { createServerFn } from "@tanstack/react-start";

export const getProducts = createServerFn({
    method: "GET",
})
    .handler(async () => {
        const res = await fetch('https://fakestoreapi.com/products');
        const products = await res.json();
        return products;
    })


export const getProductById = createServerFn({
    method: "GET",
})
    .inputValidator((data: { id: string }) => data)
    .handler(async ({ data }) => {
        const res = await fetch(`https://fakestoreapi.com/products/${data.id}`);
        const product = await res.json();
        return product;
    })