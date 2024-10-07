import { API } from "./src/types/tApi";

declare global {
    interface Window {
        api: API;
    }
}