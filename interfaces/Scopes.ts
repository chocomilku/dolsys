const scopes = [
    "download:files",
    "upload:files",
    "view:files",
    "view:own-files",
    "remove:files",
    "create:category",
    "view:category",
    "edit:category",
    "delete:category",
    "edit:files"
] as const;

export type Scopes = typeof scopes[number];

