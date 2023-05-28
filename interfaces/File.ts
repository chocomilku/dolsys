
/**
 * File interface that represents the `files` table in the database.
 */
export interface File {
    /**
     * The ID of the file.
     * @remarks This is the primary key of the `files` table and it has an SQL data type of `int unsigned NOT NULL AUTO_INCREMENT`
     */

    id: number;

    /**
     * The path of the file.
     * @remarks This is the path of the file in the server and it has an SQL data type of `text NOT NULL`
     */
    path: string;

    /**
     * The name of the file.
     * @remarks This is the name of the file in the server and it has an SQL data type of `varchar(255) NOT NULL`
     */
    file_name: string;

    /**
     * The timestamp of when the file was uploaded
     * @remarks This is the timestamp of when the file was uploaded and it has an SQL data type of `timestamp NOT NULL DEFAULT current_timestamp()`
     */
    created_at: Date;

    /**
     * The unique ID of the file.
     * @remarks This is the unique ID of the file and it has an SQL data type of `varchar(10) NOT NULL`
     * @remarks This is generated using the `nanoid` package
     */
    uid: string;

    /**
     * The number of times the file was downloaded.
     * @remarks This is the number of times the file was downloaded and it has an SQL data type of `int NOT NULL DEFAULT 0`
     */
    download_count: number;

    /**
     * The ID of the user who uploaded the file.
     * @remarks This is the user id from the user's Auth0 profile and it has an SQL data type of `varchar(255) NOT NULL`
     */
    user_id: string;

    /**
     * The ID of the category of the file.
     * @remarks This is the ID of the category of the file and it has an SQL data type of `int unsigned NOT NULL`
     */
    category_id: number;

    /**
     * The title of the file.
     * @remarks This is the title of the file and it has an SQL data type of `varchar(255)`
     */
    title?: string;

    /**
     * The phase number of the file.
     * @remarks This is the phase number of the file and it has an SQL data type of `varchar(255)`
     */
    phase_no?: string;

    /**
     * The unit number of the file.
     * @remarks This is the unit number of the file and it has an SQL data type of `varchar(255)`
     */
    unit_no?: string;
}

/**
 * File interface that has category details.
 */
export interface FileWithCategory extends File {
    /**
     * The ID of the category of the file.
     * @remarks This is the ID of the category of the file and it has an SQL data type of `int unsigned NOT NULL AUTO_INCREMENT`
     */
    category_id: number;

    /**
     * The name of the category of the file.
     * @remarks This is the name of the category of the file and it has an SQL data type of `text NOT NULL`
     */
    category_name: string;

    /**
     * The code of the category of the file.
     * @remarks This is the code of the category of the file and it has an SQL data type of `varchar(255) NOT NULL`
     */
    category_code: string;

    /**
     * The scope level of the category of the file.
     * @remarks This is the scope level of the category of the file and it has an SQL data type of `varchar(24) `
     */
    category_scope_level?: string;

    /**
     * The color of the category of the file.
     * @remarks This is the color of the category of the file and it has an SQL data type of `varchar(7) DEFAULT '#000000'`
     */
    category_color: string;
}

export interface FileMetadata extends Omit<FileWithCategory, "path" | "user_id"> {}

export interface FileUpload extends Omit<File, "id" | "created_at" | "download_count" | "uid"> {}

export interface FileUploadWithUid extends FileUpload {
    uid: string;
}

export interface FileUploadWithoutFileAttributes extends Omit<FileUpload, "path" | "file_name"> {}