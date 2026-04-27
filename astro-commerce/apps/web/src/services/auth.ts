import type { authResponse } from "../types";
import { apiFetch } from "../lib/fetcher";

export async function loginUser(email: string, password: string) {
    return apiFetch<authResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function registerUser(name: string, email: string, password: string) {
    return apiFetch<authResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    });
}