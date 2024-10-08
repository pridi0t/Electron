import { API } from "../types/tApi";

declare global {
    interface Window {
        api: API;
    }
}