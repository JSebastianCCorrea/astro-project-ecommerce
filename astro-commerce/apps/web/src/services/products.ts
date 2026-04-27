import type { product } from "../types";
import { apiFetch } from "../lib/fetcher";

export async function getProducts() {
    return apiFetch<product[]>("/products");
}

export async function getProduct(id: string) {
    return apiFetch<product>(`/products/${id}`);
}

export async function createProduct(product: product) {
    return apiFetch<product>("/products", {
        method: "POST",
        body: JSON.stringify(product),
    })}