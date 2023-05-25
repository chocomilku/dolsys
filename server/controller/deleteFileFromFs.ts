import fs from "fs";
import util from "util";

const unlinkAsync = util.promisify(fs.unlink);

export const deleteFileFromFs = async (path: string) => {
	await unlinkAsync(path);
};
