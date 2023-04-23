export interface FileMetadata {
	path: string;
	originalname: string;
	uid?: string;
}

export interface FileMetadataWithID extends Omit<FileMetadata, "uid"> {
	id: number;
	created_at: Date;
	uid: string;
}
