import { API } from "./src/types/note";

declare global {
    interface Window {
        api: API;
    }
}