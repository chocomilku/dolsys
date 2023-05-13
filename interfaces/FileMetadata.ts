import { type CategoriesWithoutID } from "./Categories";

export interface FileMetadata {
	path: string;
	originalname: string;
	uid?: string;
	user_id: string;
	category_id: number;
	title?: string;
	phase_no?: string;
	unit_no?: string;
}

export interface FileMetadataWithID extends Omit<FileMetadata, "uid"> {
	id: number;
	created_at: Date;
	uid: string;
	downloadCount: number;
	category_id: number;
}

export interface FilesWithCategories
	extends FileMetadataWithID,
		CategoriesWithoutID {}

export interface FilesWithCategoriesWithoutPathAndUserID
	extends Omit<FilesWithCategories, "path" | "user_id"> {}
