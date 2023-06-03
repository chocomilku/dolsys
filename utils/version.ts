// package.json in root folder
import { version as appVersion } from "../package.json"

// package.json in client folder
import { version as clientVersion } from "../client/package.json"

// package.json in server folder
import { version as serverVersion } from "../server/package.json"

export const VERSION = {
    app: appVersion,
    client: clientVersion,
    server: serverVersion
}