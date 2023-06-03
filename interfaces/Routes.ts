import { Scopes } from "./Scopes";

export interface Routes {
    path: string;
    name: string;
    scopes: Scopes[];
}

export const routes: {[key: string]: Routes} = {
    "Home": {
        path: "/",
        name: "Home",
        scopes: []
    },
    "Files": {
        path: "/files",
        name: "Files",
        scopes: ["view:files", "edit:files", "remove:files"]
    },
    "Categories": {
        path: "/categories",
        name: "Categories",
        scopes: ["view:category", "edit:category", "delete:category", "create:category"]
    },
    "Upload": {
        path: "/upload",
        name: "Upload",
        scopes: ["upload:files"]
    }
}