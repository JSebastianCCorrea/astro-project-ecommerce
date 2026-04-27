import { API_URL } from "./config";

export async function apiFetch<T>(

    path:string,
    options:RequestInit = {},
    token? :string

): Promise<T>{
    const response = await fetch(`${API_URL}/${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token? {Authorization: `Bearer ${token}`} : {}),
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
}