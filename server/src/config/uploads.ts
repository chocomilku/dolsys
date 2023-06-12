import multer from "multer";
import path from "path";

const LOCAL_UPLOADS_PATH = path.join(__dirname, "../../uploads");

export const uploadConfig = multer({
	dest: LOCAL_UPLOADS_PATH,
});
