import { writable } from "svelte/store";

export const cartContent = writable([])

export const cartSize = writable(0);

export const totalPrice = writable(0);