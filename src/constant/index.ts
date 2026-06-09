import { fetch } from "@tauri-apps/plugin-http";
import { isTauri } from "@tauri-apps/api/core";
import ky from "ky";

export const kyInstance = ky.create({
    fetch: isTauri() ? fetch : undefined,
})

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITE_NOBITEX_BASE_URL: string;
            VITE_TABDEAL_BASE_URL: string;
            VITE_BITPIN_BASE_URL: string;
        }
    }
}


export const API = {
    nobitex: import.meta.env.VITE_NOBITEX_BASE_URL,
    tabdeal: import.meta.env.VITE_TABDEAL_BASE_URL,
    bitpin: import.meta.env.VITE_BITPIN_BASE_URL,
}