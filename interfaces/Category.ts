export interface Category {
    /**
     * The ID of the category of the file.
     * @remarks This is the ID of the category of the file and it has an SQL data type of `int unsigned NOT NULL AUTO_INCREMENT`
     */
    id: number;

    /**
     * The name of the category of the file.
     * @remarks This is the name of the category of the file and it has an SQL data type of `text NOT NULL`
     */
    name: string;

    /**
     * The code of the category of the file.
     * @remarks This is the code of the category of the file and it has an SQL data type of `varchar(255) NOT NULL`
     */
    code: string;

    /**
     * The scope level of the category of the file.
     * @remarks This is the scope level of the category of the file and it has an SQL data type of `varchar(24) `
     */
    scope_level?: string;

    /**
     * The color of the category of the file.
     * @remarks This is the color of the category of the file and it has an SQL data type of `varchar(7) DEFAULT '#000000'`
     */
    color: string;
}